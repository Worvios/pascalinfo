// VideoSection.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Clock,
  CheckCircle2,
  Sparkles,
  Share2,
} from "lucide-react";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function VideoSection() {
  const { t } = useTranslation();
  const {
    videoRef,
    isPlaying,
    isMuted,
    progress,
    togglePlay,
    toggleMute,
    toggleFullscreen,
    seekTo,
  } = useVideoPlayer();

  // Add these manually since they might not be in your hook
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Update time when the video is playing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration || 0);
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateTime);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateTime);
    };
  }, [videoRef]);

  const [hovering, setHovering] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Animation variants for staggered elements
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  // Helper for time formatting
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Mount effect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // A helper function to safely parse translated array
  const getTranslatedArray = (key: string): string[] => {
    const translatedData = t(key, { returnObjects: true });
    return Array.isArray(translatedData)
      ? translatedData.filter((item) => typeof item === "string")
      : [];
  };

  const features = getTranslatedArray("video.features");
  const dataVideoAttribute = "0"; // Make this a static value or derive it from props

  // Handle progress bar clicks
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = (clickPosition / rect.width) * 100;
    seekTo(percentage);
  };

  // Handle social share
  const handleShare = () => {
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2000);

    if (navigator.share) {
      navigator
        .share({
          title: t("video.title"),
          text: t("video.description"),
          url: window.location.href,
        })
        .catch(console.error);
    }
  };

  // Simple server-side safe render
  if (!isMounted) {
    return (
      <section className="relative py-12 sm:py-20 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8 md:pr-6 lg:pr-12">
            <SectionHeading
              title={t("video.title")}
              subtitle={t("video.subtitle")}
              gradient="amber"
            />
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("video.description")}
            </p>
            <ul className="space-y-3 sm:space-y-4">
              {features.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-sm sm:text-base text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-muted/20">
            <div className="w-full aspect-video bg-muted/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <div className="animate-pulse w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Play className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 md:px-8 bg-gradient-to-b from-background via-background to-muted/10 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-amber-500/5 rounded-full blur-[80px] opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-primary/5 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Title area with better positioned floating elements */}
        <div className="text-center mb-12 sm:mb-16 relative">
          <AnimatedSection animation="fade-in">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              {t("video.tag", "Expérience Virtuelle")}
            </div>

            <SectionHeading
              title={t("video.title")}
              subtitle={t("video.subtitle")}
              gradient="amber"
              className="mx-auto text-center"
            />
          </AnimatedSection>

          {/* Floating badges - hidden on small mobile, visible on larger screens */}
          <motion.div
            className="absolute -left-4 lg:-left-20 top-1/2 -translate-y-1/2 hidden sm:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 border border-muted rotate-[-5deg]">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                <span className="text-xs sm:text-sm font-medium">
                  {t("video.highQuality", "Haute Qualité")}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-4 lg:-right-20 top-1/2 -translate-y-1/2 hidden sm:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 border border-muted rotate-[5deg]">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
                <span className="text-xs sm:text-sm font-medium">03:45</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile-first grid layout - stacks on mobile, columns on larger screens */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Content column - full width on mobile, 2/5 on desktop */}
          <AnimatedSection animation="slide-in-left" className="lg:col-span-2 order-2 lg:order-1">
            <div className="space-y-6 sm:space-y-8">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t("video.description")}
              </p>

              <ul className="space-y-4 sm:space-y-5">
                {features.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 sm:gap-4"
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={featureVariants}
                  >
                    <div className="bg-amber-500/10 p-1.5 sm:p-2 rounded-full mt-0.5">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                    </div>
                    <div>
                      <span className="text-sm sm:text-base text-foreground font-medium">
                        {item}
                      </span>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {t(
                          `video.featureDescriptions.${index}`,
                          "Découvrez cette fonctionnalité exceptionnelle pendant votre visite."
                        )}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile-optimized buttons - stack on small screens */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  size="lg"
                  variant="default"
                  className="rounded-full group transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 w-full sm:w-auto"
                  onClick={togglePlay}
                >
                  <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:scale-110 transition-transform" />
                  {t("video.playButton")}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full transition-all duration-300 hover:border-amber-500/50 relative w-full sm:w-auto"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  {t("video.shareButton", "Partager")}

                  <AnimatePresence>
                    {showShareTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap"
                      >
                        {t("video.shareCopied", "Lien copié !")}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Video column - full width on mobile, 3/5 on desktop */}
          <AnimatedSection
            animation="slide-in-right"
            delay={300}
            className="lg:col-span-3 order-1 lg:order-2"
          >
            {/* Video Container with enhanced styling */}
            <div
              className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-muted/20
                ring-1 ring-white/10 ring-offset-1 ring-offset-white/5
                group/video"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              onTouchStart={() => setHovering(true)} 
              onTouchEnd={() => setTimeout(() => setHovering(false), 3000)} // Delay hiding controls on touch devices
            >
              {/* Video element */}
              <video
                ref={videoRef}
                muted={isMuted}
                className="w-full aspect-video object-cover cursor-pointer"
                poster="/video-poster.png"
                onClick={togglePlay}
                playsInline
                preload="metadata"
                data-video={dataVideoAttribute}
              >
                <source src="/videopascal.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Overlay gradients for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

              {/* Video Controls - Enhanced with animations and mobile-friendly touches */}
              <div
                className={cn(
                  "absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex flex-col gap-1.5 sm:gap-2 transition-all duration-300",
                  isPlaying && !hovering ? "opacity-0" : "opacity-100"
                )}
              >
                {/* Progress bar */}
                <div
                  className="h-1 sm:h-1.5 bg-white/20 rounded-full cursor-pointer group/progress overflow-hidden"
                  onClick={handleProgressClick}
                >
                  <motion.div
                    className="h-full bg-amber-500 rounded-full relative"
                    style={{ width: `${progress}%` }}
                    initial={false}
                    animate={{
                      width: `${progress}%`,
                    }}
                    transition={{ type: "tween" }}
                  >
                    <div
                      className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 sm:h-3 sm:w-3 bg-white rounded-full 
                      scale-0 group-hover/progress:scale-100 transition-transform shadow-sm"
                    />
                  </motion.div>
                </div>

                {/* Controls row - mobile optimized */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white"
                        onClick={togglePlay}
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white"
                        onClick={toggleMute}
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </Button>
                    </motion.div>

                    {/* Time display - Smaller on mobile */}
                    <div className="text-white/90 text-xs sm:text-sm backdrop-blur-md px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-black/20">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white"
                      onClick={toggleFullscreen}
                    >
                      <Maximize className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Initial Play Button with enhanced mobile design */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        className="rounded-full px-6 sm:px-8 py-4 sm:py-6 bg-white/20 backdrop-blur-xl text-white border border-white/30
                          hover:bg-white/30 hover:text-white hover:border-white/50 shadow-xl text-base sm:text-lg gap-2 sm:gap-3
                          transition-all duration-300"
                        onClick={togglePlay}
                      >
                        <div className="bg-white rounded-full p-1">
                          <Play className="h-4 w-4 sm:h-6 sm:w-6 text-amber-500 fill-amber-500" />
                        </div>
                        {t("video.playButton")}
                      </Button>
                    </motion.div>

                    <motion.p
                      className="text-white/70 mt-3 sm:mt-4 max-w-xs text-center text-xs sm:text-sm px-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {t(
                        "video.playInstructions",
                        "Cliquez pour commencer votre visite virtuelle interactive"
                      )}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Video quality badge */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                <div className="bg-black/30 backdrop-blur-md text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex items-center gap-1 sm:gap-1.5">
                  <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-500" />
                  HD
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}