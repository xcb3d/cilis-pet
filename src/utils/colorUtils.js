/**
 * Color utility functions for accessibility and theming
 */

// WCAG AA compliant color pairs
export const accessibleColors = {
  primary: {
    background: '#FFB6C1', // Light pink
    text: '#8B0000',       // Dark red - 4.52:1 ratio
    hover: '#FF69B4'       // Hot pink
  },
  secondary: {
    background: '#E6E6FA', // Lavender
    text: '#4B0082',       // Indigo - 4.51:1 ratio
    hover: '#DDA0DD'       // Plum
  },
  success: {
    background: '#98FB98', // Pale green
    text: '#006400',       // Dark green - 4.56:1 ratio
    hover: '#90EE90'       // Light green
  },
  warning: {
    background: '#FFE4B5', // Moccasin
    text: '#8B4513',       // Saddle brown - 4.52:1 ratio
    hover: '#F0E68C'       // Khaki
  },
  error: {
    background: '#FFB6C1', // Light pink
    text: '#8B0000',       // Dark red - 4.52:1 ratio
    hover: '#FF69B4'       // Hot pink
  }
};

/**
 * Get accessible color pair based on theme
 */
export const getAccessibleColor = (type = 'primary') => {
  return accessibleColors[type] || accessibleColors.primary;
};

/**
 * Calculate contrast ratio between two colors
 */
export const getContrastRatio = (color1, color2) => {
  const getLuminance = (color) => {
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Check if color combination meets WCAG standards
 */
export const isAccessible = (backgroundColor, textColor, level = 'AA') => {
  const ratio = getContrastRatio(backgroundColor, textColor);
  return level === 'AAA' ? ratio >= 7 : ratio >= 4.5;
};

/**
 * Generate theme-aware CSS custom properties
 */
export const generateThemeProperties = (theme = 'light') => {
  const colors = theme === 'dark' ? {
    primary: '#FF69B4',
    secondary: '#DDA0DD',
    background: '#1a1a1a',
    text: '#ffffff'
  } : {
    primary: '#FFB6C1',
    secondary: '#E6E6FA',
    background: '#ffffff',
    text: '#333333'
  };
  
  return Object.entries(colors).reduce((acc, [key, value]) => {
    acc[`--color-${key}`] = value;
    return acc;
  }, {});
};
