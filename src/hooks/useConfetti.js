import { useState } from 'react';

/**
 * Hook tạo hiệu ứng confetti
 * @param {Object} options - Cấu hình confetti
 * @param {Array} options.colors - Mảng các màu sắc
 * @param {Array} options.types - Mảng các loại (icon) confetti
 * @param {number} options.duration - Thời gian hiển thị confetti (ms)
 * @returns {Object} - Trạng thái và phương thức tạo confetti
 */
export function useConfetti(options = {}) {
  const [confetti, setConfetti] = useState([]);
  
  const defaultColors = ['#FF8FAB', '#F96483', '#DA7F8F', '#FFC4D0', '#FFACC7'];
  const defaultTypes = ['heart', 'paw', 'star'];
  
  const createConfetti = (count = 20) => {
    const newConfetti = Array.from({ length: count }, (_, index) => ({
      id: Date.now() + index,
      x: Math.random() * 100,
      y: -10,
      size: Math.random() * 8 + 5,
      opacity: 0.8 + Math.random() * 0.2,
      rotation: Math.random() * 360,
      type: options.types?.[Math.floor(Math.random() * options.types.length)] || 
            defaultTypes[Math.floor(Math.random() * defaultTypes.length)],
      color: options.colors?.[Math.floor(Math.random() * options.colors.length)] || 
             defaultColors[Math.floor(Math.random() * defaultColors.length)]
    }));

    setConfetti(prev => [...prev, ...newConfetti]);

    setTimeout(() => {
      setConfetti(prev => prev.filter(c => !newConfetti.some(n => n.id === c.id)));
    }, options.duration || 3000);
  };
  
  return { confetti, createConfetti };
} 