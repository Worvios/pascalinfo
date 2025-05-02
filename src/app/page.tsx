// app/page.tsx
"use client";

import React, { useEffect } from "react";
import HeroSection from "@/components/sections/HeroSection";
import VideoSection from "@/components/sections/VideoSection";
import AboutSection from "@/components/sections/AboutSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import ContactSection from "@/components/sections/ContactSection";
import { SEO } from "@/components/SEO";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SchoolShowcase() {
  useEffect(() => {
    document.body.style.cursor = "default";
    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <>
      <SEO />
      <div className="fixed bottom-4 right-4 z-50">
        {/* <NewsletterSubscription /> */}
      </div>
      <HeroSection />
      <VideoSection />
      <AboutSection />
      <ProgramsSection />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <ContactSection />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-20" />
      <ToastContainer />
    </>
  );
}
