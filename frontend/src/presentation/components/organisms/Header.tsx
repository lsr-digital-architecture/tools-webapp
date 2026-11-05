import React from 'react';
import { useTranslation } from '@/presentation/i18n/useTranslation';
import { LanguageSwitcher } from '@/presentation/components/molecules/LanguageSwitcher';

const ECOSYSTEM_LINKS = [
  {
    id: 'marketing' as const,
    href: 'https://lsr-digital-architecture.com/',
  },
  {
    id: 'cv' as const,
    href: 'https://cv.lsr-digital-architecture.com/',
  },
];

export const Header: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();

  return (
    <header className="flex flex-col items-center my-5 relative gap-6">
      <div className="absolute top-0 right-0 flex items-center gap-3">
        <nav className="hidden sm:flex items-center gap-1.5" aria-label="Écosystème LSR">
          {ECOSYSTEM_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-text-dim border border-white/10 hover:text-accent hover:border-accent/40 transition-colors"
            >
              {t.nav[link.id]}
              <span className="opacity-60" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </nav>
        <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
      </div>

      <div className="flex flex-col items-center pt-8 sm:pt-2">
        <a
          href="https://lsr-digital-architecture.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mb-5 group"
          aria-label={t.header.eyebrow}
        >
          <div className="relative w-9 h-9 rounded-md bg-[#0D111A] border border-white/20 group-hover:border-accent transition-colors flex items-center justify-center overflow-hidden">
            <span className="relative font-mono font-bold text-xs text-accent">LSR</span>
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-accent" />
            <span className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-brand" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted group-hover:text-text-dim transition-colors">
            {t.header.eyebrow}
          </span>
        </a>

        <h1 className="text-[2.75rem] sm:text-[3rem] font-extrabold text-center tracking-tight text-gradient mb-2">
          {t.header.brand}{' '}
          <span className="font-light text-text-dim">{t.header.brandSuffix}</span>
        </h1>
        <p className="text-[1.05rem] text-text-dim text-center max-w-xl">{t.header.subtitle}</p>
      </div>
    </header>
  );
};
