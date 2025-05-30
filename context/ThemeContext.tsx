import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: typeof Colors.light | typeof Colors.dark;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@theme_preference';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved theme preference
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
          setTheme(savedTheme as ThemeType);
        } else {
          // If no saved theme, set to dark and save it
          setTheme('dark');
          await AsyncStorage.setItem(THEME_STORAGE_KEY, 'dark');
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
        // On error, default to dark theme
        setTheme('dark');
      } finally {
        setIsInitialized(true);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const colors = theme === 'light' ? Colors.light : Colors.dark;

  if (!isInitialized) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 