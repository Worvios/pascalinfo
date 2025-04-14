"use client";

import React from "react";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
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
  X,
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function SchoolShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("FR");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const mediaItems = [
    { type: "image", src: "/img1.jpg" },
    { type: "image", src: "/img2.jpg" },
    { type: "image", src: "/img3.jpg" },
    { type: "video", src: "/school-video.mp4" },
  ];

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`font-sans ${darkMode ? "dark" : ""}`}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 text-foreground shadow-sm backdrop-blur-md border-b border-muted">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className="relative rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 p-1 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
            <img
              src="/logo-pascal.png"
              alt="Pascal Info Logo"
              className="h-14 w-14 rounded-full object-cover border-2 border-background"
            />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
            Pascal Info
          </span>
        </div>

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
                onChange={(e) => setLanguage(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg bg-background border text-sm appearance-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="FR">Français</option>
                <option value="EN">English</option>
                <option value="AR">العربية</option>
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
      <section id="home" className="relative h-screen w-full">
        <Carousel
          plugins={[Autoplay({ delay: 5000 })]}
          className="h-full w-full"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {mediaItems.map((item, index) => (
              <CarouselItem key={index} className="relative h-screen">
                {item.type === "video" ? (
                  <video
                    autoPlay
                    muted
                    loop
                    className="h-full w-full object-cover brightness-75"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={item.src}
                    alt="Installations de Pascal Info"
                    className="h-full w-full object-cover brightness-75"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div className="max-w-4xl px-4 space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-xl">
                      Façonnez Votre Avenir Professionnel
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground font-light text-white/90">
                      Centre de formation et de services éducatifs d'excellence
                      au Maroc
                    </p>
                    <Button
                      size="lg"
                      className="rounded-full px-8 py-6 text-lg"
                    >
                      Découvrir Nos Programmes
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* About Us */}
      <section id="about" className="py-20 px-4 md:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              À Propos de Pascal Info
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Établi en 1996, Pascal Info est devenu un centre d'excellence en
              matière de formation professionnelle au Maroc. Notre approche
              globale combine l'expertise technique et le développement
              personnel pour préparer nos étudiants aux défis du marché du
              travail moderne.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-background border">
                <h3 className="text-2xl font-bold text-primary">25+</h3>
                <p className="text-muted-foreground">Années d'Expérience</p>
              </div>
              <div className="p-4 rounded-xl bg-background border">
                <h3 className="text-2xl font-bold text-primary">10+</h3>
                <p className="text-muted-foreground">Services Éducatifs</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full px-8">
                  En Savoir Plus
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl p-8">
                <div className="space-y-4">
                  <Trophy className="h-12 w-12 text-primary" />
                  <h3 className="text-2xl font-bold">Nos Distinctions</h3>
                  <ul className="space-y-2 list-disc pl-6 text-muted-foreground">
                    <li>Partenariats avec des entreprises leaders au Maroc</li>
                    <li>Installations modernes et équipement de pointe</li>
                    <li>
                      Corps enseignant composé de professionnels expérimentés
                    </li>
                    <li>Taux de réussite exceptionnel parmi nos diplômés</li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/logo-pascal.png"
              alt="Centre Pascal Info"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Nos Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Code,
                title: "Diplôme Bac+2 en Développement Informatique",
                text: "Formation complète en programmation et développement de logiciels",
              },
              {
                icon: ChefHat,
                title: "Diplôme Bac+2 en Gestion d'Entreprise",
                text: "Acquérez les compétences essentielles pour gérer et développer une entreprise",
              },
              {
                icon: BookOpen,
                title: "Cours de Soutien",
                text: "Accompagnement personnalisé pour les élèves de tous niveaux",
              },
              {
                icon: Globe,
                title: "Cours de Langues",
                text: "Apprenez les langues étrangères avec des méthodes modernes et efficaces",
              },
              {
                icon: GraduationCap,
                title: "Formation Professionnelle Continue",
                text: "Perfectionnez vos compétences ou réorientez votre carrière",
              },
              {
                icon: HeartHandshake,
                title: "Traduction",
                text: "Services de traduction professionnelle dans plusieurs langues",
              },
              {
                icon: Microscope,
                title: "Inscription aux Écoles Supérieures",
                text: "Assistance pour les inscriptions au Maroc et à l'étranger",
              },
              {
                icon: Trophy,
                title: "Salles VIP et Équipées",
                text: "Espaces modernes avec vidéoprojecteurs pour une expérience d'apprentissage optimale",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-muted/10 border rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="mb-4">
                  <item.icon className="h-8 w-8 text-primary group-hover:animate-bounce" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-8 bg-muted/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Témoignages
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
                        "Grâce à Pascal Info, j'ai pu acquérir des compétences
                        pratiques qui m'ont permis de trouver rapidement un
                        emploi dans mon domaine."
                      </p>
                      <div>
                        <p className="font-semibold">Mehdi Tazi</p>
                        <p className="text-sm text-muted-foreground">
                          Diplomé 2023
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
            Pourquoi Choisir Pascal Info?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: GraduationCap,
                title: "Formateurs Experts",
                text: "Professionnels expérimentés et pédagogues qualifiés",
              },
              {
                icon: Microscope,
                title: "Équipements Modernes",
                text: "Salles informatiques et ressources pédagogiques à jour",
              },
              {
                icon: HeartHandshake,
                title: "Accompagnement Personnalisé",
                text: "Suivi individuel pour la réussite de chaque étudiant",
              },
              {
                icon: Trophy,
                title: "Résultats Prouvés",
                text: "Excellents taux de placement professionnel pour nos diplômés",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-muted/10 border rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div className="mb-4">
                  <item.icon className="h-8 w-8 text-primary group-hover:animate-bounce" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Location */}
      <section className="py-20 px-4 md:px-8 bg-muted/10">
        <div className="max-w-7xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Visitez Notre Centre
          </h2>
          <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.678901234567!2d-0.12345678901234567!3d51.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDA3JzI0LjQiTiAwwrAwNyczNi4wIlc!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="rounded-full gap-2">
              <Facebook className="h-4 w-4" /> Suivre
            </Button>
            <Button variant="outline" className="rounded-full gap-2">
              <Linkedin className="h-4 w-4" /> Connecter
            </Button>
            <Button variant="outline" className="rounded-full gap-2">
              <Instagram className="h-4 w-4" /> Suivre
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">Pascal Info</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Votre partenaire de confiance en formation depuis 1996.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Liens Rapides</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Admissions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Calendrier des Formations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Carrières
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Contact</h3>
              <div className="space-y-2">
                <Input
                  placeholder="Entrez votre email"
                  className="bg-muted/10"
                />
                <Textarea
                  placeholder="Votre message"
                  className="bg-muted/10 h-24"
                />
                <Button className="w-full">Envoyer</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Mentions Légales</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Politique de Confidentialité
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Conditions d'Utilisation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Accessibilité
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 Pascal Info. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
