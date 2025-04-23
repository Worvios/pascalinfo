import { initReactI18next } from "react-i18next";
import i18n from "i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: require(".././locales/en.json"),
    },
    fr: {
      translation: require(".././locales/fr.json"),
    },
  },
  lng: "fr", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
