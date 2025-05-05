// app/pages/programs/[id]-[slug]/page.tsx
"use client"; // This component needs to be a Client Component due to hooks like useTranslation and useParams

import React from "react";
import { useTranslation } from "react-i18next";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
// --- Assuming slugify is still needed if you construct links elsewhere, but not for finding the program here ---
// import { slugify } from "@/utils/slugify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO"; // Ensure this path is correct
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle,
  ListChecks,
  Users,
  Target,
  BookMarked,
  GraduationCap,
  Briefcase,
  BarChart3,
  Presentation,
  Languages,
  BarChartHorizontal,
  LucideIcon,
  HelpCircle,
  Award,
  BookText,
  School,
  Projector,
  CheckSquare,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Ensure cn is imported if used for styling within DetailSection/List

// --- Interface reflecting the detailed JSON structure with ID ---
interface ProgramData {
  id: number; // Unique, language-independent identifier
  title: string;
  description: string;
  targetAudience?: string;
  prerequisites?: string[];
  learningObjectives?: string[];
  curriculumHighlights?: string[];
  teachingMethods?: string;
  assessmentMethods?: string;
  careerProspects?: string[];
  furtherStudies?: string;
  certification?: string;
  duration?: string;
  languagesOffered?: string[];
  levels?: string;
  subjectsOffered?: string[];
  areasOffered?: string[];
  documentTypes?: string[];
  servicesOffered?: string[];
  destinations?: string[];
  features?: string[];
  useCases?: string[];
  capacity?: string;
}

