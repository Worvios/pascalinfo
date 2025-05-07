// app/pages/programs/page.tsx
"use client";

import React from "react";
import ProgramsSection from "@/components/sections/ProgramsSection";
import { SEO } from "@/components/SEO";
import { useTranslation } from "react-i18next";

export default function ProgramsPage() {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={t("programs.pageTitle", "Tous Nos Programmes - Pascal Info")}
      />
      {/* Render ProgramsSection without isPreview prop to show all */}
      <ProgramsSection />
    </>
  );
}
