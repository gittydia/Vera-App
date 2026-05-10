import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('vera-theme');
    return (saved as Theme) || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--bg-primary', '#0A0A0F');
      root.style.setProperty('--bg-secondary', '#0F0F1A');
      root.style.setProperty('--bg-tertiary', '#1A1A2E');
      root.style.setProperty('--text-primary', '#FFFFFF');
      root.style.setProperty('--text-secondary', '#9CA3AF');
      root.style.setProperty('--text-tertiary', '#6B7280');
      root.style.setProperty('--border-color', '#1A1A2E');
    } else {
      root.style.setProperty('--bg-primary', '#FFFFFF');
      root.style.setProperty('--bg-secondary', '#F9FAFB');
      root.style.setProperty('--bg-tertiary', '#F3F4F6');
      root.style.setProperty('--text-primary', '#111827');
      root.style.setProperty('--text-secondary', '#4B5563');
      root.style.setProperty('--text-tertiary', '#6B7280');
      root.style.setProperty('--border-color', '#E5E7EB');
    }
    localStorage.setItem('vera-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
