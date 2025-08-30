import { useState, useEffect } from 'react';

/**
 * Hook for managing user preferences and accessibility settings
 */
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState({
    reduceMotion: false,
    highContrast: false,
    reducedAnimations: false,
    theme: 'light'
  });

  useEffect(() => {
    // Check system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Load saved preferences
    const savedPreferences = localStorage.getItem('userPreferences');
    const parsed = savedPreferences ? JSON.parse(savedPreferences) : {};

    setPreferences(prev => ({
      ...prev,
      reduceMotion: parsed.reduceMotion ?? prefersReducedMotion,
      highContrast: parsed.highContrast ?? prefersHighContrast,
      theme: parsed.theme ?? (prefersDarkMode ? 'dark' : 'light'),
      reducedAnimations: parsed.reducedAnimations ?? prefersReducedMotion
    }));
  }, []);

  const updatePreference = (key, value) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
    
    // Apply CSS classes to document
    document.documentElement.classList.toggle('reduce-motion', newPreferences.reduceMotion);
    document.documentElement.classList.toggle('high-contrast', newPreferences.highContrast);
    document.documentElement.classList.toggle('reduced-animations', newPreferences.reducedAnimations);
    document.documentElement.setAttribute('data-theme', newPreferences.theme);
  };

  return { preferences, updatePreference };
};

/**
 * Hook for conditional animations based on user preferences
 */
export const useConditionalAnimation = (animation, fallback = {}) => {
  const { preferences } = useUserPreferences();
  
  if (preferences.reduceMotion || preferences.reducedAnimations) {
    return fallback;
  }
  
  return animation;
};
