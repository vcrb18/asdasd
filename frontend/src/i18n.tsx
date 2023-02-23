import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define the translation resources for your app
const resources = {
  en: {
    translation: {
      greeting: 'Hello',
      farewell: 'Goodbye',
      // Add more translations as needed
    },
  },
  es: {
    translation: {
      greeting: 'Hola',
      farewell: 'Adiós',
      // Add more translations as needed
    },
  },
};

// Initialize the i18n library
i18n.use(initReactI18next).init({
  resources,
  lng: 'es', // Set the default language
  fallbackLng: 'en', // Use English as the fallback language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
