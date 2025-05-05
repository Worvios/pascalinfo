"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/utils/LanguageProvider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { QuoteIcon, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";

export default function TestimonialsSection() {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const [emblaRef, setEmblaRef] = useState<EmblaCarouselType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const isRtl = direction === "rtl";

  const testimonials = [
    {
      id: 1,
      avatar: `/avatar1.png`,
      name: "Mehdi Tazi",
      rating: 5,
      position: t("testimonials.position1", "Software Engineer"),
    },
    {
      id: 2,
      avatar: `/avatar2.png`,
      name: "Sarah Amrani",
      rating: 5,
      position: t("testimonials.position2", "UX Designer"),
    },
    {
      id: 3,
      avatar: `/avatar3.png`,
      name: "Youssef El Alami",
      rating: 4,
      position: t("testimonials.position3", "Data Scientist"),
    },
    {
      id: 4,
      avatar: `/avatar4.png`,
      name: "Leila Benali",
      rating: 5,
      position: t("testimonials.position4", "Product Manager"),
    },
    {
      id: 5,
      avatar: `/avatar5.png`,
      name: "Karim Idrissi",
      rating: 5,
      position: t("testimonials.position5", "Full Stack Developer"),
    },
  ];

  useEffect(() => {
    if (prevIndex === activeIndex) return;
    setPrevIndex(activeIndex);
  }, [activeIndex, prevIndex, testimonials.length]);

  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className={cn(
            "transition-all duration-500 ease-out",
            i < count ? "text-amber-400 scale-125" : "text-gray-200 scale-100"
          )}
          style={{
            animationDelay: `${i * 150}ms`,
            transitionTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
          }}
        >
          <Star className="w-5 h-5 fill-current drop-shadow-md" />
        </div>
      ));
  };

  const carouselOptions: EmblaOptionsType = {
    align: "center",
    loop: true,
    direction: isRtl ? "rtl" : "ltr",
    dragFree: false,
    containScroll: "trimSnaps",
  };

  const onCarouselApiReady = (emblaApi?: EmblaCarouselType) => {
    if (!emblaApi) return;
    setEmblaRef(emblaApi);
    emblaApi.on("select", () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    });
  };

  const getTransformStyle = (index: number) => {
    if (index === activeIndex) {
      return "translateZ(0) scale(1) translateY(0)";
    }

    const isNext = index === (activeIndex + 1) % testimonials.length;
    const isPrev =
      index === (activeIndex - 1 + testimonials.length) % testimonials.length;

    if (isNext || isPrev) {
      const translation = isNext
        ? isRtl
          ? "-20px"
          : "20px"
        : isRtl
        ? "20px"
        : "-20px";
      return `translateZ(-150px) scale(0.9) translateX(${translation}) translateY(10px)`;
    }

    return "translateZ(-300px) scale(0.8) translateY(20px)";
  };

  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.primary/10)_0%,transparent_70%)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,theme(colors.primary/5)_25%,transparent_25%,transparent_50%,theme(colors.primary/5)_50%,theme(colors.primary/5)_75%,transparent_75%,transparent)] bg-[size:4rem_4rem] opacity-20 animate-bg-slide" />
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 animate-gradient-text">
            {t("testimonials.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="perspective-[1400px]">
          <Carousel
            className="w-full"
            opts={carouselOptions}
            setApi={onCarouselApiReady}
            dir={direction}
          >
            <CarouselContent className="-ms-3 md:-ms-5">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={testimonial.id}
                  className={cn(
                    "ps-3 md:ps-5 md:basis-1/3 transition-all duration-700 ease-in-out",
                    "transform-gpu will-change-transform",
                    index === activeIndex ? "z-30" : "z-10"
                  )}
                  style={{
                    transform: getTransformStyle(index),
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div className="h-full p-2">
                    <div
                      className={cn(
                        "bg-background/90 backdrop-blur-lg border border-primary/10 rounded-3xl p-8 h-full",
                        "shadow-2xl hover:shadow-3xl transition-all duration-500 ease-out",
                        "flex flex-col justify-between relative overflow-hidden",
                        index === activeIndex
                          ? "opacity-100 scale-100"
                          : "opacity-60 scale-95",
                        "text-start ring-1 ring-primary/20"
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-30" />
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 to-transparent" />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <Avatar className="h-16 w-16 ring-2 ring-primary/60 ring-offset-2 ring-offset-background shadow-lg transition-all duration-500 hover:scale-110 hover:ring-primary/80">
                            <AvatarImage
                              src={testimonial.avatar}
                              alt={testimonial.name}
                            />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {testimonial.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <QuoteIcon
                            className={cn(
                              "h-10 w-10 text-primary/20 animate-pulse-slow",
                              isRtl && "transform scale-x-[-1]" // Flip in RTL
                            )}
                          />
                        </div>

                        <div className="flex gap-1.5 mb-6" dir="ltr">
                          {renderStars(testimonial.rating)}
                        </div>

                        <p className="text-lg italic mb-6 leading-relaxed relative text-foreground/90 font-medium">
                          <span className="text-primary/60 text-3xl absolute -left-3 -top-3">
                            {isRtl ? "”" : "“"} {/* Adjust quote direction */}
                          </span>
                          {t("testimonials.quote")}
                          <span className="text-primary/60 text-3xl absolute -bottom-6 right-0">
                            {isRtl ? "“" : "”"} {/* Adjust quote direction */}
                          </span>
                        </p>
                      </div>

                      <div className="pt-4 border-t border-primary/10 flex flex-col relative z-10">
                        <p className="font-bold text-xl text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-muted-foreground flex items-center gap-2 text-sm">
                          <span className="inline-block h-2 w-2 rounded-full bg-primary/60"></span>
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center mt-10 gap-4">
              <CarouselPrevious
                className={cn(
                  "static w-12 h-12 rounded-full flex items-center justify-center",
                  "bg-gradient-to-r from-primary/10 to-primary/20 backdrop-blur-lg border border-primary/20",
                  "shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-primary/30",
                  isRtl ? "rotate-180" : ""
                )}
                style={{ transformOrigin: "center" }}
              />
              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "transition-all duration-500 ease-out",
                      activeIndex === index
                        ? "bg-primary w-10 h-2.5 rounded-full shadow-md"
                        : "bg-primary/20 w-2.5 h-2.5 rounded-full hover:bg-primary/50"
                    )}
                    onClick={() => emblaRef?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <CarouselNext
                className={cn(
                  "static w-12 h-12 rounded-full flex items-center justify-center",
                  "bg-gradient-to-r from-primary/10 to-primary/20 backdrop-blur-lg border border-primary/20",
                  "shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-primary/30",
                  isRtl ? "rotate-180" : ""
                )}
                style={{ transformOrigin: "center" }}
              />
            </div>
          </Carousel>
        </div>
      </div>

      <style jsx global>{`
        .perspective-[1400px] {
          perspective: 1400px;
          overflow: hidden;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes bg-slide {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 4rem 4rem;
          }
        }

        @keyframes gradient-text {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-bg-slide {
          animation: bg-slide 20s linear infinite;
        }

        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-text 10s ease infinite;
        }

        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .will-change-transform {
          will-change: transform, opacity, scale;
        }
      `}</style>
    </section>
  );
}
