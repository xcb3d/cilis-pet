import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useHover } from '@use-gesture/react';
import { FaPaw, FaHeart, FaSearch, FaPlus, FaTrash, FaEdit, FaSave, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

/**
 * PetButton - Nút 3D đẹp mắt với hiệu ứng hover và click
 * 
 * @param {Object} props
 * @param {Function} props.onClick - Callback khi nhấn nút
 * @param {string} props.className - Classes tùy chỉnh
 * @param {string|ReactNode} props.text - Văn bản hoặc nội dung hiển thị trên nút
 * @param {string} props.icon - Biểu tượng: 'paw', 'heart', 'search', 'plus', 'trash', 'edit', 'save', 'check', hoặc không có
 * @param {string} props.size - Kích thước: 'xs', 'sm', 'md', 'lg', 'xl', 'icon'
 * @param {string} props.variant - Biến thể: 'primary', 'secondary', 'gradient', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'outline'
 * @param {string} props.to - Nếu có, sẽ render thành Link thay vì button
 * @param {boolean} props.disabled - Vô hiệu hóa nút
 * @param {boolean} props.full - Chiều rộng 100%
 * @param {boolean} props.rounded - Nút hình tròn (nếu là icon) hoặc bo tròn
 * @param {boolean} props.noEffects - Tắt hiệu ứng 3D và sparkle
 * @param {string} props.type - Loại nút: 'button', 'submit', 'reset'
 */
const PetButton = ({ 
  onClick, 
  className = "", 
  text, 
  icon = "",
  size = "md",
  variant = "primary",
  to = null,
  disabled = false,
  full = false,
  rounded = true,
  noEffects = false,
  type = "button",
  ...rest
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  // Motion values nếu có hiệu ứng
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useTransform(y, [0, 1], [4, -4]); // Giảm mức độ xoay để không quá mạnh
  const rotateY = useTransform(x, [0, 1], [-4, 4]); // Giảm mức độ xoay
  
  // Quản lý hover gesture nếu có hiệu ứng
  const bindHover = useHover(({ active, xy: [px, py], target }) => {
    if (noEffects) return;
    
    if (active && !disabled) {
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
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-2.5 text-lg",
    xl: "px-8 py-3 text-xl",
    icon: "p-2" // Chỉ dành cho icon
  };
  
  // Xác định classes dựa trên biến thể
  const variantClasses = {
    primary: "bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-300",
    secondary: "bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-300",
    gradient: "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-300",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-300",
    info: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
    light: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300",
    dark: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-600",
    outline: "bg-transparent border-2 border-pink-500 text-pink-500 hover:bg-pink-50 focus:ring-pink-300",
  };
  
  // Hiệu ứng sparkle
  const [sparkles, setSparkles] = useState([]);
  
  const addSparkle = () => {
    if (noEffects || disabled) return;
    
    // Màu sparkle dựa trên variant
    let colors;
    switch (variant) {
      case 'primary':
      case 'gradient':
        colors = ['#FF8FAB', '#F96483', '#DA7F8F'];
        break;
      case 'secondary':
        colors = ['#C084FC', '#A855F7', '#9333EA'];
        break;
      case 'success':
        colors = ['#86EFAC', '#4ADE80', '#22C55E'];
        break;
      case 'danger':
        colors = ['#FCA5A5', '#F87171', '#EF4444'];
        break;
      case 'warning':
        colors = ['#FDE68A', '#FBBF24', '#F59E0B'];
        break;
      case 'info':
        colors = ['#93C5FD', '#60A5FA', '#3B82F6'];
        break;
      default:
        colors = ['#FF8FAB', '#F96483', '#DA7F8F'];
    }
    
    // Tạo sparkle mới
    const newSparkle = {
      id: Date.now(),
      size: Math.random() * 8 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
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
      case 'heart':
        return <FaHeart />;
      case 'search':
        return <FaSearch />;
      case 'plus':
        return <FaPlus />;
      case 'trash':
        return <FaTrash />;
      case 'edit':
        return <FaEdit />;
      case 'save':
        return <FaSave />;
      case 'check':
        return <FaCheck />;
      default:
        return null;
    }
  };
  
  // Class tổng hợp
  const combinedClasses = `
    transition duration-300 ease-in-out
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${full ? 'w-full' : ''}
    ${rounded ? (size === 'icon' && !text ? 'rounded-full' : 'rounded-full') : 'rounded-md'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'focus:ring-2 focus:ring-offset-1'}
    ${className}
  `;
  
  // Xử lý sự kiện click
  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
    
    // Thêm sparkle khi click
    if (!noEffects) {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => addSparkle(), i * 50);
      }
    }
  };
  
  // Component nội dung
  const content = (
    <>
      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2 justify-center">
        {getIcon() && <span className={text ? '' : 'text-center'}>{getIcon()}</span>}
        {text && <span>{text}</span>}
      </span>
      
      {/* Button shine effect nếu có hiệu ứng */}
      {!noEffects && !disabled && (
        <motion.div 
          className="absolute inset-0 opacity-10 rounded-full"
          style={{
            background: `radial-gradient(circle at ${x.get() * 100}% ${y.get() * 100}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`,
          }}
        />
      )}
      
      {/* Button shadow effect cho cảm giác 3D nếu có hiệu ứng */}
      {!noEffects && !disabled && (
        <motion.div 
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `inset ${(x.get() - 0.5) * 5}px ${(y.get() - 0.5) * 5}px 10px rgba(0,0,0,0.1)`,
            zIndex: 1
          }}
        />
      )}
      
      {/* Sparkles effect */}
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
            y: [0, -20],
            x: [0, (Math.random() - 0.5) * 30]
          }}
          transition={{ duration: 1 }}
        />
      ))}
    </>
  );
  
  // Render button hoặc link tùy thuộc vào prop 'to'
  if (to) {
    return (
      <motion.div
        className={`relative inline-block ${full ? 'w-full' : ''}`}
        style={noEffects ? {} : { 
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
        {...(noEffects ? {} : bindHover())}
        whileTap={disabled || noEffects ? {} : { scale: 0.95 }}
        onMouseDown={() => !disabled && !noEffects && setIsPressed(true)}
        onMouseUp={() => !disabled && !noEffects && setIsPressed(false)}
      >
        {/* Link 3D với transform */}
        <motion.div
          style={noEffects ? {} : {
            rotateX,
            rotateY,
            z: isPressed ? 0 : 5,
            transformStyle: "preserve-3d",
          }}
          className="w-full"
        >
          <Link
            to={to}
            className={`relative overflow-hidden font-medium shadow-sm flex items-center justify-center gap-2 ${combinedClasses}`}
            onClick={handleClick}
            {...rest}
          >
            {content}
          </Link>
        </motion.div>
        
        {/* 3D shadow nếu có hiệu ứng */}
        {!noEffects && !disabled && (
          <motion.div
            className="absolute -bottom-1 left-1 right-1 h-2 bg-black/10 rounded-full blur-md"
            style={{
              rotateX,
              rotateY,
              scale: 0.95,
              opacity: isPressed ? 0.2 : 0.3,
              y: isPressed ? 0 : -3
            }}
            initial={false}
          />
        )}
      </motion.div>
    );
  }
  
  // Render button
  return (
    <motion.div
      className={`relative inline-block ${full ? 'w-full' : ''}`}
      style={noEffects ? {} : { 
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      {...(noEffects ? {} : bindHover())}
      whileTap={disabled || noEffects ? {} : { scale: 0.95 }}
      onMouseDown={() => !disabled && !noEffects && setIsPressed(true)}
      onMouseUp={() => !disabled && !noEffects && setIsPressed(false)}
    >
      {/* Button 3D with transform */}
      <motion.button
        type={type}
        disabled={disabled}
        className={`relative overflow-hidden font-medium shadow-sm flex items-center justify-center gap-2 ${combinedClasses}`}
        style={noEffects ? {} : {
          rotateX,
          rotateY,
          z: isPressed ? 0 : 5,
          transformStyle: "preserve-3d",
        }}
        onClick={handleClick}
        {...rest}
      >
        {content}
      </motion.button>
      
      {/* 3D shadow nếu có hiệu ứng */}
      {!noEffects && !disabled && (
        <motion.div
          className="absolute -bottom-1 left-1 right-1 h-2 bg-black/10 rounded-full blur-md"
          style={{
            rotateX,
            rotateY,
            scale: 0.95,
            opacity: isPressed ? 0.2 : 0.3,
            y: isPressed ? 0 : -3
          }}
          initial={false}
        />
      )}
    </motion.div>
  );
};

export default PetButton; 