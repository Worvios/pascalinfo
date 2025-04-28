"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/utils/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppointmentDialog from "@/components/AppointmentDialog";
import {
  GraduationCap,
  Microscope,
  HeartHandshake,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactSection() {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const isRtl = direction === "rtl";

  const socialLinks = [
    {
      name: t("contact.social.follow"),
      icon: Facebook,
      url: "https://facebook.com/centrepascalinfo",
      color: "text-blue-600 hover:text-blue-700",
      bg: "bg-blue-50 hover:bg-blue-100",
    },
    {
      name: t("contact.social.connect"),
      icon: Linkedin,
      url: "https://linkedin.com/company/pascal-info",
      color: "text-blue-500 hover:text-blue-600",
      bg: "bg-blue-50 hover:bg-blue-100",
    },
    {
      name: t("contact.social.explore"),
      icon: Instagram,
      url: "https://instagram.com/centre_pascal_info",
      color: "text-pink-600 hover:text-pink-700",
      bg: "bg-pink-50 hover:bg-pink-100",
    },
  ];

  const contactInfo = [
    { icon: GraduationCap, text: t("contact.address") },
    { icon: Microscope, text: t("contact.hours") },
    { icon: HeartHandshake, text: t("contact.email") },
  ];

  return (
    <section
      id="contact"
      className="relative py-16 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,theme(colors.primary/12)_0%,transparent_70%)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,theme(colors.primary/4)_25%,transparent_25%,transparent_50%,theme(colors.primary/4)_50%,theme(colors.primary/4)_75%,transparent_75%,transparent)] bg-[size:4rem_4rem] opacity-15 animate-bg-slide" />
        {/* Floating Circles */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/10 animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-primary/10 animate-float" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-primary/10 animate-float-reverse" />
      </div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 animate-pulse" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 animate-gradient-text">
            {t("contact.title")}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("contact.description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Map Section */}
          <Card className="relative h-[400px] rounded-2xl overflow-hidden border border-primary/15 shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent z-10" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3371.313075176366!2d-6.3628693880172005!3d32.33030380657073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda387b4f96b285d%3A0xc07927fdc2e9d3c4!2sINSTITUT%20PASCAL%20INFO!5e0!3m2!1sfr!2sma!4v1744722831065!5m2!1sfr!2sma"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full relative z-0"
              title="Pascal Info Location"
            />
            <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full shadow-md text-sm animate-pulse-slow">
              {t("contact.map_label", "Our Location")}
            </div>
          </Card>

          {/* Info & Social Section */}
          <Card
            className={cn(
              "bg-background/95 backdrop-blur-xl p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col",
              isRtl ? "text-right" : "text-left"
            )}
          >
            <CardContent className="flex flex-col h-full justify-between space-y-6 p-0">
              {/* Header */}
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {t("contact.connect")}
                </h3>
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                  {t("contact.description")}
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:text-primary",
                      isRtl ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    {React.createElement(info.icon, {
                      className: "h-5 w-5 text-primary shrink-0",
                    })}
                    <span className="text-sm font-medium">{info.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Media Buttons */}
              <div
                className={cn(
                  "flex flex-wrap gap-3",
                  isRtl ? "justify-end" : "justify-start"
                )}
              >
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        "rounded-full px-5 py-1.5 gap-2 text-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md",
                        social.bg,
                        isRtl ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      {React.createElement(social.icon, {
                        className: cn("h-4 w-4", social.color),
                      })}
                      <span className="font-medium">{social.name}</span>
                    </Button>
                  </a>
                ))}
              </div>

              {/* Call to Action */}
              <div
                className="p-5 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/15"
                dir={isRtl ? "rtl" : "ltr"}
              >
                <p className="text-sm text-muted-foreground mb-3">
                  {t("contact.cta.title")}
                </p>
                <AppointmentDialog dir={isRtl ? "rtl" : "ltr"} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx global>{`
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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(5px);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .animate-bg-slide {
          animation: bg-slide 25s linear infinite;
        }

        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-text 8s ease infinite;
        }

        .animate-float {
          animation: float 7s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 9s ease-in-out infinite;
        }

        .shadow-2xl {
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
        }

        .hover\:shadow-2xl:hover {
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
}
