import React, { useState, useEffect, type ReactNode } from 'react';
import { LanguageContext } from '@/presentation/i18n/languageContextInstance';
import { translations, type Language } from '@/presentation/i18n/translations';

const getInitialLanguage = (): Language => {
  const rawLang = localStorage.getItem('lsr-tools-lang');
  const savedLang = rawLang === 'en' || rawLang === 'fr' ? rawLang : undefined;

  if (savedLang) {
    return savedLang;
  }

  const sysLang = navigator.language.toLowerCase();
  if (sysLang.startsWith('fr')) {
    return 'fr';
  }

  return 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    setLanguageState(getInitialLanguage());
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lsr-tools-lang', lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
