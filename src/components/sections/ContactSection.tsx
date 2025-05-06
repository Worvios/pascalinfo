"use client";

import React from "react";
import { useTranslation } from "react-i18next";
// Assuming useLanguage provides direction, otherwise use i18n.dir()
// import { useLanguage } from "@/utils/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppointmentDialog from "@/components/AppointmentDialog";
import {
  MapPin, // Changed from GraduationCap for Address
  Clock, // Changed from Microscope for Hours
  Mail, // Changed from HeartHandshake for Email
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactSection() {
  const { t, i18n } = useTranslation(); // Use i18n instance
  const direction = i18n.dir(); // Get direction from i18n
  // const isRtl = direction === "rtl"; // Removed as it's not used

  // Social Links - Defined name, icon, url. Styling applied via cn() below.
  // Added fallbacks to t()
  const socialLinks = React.useMemo(() => [ // Wrapped in useMemo as it depends on t
    {
      name: t("contact.social.facebook", "Facebook"),
      icon: Facebook,
      url: "https://facebook.com/centrepascalinfo",
      iconColor: "text-[#1877F2] dark:text-[#4299E1]",
      hoverBg: "hover:bg-[#1877F2]/10 dark:hover:bg-[#4299E1]/10",
      hoverBorder: "hover:border-[#1877F2]/30 dark:hover:border-[#4299E1]/30",
    },
    {
      name: t("contact.social.linkedin", "LinkedIn"),
      icon: Linkedin,
      url: "https://linkedin.com/company/pascal-info",
      iconColor: "text-[#0A66C2] dark:text-[#38A1F3]",
      hoverBg: "hover:bg-[#0A66C2]/10 dark:hover:bg-[#38A1F3]/10",
      hoverBorder: "hover:border-[#0A66C2]/30 dark:hover:border-[#38A1F3]/30",
    },
    {
      name: t("contact.social.instagram", "Instagram"),
      icon: Instagram,
      url: "https://instagram.com/centre_pascal_info",
      iconColor: "text-[#E1306C] dark:text-[#F687B3]",
      hoverBg: "hover:bg-[#E1306C]/10 dark:hover:bg-[#F687B3]/10",
      hoverBorder: "hover:border-[#E1306C]/30 dark:hover:border-[#F687B3]/30",
    },
  ], [t]);

  // Contact Info - Using more standard icons & added fallbacks
  const contactInfo = React.useMemo(() => [ // Wrapped in useMemo as it depends on t
    { icon: MapPin, text: t("contact.address", "123 Pascal Street, Rabat, Morocco") },
    { icon: Clock, text: t("contact.hours", "Mon - Fri: 9:00 AM - 6:00 PM") },
    { icon: Mail, text: t("contact.email", "contact@pascalinfo.com") },
  ], [t]);

  return (
    <section
      id="contact"
      className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background" // Adjusted gradient
    >
      {/* Background Effects - Adjusted opacity/blur for subtlety */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,theme(colors.primary/8)_0%,transparent_50%)] opacity-50 animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,theme(colors.primary/8)_0%,transparent_50%)] opacity-50 animate-pulse" style={{ animationDelay: '3s' }}/>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,theme(colors.primary/5)_25%,transparent_25%,transparent_50%,theme(colors.primary/5)_50%,theme(colors.primary/5)_75%,transparent_75%,transparent)] bg-[size:6rem_6rem] opacity-10 animate-bg-slide" />
        {/* Floating Shapes - Using theme border color */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full border-2 border-primary/20 animate-float-slow blur-[1px]" />
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-lg border-2 border-primary/20 animate-float blur-[1px]" style={{ animationDelay: '2s' }}/>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/70 to-transparent animate-pulse" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient-text">
            {t("contact.title", "Get In Touch")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("contact.description", "We're ready to answer your questions. Reach out or visit us!")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Map Section */}
          <Card className="relative h-[400px] lg:h-full min-h-[350px] rounded-[--radius-lg] overflow-hidden border border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* === IMPORTANT: YOUR GOOGLE MAPS EMBED SRC IS NOW ADDED BELOW === */}
            <iframe
               src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d130738366.7210043!2d0!3d0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda387b4f96b285d%3A0xc07927fdc2e9d3c4!2sINSTITUT%20PASCAL%20INFO!5e0!3m2!1sfr!2sma!4v1746564695612!5m2!1sfr!2sma" // <<<--- YOUR GOOGLE MAPS EMBED URL
               width="100%" // Consider using 600 from your embed if specific size needed
               height="100%" // Consider using 450 from your embed if specific size needed
               style={{ border: 0 }} // Inline style for border:0 is common
               allowFullScreen={true} // Use boolean true (allowfullscreen="" is also valid)
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
               className="w-full h-full absolute inset-0"
               title={t("contact.map_title", "Pascal Info Location Map")}
             />
            {/* ================================================================================= */}
            <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground border border-border px-3 py-1 rounded-full shadow-md text-xs font-medium z-10">
              📍 {t("contact.map_label", "Our Location")}
            </div>
          </Card>

          {/* Info & Social Section */}
          <Card
            className={cn(
              "bg-background/90 backdrop-blur-lg border border-border p-6 md:p-8 rounded-[--radius-lg] shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col",
            )}
            dir={direction} // Set direction for RTL handling
          >
            <CardContent className="flex flex-col h-full justify-between space-y-6 p-0">
              {/* Header */}
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {t("contact.connect", "Connect With Us")}
                </h3>
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                  {t("contact.connect_description", "Find our contact details below and follow us online.")}
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 group transition-colors duration-300" // Rely on dir="rtl" for flex order
                  >
                    <info.icon
                      className="h-5 w-5 text-primary/80 group-hover:text-primary transition-colors shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{info.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Media Buttons */}
              <div
                className={cn(
                  "flex flex-wrap gap-3 pt-4 border-t border-border", // Added top border
                  // Rely on dir="rtl" for justify content alignment if needed, usually flex-start/end aligns automatically
                )}
              >
                 {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group" // Group class for hover effects on children
                    aria-label={social.name}
                  >
                    <Button
                      variant="ghost" // Use ghost as a base
                      size="sm"
                      className={cn(
                        "rounded-full px-4 py-1.5 h-9", // Sizing and shape
                        "border border-border bg-transparent", // Base border and background
                        "flex items-center gap-2 text-sm", // Flex layout and text size
                        "transition-all duration-300 ease-out", // Smooth transitions
                        "text-muted-foreground", // Base text color (readable)
                        // Hover Effects:
                        "group-hover:scale-[1.03] group-hover:shadow-md", // Scale and shadow on hover
                        "group-hover:text-foreground", // Text color changes on hover for contrast
                        social.hoverBg, // Apply the brand-specific hover background
                        social.hoverBorder // Apply the brand-specific hover border
                        // dir="rtl" on parent handles flex item order
                      )}
                    >
                      {/* Apply the specific brand color to the icon */}
                      <social.icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-colors", // Base icon styles
                          social.iconColor // Apply the brand-specific icon color
                        )}
                        aria-hidden="true"
                      />
                      {/* Text remains theme-aware for readability */}
                      <span>{social.name}</span>
                    </Button>
                  </a>
                ))}
              </div>

              {/* Call to Action */}
              <div
                className="p-4 md:p-5 bg-muted/50 rounded-[--radius-md] border border-border mt-2" // Use muted bg, slightly smaller radius
                // dir is inherited from parent Card
              >
                <p className="text-sm font-medium text-foreground mb-3">
                  {t("contact.cta.title", "Ready to Start Your Journey?")}
                </p>
                {/* Pass direction explicitly if needed, though context might work */}
                <AppointmentDialog dir={direction} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Keep necessary keyframes, ensure no conflicts */}
      <style jsx global>{`
        /* Add keyframes if they aren't globally defined elsewhere */
        @keyframes pulse-slow { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes bg-slide { 0% { background-position: 0 0; } 100% { background-position: 6rem 6rem; } }
        @keyframes gradient-text { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }

        .animate-pulse-slow { animation: pulse-slow 7s ease-in-out infinite; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-bg-slide { animation: bg-slide 30s linear infinite; }
        .animate-gradient-text { background-size: 200% 200%; animation: gradient-text 8s ease infinite; }
        .animate-float { animation: float 9s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }

        /* Ensure shadow definitions are consistent */
        .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.07); }
        .hover\\:shadow-xl:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08); }
        /* Dark mode shadows might need adjustment if default isn't visible */
        .dark .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -4px rgba(0, 0, 0, 0.15); }
        .dark .hover\\:shadow-xl:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2); }
      `}</style>
    </section>
  );
}
