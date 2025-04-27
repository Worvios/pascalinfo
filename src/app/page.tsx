"use client";

import React, { useState, useEffect, useCallback } from "react";
//import NewsletterSubscription from "@/components/NewsletterSubscription";
import HeroSection from "@/components/sections/HeroSection";
import VideoSection from "@/components/sections/VideoSection";
import AboutSection from "@/components/sections/AboutSection";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgramsSection from "@/components/sections/ProgramsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import ContactSection from "@/components/sections/ContactSection";
import { SEO } from "@/components/SEO";
import FloatingContactButton from "@/components/FloatingContactForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SchoolShowcase() {
  // Dark mode toggle and language state
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode with memoized callback
  const toggleDark = useCallback(() => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  }, []);

  // Set cursor style on mount
  useEffect(() => {
    document.body.style.cursor = "default";
    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <div className={`font-sans ${darkMode ? "dark" : ""}`}>
      <SEO />
      <div className="fixed bottom-4 right-4 z-50">
        {/*  <NewsletterSubscription />*/}
      </div>
      <Navbar darkMode={darkMode} toggleDark={toggleDark} />

      <HeroSection />
      <VideoSection />
      <AboutSection />
      <ProgramsSection />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <ContactSection />

      <FloatingContactButton />

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-20" />
      <ToastContainer />
      <Footer />
    </div>
  );
}
