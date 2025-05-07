// components/HeroSection.tsx

"use client";
import React, { useMemo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
// Remove this import: import { RTLImage } from "@/utils/RTLImage";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/utils/LanguageProvider";
import Image from "next/image";

export default function HeroSection() {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const carouselRef = useRef(null);
  const autoplayPluginRef = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  // Memoized static media items
  const mediaItems = useMemo(
    () => [
      { type: "image", src: "/pic1.jpg" },
      { type: "image", src: "/pic2.jpg" },
      { type: "image", src: "/pic3.jpg" },
    ],
    []
  );

  // Handle direction change
  useEffect(() => {
    // Force re-render of carousel when direction changes
    const timer = setTimeout(() => {
      if (carouselRef.current) {
        // This forces the carousel to update its internal state
        window.dispatchEvent(new Event("resize"));
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [direction]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <Carousel
        plugins={[autoplayPluginRef.current]}
        className="h-full w-full"
        opts={{
          loop: true,
          direction: direction === "rtl" ? "rtl" : "ltr",
        }}
        ref={carouselRef}
      >
        <CarouselContent className="h-full">
          {mediaItems.map((item, index) => (
            <CarouselItem key={index} className="relative h-screen">
              <div className="absolute inset-0">
                {/* Use standard Image tag instead of RTLImage for carousel items */}
                <Image
                  src={item.src}
                  alt={t("hero.title")}
                  fill
                  className="object-cover brightness-75"
                  priority={index === 0}
                  unoptimized={direction === "rtl"}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className="max-w-4xl px-4 space-y-6">
                  <AnimatedSection animation="fade-up" delay={300}>
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-xl">
                      {t("hero.title")}
                    </h1>
                  </AnimatedSection>

                  <AnimatedSection animation="fade-up" delay={500}>
                    <p className="text-lg md:text-xl text-muted-foreground font-light text-white/90">
                      {t("hero.subtitle")}
                    </p>
                  </AnimatedSection>

                  <AnimatedSection animation="fade-up" delay={700}>
                    <Button
                      size="lg"
                      className="rounded-full px-8 py-6 text-lg"
                      onClick={() => {
                        const target = document.getElementById("programs");
                        if (target) {
                          target.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      {t("hero.cta")}
                    </Button>
                  </AnimatedSection>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
