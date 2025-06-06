"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  X,
  MessageSquare,
  Phone,
  FileText,
  ExternalLink,
  GraduationCap,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/utils/LanguageProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { slugify } from "@/utils/slugify";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ContactForm from "@/components/ContactForm";

interface Course {
  name: string;
}

interface SocialPlatform {
  name: string;
  url: string;
}

interface Program {
  id: string;
  title: string;
  description: string;
}

type TranslatedItem =
  | string
  | Course
  | SocialPlatform
  | { question: string; answer: string };

const WelcomeAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();
  const { direction } = useLanguage();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedBefore");
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("hasVisitedBefore", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const getTranslatedArray = <T extends TranslatedItem>(key: string): T[] => {
    const translatedData = t(key, { returnObjects: true });
    return Array.isArray(translatedData) ? (translatedData as T[]) : [];
  };

  const getTranslatedPrograms = (): Program[] => {
    const items = t("programs.items", {
      returnObjects: true,
    }) as Program[];
    return Array.isArray(items)
      ? items.filter(
          (item) => item && item.id && item.title && item.description
        )
      : [];
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className={cn(
        "fixed z-50",
        direction === "rtl" ? "right-6 left-auto" : "left-6",
        "bottom-6"
      )}
      dir={direction}
    >
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        aria-label={t("assistant.aria.open")}
        className={cn(
          "flex items-center gap-2 rounded-full py-5 shadow-lg hover:shadow-xl transition-all border-none hover:-translate-y-1",
          "bg-gradient-to-r from-primary to-primary/80 text-white",
          "backdrop-blur-[2px]",
          "ring-2 ring-primary/40",
          "hover:scale-105",
          "futuristic-glow"
        )}
        style={{ boxShadow: "0 0 16px 2px var(--tw-shadow-color, #a5b4fc)" }}
      >
        <HelpCircle className="h-4 w-4" />
        <span className="font-medium text-sm hidden md:inline-block">
          {t("assistant.button")}
        </span>
      </Button>

      {isOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Main Widget Container */}
          <div
            className={cn(
              "fixed bottom-20 w-full sm:w-[360px] md:w-96 rounded-2xl overflow-hidden z-[51]",
              direction === "rtl"
                ? "right-0 sm:right-6 left-auto"
                : "left-0 sm:left-6",
              "shadow-2xl border border-primary/30",
              "bg-background/80 dark:bg-background/90",
              "backdrop-blur-2xl",
              "futuristic-glass",
              "border-t-4 border-b-4 border-gradient-to-r from-primary to-purple-500/60",
              "animate-slide-up"
            )}
            style={{
              boxShadow:
                "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 0 2px var(--tw-shadow-color, #a5b4fc)",
              borderImage: "linear-gradient(90deg, #6366f1, #a21caf) 1",
            }}
          >
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-muted/20 bg-gradient-to-r from-primary/20 to-primary/5">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary drop-shadow-glow" />
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {t("assistant.title")}
                </span>
              </h3>
              <Button
                variant="ghost"
                size="sm"
                aria-label={t("assistant.aria.close")}
                className="rounded-full w-8 h-8 p-0 hover:bg-primary/10"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4 text-primary" />
              </Button>
            </div>

            <Tabs
              defaultValue="welcome"
              className="w-full max-h-[70vh] overflow-auto"
            >
              <TabsList className="w-full grid grid-cols-3 bg-muted/10 backdrop-blur-sm sticky top-0 z-10">
                {["welcome", "help", "contact"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    {t(`assistant.tabs.${tab}`)}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Welcome Tab */}
              <TabsContent
                value="welcome"
                className={cn("p-4", direction === "rtl" && "text-right")}
              >
                <div
                  className={cn(
                    "flex items-center gap-3 mb-4",
                    direction === "rtl" && "flex-row-reverse text-right"
                  )}
                >
                  <Avatar className="h-14 w-14 ring-4 ring-primary/30 ring-offset-2 shadow-lg">
                    <AvatarImage
                      src="/images/avatar-director.jpg"
                      alt={t("assistant.welcome.avatar.alt")}
                      className="object-cover w-full h-full rounded-full scale-110"
                    />
                    <AvatarFallback>
                      <Image
                        src="/logo-pascal.png"
                        alt="Pascal Logo"
                        className="h-full w-full object-cover rounded-full scale-125"
                        width={56}
                        height={56}
                        unoptimized
                      />
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn(direction === "rtl" && "text-right")}>
                    <h4
                      className={cn(
                        "font-medium text-foreground",
                        direction === "rtl" && "text-right"
                      )}
                    >
                      {t("assistant.welcome.heading")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t("assistant.welcome.subheading")}
                    </p>
                  </div>
                </div>

                <p
                  className={cn(
                    "text-sm mb-4 text-muted-foreground",
                    direction === "rtl" && "text-right"
                  )}
                >
                  {t("assistant.welcome.description")}
                </p>

                {/* Programs List */}
                <div className="space-y-3 mb-3">
                  <h5
                    className={cn(
                      "text-sm font-medium text-foreground",
                      direction === "rtl" && "text-right"
                    )}
                  >
                    {t("assistant.welcome.courses.title")}
                  </h5>
                  <div className="grid grid-cols-1 gap-2">
                    {getTranslatedPrograms()
                      .slice(0, 4)
                      .map((program) => (
                        <Link
                          key={program.id}
                          href={`/pages/programs/${program.id}-${slugify(
                            program.title
                          )}`}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-purple-500/10 hover:from-primary/20 hover:to-purple-500/20 transition-all cursor-pointer group shadow-md hover:shadow-xl",
                            "hover:scale-[1.03] futuristic-card",
                            direction === "rtl" && "flex-row-reverse text-right"
                          )}
                        >
                          <div className="p-2 bg-primary/20 rounded-full shadow-inner">
                            <FileText className="h-5 w-5 text-primary drop-shadow-glow" />
                          </div>
                          <span
                            className={cn(
                              "text-sm font-semibold text-foreground group-hover:text-primary",
                              direction === "rtl" && "text-right"
                            )}
                          >
                            {program.title}
                          </span>
                          <ArrowRight
                            className={cn(
                              "h-4 w-4 ml-auto text-primary opacity-70 group-hover:opacity-100 transition-transform",
                              direction === "rtl" && "rotate-180 mr-auto ml-0"
                            )}
                          />
                        </Link>
                      ))}
                  </div>
                </div>

                <Button
                  asChild
                  className={cn(
                    "w-full mt-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl",
                    direction === "rtl" && "flex-row-reverse"
                  )}
                >
                  <Link href="/pages/programs">
                    <span>{t("assistant.welcome.viewAllCourses")}</span>
                    <ArrowRight
                      className={cn(
                        "h-4 w-4 ml-2",
                        direction === "rtl" && "rotate-180 ml-0 mr-2"
                      )}
                    />
                  </Link>
                </Button>
              </TabsContent>

              {/* Help Tab */}
              <TabsContent
                value="help"
                className={cn("p-4", direction === "rtl" && "text-right")}
              >
                <h4 className="font-medium text-sm mb-3 text-foreground">
                  {t("assistant.help.faq.title")}
                </h4>

                <div className="space-y-2 mb-4">
                  {getTranslatedArray<{ question: string; answer: string }>(
                    "assistant.help.faq.items"
                  ).map((item, i) => (
                    <div
                      key={i}
                      className={cn(
                        "rounded-xl transition-all cursor-pointer border hover:border-primary/30 bg-card",
                        openIndex === i
                          ? "border-primary/20 bg-primary/5"
                          : "border-muted/20",
                        direction === "rtl" && "text-right"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-between p-3",
                          direction === "rtl" && "flex-row-reverse"
                        )}
                        onClick={() => toggleFAQ(i)}
                      >
                        <div
                          className={cn(
                            "flex items-center gap-3",
                            direction === "rtl" && "flex-row-reverse"
                          )}
                        >
                          <div className="p-1.5 bg-primary/10 rounded-full">
                            <MessageSquare className="h-4 w-4 text-primary" />
                          </div>
                          <p className="text-sm font-medium text-foreground">
                            {item.question}
                          </p>
                        </div>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 text-primary transition-transform",
                            openIndex === i ? "rotate-180" : "",
                            direction === "rtl" && "ml-0 mr-2"
                          )}
                        />
                      </div>

                      {openIndex === i && (
                        <div
                          className={cn(
                            "px-4 pb-3 pt-1 animate-accordion-down",
                            direction === "rtl" && "text-right"
                          )}
                        >
                          <p className="text-sm text-muted-foreground pl-9 pr-4 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div
                  className={cn(
                    "rounded-xl border border-primary/20 p-3 bg-primary/5",
                    direction === "rtl" && "text-right"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center gap-2 mb-2",
                      direction === "rtl" && "flex-row-reverse"
                    )}
                  >
                    <HelpCircle className="h-4 w-4 text-primary" />
                    <h5 className="text-sm font-medium text-foreground">
                      {t("assistant.help.support.title")}
                    </h5>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {t("assistant.help.support.description")}
                  </p>
                 <Dialog>
  <DialogTrigger asChild>
    <Button
      variant="default"
      size="sm"
      className="w-full bg-primary hover:bg-primary/90"
    >
      {t("assistant.help.support.button")}
    </Button>
  </DialogTrigger>
  <DialogContent className="max-w-2xl p-8">
    <DialogTitle className="text-2xl font-bold text-center mb-2">
      <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {t("floatingContactButton.button")}
      </span>
    </DialogTitle>
    <div className="space-y-6">
      <p className="text-muted-foreground text-center">
        {t("floatingContactButton.description")}
      </p>
      <ContactForm />
    </div>
  </DialogContent>
</Dialog>
                </div>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent
                value="contact"
                className={cn("p-4", direction === "rtl" && "text-right")}
              >
                <div className="space-y-3 mb-4">
                  {["phone", "email"].map((type) => (
                    <div
                      key={type}
                      className={cn(
                        "p-3 rounded-xl bg-muted/5 border border-muted/20 hover:border-primary/20 transition-colors",
                        direction === "rtl" && "text-right"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-start gap-3",
                          direction === "rtl" && "flex-row-reverse"
                        )}
                      >
                        <div
                          className={cn(
                            "p-1.5 bg-primary/10 rounded-full mt-0.5",
                            direction === "rtl" && "order-2 ml-0 mr-3"
                          )}
                        >
                          {type === "phone" ? (
                            <Phone className="h-4 w-4 text-primary" />
                          ) : (
                            <MessageSquare className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-1">
                            {t(`assistant.contact.${type}.title`)}
                          </h5>
                          <p className="text-sm text-foreground">
                            {t(
                              `assistant.contact.${type}.${
                                type === "phone" ? "number" : "address"
                              }`
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t(
                              `assistant.contact.${type}.${
                                type === "phone" ? "hours" : "response"
                              }`
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-muted/20 pt-3">
                  <h4
                    className={cn(
                      "text-sm font-medium mb-3 text-foreground",
                      direction === "rtl" && "text-right"
                    )}
                  >
                    {t("assistant.contact.social.title")}
                  </h4>
                  <div
                    className={cn(
                      "flex items-center gap-2 flex-wrap",
                      direction === "rtl" && "flex-row-reverse justify-end"
                    )}
                  >
                    {getTranslatedArray<SocialPlatform>(
                      "assistant.contact.social.platforms"
                    ).map((social, i) => (
                      <Button
                        key={i}
                        size="sm"
                        className={cn(
                          "rounded-full gap-1.5 transition-all",
                          social.name === "Facebook" &&
                            "bg-blue-600 hover:bg-blue-700 text-white",
                          social.name === "Instagram" &&
                            "bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white",
                          social.name === "LinkedIn" &&
                            "bg-blue-500 hover:bg-blue-600 text-white"
                        )}
                        asChild
                      >
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white"
                        >
                          {social.name}
                          <ExternalLink
                            className={cn(
                              "h-3 w-3 opacity-80 hover:opacity-100",
                              direction === "rtl" && "ml-0 mr-1"
                            )}
                          />
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Footer */}
            <div className="p-3 border-t border-muted/20 bg-muted/5 text-center">
              <p className="text-xs text-muted-foreground">
                {t("assistant.footer", { year: new Date().getFullYear() })}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WelcomeAssistant;
