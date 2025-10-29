import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../theme/colors';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: typeof Colors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  // Load theme from AsyncStorage
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('appTheme');
      if (stored === 'dark' || stored === 'light') {
        setTheme(stored);
      }
    })();
  }, []);

  // Save to AsyncStorage on change
  useEffect(() => {
    AsyncStorage.setItem('appTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const themedColors =
    theme === 'dark'
      ? { ...Colors, background: Colors.dark.background, text: Colors.dark.text, surface: Colors.dark.surface, textSecondary: Colors.dark.textSecondary, border: Colors.dark.border }
      : Colors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: themedColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
