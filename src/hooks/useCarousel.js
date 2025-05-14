import { useState, useEffect } from 'react';

/**
 * Hook quản lý carousel/slider với các chức năng next/prev và auto play
 * @param {Array} items - Mảng các items sẽ được hiển thị trong carousel
 * @param {number} interval - Thời gian chuyển đổi tự động (ms)
 * @param {boolean} autoPlay - Có tự động chuyển đổi không
 * @returns {Object} - Các phương thức và state điều khiển carousel
 */
export function useCarousel(items, interval = 8000, autoPlay = true) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const next = () => setCurrentIndex(prev => (prev === items.length - 1 ? 0 : prev + 1));
  const prev = () => setCurrentIndex(prev => (prev === 0 ? items.length - 1 : prev - 1));
  
  useEffect(() => {
    if (!autoPlay) return;
    
    const intervalId = setInterval(() => {
      next();
    }, interval);
    
    return () => clearInterval(intervalId);
  }, [autoPlay, interval, items.length]);
  
  return {
    currentIndex,
    currentItem: items[currentIndex],
    next,
    prev,
    setIndex: setCurrentIndex
  };
} 