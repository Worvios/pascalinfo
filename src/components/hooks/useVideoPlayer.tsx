// hooks/useVideoPlayer.ts
import { useState, useRef, useEffect } from "react";

export function useVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const seekTo = (percentage: number) => {
    if (!videoRef.current || !videoRef.current.duration) return;

    const time = videoRef.current.duration * (percentage / 100);
    videoRef.current.currentTime = time;
    setProgress(percentage);
  };

  // Update progress as video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progressValue = (video.currentTime / video.duration) * 100;
      setProgress(isNaN(progressValue) ? 0 : progressValue);
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    };

    const handleVideoEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      if (video) video.currentTime = 0;
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("ended", handleVideoEnded);
    video.addEventListener("loadedmetadata", updateProgress);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("ended", handleVideoEnded);
      video.removeEventListener("loadedmetadata", updateProgress);
    };
  }, []);

  return {
    videoRef,
    isPlaying,
    isMuted,
    progress,
    currentTime,
    duration,
    togglePlay,
    toggleMute,
    toggleFullscreen,
    seekTo,
  };
}
