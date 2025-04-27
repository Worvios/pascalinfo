"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import AppointmentDialog from "@/components/AppointmentDialog";
import {
  GraduationCap,
  Microscope,
  HeartHandshake,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";

export default function ContactSection() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: t("contact.social.follow"),
      icon: Facebook,
      url: "https://facebook.com/centrepascalinfo",
      color: "text-blue-600",
    },
    {
      name: t("contact.social.connect"),
      icon: Linkedin,
      url: "https://linkedin.com/company/pascal-info",
      color: "text-blue-500",
    },
    {
      name: t("contact.social.explore"),
      icon: Instagram,
      url: "https://instagram.com/centre_pascal_info",
      color: "text-pink-600",
    },
  ];

  const contactInfo = [
    { icon: GraduationCap, text: t("contact.address") },
    { icon: Microscope, text: t("contact.hours") },
    { icon: HeartHandshake, text: t("contact.email") },
  ];

  return (
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
              className="w-full h-full"
              title="Pascal Info Location"
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
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {React.createElement(info.icon, {
                      className: "h-5 w-5 text-primary",
                    })}
                    <span className="text-sm">{info.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Media Buttons */}
              <div className="flex flex-wrap gap-4 mt-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="rounded-full gap-2 px-6 hover:bg-primary/10 transition-all hover:scale-105"
                    >
                      {React.createElement(social.icon, {
                        className: `h-5 w-5 ${social.color}`,
                      })}
                      <span>{social.name}</span>
                    </Button>
                  </a>
                ))}
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
  );
}
