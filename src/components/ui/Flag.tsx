// components/ui/flag.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface FlagProps {
  code: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const flagUrls: Record<string, string> = {
  // These are direct links to flag SVGs (preferably from your public folder)
  fr: "https://flagcdn.com/fr.svg",
  gb: "https://flagcdn.com/gb.svg",
  ma: "https://flagcdn.com/ma.svg",
  es: "https://flagcdn.com/es.svg",
  it: "https://flagcdn.com/it.svg",
  de: "https://flagcdn.com/de.svg",
};

const Flag = ({ code, className, size = "md" }: FlagProps) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-9 h-9",
  };

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden border border-border/30 shadow-sm",
        sizeClasses[size],
        className
      )}
    >
      <img
        src={flagUrls[code.toLowerCase()]}
        alt={`${code} flag`}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default Flag;
