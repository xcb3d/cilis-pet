import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useHover } from '@use-gesture/react';
import { FaPaw } from 'react-icons/fa';

/**
 * AdoptButton3D - Nút nhận nuôi với hiệu ứng 3D khi hover
 * 
 * @param {Object} props
 * @param {Function} props.onClick - Callback khi nhấn nút
 * @param {string} props.className - Thêm classes tùy chỉnh
 * @param {string} props.text - Văn bản trên nút
 * @param {string} props.icon - Biểu tượng (mặc định là paw)
 * @param {string} props.size - Kích thước: 'sm', 'md', 'lg'
 * @param {string} props.variant - Biến thể: 'primary', 'secondary', 'gradient'
 */
const AdoptButton3D = ({ 
  onClick, 
  className = "", 
  text = "Nhận nuôi ngay", 
  icon = "paw",
  size = "md",
  variant = "primary"
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  // Motion values
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [8, -8]); // Xoay theo trục X ngược với vị trí Y
  const rotateY = useTransform(x, [0, 1], [-8, 8]); // Xoay theo trục Y cùng chiều với vị trí X
  
  // Quản lý hover gesture
  const bindHover = useHover(({ active, velocity, movement: [mx, my], xy: [px, py], target }) => {
    if (active) {
      // Tính toán vị trí tương đối trong element
      const rect = target.getBoundingClientRect();
      const normalizedX = (px - rect.left) / rect.width;
      const normalizedY = (py - rect.top) / rect.height;
      
      // Cập nhật motion values
      x.set(normalizedX);
      y.set(normalizedY);
    } else {
      // Reset về giữa khi không hover
      x.set(0.5);
      y.set(0.5);
    }
  });
  
  // Xác định classes dựa trên kích thước
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  // Xác định classes dựa trên biến thể
  const variantClasses = {
    primary: "bg-pink-500 text-white hover:bg-pink-600",
    secondary: "bg-purple-500 text-white hover:bg-purple-600",
    gradient: "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
  };
  
  // Hiệu ứng sparkle
  const [sparkles, setSparkles] = useState([]);
  
  const addSparkle = () => {
    // Tạo sparkle mới
    const newSparkle = {
      id: Date.now(),
      size: Math.random() * 10 + 5,
      color: ['#FF8FAB', '#F96483', '#DA7F8F'][Math.floor(Math.random() * 3)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: 1
    };
    
    // Thêm vào state
    setSparkles(prev => [...prev, newSparkle]);
    
    // Xóa sau 1 giây
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
    }, 1000);
  };
  
  // Xác định icon
  const getIcon = () => {
    switch (icon) {
      case 'paw':
        return <FaPaw />;
      default:
        return <FaPaw />;
    }
  };

  return (
    <motion.div
      className={`relative perspective-[1000px] ${className}`}
      style={{ 
        transformStyle: "preserve-3d",
        transformPerspective: "1000px",
        perspective: "1000px"
      }}
      {...bindHover()}
      whileTap={{ scale: 0.95 }}
      onMouseDown={() => {
        setIsPressed(true);
        // Thêm 5 sparkles khi nhấn
        for (let i = 0; i < 5; i++) {
          setTimeout(() => addSparkle(), i * 50);
        }
      }}
      onMouseUp={() => setIsPressed(false)}
    >
      {/* Button 3D với transform */}
      <motion.button
        className={`relative overflow-hidden rounded-full font-medium shadow-lg flex items-center justify-center gap-2 transition-colors ${sizeClasses[size]} ${variantClasses[variant]}`}
        style={{
          rotateX,
          rotateY,
          z: isPressed ? 0 : 10,
          transformStyle: "preserve-3d",
        }}
        onClick={onClick}
      >
        {/* Layer 1: Button content */}
        <span className="relative z-10 flex items-center gap-2">
          <span>{getIcon()}</span>
          <span>{text}</span>
        </span>
        
        {/* Layer 2: Button shine effect */}
        <motion.div 
          className="absolute inset-0 bg-white opacity-10"
          style={{
            background: `radial-gradient(circle at ${x.get() * 100}% ${y.get() * 100}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)`,
          }}
        />
        
        {/* Layer 3: Button shadow effect for 3D feel */}
        <motion.div 
          className="absolute inset-0"
          style={{
            boxShadow: `inset ${(x.get() - 0.5) * 10}px ${(y.get() - 0.5) * 10}px 15px rgba(0,0,0,0.1)`,
            zIndex: 1
          }}
        />
        
        {/* Layer 4: Sparkles effect */}
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            className="absolute rounded-full z-20 pointer-events-none"
            style={{
              width: sparkle.size,
              height: sparkle.size,
              backgroundColor: sparkle.color,
              top: `${sparkle.y}%`,
              left: `${sparkle.x}%`,
              opacity: sparkle.opacity
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1.5, 0.5],
              opacity: [1, 0.8, 0],
              y: [0, -30],
              x: [0, (Math.random() - 0.5) * 40]
            }}
            transition={{ duration: 1 }}
          />
        ))}
      </motion.button>
      
      {/* 3D shadow for elevated effect */}
      <motion.div
        className="absolute -bottom-1 left-1 right-1 h-3 bg-black/10 rounded-full blur-md"
        style={{
          rotateX,
          rotateY,
          scale: 0.95,
          opacity: isPressed ? 0.2 : 0.3,
          y: isPressed ? 0 : -5
        }}
        initial={false}
      />
    </motion.div>
  );
};

export default AdoptButton3D; 