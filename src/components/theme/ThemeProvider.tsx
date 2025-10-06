import { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export interface ThemeProviderContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}


export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
}: ThemeProviderProps) {
  const isClient = typeof window !== 'undefined';

  const [theme, setThemeState] = useState<Theme>(() => {
    if (!isClient) return defaultTheme;
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  });

  // Fonction pour appliquer le thème sur le root
  const applyTheme = (t: Theme) => {
    if (!isClient) return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    if (t === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(t);
    }
  };

  // Mettre à jour localStorage et state
  const setTheme = (t: Theme) => {
    setThemeState(t);
    if (isClient) localStorage.setItem(storageKey, t);
  };

  // Effet pour appliquer le thème au montage et écouter system theme
  useEffect(() => {
    applyTheme(theme);

    if (!isClient) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (theme === 'system') applyTheme('system');
    };
    mediaQuery.addEventListener('change', handleSystemChange);

    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme, isClient]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

