// AboutSection.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Trophy,
  ArrowRight,
  Calendar,
  Users,
  Award,
  Target,
  X,
} from "lucide-react";
import { RTLImage } from "@/utils/RTLImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function AboutSection() {
  const { t } = useTranslation();

  // Animation variants for statistics
  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  // Define stats with predefined colors to avoid processing errors
  const stats = [
    {
      value: "25+",
      label: t("about.stats.experience"),
      icon: Calendar,
      gradientClass: "from-blue-500 to-indigo-600",
      bgClass: "bg-blue-500/10",
    },
    {
      value: "10+",
      label: t("about.stats.services"),
      icon: Users,
      gradientClass: "from-emerald-500 to-teal-600",
      bgClass: "bg-emerald-500/10",
    },
    {
      value: "95%",
      label: t("about.stats.satisfaction", "Satisfaction Client"),
      icon: Award,
      gradientClass: "from-amber-500 to-orange-600",
      bgClass: "bg-amber-500/10",
    },
    {
      value: "250+",
      label: t("about.stats.students", "Étudiants Formés"),
      icon: Target,
      gradientClass: "from-purple-500 to-fuchsia-600",
      bgClass: "bg-purple-500/10",
    },
  ];

  const AwardItem = ({ index }: { index: number }) => (
    <li className="flex gap-3 items-start">
      <div className="bg-primary/10 p-2 rounded-full mt-0.5">
        <Award className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="text-foreground">
          {t(`about.distinctions.items.${index}`)}
        </p>
      </div>
    </li>
  );

  return (
    <section
      id="about"
      className="py-24 px-4 md:px-8 relative overflow-hidden bg-background"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] opacity-40" />
        <svg
          className="absolute right-0 top-1/4 text-muted-foreground/5 w-64 h-64"
          viewBox="0 0 200 200"
        >
          <path
            fill="currentColor"
            d="M40,120 C40,80 80,40 120,40 C160,40 160,80 160,120 C160,160 120,160 80,160 C40,160 40,120 40,120 Z"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <AnimatedSection
            animation="slide-in-right"
            delay={300}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main image with spotlight effect */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl 
                transform hover:scale-[1.02] transition-transform duration-500
                before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/20 before:to-background/0 before:z-10"
              >
                <div className="aspect-square md:aspect-[4/5] relative">
                  <RTLImage
                    src="/logo-pascal.png"
                    alt="Centre Pascal Info"
                    fill
                    className="object-cover z-0"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/30 rounded-full blur-xl z-0"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-500/20 rounded-full blur-lg z-0"></div>
              </div>

              {/* Floating achievement badge */}
              <div className="absolute top-6 -right-4 md:-right-10 z-20">
                <motion.div
                  className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-4 rounded-full shadow-lg"
                  initial={{ rotate: -5, y: 0 }}
                  animate={{ rotate: 5, y: -10 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2.5,
                  }}
                >
                  <Trophy className="h-6 w-6" />
                </motion.div>
              </div>

              {/* Experience highlight badge */}
              <div className="absolute -bottom-8 left-4 md:left-10 z-20">
                <motion.div
                  className="bg-white dark:bg-gray-800 px-6 py-3 rounded-xl shadow-xl 
                    border border-border/50 flex items-center gap-3"
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    25+ {t("about.years", "ans")}
                  </span>
                  <span className="h-6 w-px bg-border"></span>
                  <span className="text-muted-foreground">
                    {t("about.established", "d'expérience")}
                  </span>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Content Column */}
          <AnimatedSection
            animation="slide-in-left"
            className="order-1 lg:order-2"
          >
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Trophy className="w-4 h-4 mr-2" />
                  {t("about.tagline", "Centre de Formation d'Excellence")}
                </div>
                <SectionHeading title={t("about.title")} gradient="primary" />
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("about.description")}
              </p>

              {/* Stats Grid - Enhanced with icons and animations */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    className="p-5 rounded-xl bg-background border border-border/50 hover:border-primary/30 
                      hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={statVariants}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                        stat.bgClass
                      )}
                    />

                    <div className="flex items-start justify-between">
                      <div>
                        <h3
                          className={cn(
                            "text-3xl font-bold mb-1",
                            "bg-gradient-to-r bg-clip-text text-transparent",
                            stat.gradientClass
                          )}
                        >
                          {stat.value}
                        </h3>
                        <p className="text-muted-foreground">{stat.label}</p>
                      </div>
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          "bg-gradient-to-br",
                          stat.gradientClass,
                          "opacity-80"
                        )}
                      >
                        <stat.icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Dialog for "Learn More" */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="default"
                    className="rounded-full px-8 group hover:shadow-lg transition-all duration-300"
                  >
                    {t("about.learnMore")}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl p-0 overflow-hidden">
                  <VisuallyHidden>
                    <DialogTitle>{t("about.distinctions.title")}</DialogTitle>
                  </VisuallyHidden>

                  {/* Dialog header with gradient background */}
                  <div className="bg-gradient-to-r from-primary to-purple-600 p-6 text-white relative">
                    <DialogClose className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors">
                      <X className="h-5 w-5" />
                    </DialogClose>
                    <Trophy className="h-10 w-10 mb-3" />
                    <h3 className="text-2xl font-bold">
                      {t("about.distinctions.title")}
                    </h3>
                    <p className="text-white/80 mt-1">
                      {t(
                        "about.distinctions.subtitle",
                        "Nos réalisations et reconnaissances"
                      )}
                    </p>
                  </div>

                  {/* Dialog content */}
                  <div className="p-6">
                    <ul className="space-y-4">
                      <AwardItem index={0} />
                      <AwardItem index={1} />
                      <AwardItem index={2} />
                      <AwardItem index={3} />
                    </ul>

                    <div className="mt-8 flex justify-center">
                      <DialogClose asChild>
                        <Button variant="outline" className="rounded-full px-6">
                          {t("about.close", "Fermer")}
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
