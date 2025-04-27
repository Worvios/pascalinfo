// Step 2: Create this component
import React from "react";
import { tokens } from "@/lib/tokens";

type GradientType = "primary" | "secondary" | "amber";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  gradient?: GradientType;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  gradient = "primary",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const gradientClass = tokens.gradients[gradient];

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`mb-8 ${alignClasses[align]} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold">
        <span
          className={`bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}
        >
          {title}
        </span>
        {subtitle && (
          <>
            <br />
            <span className="text-foreground">{subtitle}</span>
          </>
        )}
      </h2>
    </div>
  );
}
