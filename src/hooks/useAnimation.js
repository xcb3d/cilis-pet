import { useAnimation as useFramerAnimation } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Hook quản lý hiệu ứng animation tự động
 * @param {Object} options - Cấu hình animation
 * @param {Array|Object} options.initial - Trạng thái ban đầu
 * @param {Array|Object} options.animate - Trạng thái animation
 * @param {Object} options.transition - Cấu hình transition
 * @param {boolean} options.autoPlay - Tự động chạy animation
 * @returns {Object} - Đối tượng điều khiển animation
 */
export function useAnimation(options = {}) {
  const controls = useFramerAnimation();
  const { 
    initial = { opacity: 0 },
    animate = { opacity: 1 },
    transition = { duration: 0.5 },
    autoPlay = true 
  } = options;
  
  useEffect(() => {
    if (autoPlay) {
      controls.start(animate);
    }
    
    return () => controls.stop();
  }, [autoPlay, animate, controls]);
  
  return {
    controls,
    initial,
    animate,
    transition
  };
}

/**
 * Hook tạo hiệu ứng xoay cho element
 * @param {Array} degrees - Các giá trị góc xoay
 * @param {number} duration - Thời gian hoàn thành một chu kỳ
 * @param {boolean} autoPlay - Tự động chạy animation
 * @returns {Object} - Đối tượng điều khiển animation
 */
export function useRotation(degrees = [0, 10, -10, 0], duration = 2, autoPlay = true) {
  const controls = useFramerAnimation();
  
  useEffect(() => {
    if (autoPlay) {
      controls.start({
        rotate: degrees,
        transition: { duration, repeat: Infinity }
      });
    }
    
    return () => controls.stop();
  }, [autoPlay, controls, degrees, duration]);
  
  return controls;
} 