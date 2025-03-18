import React, { useEffect, useRef } from 'react';

/**
 * BokehEffect component - Tạo hiệu ứng ánh sáng bokeh tinh tế
 * @param {Object} props
 * @param {number} props.count - Số lượng điểm bokeh (mặc định: 15)
 * @param {string} props.color - Màu của hiệu ứng bokeh (mặc định: trắng)
 * @param {string} props.className - Classes bổ sung 
 * @param {number} props.minSize - Kích thước nhỏ nhất (px) (mặc định: 30)
 * @param {number} props.maxSize - Kích thước lớn nhất (px) (mặc định: 100)
 * @param {number} props.opacity - Độ trong suốt (0-1) (mặc định: 0.3) 
 * @param {boolean} props.colorful - Bokeh nhiều màu (mặc định: false)
 */
const BokehEffect = ({ 
  count = 15, 
  color = "255, 255, 255", 
  className = "", 
  minSize = 30,
  maxSize = 100,
  opacity = 0.3,
  colorful = false
}) => {
  const containerRef = useRef(null);
  
  // Các màu pastel cho chế độ nhiều màu
  const pastelColors = [
    "255, 209, 220", // Hồng
    "230, 230, 250", // Lavender
    "201, 247, 231", // Mint
    "255, 218, 185", // Peach
    "255, 249, 196", // Vàng nhạt
    "220, 235, 252", // Xanh da trời nhạt
  ];
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Xóa bokeh cũ khi component re-render
    container.innerHTML = '';
    
    // Tạo các phần tử bokeh mới
    for (let i = 0; i < count; i++) {
      const size = Math.random() * (maxSize - minSize) + minSize;
      
      // Vị trí ngẫu nhiên trong container
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      // Animation duration và delay
      const duration = 15 + Math.random() * 20;
      const delay = Math.random() * 5;
      
      // Di chuyển theo hướng ngẫu nhiên
      const travelX = (Math.random() - 0.5) * 100;
      const travelY = -50 - Math.random() * 100; // Hầu hết đều di chuyển lên
      
      // Chọn màu ngẫu nhiên nếu là chế độ nhiều màu
      const bokehColor = colorful 
        ? pastelColors[Math.floor(Math.random() * pastelColors.length)]
        : color;
      
      // Tạo phần tử bokeh
      const bokeh = document.createElement('div');
      bokeh.classList.add('bokeh');
      bokeh.style.width = `${size}px`;
      bokeh.style.height = `${size}px`;
      bokeh.style.background = `radial-gradient(circle at center, rgba(${bokehColor},0.8) 0%, rgba(${bokehColor},0) 70%)`;
      bokeh.style.left = `${posX}%`;
      bokeh.style.top = `${posY}%`;
      bokeh.style.animationDuration = `${duration}s`;
      bokeh.style.animationDelay = `${delay}s`;
      bokeh.style.setProperty('--bokeh-opacity', opacity.toString());
      bokeh.style.setProperty('--bokeh-travel-x', `${travelX}px`);
      bokeh.style.setProperty('--bokeh-travel-y', `${travelY}px`);
      
      container.appendChild(bokeh);
    }
  }, [count, color, minSize, maxSize, opacity, colorful, pastelColors]);
  
  return (
    <div 
      ref={containerRef} 
      className={`bokeh-container ${className}`}
      style={{ position: 'absolute', pointerEvents: 'none' }}
    />
  );
};

export default BokehEffect; 