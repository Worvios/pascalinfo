"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/utils/LanguageProvider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Code,
  Briefcase,
  HelpCircle,
  Languages,
  Award,
  BookText,
  School,
  Projector,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import use3DCardEffect from "../hooks/use3DCardEffect"; // Ensure this path is correct
import { cn } from "@/lib/utils"; // Ensure this path is correct
import { slugify } from "@/utils/slugify"; // Ensure this path is correct

// --- Local Interfaces (Updated) ---
interface TranslatedProgram {
  id: number; // Added ID
  title: string;
  description: string;
}

interface TranslationItem {
  id?: number; // Ensured ID is optional here for type safety during mapping
  title?: string;
  description?: string;
  [key: string]: unknown;
}

interface Program { // For the 3D hook
  id: number; // Added ID
  icon: LucideIcon;
  title: string;
  text: string;
  rotateX: number;
  rotateY: number;
  url: string; // This will be the new [id]-[slug] format
  originalIndex: number;
}

// --- Card Colors ---
const cardColors = [
  "from-blue-500 to-indigo-600",
  "from-green-500 to-emerald-600",
  "from-amber-500 to-orange-600",
  "from-purple-500 to-fuchsia-600",
  "from-sky-500 to-cyan-600",
  "from-rose-500 to-pink-600",
  "from-lime-500 to-green-600",
  "from-violet-500 to-purple-600",
];

// --- Component Props ---
interface ProgramsSectionProps {
  isPreview?: boolean;
  maxPreviewItems?: number;
}

