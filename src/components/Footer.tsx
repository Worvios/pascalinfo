"use client";

// Extend the Window interface to include the formkit property
declare global {
  interface Window {
    formkit?: {
      init: () => void;
    };
  }
}

import React, { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Script from "next/script";
import {
  Smartphone,
  MapPin,
  AlertCircle,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  GraduationCap,
  BookOpen,
  ChevronRight,
  FileText,
  Mail,
  Phone,
  Clock,
  Copy,
  Check,
  ExternalLink,
  ArrowUp,
  Globe,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Initialize ConvertKit when the script loads
  const handleScriptLoad = () => {
    setScriptLoaded(true);
    if (typeof window !== "undefined" && window.formkit) {
      try {
        window.formkit.init();
      } catch (error) {
        console.error("Error initializing ConvertKit form:", error);
      }
    }
  };

  // Function to get array from translation object
  const getTranslatedArray = (key: string): string[] => {
    const translatedData = t(key, { returnObjects: true });
    return Array.isArray(translatedData)
      ? translatedData.filter(
          (item): item is string => typeof item === "string"
        )
      : [];
  };

  const contactInfo = [
    {
      id: "phone",
      icon: <Phone className="h-4 w-4" />,
      value: t("footer.contact.phone"),
      label: "Téléphone fixe",
    },
    {
      id: "mobile",
      icon: <Smartphone className="h-4 w-4" />,
      value: t("footer.contact.mobile"),
      label: "Mobile",
    },
    {
      id: "email",
      icon: <Mail className="h-4 w-4" />,
      value: t("footer.contact.email"),
      label: "Email",
    },
    {
      id: "address",
      icon: <MapPin className="h-4 w-4" />,
      value: t("footer.contact.address"),
      label: "Adresse",
    },
    {
      id: "hours",
      icon: <Clock className="h-4 w-4" />,
      value: t("footer.contact.hours"),
      label: "Horaires d'ouverture",
      noCopy: true,
    },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    toast.success(t("footer.toast.copy"), {
      icon: <Check className="h-4 w-4 text-green-500" />,
      position: "bottom-right",
      autoClose: 2000,
    });

    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background relative overflow-hidden mt-20">
      {/* ConvertKit Script */}
      <Script
        src="https://f.convertkit.com/ckjs/ck.5.js"
        strategy="lazyOnload"
        onLoad={handleScriptLoad}
      />

      {/* Decorative wave pattern */}
      <div className="absolute inset-x-0 top-0 h-16 pointer-events-none">
        <div className="w-full h-16 bg-[url('/wave-pattern.svg')] bg-repeat-x opacity-5"></div>
      </div>

      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 opacity-80" />

      {/* Back to top button - positioned higher to avoid overlap */}
      <button
        onClick={scrollToTop}
        className="absolute right-6 -top-12 z-10 h-12 w-12 rounded-full bg-primary shadow-lg hover:bg-primary/90 transition-all group"
        aria-label="Back to top"
      >
        <div className="flex items-center justify-center h-full w-full">
          <ArrowUp className="h-5 w-5 text-white group-hover:-translate-y-1 transition-transform" />
        </div>
      </button>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-12">
        {/* Newsletter Section */}
        {/* Newsletter Section */}
        <div className="mb-16 p-6 md:p-8 rounded-xl bg-gradient-to-br from-primary/15 via-primary/8 to-transparent border border-primary/20 shadow-sm">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="max-w-md">
              <h3 className="text-xl font-medium mb-2 flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                {t("footer.newsletter.title")}
              </h3>
              <p className="text-sm text-foreground/80 mb-2">
                Inscrivez-vous à notre newsletter pour recevoir nos dernières
                actualités, offres et promotions.
              </p>
              <p className="text-xs text-muted-foreground/80 italic">
                Nous respectons votre vie privée. Vous pouvez vous désinscrire à
                tout moment.
              </p>
            </div>

            <div className="w-full md:w-auto md:min-w-[340px] newsletter-container">
              {/* ConvertKit Form - With theme-aware styling */}
              <form
                action="https://app.convertkit.com/forms/7954953/subscriptions"
                method="post"
                data-sv-form="7954953"
                data-uid="dc4673f8de"
                data-format="inline"
                data-version="5"
                className="seva-form formkit-form newsletter-theme-aware"
              >
                <div data-style="clean">
                  <ul
                    className="formkit-alert formkit-alert-error"
                    data-element="errors"
                    data-group="alert"
                  ></ul>
                  <div
                    data-element="fields"
                    data-stacked="false"
                    className="seva-fields formkit-fields"
                  >
                    <div className="formkit-field">
                      <input
                        className="formkit-input theme-adaptive-input"
                        name="email_address"
                        aria-label="Email Address"
                        placeholder="Votre adresse email"
                        required
                        type="email"
                      />
                    </div>
                    <button
                      data-element="submit"
                      className="formkit-submit theme-adaptive-button"
                    >
                      <div className="formkit-spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <span>S&apos;abonner</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Branding Column */}
          <div className="md:col-span-1 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-600 p-0.5 overflow-hidden">
                  <div className="absolute inset-0 bg-background rounded-[10px] m-[1px]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold">
                    Pascal <span className="text-primary">Info</span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Centre de Formation
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed md:pr-4">
                {t("footer.description")}
              </p>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                Suivez-nous
              </h4>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com/pascalinfo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-muted bg-background hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-200 dark:hover:border-blue-900/40 transition-colors group"
                >
                  <Facebook className="h-4 w-4 text-[#1877F2] group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://instagram.com/pascalinfo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-muted bg-background hover:bg-pink-50 dark:hover:bg-pink-950/30 hover:border-pink-200 dark:hover:border-pink-900/40 transition-colors group"
                >
                  <Instagram className="h-4 w-4 text-[#E4405F] group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://linkedin.com/company/pascalinfo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-muted bg-background hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-200 dark:hover:border-blue-900/40 transition-colors group"
                >
                  <Linkedin className="h-4 w-4 text-[#0A66C2] group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://twitter.com/pascalinfo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-muted bg-background hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-200 dark:hover:border-blue-900/40 transition-colors group"
                >
                  <Twitter className="h-4 w-4 text-[#1DA1F2] group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links & Resources Combined - Only show on desktop */}
          <div className="hidden md:block md:col-span-1">
            <div className="space-y-6">
              {/* Quick Links Section */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  {t("footer.quickLinks.title")}
                </h3>
                <ul className="space-y-2.5">
                  {getTranslatedArray("footer.quickLinks.items").map(
                    (link, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                        >
                          <ChevronRight className="h-3 w-3 text-primary/40 group-hover:text-primary transition-colors" />
                          {link}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Resources Section */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  {t("footer.resources.title")}
                </h3>
                <ul className="space-y-2.5">
                  {getTranslatedArray("footer.resources.items").map(
                    (link, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                        >
                          <ChevronRight className="h-3 w-3 text-primary/40 group-hover:text-primary transition-colors" />
                          {link}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-2 space-y-5">
            <h3 className="font-medium text-sm flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactInfo.map((info) => (
                <div
                  key={info.id}
                  className={cn(
                    "group flex gap-3 p-3 rounded-lg border",
                    "hover:border-primary/30 hover:bg-primary/5 transition-colors",
                    !info.noCopy && "cursor-pointer"
                  )}
                  onClick={() =>
                    !info.noCopy && handleCopy(info.value, info.id)
                  }
                  role={!info.noCopy ? "button" : undefined}
                  tabIndex={!info.noCopy ? 0 : undefined}
                >
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {info.icon}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-xs text-muted-foreground">
                      {info.label}
                    </span>
                    <span className="text-sm font-medium truncate">
                      {info.value}
                    </span>
                  </div>
                  {!info.noCopy && (
                    <div className="self-center">
                      {copiedField === info.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Emergency Contact */}
              <div
                className="group sm:col-span-2 flex gap-3 p-3 rounded-lg border border-red-200 bg-red-50/50 dark:bg-red-950/10 dark:border-red-900/30 cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                onClick={() =>
                  handleCopy(t("footer.contact.emergency"), "emergency")
                }
                role="button"
                tabIndex={0}
              >
                <div className="h-8 w-8 rounded-md bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-xs text-red-500">Urgence</span>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    {t("footer.contact.emergency")}
                  </span>
                </div>
                <div className="self-center">
                  {copiedField === "emergency" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>
            </div>

            {/* Accreditations */}
            <div className="mt-8">
              <h4 className="text-sm font-medium mb-3">
                {t("footer.accredited")}
              </h4>
              <div className="flex flex-wrap gap-3">
                <div className="bg-background rounded-lg p-2 border border-muted flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/certifications/iso.png" />
                    <AvatarFallback>ISO</AvatarFallback>
                  </Avatar>
                  <span className="text-xs">ISO 9001:2015</span>
                </div>

                <div className="bg-background rounded-lg p-2 border border-muted flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/certifications/ministry.png" />
                    <AvatarFallback>MEN</AvatarFallback>
                  </Avatar>
                  <span className="text-xs">Éducation Nationale</span>
                </div>

                <Badge
                  variant="outline"
                  className="bg-primary/5 border-primary/20 font-normal text-xs"
                >
                  Certifié OFPPT
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Accordion - Only show on mobile */}
        <div className="md:hidden w-full space-y-4 mb-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="quick-links"
              className="border-b border-muted/40"
            >
              <AccordionTrigger className="py-3 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  {t("footer.quickLinks.title")}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2.5 py-2">
                  {getTranslatedArray("footer.quickLinks.items").map(
                    (link, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 py-1"
                        >
                          <ChevronRight className="h-3 w-3 text-primary/40" />
                          {link}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="resources"
              className="border-b border-muted/40"
            >
              <AccordionTrigger className="py-3 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  {t("footer.resources.title")}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2.5 py-2">
                  {getTranslatedArray("footer.resources.items").map(
                    (link, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 py-1"
                        >
                          <ChevronRight className="h-3 w-3 text-primary/40" />
                          {link}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Separator */}
        <Separator className="my-6 bg-muted/60" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-muted-foreground text-center order-2 md:order-1">
            {t("footer.copyright").replace("2025", currentYear.toString())}
          </div>

          <div className="flex items-center gap-4 order-1 md:order-2">
            <span className="text-sm text-muted-foreground">
              {t("footer.developed")}
            </span>
            <a
              href="https://coderabbit.de"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
            >
              <Image
                src="/coderabbit-logo.svg" // Default logo
                alt="Coderabbit Digital Solutions"
                width={40}
                height={40}
                className="block dark:hidden h-8 w-auto" // Show in light mode
              />
              <Image
                src="/coderabbit-logo-dark.svg" // Dark mode logo
                alt="Coderabbit Digital Solutions"
                width={40}
                height={40}
                className="hidden dark:block h-8 w-auto" // Show in dark mode
              />
              <span className="font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:from-secondary group-hover:to-primary transition-all duration-500">
                Coderabbit Digital Solutions
              </span>
              <ExternalLink className="h-3 w-3 text-muted-foreground opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
