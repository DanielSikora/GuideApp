import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Tłumaczenia dla różnych języków
const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      // Dodaj więcej tłumaczeń dla angielskiego
    },
  },
  pl: {
    translation: {
      welcome: 'Witaj',
      // Dodaj więcej tłumaczeń dla polskiego
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Domyślny język
  fallbackLng: 'en', // Język zapasowy
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
