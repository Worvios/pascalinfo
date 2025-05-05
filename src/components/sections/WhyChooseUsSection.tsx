// WhyChooseUsSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  GraduationCap,
  Microscope,
  HeartHandshake,
  Trophy,
  Users,
  BadgeCheck,
  Award,
  Lightbulb,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Define the feature item interface
interface FeatureItem {
  title: string;
  description: string;
}

// Feature icon mapping with more options
const featureIcons = {
  experts: GraduationCap,
  equipment: Microscope,
  support: HeartHandshake,
  results: Trophy,
  community: Users,
  certification: BadgeCheck,
  recognition: Award,
  innovation: Lightbulb,
};

// Feature background gradients
const featureGradients = [
  "from-blue-500/20 to-indigo-500/20",
  "from-emerald-500/20 to-teal-500/20",
  "from-amber-500/20 to-orange-500/20",
  "from-pink-500/20 to-purple-500/20",
];

// Feature accent colors for icons and highlights
const featureAccents = [
  "text-blue-600 dark:text-blue-400",
  "text-emerald-600 dark:text-emerald-400",
  "text-amber-600 dark:text-amber-400",
  "text-pink-600 dark:text-pink-400",
];

export default function WhyChooseUsSection() {
  const { t, i18n } = useTranslation(); // Get i18n instance
  const direction = i18n.dir(); // Get current direction ('ltr' or 'rtl')
  const isRtl = direction === "rtl"; // Boolean flag for RTL

  const [isMounted, setIsMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Animation variants for the feature cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to safely get translated items
  const getFeatures = (): FeatureItem[] => {
    try {
      // Ensure 'returnObjects' is handled correctly or default appropriately
      const features = t("whyChooseUs.items", { returnObjects: true, defaultValue: [] });

      if (Array.isArray(features)) {
        return features.map((item): FeatureItem => {
          if (typeof item === "object" && item !== null && 'title' in item && 'description' in item) {
            return {
              title: String(item.title),
              description: String(item.description),
            };
          }
          // Provide a fallback structure if item is not the expected object
          console.warn("Unexpected feature item format:", item);
          return { title: t('whyChooseUs.defaultTitle', 'Feature'), description: t('whyChooseUs.defaultDescription', 'Description missing.') };
        });
      }
      console.warn("Features translation did not return an array:", features);
      return []; // Return empty array if not an array
    } catch (error) {
      console.error("Error parsing features:", error);
      return []; // Return empty array on error
    }
  };

  // Keys for the feature icons - ensure they exist in the featureIcons object
  const iconKeys = ["experts", "equipment", "support", "results"];

  // Basic server-side render (or loading state)
  if (!isMounted) {
    // Keep this simple, no complex RTL logic needed here as it's temporary
    return (
      <section className="py-20 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("whyChooseUs.title", "Why Choose Us?")} {/* Add fallback */}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => ( // Use placeholder length
              <div key={index} className="bg-muted/10 border rounded-xl p-6 animate-pulse">
                <div className="mb-4 h-8 w-8 bg-primary/20 rounded-full"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6 mt-1"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const features = getFeatures();

  // Handle case where features might be empty after mount
   if (features.length === 0) {
     // Optional: Render a message or different loading state
     return (
        <section className="py-20 px-4 md:px-8 bg-background">
           <div className="max-w-7xl mx-auto text-center">
             <p>{t("whyChooseUs.loadingError", "Could not load features.")}</p>
           </div>
        </section>
     );
   }


  return (
    <section className="py-24 px-4 md:px-8 bg-muted/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] opacity-80" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] opacity-80" />

        {/* Decorative geometric shapes */}
        <div className="absolute top-12 right-12 w-24 h-24 border-4 border-primary/10 rounded-full" />
        <div className="absolute bottom-12 left-12 w-32 h-32 border-4 border-amber-500/10 rounded-2xl rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto">
        <AnimatedSection
          animation="fade-in"
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Trophy className={cn(
                "w-4 h-4",
                isRtl ? "ml-2" : "mr-2" // RTL: Adjust margin
             )} />
            {t("whyChooseUs.tagline", "Nos Avantages")}
          </div>

          <SectionHeading
            title={t("whyChooseUs.title")}
            subtitle={t(
              "whyChooseUs.subtitle",
              "Découvrez ce qui nous distingue"
            )}
            gradient="primary"
            className="mx-auto text-center"
          />

          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t(
              "whyChooseUs.description",
              "Nous croyons en l'excellence éducative et nous nous engageons à offrir un environnement d'apprentissage optimal pour nos étudiants."
            )}
          </p>
        </AnimatedSection>

        <motion.div
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          // Add dir attribute for correct text alignment within grid items if needed
          // dir={direction} // Usually inherited, but can be explicit
        >
          {features.map((item: FeatureItem, index: number) => {
            const IconComponent =
              featureIcons[
                iconKeys[index % iconKeys.length] as keyof typeof featureIcons
              ] || Lightbulb; // Fallback icon
            const gradientClass =
              featureGradients[index % featureGradients.length];
            const accentClass = featureAccents[index % featureAccents.length];

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={cn(
                  "relative group rounded-xl p-8 md:p-10 transition-all duration-300 overflow-hidden",
                  "border border-border/50 hover:border-primary/50",
                  "bg-background hover:shadow-xl",
                  "flex flex-col h-full",
                  "text-start" // Explicitly set text alignment for card content
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background gradient */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br",
                    gradientClass
                  )}
                />

                {/* Card content */}
                <div className="z-10 flex-1 flex flex-col">
                  {/* Icon container */}
                  <div
                    className={cn(
                      "mb-6 relative",
                      "w-14 h-14 flex items-center justify-center rounded-xl",
                      "bg-gradient-to-br",
                      gradientClass,
                      "bg-opacity-15"
                    )}
                  >
                    <IconComponent
                      className={cn(
                        "h-7 w-7",
                        accentClass,
                        hoveredIndex === index ? "animate-bounce-subtle" : ""
                        // Add flip here if needed for a specific icon:
                        // isRtl && IconComponent === SomeDirectionalIcon && "transform scale-x-[-1]"
                      )}
                    />
                    {/* Decorative dots - RTL adjusted */}
                    <div className={cn(
                        "absolute -top-1 w-2 h-2 rounded-full bg-primary/40",
                        isRtl ? "-left-1" : "-right-1"
                    )} />
                    <div className={cn(
                        "absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary/30",
                        isRtl ? "-right-1" : "-left-1"
                    )} />
                  </div>

                  {/* Content */}
                  <h3
                    className={cn(
                      "text-xl font-bold mb-3 group-hover:translate-x-1 transition-transform",
                      accentClass,
                      // RTL: Adjust hover translation
                      isRtl && "group-hover:-translate-x-1"
                    )}
                  >
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 flex-grow">
                    {item.description}
                  </p>

                  {/* Feature benefits list */}
                  <ul className="space-y-2 mb-6">
                    {[1, 2, 3].map((_, i) => (
                      <li
                        key={i}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <CheckCircle
                          className={cn(
                            "h-4 w-4 flex-shrink-0",
                            accentClass,
                            isRtl ? "ml-2" : "mr-2", // RTL: Adjust margin
                            isRtl && "transform scale-x-[-1]" // RTL: Flip checkmark
                          )}
                        />
                        <span>
                          {t(
                            `whyChooseUs.benefits.${index}.${i}`,
                            `Benefit ${i + 1} for ${item.title}` // Generic fallback
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn more link */}
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <Button
                      variant="ghost"
                      // Ensure button content aligns start in both LTR/RTL
                      className={cn(
                        "p-0 h-auto font-medium group/button flex items-center justify-start", // Use justify-start
                        accentClass
                      )}
                      // Add dir attribute if needed, though flex usually handles it
                      // dir={direction}
                    >
                      <span>{t("whyChooseUs.learnMore", "Learn More")}</span>
                      <ArrowRight className={cn(
                          "h-4 w-4",
                          isRtl ? "mr-1" : "ml-1", // RTL: Adjust margin
                          isRtl ? "rotate-180" : "", // RTL: Rotate arrow
                          isRtl ? "group-hover/button:-translate-x-1" : "group-hover/button:translate-x-1", // RTL: Adjust hover animation
                          "transition-transform"
                       )} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to action */}
        <AnimatedSection
          animation="fade-in"
          delay={400}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="rounded-full px-8 py-6 shadow-lg shadow-primary/10
              bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary
              transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
          >
            {t("whyChooseUs.ctaButton", "Schedule a Visit")}
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            {t(
              "whyChooseUs.ctaDescription",
              "See for yourself what makes Pascal Info renowned"
            )}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