// --- Helper Component for Rendering Detail Sections ---
const DetailSection = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}) => {
  // Filter out null/undefined children, e.g., if DetailList returns null
  const content = React.Children.toArray(children).filter(Boolean);
  if (content.length === 0) {
    return null;
  }
  return (
    <div className="pt-4 border-t border-border/10 first:border-t-0 first:pt-0">
      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-primary">
        {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
        {title}
      </h3>
      {/* Ensure content renders correctly, especially if it's just text */}
      <div className="text-muted-foreground leading-relaxed space-y-2 pl-7">
        {content}
      </div>
    </div>
  );
};

// --- Helper Component for Rendering Lists ---
const DetailList = ({ items }: { items?: string[] }) => {
  if (!items || items.length === 0) {
    return null; // Return null if no items to render
  }
  return (
    <ul className="list-disc space-y-1 ml-4">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

// --- Main Page Component ---
export default function ProgramPage() {
  const { t } = useTranslation();
  // Get both 'id' and 'slug' from the URL parameters
  const params = useParams<{ id: string; slug: string }>();
  // Parse the ID to a number for lookup
  const id = params?.id ? parseInt(params.id, 10) : null;

  // Fetch all program data based on the current language
  const programsData: ProgramData[] = React.useMemo(() => {
    try {
      // Ensure your translation files return an array for "programs.items"
      const items = t("programs.items", { returnObjects: true });
      // Add type checking to ensure it's an array and has the required 'id' field
      return Array.isArray(items)
        ? items.filter((item): item is ProgramData => typeof item === 'object' && item !== null && typeof item.id === 'number')
        : [];
    } catch (error) {
      console.error("Error fetching or parsing program translations:", error);
      return [];
    }
  }, [t]);

  // Find the specific program using the language-independent ID
  const program = React.useMemo(() => {
    if (!id || isNaN(id)) return undefined; // Ensure id is a valid number
    return programsData.find((p) => p.id === id);
  }, [programsData, id]);

  // If ID is invalid or program not found for that ID, show 404
  if (!id || !program) {
    notFound();
  }

  // Check if there is any detailed information to display
  const hasDetailedInfo =
    program.targetAudience ||
    program.prerequisites?.length ||
    program.learningObjectives?.length ||
    program.curriculumHighlights?.length ||
    program.teachingMethods ||
    program.assessmentMethods ||
    program.careerProspects?.length ||
    program.furtherStudies ||
    program.certification ||
    program.duration ||
    program.languagesOffered?.length ||
    program.levels ||
    program.subjectsOffered?.length ||
    program.areasOffered?.length ||
    program.documentTypes?.length ||
    program.servicesOffered?.length ||
    program.destinations?.length ||
    program.features?.length ||
    program.useCases?.length ||
    program.capacity;

  // Mapping for rendering detail sections dynamically
  const detailSectionsMap = [
    { key: "targetAudience", icon: Users, translationKey: "targetAudience" },
    { key: "prerequisites", icon: BookMarked, translationKey: "prerequisites", isList: true },
    { key: "learningObjectives", icon: Target, translationKey: "learningObjectives", isList: true },
    { key: "curriculumHighlights", icon: ListChecks, translationKey: "curriculumHighlights", isList: true },
    { key: "subjectsOffered", icon: HelpCircle, translationKey: "subjectsOffered", isList: true }, // Assuming these are also in ProgramData interface
    { key: "areasOffered", icon: Award, translationKey: "areasOffered", isList: true },           // Assuming these are also in ProgramData interface
    { key: "teachingMethods", icon: Presentation, translationKey: "teachingMethods" },
    { key: "assessmentMethods", icon: BarChart3, translationKey: "assessmentMethods" },
    { key: "careerProspects", icon: Briefcase, translationKey: "careerProspects", isList: true },
    { key: "furtherStudies", icon: GraduationCap, translationKey: "furtherStudies" },
    { key: "duration", icon: CalendarDays, translationKey: "duration" },
    { key: "certification", icon: CheckCircle, translationKey: "certification" },
    { key: "languagesOffered", icon: Languages, translationKey: "languagesOffered", isList: true },
    { key: "levels", icon: BarChartHorizontal, translationKey: "levels" },
    { key: "documentTypes", icon: BookText, translationKey: "documentTypes", isList: true },     // Assuming these are also in ProgramData interface
    { key: "servicesOffered", icon: School, translationKey: "servicesOffered", isList: true },     // Assuming these are also in ProgramData interface
    { key: "destinations", icon: Globe, translationKey: "destinations", isList: true },         // Assuming these are also in ProgramData interface
    { key: "features", icon: Projector, translationKey: "features", isList: true },           // Assuming these are also in ProgramData interface
    { key: "useCases", icon: CheckSquare, translationKey: "useCases", isList: true },           // Assuming these are also in ProgramData interface
    { key: "capacity", icon: Users, translationKey: "capacity" },                               // Assuming this is also in ProgramData interface
  ];

  return (
    <div className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-background via-background to-muted/10 relative">
      {/* SEO Component using the found program's details */}
      <SEO title={`${program.title} - Pascal Info`} description={program.description} />

      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:underline">
            {t("navigation.home")}
          </Link>
          <span className="mx-2">&gt;</span>
          {/* Link to the main programs list page */}
          <Link href="/pages/programs" className="hover:underline">
            {t("navigation.programs")}
          </Link>
          <span className="mx-2">&gt;</span>
          {/* Display the current program's title (updates with language) */}
          <span>{program.title}</span>
        </div>

        {/* Program Header Section */}
        <div className="mb-10 md:mb-16 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {program.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {program.description}
          </p>
        </div>

        {/* Program Details Section */}
        <Card className="mb-10 md:mb-12 shadow-lg border-border/20 overflow-hidden">
          <CardHeader className="bg-muted/30">
            <CardTitle className="text-2xl md:text-3xl font-semibold text-foreground">
              {t("programs.details.title", "Informations Clés du Programme")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-6">
            {hasDetailedInfo ? (
              <>
                {detailSectionsMap.map((section) => {
                  // Get the data for the current section from the program object
                  const data = program[section.key as keyof ProgramData];

                  // Skip rendering if data is missing or if it's an empty array for list types
                  if (!data || (section.isList && Array.isArray(data) && data.length === 0)) {
                    return null;
                  }

                  return (
                    <DetailSection
                      key={section.key}
                      // Get translated title for the section
                      title={t(`programs.details.${section.translationKey}`, section.translationKey.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()))}
                      icon={section.icon}
                    >
                      {/* Render as a list or paragraph based on the flag */}
                      {section.isList ? <DetailList items={data as string[]} /> : <p>{data as string}</p>}
                    </DetailSection>
                  );
                })}
              </>
            ) : (
              // Fallback message if no detailed info is available
              <p className="text-muted-foreground italic text-center py-4">
                {t("programs.details.comingSoon", "Informations détaillées pour ce programme seront bientôt disponibles.")}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Call to Action Section with Back Link */}
        <div className="text-center space-y-4">
          <Link href="/pages/contact" passHref>
            <Button
              size="lg"
              className="rounded-full gap-2 group shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <BookOpen className="h-5 w-5" />
              {t("contact.cta.button", "Planifier une Visite")}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
          <div>
            {/* Link back to the main programs list page */}
            <Link href="/pages/programs" className="text-primary hover:underline">
              {t("programs.backToPrograms", "Retour aux Programmes")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
