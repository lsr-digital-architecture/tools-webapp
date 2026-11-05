import { createContext } from 'react';
import { translations, type Language } from '@/presentation/i18n/translations';

export interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);
