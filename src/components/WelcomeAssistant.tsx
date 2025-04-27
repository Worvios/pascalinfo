"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define types for the translations
interface Course {
  name: string;
  // Add other properties that might be present in your course objects
}

interface SocialPlatform {
  name: string;
  url: string;
  // Add other properties that might be present in your social platform objects
}

// Union type for different possible translated items
type TranslatedItem = string | Course | SocialPlatform;

const WelcomeAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  // Close widget when ESC is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Automatically open the widget for first-time visitors (optional)
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedBefore");
    if (!hasVisited) {
      // Wait a few seconds before showing to avoid immediate popups
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("hasVisitedBefore", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Function to get array from translation object - now with proper typing
  const getTranslatedArray = <T extends TranslatedItem>(key: string): T[] => {
    const translatedData = t(key, { returnObjects: true });
    return Array.isArray(translatedData) ? (translatedData as T[]) : [];
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Button to toggle the welcome widget */}
      <Button
        onClick={() => setIsOpen(!isOpen)} // Toggle open/close state
        size="sm"
        className="flex items-center gap-2 rounded-full py-5 shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-primary/80 text-white border-none"
        aria-label={t("assistant.aria.open")}
      >
        <HelpCircle className="h-4 w-4" />
        <span className="font-medium text-sm hidden md:inline-block">
          {t("assistant.button")}
        </span>
      </Button>

      {/* Welcome widget */}
      {isOpen && (
        <>
          {/* Overlay - only on mobile */}
          <div
            className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Widget Modal - Positioned relative to the button */}
          <div className="fixed bottom-20 left-0 sm:left-6 w-full sm:w-[360px] md:w-96 rounded-xl bg-background shadow-2xl border border-primary/20 overflow-hidden transition-all z-[51]">
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-muted/20 bg-gradient-to-r from-primary/10 to-transparent">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                {t("assistant.title")}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full w-8 h-8 p-0"
                onClick={() => setIsOpen(false)}
                aria-label={t("assistant.aria.close")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Tabs Content */}
            <Tabs
              defaultValue="welcome"
              className="w-full max-h-[70vh] overflow-auto"
            >
              <TabsList className="w-full grid grid-cols-3 bg-muted/50 sticky top-0 z-10">
                <TabsTrigger value="welcome">
                  {t("assistant.tabs.welcome")}
                </TabsTrigger>
                <TabsTrigger value="help">
                  {t("assistant.tabs.help")}
                </TabsTrigger>
                <TabsTrigger value="contact">
                  {t("assistant.tabs.contact")}
                </TabsTrigger>
              </TabsList>

              {/* Welcome Tab */}
              <TabsContent value="welcome" className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/20 ring-offset-2">
                    <AvatarImage
                      src="/images/avatar-director.jpg"
                      alt={t("assistant.welcome.avatar.alt")}
                    />
                    <AvatarFallback>PI</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">
                      {t("assistant.welcome.heading")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t("assistant.welcome.subheading")}
                    </p>
                  </div>
                </div>

                <p className="text-sm mb-4">
                  {t("assistant.welcome.description")}
                </p>

                <div className="space-y-3 mb-3">
                  <h5 className="text-sm font-medium">
                    {t("assistant.welcome.courses.title")}
                  </h5>

                  <div className="grid grid-cols-2 gap-2">
                    {getTranslatedArray<Course>(
                      "assistant.welcome.courses.items"
                    ).map((course, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2 bg-muted/30 rounded-md hover:bg-primary/5 transition-colors cursor-pointer"
                      >
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-xs">{course.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-2 text-sm"
                  size="sm"
                >
                  <span>{t("assistant.welcome.viewAllCourses")}</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-2" />
                </Button>
              </TabsContent>

              {/* Help Tab */}
              <TabsContent value="help" className="p-4">
                <h4 className="font-medium text-sm mb-3">
                  {t("assistant.help.faq.title")}
                </h4>

                <div className="space-y-3 mb-4">
                  {getTranslatedArray<string>("assistant.help.faq.items").map(
                    (question, i) => (
                      <div key={i} className="group cursor-pointer">
                        <div className="flex items-center gap-2 p-3 rounded-md bg-muted/20 hover:bg-primary/5 transition-colors">
                          <MessageSquare className="h-4 w-4 text-primary flex-shrink-0" />
                          <p className="text-sm">{question}</p>
                          <ArrowRight className="h-3.5 w-3.5 ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="rounded-md border border-muted p-3 bg-muted/10">
                  <div className="flex items-center gap-2 mb-2">
                    <HelpCircle className="h-4 w-4 text-primary" />
                    <h5 className="text-sm font-medium">
                      {t("assistant.help.support.title")}
                    </h5>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {t("assistant.help.support.description")}
                  </p>
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full text-sm"
                  >
                    {t("assistant.help.support.button")}
                  </Button>
                </div>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact" className="p-4">
                <div className="space-y-3 mb-4">
                  <div className="p-3 rounded-md bg-muted/20 flex items-start gap-3">
                    <Phone className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-medium mb-1">
                        {t("assistant.contact.phone.title")}
                      </h5>
                      <p className="text-sm">
                        {t("assistant.contact.phone.number")}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("assistant.contact.phone.hours")}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-md bg-muted/20 flex items-start gap-3">
                    <MessageSquare className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-medium mb-1">
                        {t("assistant.contact.email.title")}
                      </h5>
                      <p className="text-sm">
                        {t("assistant.contact.email.address")}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("assistant.contact.email.response")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-muted pt-3">
                  <h4 className="text-sm font-medium mb-3">
                    {t("assistant.contact.social.title")}
                  </h4>
                  <div className="flex items-center gap-2">
                    {getTranslatedArray<SocialPlatform>(
                      "assistant.contact.social.platforms"
                    ).map((social, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        className="text-xs flex items-center gap-1.5"
                        asChild
                      >
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {social.name}
                          <ExternalLink className="h-3 w-3" />
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
