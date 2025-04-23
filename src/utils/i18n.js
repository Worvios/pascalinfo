import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import enTranslations from "../locales/en.json";
import frTranslations from "../locales/fr.json";
import arTranslations from "../locales/ar.json";
import esTranslations from "../locales/es.json";
import deTranslations from "../locales/de.json";
import itTranslations from "../locales/it.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    fr: {
      translation: frTranslations,
    },
    ar: {
      translation: arTranslations,
    },
    es: {
      translation: esTranslations,
    },
    de: {
      translation: deTranslations,
    },
    it: {
      translation: itTranslations,
    },
  },
  lng: "fr", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
