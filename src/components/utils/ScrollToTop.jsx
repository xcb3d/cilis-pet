import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component cuộn trang lên đầu khi đường dẫn URL thay đổi
 * Đặt component này trong Router để có hiệu lực cho toàn bộ ứng dụng
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuộn lên đầu trang khi đường dẫn thay đổi
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Sử dụng 'smooth' để tạo hiệu ứng cuộn mượt mà, 'auto' để cuộn ngay lập tức
    });
  }, [pathname]);

  return null; // Component này không render gì cả
};

export default ScrollToTop; 