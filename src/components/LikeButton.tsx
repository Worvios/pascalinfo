"use client";
import { useState, useEffect } from "react";

export default function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    setLiked(localStorage.getItem(`like_${postId}`) === "1");
  }, [postId]);
  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    localStorage.setItem(`like_${postId}`, newLiked ? "1" : "0");
  };
  return (
    <button
      onClick={handleLike}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow hover:scale-105 transition-all duration-200 text-lg ${
        liked
          ? "bg-gradient-to-r from-primary to-purple-600 text-white"
          : "bg-primary/10 text-primary hover:bg-primary/20"
      }`}
      aria-pressed={liked}
      aria-label="Applaudir l'article"
    >
      <svg
        className="w-6 h-6 mr-1"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21c-4.97-4.97-8-7.99-8-11.5A5.5 5.5 0 0 1 12 4.5a5.5 5.5 0 0 1 8 5c0 3.51-3.03 6.53-8 11.5z"
        />
      </svg>
      {liked ? "Merci !" : "Applaudir"}
    </button>
  );
}
