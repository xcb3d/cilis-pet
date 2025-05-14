import { useState, useEffect } from 'react';

/**
 * Hook để theo dõi vị trí scroll và trả về trạng thái khi scroll vượt qua ngưỡng
 * @param {number} threshold - Ngưỡng scroll để trigger trạng thái (pixel)
 * @returns {boolean} - Trạng thái đã scroll vượt ngưỡng hay chưa
 */
export function useScroll(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > threshold;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Kiểm tra trạng thái ban đầu
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, threshold]);
  
  return scrolled;
} 