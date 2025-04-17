import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translation files
import en from "../locales/en.json";
import fr from "../locales/fr.json";
import ar from "../locales/ar.json";
//import es from "../locales/es.json";
//import it from "../locales/it.json";
//import de from "../locales/de.json";

// Initialize i18next
i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    ar: { translation: ar },
    // es: { translation: es },
    // it: { translation: it },
    // de: { translation: de },
  },
  lng: "fr", // Default language
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18next;
