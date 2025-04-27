// src/components/sections/ProgramsSection.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/utils/LanguageProvider";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ArrowRight,
  Code,
  ChefHat,
  Globe,
  GraduationCap,
  HeartHandshake,
  Microscope,
  Trophy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import use3DCardEffect from "../hooks/use3DCardEffect";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

// Define interfaces based on the JSON structure
interface TranslatedProgram {
  title: string;
  description: string;
}

// Define interface for translation item object
interface TranslationItem {
  title?: string;
  description?: string;
  [key: string]: unknown;
}

// Define the Program interface with all necessary properties
interface Program {
  icon: LucideIcon;
  title: string;
  text: string;
  rotateX: number;
  rotateY: number;
  url: string;
}

// Define colors for cards
const cardColors = [
  "from-blue-500 to-indigo-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-purple-500 to-fuchsia-600",
  "from-rose-500 to-pink-600",
  "from-cyan-500 to-blue-600",
  "from-green-500 to-emerald-600",
  "from-violet-500 to-purple-600",
];

export default function ProgramsSection() {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const [expandedView, setExpandedView] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view after component mounts to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Function to safely get translated programs
  const getTranslatedPrograms = () => {
    try {
      // Here we handle the translation typing more carefully
      const items = t("programs.items", { returnObjects: true }) as unknown;

      // Make sure items is an array
      if (Array.isArray(items)) {
        // Convert each item to a TranslatedProgram
        return items.map((item) => {
          if (typeof item === "object" && item !== null) {
            const typedItem = item as TranslationItem;
            return {
              title: typeof typedItem.title === "string" ? typedItem.title : "",
              description:
                typeof typedItem.description === "string"
                  ? typedItem.description
                  : "",
            } as TranslatedProgram;
          }
          return { title: String(item), description: "" } as TranslatedProgram;
        });
      }
      return [] as TranslatedProgram[];
    } catch (error) {
      console.error("Error parsing programs:", error);
      return [] as TranslatedProgram[];
    }
  };

  // Get all programs data from translations
  const allPrograms = getTranslatedPrograms();

  // Map icons to program indices - explicitly typed as LucideIcon[]
  const programIcons = [
    Code,
    ChefHat,
    BookOpen,
    Globe,
    GraduationCap,
    HeartHandshake,
    Microscope,
    Trophy,
  ] as LucideIcon[];

  // Initialize programs with icons and translated content
  const initialPrograms = useMemo(
    () =>
      allPrograms.map((program, index) => ({
        icon: programIcons[index % programIcons.length],
        title: program.title,
        text: program.description,
        rotateX: 0,
        rotateY: 0,
        url: `#program-${index}`, // Placeholder URL
      })) as Program[],
    [allPrograms, programIcons] // Added programIcons as a dependency
  );

  // Use the custom 3D card effect hook
  const { programs, handleCardMove, handleCardLeave } =
    use3DCardEffect(initialPrograms);

  // For mobile: Show only first 4 by default, all if expanded
  const visiblePrograms =
    isMounted && isMobile && !expandedView
      ? allPrograms.slice(0, 4)
      : allPrograms;

  // Program Card component
  const ProgramCard = ({
    program,
    index,
  }: {
    program: TranslatedProgram;
    index: number;
  }) => (
    <div
      className="group relative bg-background border border-border/30 hover:border-primary/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onMouseMove={(e) => handleCardMove(e, index)}
      onMouseLeave={() => handleCardLeave(index)}
      style={{
        transform: `perspective(1000px) rotateX(${programs[index]?.rotateX}deg) rotateY(${programs[index]?.rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glass overlay effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Card shine effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 overflow-hidden pointer-events-none"
        style={{
          background:
            "linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.3) 50%, transparent 75%)",
          backgroundSize: "200% 200%",
          animation: "shineEffect 2s infinite",
        }}
      />

      {/* Content layout changes based on screen size */}
      <div
        className={
          isMounted && isMobile
            ? "flex items-center"
            : "flex flex-col items-center"
        }
      >
        {/* Program icon */}
        <div
          className={cn(
            isMounted && isMobile
              ? "w-14 h-14 mr-4 flex-shrink-0"
              : "w-16 h-16 mb-6",
            "flex items-center justify-center rounded-xl",
            "bg-gradient-to-br",
            cardColors[index % cardColors.length],
            "transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
            "shadow-lg"
          )}
        >
          {programs[index]?.icon &&
            React.createElement(programs[index].icon as LucideIcon, {
              className:
                isMounted && isMobile
                  ? "h-6 w-6 text-white"
                  : "h-8 w-8 text-white",
            })}
        </div>

        {/* Program title */}
        <h3
          className={cn(
            "font-bold",
            isMounted && isMobile
              ? "text-lg text-left"
              : "text-xl text-center mb-4 mt-4",
            "bg-gradient-to-r bg-clip-text text-transparent",
            cardColors[index % cardColors.length]
          )}
        >
          {program.title}
        </h3>
      </div>

      {/* Program description */}
      <p
        className={cn(
          "text-muted-foreground my-4",
          isMounted && isMobile ? "text-sm leading-relaxed" : "text-center"
        )}
      >
        {program.description}
      </p>

      {/* Button with placeholder URL */}
      <Button
        variant="outline"
        size={isMounted && isMobile ? "sm" : "default"}
        className={cn(
          "w-full rounded-xl gap-2 border-dashed",
          "hover:bg-primary/5 hover:border-primary/30 transition-all duration-300",
          "shadow-sm hover:shadow",
          isMounted && isMobile && "text-xs"
        )}
      >
        {/* data-url={programs[index]?.url || "#program"}
        onClick={() =>
          (window.location.href = programs[index]?.url || "#program")
        } 
          */}

        <BookOpen className={isMounted && isMobile ? "h-3 w-3" : "h-4 w-4"} />
        {t("programs.learnMore")}
        <ArrowRight
          className={cn(
            isMounted && isMobile ? "h-3 w-3" : "h-4 w-4",
            "ml-1 transition-transform duration-300 group-hover:translate-x-1",
            direction === "rtl" &&
              "rotate-180 mr-1 ml-0 group-hover:-translate-x-1"
          )}
        />
      </Button>
    </div>
  );

  return (
    <section
      id="programs"
      className="py-16 md:py-20 px-4 md:px-8 bg-background relative overflow-hidden"
    >
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float opacity-20" />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500/20 rounded-full blur-[120px] animate-float opacity-20"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px] animate-float opacity-10"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {t("programs.title")}
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("programs.subtitle")}
          </p>
        </div>

        {/* Client-side only: render different layouts based on screen size after mounting */}
        {!isMounted ? (
          // Server-side and initial client render: simplified grid that works everywhere
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {allPrograms.map((program, index) => (
              <ProgramCard key={index} program={program} index={index} />
            ))}
          </div>
        ) : isMobile ? (
          // Mobile layout (client-side only)
          <>
            <div className="grid grid-cols-1 gap-4">
              {visiblePrograms.map((program, index) => (
                <ProgramCard key={index} program={program} index={index} />
              ))}
            </div>

            {/* Show More/Less toggle button */}
            {allPrograms.length > 4 && (
              <Button
                variant="ghost"
                onClick={() => setExpandedView(!expandedView)}
                className="mt-6 mx-auto flex items-center gap-2 text-primary"
              >
                {expandedView ? (
                  <>
                    <span>{t("programs.showLess")}</span>
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>{t("programs.showMore")}</span>
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </>
        ) : (
          // Desktop layout (client-side only)
          <>
            {/* First row - 3 cards */}
            <div className="grid grid-cols-3 gap-6 md:gap-8 mb-8">
              {allPrograms.slice(0, 3).map((program, index) => (
                <ProgramCard key={index} program={program} index={index} />
              ))}
            </div>

            {/* Second row - 3 cards */}
            <div className="grid grid-cols-3 gap-6 md:gap-8 mb-8">
              {allPrograms.slice(3, 6).map((program, index) => (
                <ProgramCard
                  key={index + 3}
                  program={program}
                  index={index + 3}
                />
              ))}
            </div>

            {/* Third row - 2 cards centered */}
            <div className="grid grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
              {allPrograms.slice(6, 8).map((program, index) => (
                <ProgramCard
                  key={index + 6}
                  program={program}
                  index={index + 6}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
