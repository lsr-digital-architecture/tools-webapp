import React from 'react';
import { useTheme } from '@/presentation/hooks/useTheme';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? 'Activer le mode sombre' : 'Activer le mode clair'}
      title={isLight ? 'Passer en mode sombre' : 'Passer en mode clair'}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-md border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        isLight
          ? 'bg-white border-slate-300/80 text-amber-500 hover:text-amber-600 hover:border-sky-400 hover:bg-slate-50 shadow-sm'
          : 'bg-surface border-border-subtle text-accent hover:border-accent/40 hover:bg-surface-elevated'
      } ${className}`}
    >
      <span className="relative w-4 h-4 flex items-center justify-center" aria-hidden="true">
        {isLight ? (
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 -rotate-12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z" />
          </svg>
        )}
      </span>
      <span
        className={`absolute top-0 right-0 w-1 h-1 transition-colors ${
          isLight ? 'bg-[#0284c7]' : 'bg-accent'
        }`}
      />
    </button>
  );
};
