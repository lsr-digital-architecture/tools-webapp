import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext, type Theme } from './themeContextCore';

/** Shared with marketing-website so preference syncs across LSR sites. */
const THEME_STORAGE_KEY = 'lsr_theme_preference';

const applyTheme = (newTheme: Theme) => {
  const root = document.documentElement;
  if (newTheme === 'light') {
    root.classList.remove('dark');
    root.classList.add('light');
    root.dataset.theme = 'light';
  } else {
    root.classList.remove('light');
    root.classList.add('dark');
    root.dataset.theme = 'dark';
  }

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', newTheme === 'light' ? '#f8fafc' : '#090A0F');
  }
  const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
  if (metaColorScheme) {
    metaColorScheme.setAttribute('content', newTheme);
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      return 'light';
    }
    return 'light';
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme, toggleTheme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
