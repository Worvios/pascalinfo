"use client";

import React, { useState, useEffect } from "react";

// Extend the Window interface to include the formkit property
declare global {
  interface Window {
    formkit?: {
      init: () => void;
    };
  }
}
import { Button } from "@/components/ui/button";
import { Mail, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import Script from "next/script";

const NewsletterSubscription = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { t } = useTranslation();

  // Reset form when opened to ensure ConvertKit renders properly
  useEffect(() => {
    if (isOpen && window.formkit) {
      // Give time for modal to render before initializing form
      setTimeout(() => {
        try {
          window.formkit?.init();
        } catch (error) {
          console.error("Error initializing ConvertKit form:", error);
        }
      }, 100);
    }
  }, [isOpen]);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
    if (typeof window !== "undefined" && window.formkit) {
      window.formkit.init();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* ConvertKit Script */}
      <Script
        src="https://f.convertkit.com/ckjs/ck.5.js"
        strategy="lazyOnload"
        onLoad={handleScriptLoad}
      />

      {/* Button to toggle the newsletter form */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="sm"
          className="flex items-center gap-2 rounded-full py-5 shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-white border-none"
          aria-label="Subscribe to newsletter"
        >
          <Mail className="h-4 w-4" />
          <span className="font-medium text-sm hidden md:inline-block">
            {t("footer.newsletter.title")}
          </span>
        </Button>
      )}

      {/* Newsletter popup */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Newsletter Modal */}
          <div className="fixed bottom-0 md:bottom-auto inset-x-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full max-w-md md:rounded-xl bg-background shadow-2xl border border-primary/20 overflow-hidden transition-all animation-slide-up md:animation-pop-in z-50">
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-muted/20">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                {t("footer.newsletter.title")}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full w-8 h-8 p-0"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Newsletter form */}
            <div className="p-5 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Inscrivez-vous à notre newsletter pour recevoir nos dernières
                  actualités et promotions.
                </p>
              </div>

              {/* ConvertKit form container */}
              <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-muted/30 shadow-sm">
                <form
                  action="https://app.convertkit.com/forms/dc4673f8de/subscriptions"
                  method="post"
                  data-sv-form="dc4673f8de"
                  data-uid="dc4673f8de"
                  data-format="inline"
                  data-version="5"
                  data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Merci pour votre inscription !","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
                  min-width="400 500 600 700 800"
                  className="newsletter-form"
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
                      className="flex items-end gap-2 seva-fields formkit-fields"
                    >
                      <div className="formkit-field flex-1">
                        <input
                          className="formkit-input border border-muted rounded-md px-4 py-2 w-full text-sm"
                          name="email_address"
                          aria-label="Email Address"
                          placeholder="Votre adresse email"
                          required
                          type="email"
                        />
                      </div>
                      <button
                        data-element="submit"
                        className="formkit-submit formkit-submit bg-primary hover:bg-primary/90 text-white rounded-md py-2 px-4 text-sm"
                      >
                        <div className="formkit-spinner">
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                        <span>{t("footer.newsletter.subscribe")}</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsletterSubscription;
