import React from 'react';
import type { Language } from '@/presentation/i18n/translations';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
}) => (
  <div className="flex gap-1.5">
    <button
      type="button"
      onClick={() => onLanguageChange('en')}
      className={`border-none text-text-main cursor-pointer px-2.5 py-1.5 rounded text-sm transition-colors ${currentLanguage === 'en' ? 'bg-overlay' : 'bg-transparent hover:bg-overlay-hover'}`}
    >
      EN
    </button>
    <button
      type="button"
      onClick={() => onLanguageChange('fr')}
      className={`border-none text-text-main cursor-pointer px-2.5 py-1.5 rounded text-sm transition-colors ${currentLanguage === 'fr' ? 'bg-overlay' : 'bg-transparent hover:bg-overlay-hover'}`}
    >
      FR
    </button>
  </div>
);
