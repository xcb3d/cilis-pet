import { useEffect, useRef } from 'react';

/**
 * Hook để thực hiện các hành động lặp đi lặp lại theo một khoảng thời gian
 * @param {Function} callback - Hàm sẽ được gọi theo mỗi interval
 * @param {number} delay - Thời gian delay giữa các lần gọi callback (ms), null để dừng
 */
export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Lưu callback mới nhất
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Thiết lập interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
} 