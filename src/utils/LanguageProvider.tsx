"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import i18n from "@/utils/i18n";

type Direction = "ltr" | "rtl";

interface LanguageContextType {
  language: string;
  direction: Direction;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguageState] = useState(i18n.language || "fr");
  const [direction, setDirection] = useState<Direction>("ltr");

  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang.toLowerCase());
    setLanguageState(lang);
  };

  useEffect(() => {
    // Set direction based on language
    setDirection(language.toLowerCase() === "ar" ? "rtl" : "ltr");

    // Update HTML dir attribute
    document.documentElement.dir =
      language.toLowerCase() === "ar" ? "rtl" : "ltr";

    // You could also add a class to the body for additional styling
    if (language.toLowerCase() === "ar") {
      document.body.classList.add("rtl-active");
    } else {
      document.body.classList.remove("rtl-active");
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
