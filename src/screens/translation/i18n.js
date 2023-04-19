
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './english.json';
import da from './danish.json';
  
i18n.use(initReactI18next).init({
  // lng: 'en',
  // fallbackLng: 'en',
    lng: 'da',
  fallbackLng: 'da',
  resources: {
    en: en,
    da: da,
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
  
export default i18n;