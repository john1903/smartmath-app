import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import en from "./en.json";
import pl from "./pl.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import your translations
const resources = {
  en: { translation: en },
  pl: { translation: pl },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for RN
  },
});

AsyncStorage.getItem("appLanguage").then((lng) => {
  if (lng) {
    i18n.changeLanguage(lng);
  } else {
    // fallback: device language
    const deviceLang = "en";
    i18n.changeLanguage(deviceLang);
  }
});

export default i18n;
