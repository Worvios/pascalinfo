"use client";

import React, { useCallback, useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { toast } from "react-toastify";
import {
  Moon,
  Sun,
  Menu,
  GraduationCap,
  ChevronDown,
  Globe,
  Phone,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useLanguage } from "@/utils/LanguageProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Flag from "./ui/Flag"; // Import the new Flag component

interface NavbarProps {
  darkMode: boolean;
  toggleDark: () => void;
}

export default function Navbar({ darkMode, toggleDark }: NavbarProps) {
  const { t } = useTranslation();
  const { language, setLanguage, direction } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [copied, setCopied] = useState(false);

  // Phone number to copy
  const phoneNumber = t("footer.contact.phone");

  // Function to copy phone number to clipboard
  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    toast.success(t("footer.toast.copy"), {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Language options with flag codes
  const languageOptions = [
    { code: "FR", label: "Français", flagCode: "fr" },
    { code: "EN", label: "English", flagCode: "gb" },
    { code: "AR", label: "العربية", flagCode: "ma" },
    { code: "ES", label: "Español", flagCode: "es" },
    { code: "IT", label: "Italiano", flagCode: "it" },
    { code: "DE", label: "Deutsch", flagCode: "de" },
  ];

  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Detect active section based on scroll position
    const handleScrollForActiveSection = () => {
      const sections = ["home", "about", "programs", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollForActiveSection);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollForActiveSection);
    };
  }, []);

  // Memoized static navigation links
  const navLinks = useMemo(
    () => [
      { name: t("navigation.home"), href: "#home" },
      { name: t("navigation.about"), href: "#about" },
      { name: t("navigation.programs"), href: "#programs" },
      { name: t("navigation.contact"), href: "#contact" },
    ],
    [t]
  );

  // Handle language change
  const handleLanguageChange = useCallback(
    (code: string) => {
      // Skip if already selected
      if (code === language) return;

      // Find the language elements to animate
      const languageIndicators = document.querySelectorAll(`.language-${code}`);
      languageIndicators.forEach((el) => {
        el.classList.add("language-change-indicator");
        setTimeout(() => {
          el.classList.remove("language-change-indicator");
        }, 500);
      });

      // Change the language
      setLanguage(code);
      i18n.changeLanguage(code.toLowerCase());
    },
    [setLanguage, language]
  );

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/90 shadow-md backdrop-blur-lg py-2"
          : "bg-background/60 backdrop-blur-sm py-4"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8">
        {/* Branding */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 opacity-0 group-hover:opacity-70 blur-md transition-opacity duration-300" />
            <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 p-0.5 overflow-hidden">
              <Image
                src="/logo-pascal.png"
                alt="Pascal Info Logo"
                width={56}
                height={56}
                className="h-full w-full rounded-full object-cover border-2 border-background"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
              Pascal Info
            </span>
            <span className="text-xs text-muted-foreground hidden md:inline-block">
              Centre de Formation
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <div className="px-1 flex">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative",
                      activeSection === link.href.substring(1)
                        ? "text-primary"
                        : "text-foreground/80 hover:text-foreground"
                    )}
                  >
                    {activeSection === link.href.substring(1) && (
                      <span className="absolute inset-0 rounded-full bg-primary/10 animate-pulse-slow" />
                    )}
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Call Button with Copy Feature */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={copied ? "default" : "outline"}
                  className={cn(
                    "gap-2 rounded-full transition-all duration-300",
                    copied
                      ? "bg-green-500 hover:bg-green-600 text-white border-transparent"
                      : "border-primary/20 text-primary hover:bg-primary/10"
                  )}
                  onClick={copyPhoneNumber}
                >
                  {copied ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Phone className="h-3 w-3" />
                  )}
                  <span className="text-xs font-medium">
                    {copied ? t("footer.toast.copy") : t("contact.cta.button")}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{phoneNumber}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Enhanced Language Switcher with Flag Component */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full gap-2 px-3 hover:bg-muted group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Current language flag */}
                <Flag
                  code={
                    languageOptions.find((l) => l.code === language)
                      ?.flagCode || "fr"
                  }
                  size="sm"
                  className={`language-${language.toLowerCase()} transition-transform duration-200`}
                />

                <span className="text-sm font-medium hidden sm:inline-block">
                  {languageOptions.find((l) => l.code === language)?.code}
                </span>
                <ChevronDown className="h-3 w-3 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-[240px] p-2 rounded-xl"
            >
              <div className="flex items-center gap-2 px-3 py-2 mb-1 border-b border-muted/60">
                <Globe className="h-4 w-4 text-primary/70" />
                <span className="text-sm font-medium text-muted-foreground">
                  {t("navigation.language")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1 pt-1">
                {languageOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.code}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-muted transition-colors group",
                      language === option.code &&
                        "bg-primary/10 hover:bg-primary/15"
                    )}
                    onClick={() => handleLanguageChange(option.code)}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                        language === option.code
                          ? "ring-2 ring-primary/30 rounded-full"
                          : ""
                      )}
                    >
                      <Flag
                        code={option.flagCode}
                        className={`language-${option.code.toLowerCase()}`}
                      />
                    </div>

                    <div className="flex flex-col">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          language === option.code && "text-primary"
                        )}
                      >
                        {option.code}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {option.label}
                      </span>
                    </div>

                    {language === option.code && (
                      <span className="ml-auto">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dark Mode Toggle with Animation */}
          <div className="relative">
            <div
              className={cn(
                "absolute inset-0 rounded-full transition-colors duration-300",
                darkMode ? "bg-primary/10" : "bg-primary/0"
              )}
            />
            <Toggle
              pressed={darkMode}
              onPressedChange={toggleDark}
              className={cn(
                "rounded-full w-10 h-10 p-0 flex items-center justify-center hover:bg-transparent",
                darkMode ? "text-primary" : "text-amber-400"
              )}
            >
              <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
                <Sun
                  className={cn(
                    "absolute transition-all duration-300 ease-spring h-5 w-5",
                    darkMode
                      ? "rotate-0 opacity-100 scale-100"
                      : "rotate-90 opacity-0 scale-0"
                  )}
                />
                <Moon
                  className={cn(
                    "absolute transition-all duration-300 ease-spring h-5 w-5",
                    !darkMode
                      ? "rotate-0 opacity-100 scale-100"
                      : "rotate-90 opacity-0 scale-0"
                  )}
                />
              </div>
            </Toggle>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          {/* Mobile Call Button */}
          <Button
            size="icon"
            variant={copied ? "default" : "outline"}
            className={cn(
              "rounded-full w-9 h-9 p-0 transition-all duration-300",
              copied
                ? "bg-green-500 hover:bg-green-600 text-white border-transparent"
                : "border-primary/20 text-primary hover:bg-primary/10"
            )}
            onClick={copyPhoneNumber}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Phone className="h-4 w-4" />
            )}
          </Button>

          {/* Dark Mode Toggle (Mobile) */}
          <Toggle
            pressed={darkMode}
            onPressedChange={toggleDark}
            className="rounded-full w-9 h-9 p-0 flex items-center justify-center"
          >
            {darkMode ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-blue-400" />
            )}
          </Toggle>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={direction === "rtl" ? "left" : "right"}
              className="w-[85%] border-l-amber-500/20 bg-background/95 backdrop-blur-lg pt-12"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 p-0.5">
                    <Image
                      src="/logo-pascal.png"
                      alt="Pascal Info Logo"
                      width={56}
                      height={56}
                      className="h-full w-full rounded-full object-cover border-2 border-background"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
                      Pascal Info
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Centre de Formation
                    </span>
                  </div>
                </div>
                <SheetClose className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-muted">
                  <X className="h-4 w-4" />
                </SheetClose>
              </div>

              <div className="flex flex-col space-y-8">
                {/* Navigation Links */}
                <div className="space-y-1.5">
                  {navLinks.map((link, i) => (
                    <SheetClose key={link.name} asChild>
                      <a
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-muted",
                          activeSection === link.href.substring(1) &&
                            "bg-primary/10 text-primary"
                        )}
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        {i === 0 && <GraduationCap className="h-4 w-4" />}
                        {i === 1 && <GraduationCap className="h-4 w-4" />}
                        {i === 2 && <GraduationCap className="h-4 w-4" />}
                        {i === 3 && <GraduationCap className="h-4 w-4" />}
                        <span>{link.name}</span>
                      </a>
                    </SheetClose>
                  ))}
                </div>

                {/* Call to action */}
                <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-3">
                    {t("contact.cta.title")}
                  </p>
                  <Button
                    className="w-full rounded-lg gap-2"
                    onClick={copyPhoneNumber}
                    variant={copied ? "default" : "default"}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        {t("footer.toast.copy")}
                      </>
                    ) : (
                      <>
                        <Phone className="h-4 w-4" />
                        {t("contact.cta.button")}
                      </>
                    )}
                  </Button>
                </div>

                {/* Enhanced Mobile Language Selector with Flag Component */}
                <div className="pt-4 border-t">
                  <div className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    {t("navigation.language")}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {languageOptions.map((option) => (
                      <button
                        key={option.code}
                        className={cn(
                          "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                          language === option.code
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "bg-muted/50 hover:bg-muted border border-transparent"
                        )}
                        onClick={() => handleLanguageChange(option.code)}
                      >
                        <Flag
                          code={option.flagCode}
                          size="lg"
                          className={`language-${option.code.toLowerCase()}`}
                        />

                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium">
                            {option.code}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {option.label}
                          </span>
                        </div>

                        {language === option.code && (
                          <span className="absolute top-2 right-2">
                            <Check className="h-3.5 w-3.5 text-primary" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
