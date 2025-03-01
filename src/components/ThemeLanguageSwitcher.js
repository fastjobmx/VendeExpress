import React, { useState, useEffect } from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeLanguageSwitcher = ({ onLanguageChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('es'); // 'es' for Spanish, 'en' for English
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Initialize theme based on system preference or localStorage
  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');
    
    // Set theme
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // If no saved preference, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }

    // Set language
    if (savedLanguage) {
      setLanguage(savedLanguage);
      if (onLanguageChange) onLanguageChange(savedLanguage);
    }
  }, [onLanguageChange]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Change language
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    setShowLanguageDropdown(false);
    if (onLanguageChange) onLanguageChange(lang);
  };

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col items-end gap-2">
      {/* Theme toggle button */}
      <motion.button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-yellow-500 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>

      {/* Language dropdown */}
      <div className="relative">
        <motion.button
          onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-blue-500 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Change language"
        >
          <Globe size={20} />
        </motion.button>

        {showLanguageDropdown && (
          <motion.div 
            className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <button 
              onClick={() => changeLanguage('es')}
              className={`block w-full text-left px-4 py-2 text-sm ${language === 'es' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
            >
              Español
            </button>
            <button 
              onClick={() => changeLanguage('en')}
              className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
            >
              English
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ThemeLanguageSwitcher;