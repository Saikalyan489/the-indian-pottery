import { enContent } from './en';
import { teContent } from './te';
import { hiContent } from './hi';
import { taContent } from './ta';
import { mlContent } from './ml';
import { knContent } from './kn';
import { UI_TRANSLATIONS } from './uiTranslations';
import type { SiteContent, SupportedLanguage, UiTranslations } from '../types';

export interface LanguageInfo {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const LANGUAGES: LanguageInfo[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', flag: '🇮🇳' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', flag: '🇮🇳' },
  { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം', flag: '🇮🇳' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', flag: '🇮🇳' },
];

export const CONTENTS: Record<SupportedLanguage, SiteContent> = {
  en: enContent,
  te: teContent,
  hi: hiContent,
  ta: taContent,
  ml: mlContent,
  kn: knContent,
};

export const getSiteContent = (lang: SupportedLanguage): SiteContent => {
  return CONTENTS[lang] || enContent;
};

export const getUiTranslations = (lang: SupportedLanguage): UiTranslations => {
  return UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;
};

// Backwards-compatibility default exports
export const currentLanguage: SupportedLanguage = 'en';
export const content: SiteContent = enContent;
export { enContent, teContent, hiContent, taContent, mlContent, knContent, UI_TRANSLATIONS };
