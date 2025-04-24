"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Image from "next/image";
import screenfull from "screenfull";
import NewsletterSubscription from "@/components/NewsletterSubscription";

import {
  Moon,
  Sun,
  Menu,
  Languages,
  Facebook,
  Linkedin,
  Instagram,
  Trophy,
  GraduationCap,
  Microscope,
  HeartHandshake,
  BookOpen,
  Globe,
  Code,
  ChefHat,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Scale,
  FileText,
  Mail,
  Phone,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Toggle } from "@/components/ui/toggle";
import Autoplay from "embla-carousel-autoplay";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import FloatingContactButton from "@/components/FloatingContactForm";
import AppointmentDialog from "@/components/AppointmentDialog";
import { useTranslation } from "react-i18next";
import i18n from "@/utils/i18n";
// Add these imports at the top

export default function SchoolShowcase() {
  const { t } = useTranslation();

  // Dark mode toggle and language state
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("FR");

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

  // Memoized static media items
  const mediaItems = useMemo(
    () => [
      { type: "image", src: "/pic1.jpg" },
      { type: "image", src: "/pic2.jpg" },
      { type: "image", src: "/pic3.jpg" },
    ],
    []
  );

  // Toggle dark mode with memoized callback
  const toggleDark = useCallback(() => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  }, []);

  // Video handling state and ref
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Toggle Play/Pause function
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  }, [isPlaying]);

  // Toggle Mute function
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Memoized programs array
  const [programs, setPrograms] = useState(() => [
    {
      icon: Code,
      title: t("programs.items.0.title"),
      text: t("programs.items.0.description"),
      rotateX: 0,
      rotateY: 0,
    },
    {
      icon: ChefHat,
      title: t("programs.items.1.title"),
      text: t("programs.items.1.description"),
      rotateX: 0,
      rotateY: 0,
    },
    {
      icon: BookOpen,
      title: t("programs.items.2.title"),
      text: t("programs.items.2.description"),
      rotateX: 0,
      rotateY: 0,
    },
    {
      icon: Globe,
      title: t("programs.items.3.title"),
      text: t("programs.items.3.description"),
      rotateX: 0,
      rotateY: 0,
    },
    {
      icon: GraduationCap,
      title: t("programs.items.4.title"),
      text: t("programs.items.4.description"),
      rotateX: 0,
      rotateY: 0,
    },
    {
      icon: HeartHandshake,
      title: t("programs.items.5.title"),
      text: t("programs.items.5.description"),
      rotateX: 0,
      rotateY: 0,
    },
    {
      icon: Microscope,
      title: t("programs.items.6.title"),
      text: t("programs.items.6.description"),
      rotateX: 0,
      rotateY: 0,
    },
    {
      icon: Trophy,
      title: t("programs.items.7.title"),
      text: t("programs.items.7.description"),
      rotateX: 0,
      rotateY: 0,
    },
  ]);

  // Handle card movement for 3D effect
  const handleCardMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, index: number) => {
      const card = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - card.left;
      const y = e.clientY - card.top;
      const centerX = card.width / 2;
      const centerY = card.height / 2;

      setPrograms((prev) =>
        prev.map((p, i) =>
          i === index
            ? {
                ...p,
                rotateX: -(y - centerY) / 20,
                rotateY: (x - centerX) / 20,
              }
            : p
        )
      );
    },
    []
  );

  const handleCardLeave = useCallback((index: number) => {
    setPrograms((prev) =>
      prev.map((p, i) => (i === index ? { ...p, rotateX: 0, rotateY: 0 } : p))
    );
  }, []);

  // Toggle full-screen mode
  const toggleFullscreen = useCallback(() => {
    if (screenfull.isEnabled && videoRef.current) {
      screenfull.toggle(videoRef.current);
    }
  }, []);

  // Update video progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
    };
    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, []);

  // Initialize video state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Set cursor style on mount
  useEffect(() => {
    document.body.style.cursor = "default";
    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <div className={`font-sans ${darkMode ? "dark" : ""}`}>
      <div className="fixed bottom-4 right-4 z-50">
        <NewsletterSubscription />
      </div>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 text-foreground shadow-sm backdrop-blur-md border-b border-muted">
        {/* Branding */}
        <a href="#home">
          <div className="flex items-center gap-3">
            <div className="relative rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 p-1 group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
              <Image
                src="/logo-pascal.png"
                alt="Pascal Info Logo"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover border-2 border-background"
                priority
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
              Pascal Info
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-primary transition-colors duration-200 font-medium text-sm hover:bg-accent/30 px-3 py-2 rounded-lg"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 border-l border-muted pl-6">
            <div className="relative flex items-center">
              <Languages className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  i18n.changeLanguage(e.target.value.toLowerCase());
                }}
                className="pl-10 pr-4 py-2 rounded-lg bg-background border text-sm appearance-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="FR">Français</option>
                <option value="EN">English</option>
                <option value="AR">العربية</option>
                <option value="ES">Español</option>
                <option value="IT">Italia</option>
                <option value="DE">Deutsch</option>
              </select>
            </div>

            <Toggle
              pressed={darkMode}
              onPressedChange={toggleDark}
              className="rounded-full p-2 hover:bg-muted border border-muted"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-400" />
              )}
            </Toggle>
          </div>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] bg-background/95 backdrop-blur-lg"
          >
            <div className="flex flex-col h-full pt-8">
              <div className="flex flex-col gap-8">
                <ul className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="hover:text-primary transition-colors duration-200 font-medium text-sm px-4 py-2 rounded-lg hover:bg-accent/20"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-6 border-t border-muted pt-6">
                  <div className="relative flex items-center">
                    <Languages className="absolute left-3 h-4 w-4 text-muted-foreground" />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="pl-10 pr-4 py-2 rounded-lg bg-background border text-sm w-full appearance-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="FR">Français</option>
                      <option value="EN">English</option>
                      <option value="AR">العربية</option>
                      <option value="ES">Español</option>
                      <option value="IT">Italia</option>
                      <option value="DE">Deutsch</option>
                    </select>
                  </div>
                  <Toggle
                    pressed={darkMode}
                    onPressedChange={toggleDark}
                    className="w-full justify-start px-4 py-2 rounded-lg hover:bg-accent/20"
                  >
                    {darkMode ? (
                      <Sun className="h-5 w-5 mr-2 text-amber-400" />
                    ) : (
                      <Moon className="h-5 w-5 mr-2 text-blue-400" />
                    )}
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </Toggle>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>

      {/* Hero Section */}
      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full">
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          className="h-full w-full"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {mediaItems.map((item, index) => (
              <CarouselItem key={index} className="relative h-screen">
                <div className="relative h-full w-full">
                  <Image
                    src={item.src}
                    alt={t("hero.title")}
                    fill
                    className="object-cover brightness-75"
                    priority
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div className="max-w-4xl px-4 space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-xl">
                      {t("hero.title")}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground font-light text-white/90">
                      {t("hero.subtitle")}
                    </p>
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
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* Video Showcase Section */}
      <section className="relative py-20 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 md:pr-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                {t("video.title")}
              </span>
              <br />
              <span className="text-foreground">{t("video.subtitle")}</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("video.description")}
            </p>
            <ul className="space-y-4">
              {(Array.isArray(
                t("video.features", { returnObjects: true }) as unknown
              )
                ? (t("video.features", {
                    returnObjects: true,
                  }) as unknown as string[])
                : []
              ).map((item: string, index: number) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Video Container */}
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-muted/20">
            <video
              ref={videoRef}
              muted={isMuted}
              className="w-full aspect-video object-cover cursor-pointer"
              poster="/video-poster.png"
              onClick={togglePlay}
              playsInline // Add this
              preload="metadata" // Add this
            >
              <source src="/videopascal.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Video Controls */}
            <div
              className={`absolute bottom-4 left-4 right-4 flex items-center justify-between transition-opacity ${
                isPlaying ? "opacity-0 group-hover:opacity-100" : ""
              }`}
            >
              <div className="flex items-center gap-3 backdrop-blur-sm bg-background/30 p-2 rounded-full">
                <Button
                  size="icon"
                  className="rounded-full hover:bg-muted/20"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  size="icon"
                  className="rounded-full hover:bg-muted/20"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                <div className="h-1 bg-muted/20 rounded-full flex-1 mx-2">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <Button
                size="icon"
                className="rounded-full backdrop-blur-sm bg-background/30 hover:bg-muted/20"
                onClick={toggleFullscreen}
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
            {/* Initial Play Button */}
            {/* Initial Play Button */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/10 backdrop-blur-sm">
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 text-lg gap-2 hover:scale-105 transition-transform cursor-pointer"
                  onClick={togglePlay}
                >
                  <Play className="h-6 w-6" />
                  {t("video.playButton")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-20 px-4 md:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {t("about.title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("about.description")}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-background border">
                <h3 className="text-2xl font-bold text-primary">25+</h3>
                <p className="text-muted-foreground">
                  {t("about.stats.experience")}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-background border">
                <h3 className="text-2xl font-bold text-primary">10+</h3>
                <p className="text-muted-foreground">
                  {t("about.stats.services")}
                </p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full px-8">
                  {t("about.learnMore")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl p-8">
                <div className="space-y-4">
                  <Trophy className="h-12 w-12 text-primary" />
                  <h3 className="text-2xl font-bold">
                    {t("about.distinctions.title")}
                  </h3>
                  <ul className="space-y-2 list-disc pl-6 text-muted-foreground">
                    <li>{t("about.distinctions.items.0")}</li>
                    <li>{t("about.distinctions.items.1")}</li>
                    <li>{t("about.distinctions.items.2")}</li>
                    <li>{t("about.distinctions.items.3")}</li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/logo-pascal.png"
              alt="Centre Pascal Info"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="programs"
        className="py-20 px-4 md:px-8 bg-background relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {t("programs.title")}
            </span>
            <br />
            <span className="text-foreground">{t("programs.subtitle")}</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {/* Fond optimisé */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute w-[300px] h-[300px] bg-gradient-to-r from-primary/30 to-purple-600/30 blur-[80px] animate-float will-change-transform" />
            </div>

            {/* Cartes des programmes */}
            {(
              t("programs.items", { returnObjects: true }) as {
                title: string;
                description: string;
              }[]
            ).map((program, index) => (
              <div
                key={index}
                className="program-card relative bg-background border border-muted/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 will-change-transform"
                onMouseMove={(e) => handleCardMove(e, index)}
                onMouseLeave={() => handleCardLeave(index)}
              >
                {/* Couche d'effet au survol */}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

                {/* Contenu de la carte */}
                <div className="relative space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="program-icon bg-gradient-to-br from-primary to-purple-600 p-3 rounded-lg will-change-transform">
                      {programs[index]?.icon &&
                        React.createElement(programs[index].icon, {
                          className: "h-6 w-6 text-white",
                        })}
                    </div>
                    <span className="text-sm font-medium text-primary">
                      {t("programs.certified")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {program.description}
                  </p>

                  {/* Bouton avec animation */}
                  <div className="mt-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button
                      variant="outline"
                      className="rounded-full gap-2 w-full hover:bg-primary/10 border-muted/20"
                    >
                      <BookOpen className="h-4 w-4" />
                      {t("programs.learnMore")}
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-20 px-4 md:px-8 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("testimonials.title")}
          </h2>
          <Carousel className="w-full">
            <CarouselContent>
              {[1, 2, 3].map((i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-6 h-full">
                    <div className="bg-background border rounded-2xl p-8 h-full space-y-6">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={`/avatar${i}.png`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <p className="text-lg text-muted-foreground italic">
                        {t("testimonials.quote")}
                      </p>
                      <div>
                        <p className="font-semibold">Mehdi Tazi</p>
                        <p className="text-sm text-muted-foreground">
                          {t("testimonials.graduate")}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("whyChooseUs.title")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(Array.isArray(t("whyChooseUs.items", { returnObjects: true }))
              ? (t("whyChooseUs.items", {
                  returnObjects: true,
                }) as { title: string; description: string }[])
              : []
            ).map((item, index) => (
              <div
                key={index}
                className="group bg-muted/10 border rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="mb-4">
                  {index === 0 && (
                    <GraduationCap className="h-8 w-8 text-primary group-hover:animate-bounce" />
                  )}
                  {index === 1 && (
                    <Microscope className="h-8 w-8 text-primary group-hover:animate-bounce" />
                  )}
                  {index === 2 && (
                    <HeartHandshake className="h-8 w-8 text-primary group-hover:animate-bounce" />
                  )}
                  {index === 3 && (
                    <Trophy className="h-8 w-8 text-primary group-hover:animate-bounce" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Location */}
      <section id="contact" className="py-20 px-4 md:px-8 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            {t("contact.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Map Section */}
            <div className="h-[400px] rounded-2xl overflow-hidden shadow-xl border border-muted/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3371.313075176366!2d-6.3628693880172005!3d32.33030380657073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda387b4f96b285d%3A0xc07927fdc2e9d3c4!2sINSTITUT%20PASCAL%20INFO!5e0!3m2!1sfr!2sma!4v1744722831065!5m2!1sfr!2sma"
                width="600"
                height="450"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            {/* Info & Social Section */}
            <div className="bg-background/95 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-muted/20 flex flex-col justify-center">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    {t("contact.connect")}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t("contact.description")}
                  </p>
                </div>
                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span className="text-sm">{t("contact.address")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Microscope className="h-5 w-5 text-primary" />
                    <span className="text-sm"> {t("contact.hours")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HeartHandshake className="h-5 w-5 text-primary" />
                    <span className="text-sm"> {t("contact.email")}</span>
                  </div>
                </div>
                {/* Social Media Buttons */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <a
                    href="https://facebook.com/centrepascalinfo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="rounded-full gap-2 px-6 hover:bg-primary/10 transition-all hover:scale-105"
                    >
                      <Facebook className="h-5 w-5 text-blue-600" />
                      <span> {t("contact.social.follow")}</span>
                    </Button>
                  </a>
                  <a
                    href="https://linkedin.com/company/pascal-info"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="rounded-full gap-2 px-6 hover:bg-primary/10 transition-all hover:scale-105"
                    >
                      <Linkedin className="h-5 w-5 text-blue-500" />
                      <span>{t("contact.social.connect")}</span>
                    </Button>
                  </a>
                  <a
                    href="https://instagram.com/centre_pascal_info"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="rounded-full gap-2 px-6 hover:bg-primary/10 transition-all hover:scale-105"
                    >
                      <Instagram className="h-5 w-5 text-pink-600" />
                      <span>{t("contact.social.explore")}</span>
                    </Button>
                  </a>
                </div>

                {/* Call to Action */}
                <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    {t("contact.cta.title")}
                  </p>

                  <AppointmentDialog />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FloatingContactButton />

      {/* Footer */}
      <footer className="bg-background border-t mt-24 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-20" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Branding Column */}
            <div className="space-y-6 md:col-span-2">
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-primary/10 rounded-xl border border-primary/20">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Pascal Info
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t("footer.description")}
                <br />
                {t("footer.accredited")}{" "}
              </p>

              {/* Social Proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarImage src="/certifications/iso.png" />
                    <AvatarFallback>ISO</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarImage src="/certifications/ministry.png" />
                    <AvatarFallback>MEN</AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-xs text-muted-foreground">
                  {t("footer.accreditations")}{" "}
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {t("footer.quickLinks.title")}
              </h3>
              <ul className="space-y-3">
                {(Array.isArray(
                  t("footer.quickLinks.items", { returnObjects: true })
                )
                  ? (t("footer.quickLinks.items", {
                      returnObjects: true,
                    }) as string[])
                  : []
                ).map((link: string) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Resources */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                {t("footer.resources.title")}
              </h3>
              <ul className="space-y-3">
                {(Array.isArray(
                  t("footer.resources.items", { returnObjects: true })
                )
                  ? (t("footer.resources.items", {
                      returnObjects: true,
                    }) as string[])
                  : []
                ).map((link: string) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <FileText className="h-4 w-4 text-muted-foreground/50" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-4 md:col-span-2">
              {/*<NewsletterSubscription
          title={t("footer.newsletter.title")}
          description={t("footer.newsletter.description")}
          buttonText={t("footer.newsletter.button")}
          placeholder={t("footer.newsletter.placeholder")}
          className="space-y-4"
        />*/}
              {/* Contact Info */}
              <div className="pt-6 mt-6 border-t border-muted/20">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {t("footer.contact.phone")}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {t("footer.contact.email")}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {t("footer.contact.hours")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-muted/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground text-center">
              {t("footer.copyright")}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {t("footer.developed")}
              </span>
              <a
                href="https://coderabbit.de"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/coderabbit-logo.svg" // Default logo
                  alt="Coderabbit Digital Solutions"
                  width={40}
                  height={40}
                  className="block dark:hidden" // Show in light mode
                />
                <Image
                  src="/coderabbit-logo-dark.svg" // Dark mode logo
                  alt="Coderabbit Digital Solutions"
                  width={40}
                  height={40}
                  className="hidden dark:block" // Show in dark mode
                />
                <span className="font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Coderabbit Digital Solutions
                </span>
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com/coderabbitDS"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Facebook className="h-5 w-5 text-[#1877F2]" />
                </Button>
              </a>
              <a
                href="https://www.linkedin.com/in/rabichbibi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                </Button>
              </a>
              <a
                href="https://instagram.com/coderabbit_digital"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Instagram className="h-5 w-5 text-[#E4405F]" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