export default function ProgramsSection({
  isPreview = false,
  maxPreviewItems = 3,
}: ProgramsSectionProps) {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // --- Data Fetching (Updated to include ID) ---
  const getTranslatedPrograms = useCallback((): TranslatedProgram[] => {
    try {
      const items = t("programs.items", { returnObjects: true }) as unknown;
      if (Array.isArray(items)) {
        return items
          .map((item): TranslatedProgram | null => {
            if (
              typeof item === "object" &&
              item !== null &&
              typeof (item as TranslationItem).id === "number" && // Check for ID
              typeof (item as TranslationItem).title === "string" &&
              typeof (item as TranslationItem).description === "string"
            ) {
              const typedItem = item as Required<TranslationItem>;
              return {
                id: typedItem.id, // Assign ID
                title: typedItem.title,
                description: typedItem.description,
              };
            }
            console.warn("Skipping invalid program item (missing id, title, or description):", item);
            return null;
          })
          .filter((p): p is TranslatedProgram => p !== null && p.title !== "");
      }
      console.warn("programs.items translation is not an array or is missing.");
      return [];
    } catch (error) {
      console.error("Error parsing programs:", error);
      return [];
    }
  }, [t]);

  const allProgramsData = useMemo(
    () => getTranslatedPrograms(),
    [getTranslatedPrograms]
  );

  const programsToDisplay = useMemo(() => {
    return isPreview
      ? allProgramsData.slice(0, maxPreviewItems)
      : allProgramsData;
  }, [isPreview, allProgramsData, maxPreviewItems]);

  // --- Icons ---
  const programIcons = useMemo(
    () =>
      [
        Code,
        Briefcase,
        HelpCircle,
        Languages,
        Award,
        BookText,
        School,
        Projector,
      ] as LucideIcon[],
    []
  );

  // --- Prepare data for the 3D Effect Hook (Updated URL structure) ---
  const initialProgramsForHook = useMemo(
    (): Program[] =>
      programsToDisplay.map((programData, displayIndex) => {
        // Find the original index in the *full* list to maintain consistent icon/color
        // Match by ID for robustness, as titles might not be unique across languages (if not careful)
        const originalIndex = allProgramsData.findIndex(
          (p) => p.id === programData.id
        );
        const indexToUse = originalIndex !== -1 ? originalIndex : displayIndex;

        return {
          id: programData.id, // Pass ID
          icon: programIcons[indexToUse % programIcons.length],
          title: programData.title,
          text: programData.description,
          rotateX: 0,
          rotateY: 0,
          // --- CONSTRUCT THE NEW URL FORMAT ---
          url: `/pages/programs/${programData.id}-${slugify(programData.title)}`,
          originalIndex: indexToUse,
        };
      }),
    [programsToDisplay, allProgramsData, programIcons] // slugify is a stable import, so not strictly needed in deps unless defined locally
  );

  // --- Use the 3D Card Effect Hook ---
  const {
    programs: programsState,
    handleCardMove,
    handleCardLeave,
  } = use3DCardEffect(initialProgramsForHook);

  const typedProgramsState = programsState as Program[];

  // --- Reusable ProgramCard Component (Updated Link href) ---
  const ProgramCard = ({
    programData,
    programStateFromHook,
    cardIndex,
  }: {
    programData: TranslatedProgram; // Now has .id
    programStateFromHook: Program | undefined; // Now has .id and updated .url
    cardIndex: number;
  }) => {
    const currentProgramState = programStateFromHook;
    const originalIndex = currentProgramState?.originalIndex ?? cardIndex;
    const urlToUse = currentProgramState?.url; // This URL should be in [id]-[slug] format

    // DEBUG LOG: Check the URL being passed to the Link component
    if (typeof window !== 'undefined') { // Only log in browser
        console.log(`[ProgramCard] Rendering Link for program ID ${programData.id} ("${programData.title}"). URL: ${urlToUse}`);
    }
    if (!urlToUse && typeof window !== 'undefined') {
        console.error(`[ProgramCard] URL is undefined for program ID ${programData.id} ("${programData.title}"). Fallbacking to '#'. Check data fetching and initialProgramsForHook.`);
    }


    return (
      <div
        className="relative bg-card border border-border/30 hover:border-primary/30 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col"
        onMouseMove={(e) => handleCardMove(e, cardIndex)}
        onMouseLeave={() => handleCardLeave(cardIndex)}
        style={{
          transform: `perspective(1000px) rotateX(${
            currentProgramState?.rotateX ?? 0
          }deg) rotateY(${currentProgramState?.rotateY ?? 0}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-600/10 opacity-0 hover:opacity-10 transition-opacity duration-300 -z-10" />

        <div className="flex-grow">
          <div className="flex items-center mb-4">
            <div
              className={cn(
                "w-12 h-12 md:w-14 md:h-14 mr-4 flex-shrink-0",
                "flex items-center justify-center rounded-lg",
                "bg-gradient-to-br",
                cardColors[originalIndex % cardColors.length],
                "transform transition-transform duration-300 shadow-md"
              )}
            >
              {currentProgramState?.icon &&
                React.createElement(currentProgramState.icon, {
                  className: "h-6 w-6 md:h-7 md:h-7 text-white",
                })}
            </div>
            <h3
              className={cn(
                "font-semibold text-lg md:text-xl",
                "bg-gradient-to-r bg-clip-text text-transparent",
                cardColors[originalIndex % cardColors.length]
              )}
            >
              {programData.title}
            </h3>
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
            {programData.description}
          </p>
        </div>

        <div className="mt-auto pt-4">
          {/* Use the URL from programStateFromHook, with a fallback for safety */}
          <Link href={urlToUse || "#"} passHref>
            <Button
              variant="outline"
              size={isMounted && isMobile ? "sm" : "default"}
              className="w-full gap-2 group/button"
            >
              <BookOpen className="h-4 w-4" />
              {t("programs.learnMore")}
              <ArrowRight
                className={cn(
                  "h-4 w-4",
                  direction === "rtl" ? "mr-2" : "ml-2",
                  direction === "rtl" && "rotate-180",
                  direction === "rtl" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1",
                  "transition-transform duration-300"
                )}
              />
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  // --- JSX Rendering ---
  return (
    <section
      id="programs"
      className="py-16 md:py-20 px-4 md:px-8 bg-background relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {t("programs.title")}
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("programs.subtitle")}
          </p>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {programsToDisplay.map((programData, index) => {
            const stateFromHook = typedProgramsState[index];
            return (
              <ProgramCard
                // Use program ID and index for a more robust key if titles aren't guaranteed unique
                key={`${programData.id}-${index}`}
                programData={programData}
                programStateFromHook={stateFromHook}
                cardIndex={index}
              />
            );
          })}
        </div>

        {/* "View All" Button */}
        {isPreview && allProgramsData.length > maxPreviewItems && (
          <div className="mt-12 text-center">
            {/* This link should go to a page listing all programs, e.g., app/pages/programs/page.tsx */}
            <Link href="/pages/programs" passHref>
              <Button
                variant="default"
                size="lg"
                className="rounded-full group"
              >
                {t("programs.viewAll", "Voir tous les programmes")}
                <ChevronRight className={cn(
                  "h-5 w-5", // Adjusted size slightly for consistency
                  direction === "rtl" ? "mr-2" : "ml-2",
                  direction === "rtl" && "rotate-180",
                  direction === "rtl" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1",
                  "transition-transform duration-300"
                )} />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
