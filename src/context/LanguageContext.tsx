import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { SupportedLanguage, SiteContent, UiTranslations } from '../types';
import { LANGUAGES, getSiteContent, getUiTranslations, type LanguageInfo } from '../content';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  content: SiteContent;
  ui: UiTranslations;
  languages: LanguageInfo[];
  showFloatingPrompt: boolean;
  dismissFloatingPrompt: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'the_indian_pottery_lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read initial language from localStorage or default to 'en'
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
      if (saved && ['en', 'te', 'hi', 'ta', 'ml', 'kn'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore storage access issues
    }
    return 'en';
  });

  // Floating prompt: shows immediately on page load, auto-dismisses after 6.5 seconds
  const [showFloatingPrompt, setShowFloatingPrompt] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloatingPrompt(false);
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  const dismissFloatingPrompt = useCallback(() => {
    setShowFloatingPrompt(false);
  }, []);

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguageState(lang);
    setShowFloatingPrompt(false);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, []);

  const currentContent = useMemo(() => getSiteContent(language), [language]);
  const currentUi = useMemo(() => getUiTranslations(language), [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      content: currentContent,
      ui: currentUi,
      languages: LANGUAGES,
      showFloatingPrompt,
      dismissFloatingPrompt,
    }),
    [language, setLanguage, currentContent, currentUi, showFloatingPrompt, dismissFloatingPrompt]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
