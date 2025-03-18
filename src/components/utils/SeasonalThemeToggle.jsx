import React, { useState, useEffect } from 'react';
import { FaSun, FaLeaf, FaSnowflake, FaFan } from 'react-icons/fa';
import { motion } from 'framer-motion';

/**
 * SeasonalThemeToggle component - Cho phép người dùng thay đổi chủ đề theo mùa
 * @param {Object} props
 * @param {function} props.onThemeChange - Callback function khi chủ đề thay đổi
 * @param {string} props.initialTheme - Chủ đề ban đầu ('spring', 'summer', 'autumn', 'winter')
 */
const SeasonalThemeToggle = ({ onThemeChange, initialTheme = 'spring' }) => {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  
  // Các chủ đề theo mùa
  const themes = [
    { name: 'spring', label: 'Xuân', icon: <FaFan />, color: '#FFD6E4', hoverColor: '#FFA5C3' },
    { name: 'summer', label: 'Hạ', icon: <FaSun />, color: '#A2D2FF', hoverColor: '#7FC8FF' },
    { name: 'autumn', label: 'Thu', icon: <FaLeaf />, color: '#FFDAB9', hoverColor: '#FFC58B' },
    { name: 'winter', label: 'Đông', icon: <FaSnowflake />, color: '#E2EAFC', hoverColor: '#C1D3FE' },
  ];
  
  // Thay đổi chủ đề
  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    if (onThemeChange) {
      onThemeChange(theme);
    }
    
    // Lưu chủ đề vào localStorage để giữ lại khi refresh
    localStorage.setItem('cilispet-theme', theme);
    
    // Thêm class chủ đề vào body
    document.body.className = document.body.className
      .replace(/feminine-theme-\w+/g, '')
      .trim();
    document.body.classList.add(`feminine-theme-${theme}`);
  };
  
  // Khôi phục chủ đề từ localStorage khi component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('cilispet-theme');
    if (savedTheme) {
      changeTheme(savedTheme);
    } else {
      changeTheme(initialTheme);
    }
  }, [initialTheme]);
  
  return (
    <div className="seasonal-theme-toggle">
      <div className="flex items-center mb-2">
        <span className="mr-2 text-sm font-medium text-gray-600">Chủ đề: </span>
        <motion.span 
          className="glitter-text font-medium"
          style={{ color: themes.find(t => t.name === currentTheme)?.color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={currentTheme}
        >
          {themes.find(t => t.name === currentTheme)?.label}
        </motion.span>
      </div>
      
      <div className="flex space-x-2">
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => changeTheme(theme.name)}
            className={`seasonal-theme-button p-2 rounded-full transition-all duration-300 ${
              currentTheme === theme.name ? 'scale-110 shadow-md' : 'opacity-70'
            }`}
            style={{ 
              backgroundColor: theme.color,
              boxShadow: currentTheme === theme.name ? `0 0 15px ${theme.color}80` : 'none'
            }}
            aria-label={`Chuyển sang chủ đề ${theme.label}`}
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              style={{ color: currentTheme === theme.name ? '#ffffff' : '#4A4A4A' }}
            >
              {theme.icon}
            </motion.div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeasonalThemeToggle; 