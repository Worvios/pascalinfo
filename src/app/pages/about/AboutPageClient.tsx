"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { Trophy, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import SvgDivider from "@/components/SvgDivider";

export default function AboutPageClient() {
  const { t } = useTranslation();

  // Define statistics similar to AboutSection.tsx
  const stats = [
    {
      value: "25+",
      label: t("about.stats.experience"),
      icon: Trophy,
      gradientClass: "from-blue-500 to-indigo-600",
      bgClass: "bg-blue-500/10",
    },
    {
      value: "10+",
      label: t("about.stats.services"),
      icon: Trophy,
      gradientClass: "from-emerald-500 to-teal-600",
      bgClass: "bg-emerald-500/10",
    },
    {
      value: "95%",
      label: t("about.stats.satisfaction", "Satisfaction Client"),
      icon: Trophy,
      gradientClass: "from-amber-500 to-orange-600",
      bgClass: "bg-amber-500/10",
    },
    {
      value: "250+",
      label: t("about.stats.students", "Étudiants Formés"),
      icon: Trophy,
      gradientClass: "from-purple-500 to-fuchsia-600",
      bgClass: "bg-purple-500/10",
    },
  ];

  // Define AwardItem component for distinctions
  const AwardItem: React.FC<{ index: number }> = ({ index }) => (
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
    <div className="relative min-h-screen bg-gradient-to-b from-amber-100 via-background/80 to-background/90 py-0 px-2 overflow-x-hidden">
      {/* Hero/Intro Section */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-24 pb-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground">
            {t("about.pageTitle", "About Centre Pascal Info")}
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            {t("about.pageSubtitle", "Our story and mission")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("about.description")}
            </p>
          </div>
          <Image
            src="/logo-pascal.png"
            alt="Centre Pascal Info"
            className="rounded-2xl shadow-2xl w-full h-auto"
            width={500}
            height={500}
          />
        </div>
      </div>
      <SvgDivider direction="down" color="#f59e42" />
      {/* Main Content Card */}
      <main className="relative z-10 max-w-4xl mx-auto mb-16 p-6 md:p-10 bg-white/90 dark:bg-zinc-900/90 rounded-2xl shadow-2xl border border-primary/10">
        {/* Statistics */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            {t("about.achievements", "Our Achievements")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-background border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
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
              </div>
            ))}
          </div>
        </div>
        {/* Distinctions */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            {t("about.distinctions.title", "Our Distinctions")}
          </h2>
          <ul className="space-y-6 max-w-2xl mx-auto">
            <AwardItem index={0} />
            <AwardItem index={1} />
            <AwardItem index={2} />
            <AwardItem index={3} />
          </ul>
        </div>
      </main>
    </div>
  );
}
