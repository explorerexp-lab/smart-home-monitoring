'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type ThemeMode = 'oled' | 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  cycleTheme: () => void;
  isOLED: boolean;
  isDark: boolean;
  powerSavings: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'smart-home-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to OLED dark mode as requested by user
  const [theme, setThemeState] = useState<ThemeMode>('oled');
  const [mounted, setMounted] = useState(false);

  // Apply theme to document element
  const applyTheme = useCallback((newTheme: ThemeMode) => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.setAttribute('data-theme', newTheme);

    // Update classes for Tailwind dark: support
    root.classList.remove('dark', 'light', 'oled');
    if (newTheme === 'oled') {
      root.classList.add('dark', 'oled');
    } else if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
  }, []);

  // Initialize theme from localStorage or default to OLED
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (savedTheme && (savedTheme === 'oled' || savedTheme === 'dark' || savedTheme === 'light')) {
        setThemeState(savedTheme);
        applyTheme(savedTheme);
      } else {
        // Default to OLED mode for maximum OLED screen friendliness
        setThemeState('oled');
        applyTheme('oled');
        localStorage.setItem(STORAGE_KEY, 'oled');
      }
    } catch {
      applyTheme('oled');
    }
    setMounted(true);
  }, [applyTheme]);

  const setTheme = useCallback(
    (newTheme: ThemeMode) => {
      setThemeState(newTheme);
      applyTheme(newTheme);
      try {
        localStorage.setItem(STORAGE_KEY, newTheme);
      } catch (e) {
        console.error('Failed to save theme in localStorage', e);
      }
    },
    [applyTheme]
  );

  const cycleTheme = useCallback(() => {
    setThemeState((current) => {
      const order: ThemeMode[] = ['oled', 'dark', 'light'];
      const nextIndex = (order.indexOf(current) + 1) % order.length;
      const nextTheme = order[nextIndex];
      applyTheme(nextTheme);
      try {
        localStorage.setItem(STORAGE_KEY, nextTheme);
      } catch (e) {
        console.error('Failed to save theme in localStorage', e);
      }
      return nextTheme;
    });
  }, [applyTheme]);

  // Global keyboard shortcuts: 't' to cycle, 'o' for instant OLED mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === 't' || e.key === 'T') {
        cycleTheme();
      } else if (e.key === 'o' || e.key === 'O') {
        setTheme('oled');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cycleTheme, setTheme]);

  // Estimated display power savings on OLED / AMOLED displays
  const powerSavings =
    theme === 'oled'
      ? '~68% Display Power Saved'
      : theme === 'dark'
      ? '~32% Display Power Saved'
      : '0% (Baseline LCD/White)';

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        cycleTheme,
        isOLED: theme === 'oled',
        isDark: theme === 'oled' || theme === 'dark',
        powerSavings,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
