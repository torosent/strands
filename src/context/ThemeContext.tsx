'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeMode } from '@/types/game';

type ThemeContextType = {
  theme: ThemeMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Always initialize with 'light' theme for server rendering
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  // Effect only runs client-side after mount
  useEffect(() => {
    // Mark component as mounted
    setMounted(true);
    
    // Get theme from localStorage on client side only
    try {
      const savedTheme = localStorage.getItem('theme') as ThemeMode;
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Use system preference as fallback
        setTheme('dark');
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      // Handle localStorage not being available
      console.warn('localStorage is not available:', e);
    }
  }, []);

  const toggleTheme = () => {
    // Only toggle theme after component is mounted
    if (!mounted) return;
    
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    try {
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    } catch (e) {
      console.warn('localStorage is not available:', e);
    }
  };

  // Don't render anything different on server vs client
  // This avoids hydration mismatch
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};