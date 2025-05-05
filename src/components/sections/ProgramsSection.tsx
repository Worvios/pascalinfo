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
import use3DCardEffect from "../hooks/use3DCardEffect";
import { cn } from "@/lib/utils";
import { slugify } from "@/utils/slugify";

// --- Local Interfaces ---
interface TranslatedProgram {
  title: string;
  description: string;
}

interface TranslationItem {
  title?: string;
  description?: string;
  [key: string]: unknown;
}

interface Program {
  icon: LucideIcon;
  title: string;
  text: string;
  rotateX: number;
  rotateY: number;
  url: string;
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

  // --- Data Fetching ---
  const getTranslatedPrograms = useCallback((): TranslatedProgram[] => {
    try {
      const items = t("programs.items", { returnObjects: true }) as unknown;
      if (Array.isArray(items)) {
        return items
          .map((item) => {
            if (typeof item === "object" && item !== null) {
              const typedItem = item as TranslationItem;
              return {
                title:
                  typeof typedItem.title === "string" ? typedItem.title : "",
                description:
                  typeof typedItem.description === "string"
                    ? typedItem.description
                    : "",
              };
            }
            return { title: String(item), description: "" };
          })
          .filter((p) => p.title);
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

  // --- Prepare data for the 3D Effect Hook ---
  const initialProgramsForHook = useMemo(
    (): Program[] =>
      programsToDisplay.map((programData, displayIndex) => {
        const originalIndex = allProgramsData.findIndex(
          (p) => p.title === programData.title
        );
        const indexToUse = originalIndex !== -1 ? originalIndex : displayIndex;

        return {
          icon: programIcons[indexToUse % programIcons.length],
          title: programData.title,
          text: programData.description,
          rotateX: 0,
          rotateY: 0,
          url: `/pages/programs/${slugify(programData.title)}`,
          originalIndex: indexToUse,
        };
      }),
    [programsToDisplay, allProgramsData, programIcons]
  );

  // --- Use the 3D Card Effect Hook ---
  const {
    programs: programsState,
    handleCardMove,
    handleCardLeave,
  } = use3DCardEffect(initialProgramsForHook);

  const typedProgramsState = programsState as Program[];

  // --- Reusable ProgramCard Component ---
  const ProgramCard = ({
    programData,
    programStateFromHook,
    cardIndex,
  }: {
    programData: TranslatedProgram;
    programStateFromHook: Program | undefined;
    cardIndex: number;
  }) => {
    const currentProgramState = programStateFromHook;
    const originalIndex = currentProgramState?.originalIndex ?? cardIndex;

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
          <Link href={currentProgramState?.url || "#"} passHref>
            <Button
              variant="outline"
              size={isMounted && isMobile ? "sm" : "default"}
              className="w-full gap-2 group/button"
            >
              <BookOpen className="h-4 w-4" />
              {t("programs.learnMore")}
              <ArrowRight
        className={cn(
          "h-4 w-4", // Size
          // Margin: ml-2 in LTR, mr-2 in RTL
          direction === "rtl" ? "mr-2" : "ml-2",
          // Rotation: 180deg in RTL
          direction === "rtl" && "rotate-180",
          // Hover Translate: +x in LTR, -x in RTL
          direction === "rtl" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1",
          // Transition
          "transition-transform duration-300"
        )}
      />
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section
      id="programs"
      className="py-16 md:py-20 px-4 md:px-8 bg-background relative overflow-hidden"
    >
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {programsToDisplay.map((programData, index) => {
            return (
              <ProgramCard
                key={`${programData.title}-${index}`}
                programData={programData}
                programStateFromHook={typedProgramsState[index]}
                cardIndex={index}
              />
            );
          })}
        </div>

        {isPreview && allProgramsData.length > maxPreviewItems && (
          <div className="mt-12 text-center">
            <Link href="/pages/programs" passHref>
              <Button
                variant="default"
                size="lg"
                className="rounded-full group"
              >
                {t("programs.viewAll", "Voir tous les programmes")}
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
