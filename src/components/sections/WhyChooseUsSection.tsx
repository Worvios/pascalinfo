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
  const { t } = useTranslation();
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
  const getFeatures = () => {
    const features = t("whyChooseUs.items", { returnObjects: true });
    return Array.isArray(features) ? features : [];
  };

  // Keys for the feature icons - ensure they exist in the featureIcons object
  const iconKeys = ["experts", "equipment", "support", "results"];

  // Simple server-side render
  if (!isMounted) {
    return (
      <section className="py-20 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("whyChooseUs.title")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getFeatures().map((item: any, index: number) => (
              <div key={index} className="bg-muted/10 border rounded-xl p-6">
                <div className="mb-4 h-8 w-8 bg-primary/20 rounded-full"></div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const features = getFeatures();

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
            <Trophy className="w-4 h-4 mr-2" />
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
        >
          {features.map((item: any, index: number) => {
            const IconComponent =
              featureIcons[
                iconKeys[index % iconKeys.length] as keyof typeof featureIcons
              ];
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
                  "flex flex-col h-full"
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background gradient that shows on hover */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br",
                    gradientClass
                  )}
                />

                {/* Card content */}
                <div className="z-10 flex-1 flex flex-col">
                  {/* Icon container with animation */}
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
                      )}
                    />

                    {/* Decorative dots */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary/40" />
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-primary/30" />
                  </div>

                  {/* Content */}
                  <h3
                    className={cn(
                      "text-xl font-bold mb-3 group-hover:translate-x-1 transition-transform",
                      accentClass
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
                            "h-4 w-4 mr-2 flex-shrink-0",
                            accentClass
                          )}
                        />
                        <span>
                          {t(
                            `whyChooseUs.benefits.${index}.${i}`,
                            `Avantage ${i + 1} de ${item.title}`
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn more link */}
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <Button
                      variant="ghost"
                      className={cn(
                        "p-0 h-auto font-medium group/button",
                        accentClass
                      )}
                    >
                      {t("whyChooseUs.learnMore", "En savoir plus")}
                      <ArrowRight className="h-4 w-4 ml-1 group-hover/button:translate-x-1 transition-transform" />
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
            {t("whyChooseUs.ctaButton", "Planifier une Visite")}
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            {t(
              "whyChooseUs.ctaDescription",
              "Découvrez par vous-même ce qui fait la réputation de Pascal Info"
            )}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
