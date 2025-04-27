// Step 4b: Create this component
import React, { ReactNode } from "react";
import { useIntersectionObserver } from "@/components/hooks/useIntersectionObserver";

type AnimationType = "fade-up" | "fade-in" | "slide-in-right" | "slide-in-left";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
}

export function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
}: AnimatedSectionProps) {
  const [ref, isVisible] = useIntersectionObserver();

  const baseClasses = "transition-all duration-700";

  const animationClasses = {
    "fade-up": isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-16",
    "fade-in": isVisible ? "opacity-100" : "opacity-0",
    "slide-in-right": isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-16",
    "slide-in-left": isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-16",
  };

  return (
    <div
      ref={ref as any}
      className={`${baseClasses} ${animationClasses[animation]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
