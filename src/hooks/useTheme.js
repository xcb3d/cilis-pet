import { useState, useEffect } from 'react';

/**
 * Hook quản lý theme của ứng dụng
 * @param {string} defaultTheme - Theme mặc định
 * @param {string} storageKey - Khóa để lưu theme trong localStorage
 * @returns {Object} - Thông tin và phương thức điều khiển theme
 */
export function useTheme(defaultTheme = 'spring', storageKey = 'cilispet-theme') {
  const [theme, setTheme] = useState(defaultTheme);
  
  // Khởi tạo theme từ localStorage khi component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [storageKey]);
  
  // Cập nhật theme và lưu vào localStorage
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem(storageKey, newTheme);
    
    // Có thể thêm logic cập nhật các class CSS hoặc biến toàn cục ở đây
    document.body.dataset.theme = newTheme;
  };
  
  // Thêm class theme vào body khi theme thay đổi
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);
  
  return { theme, updateTheme };
} 