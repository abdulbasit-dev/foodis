
import React, { createContext, useContext, useState, useEffect } from 'react';

export type ColorTheme = 'pink' | 'green' | 'blue' | 'purple';

interface ThemeContextType {
  currentTheme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themeColors = {
  pink: {
    '--primary': '340 82% 52%',
    '--primary-foreground': '0 0% 100%',
    '--secondary': '320 100% 95%',
    '--secondary-foreground': '340 82% 52%',
    '--muted': '320 100% 96%',
    '--accent': '310 100% 93%',
    '--accent-foreground': '340 82% 52%',
    '--border': '314 31.8% 91.4%',
    '--input': '314 31.8% 91.4%',
    '--ring': '340 82% 52%',
    '--recipe-warm': '340 82% 52%',
    '--recipe-warm-light': '320 100% 95%',
  },
  green: {
    '--primary': '142 76% 36%',
    '--primary-foreground': '0 0% 100%',
    '--secondary': '138 76% 97%',
    '--secondary-foreground': '142 76% 36%',
    '--muted': '138 76% 96%',
    '--accent': '138 76% 93%',
    '--accent-foreground': '142 76% 36%',
    '--border': '138 31.8% 91.4%',
    '--input': '138 31.8% 91.4%',
    '--ring': '142 76% 36%',
    '--recipe-warm': '142 76% 36%',
    '--recipe-warm-light': '138 76% 97%',
  },
  blue: {
    '--primary': '221 83% 53%',
    '--primary-foreground': '0 0% 100%',
    '--secondary': '210 100% 95%',
    '--secondary-foreground': '221 83% 53%',
    '--muted': '210 100% 96%',
    '--accent': '210 100% 93%',
    '--accent-foreground': '221 83% 53%',
    '--border': '214 31.8% 91.4%',
    '--input': '214 31.8% 91.4%',
    '--ring': '221 83% 53%',
    '--recipe-warm': '221 83% 53%',
    '--recipe-warm-light': '210 100% 95%',
  },
  purple: {
    '--primary': '262 83% 58%',
    '--primary-foreground': '0 0% 100%',
    '--secondary': '270 100% 95%',
    '--secondary-foreground': '262 83% 58%',
    '--muted': '270 100% 96%',
    '--accent': '270 100% 93%',
    '--accent-foreground': '262 83% 58%',
    '--border': '266 31.8% 91.4%',
    '--input': '266 31.8% 91.4%',
    '--ring': '262 83% 58%',
    '--recipe-warm': '262 83% 58%',
    '--recipe-warm-light': '270 100% 95%',
  },
};

const applyThemeToDocument = (theme: ColorTheme) => {
  const root = document.documentElement;
  const colors = themeColors[theme];
  
  // Apply the theme colors to CSS variables
  Object.entries(colors).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  console.log(`Applied ${theme} theme with colors:`, colors);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>('pink');

  const setTheme = (theme: ColorTheme) => {
    console.log(`Switching to ${theme} theme`);
    setCurrentTheme(theme);
    applyThemeToDocument(theme);
    localStorage.setItem('color-theme', theme);
  };

  useEffect(() => {
    // Load saved theme on mount or default to pink
    const savedTheme = localStorage.getItem('color-theme') as ColorTheme;
    const initialTheme = savedTheme && themeColors[savedTheme] ? savedTheme : 'pink';
    
    setCurrentTheme(initialTheme);
    applyThemeToDocument(initialTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
