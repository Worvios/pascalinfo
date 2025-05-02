// components/AppLayout.tsx
"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactButton from "@/components/FloatingContactForm";

import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = useCallback(() => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  }, []);

  return (
    <div className={`font-sans ${darkMode ? "dark" : ""}`}>
      <Navbar darkMode={darkMode} toggleDark={toggleDark} />
      {children}
      <FloatingContactButton />
      <Footer />
    </div>
  );
}
