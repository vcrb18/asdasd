import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "@/assets/locales/es.json";
import en from "@/assets/locales/en.json";

const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("language") || "es",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    console.log("i18n initialized successfully");
  })
  .catch((error) => {
    console.log("i18n initialization error:", error);
  });

export default i18n;
