"use client";

import React from "react";
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

export default function TestimonialsSection() {
  const { t } = useTranslation();
  const { direction } = useLanguage();

  // Testimonial data - could be expanded with real data
  const testimonials = [1, 2, 3].map((i) => ({
    id: i,
    avatar: `/avatar${i}.png`,
    quote: t("testimonials.quote"),
    name: "Mehdi Tazi",
    role: t("testimonials.graduate"),
  }));

  return (
    <section className="py-20 px-4 md:px-8 bg-muted/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t("testimonials.title")}
        </h2>
        <Carousel className="w-full">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-6 h-full">
                  <div className="bg-background border rounded-2xl p-8 h-full space-y-6">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={testimonial.avatar}
                        style={{
                          transform: direction === "rtl" ? "scaleX(1)" : "none",
                        }}
                      />
                      <AvatarFallback>U{testimonial.id}</AvatarFallback>
                    </Avatar>
                    <p className="text-lg text-muted-foreground italic">
                      {testimonial.quote}
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className={direction === "rtl" ? "right-2 rotate-180" : "left-2"}
          />
          <CarouselNext
            className={direction === "rtl" ? "left-2 rotate-180" : "right-2"}
          />
        </Carousel>
      </div>
    </section>
  );
}
