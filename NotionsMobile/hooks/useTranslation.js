import React, { createContext, useContext, useState, useCallback } from "react";
import { translations } from "./translations"; // Import translation data

// Create Translation Context
const TranslationContext = createContext();

// Translation Provider Component
const TranslationProvider = ({ children, initialLang = "en" }) => {
  const [language, setLanguage] = useState(initialLang);
  const [locale, setLocale] = useState("en"); 
  // Function to get translation key
  const t = useCallback(
    (key) => {
      const langData = translations[language] || translations["en"]; // Fallback to English
      return langData[key] || key; // Return key itself if translation not found
    },
    [language]
  );

  // Function to change language
  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
  }, []);

  return (
    <TranslationContext.Provider value={{ t, changeLanguage, language }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom Hook to Use Translation
const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};

// Export both the Provider and Hook
export { TranslationProvider, useTranslation };
