import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useHover, useGesture } from '@use-gesture/react';
import { FaHeart, FaPaw, FaBone, FaMapMarkerAlt } from 'react-icons/fa';

/**
 * PetGestureCard - Thẻ thú cưng với hiệu ứng parallax tương tác
 * 
 * @param {Object} props
 * @param {Object} props.pet - Dữ liệu thú cưng
 * @param {Function} props.onClick - Callback khi click vào thẻ
 * @param {Function} props.onLike - Callback khi like thú cưng
 */
const PetGestureCard = ({ pet, onClick, onLike }) => {
  const [liked, setLiked] = useState(false);
  const cardRef = useRef(null);
  
  // Motion values cho hiệu ứng parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Giá trị cho hiệu ứng rotate
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  // Giá trị cho hiệu ứng parallax các lớp
  const bgX = useTransform(x, [-100, 100], [10, -10]);
  const bgY = useTransform(y, [-100, 100], [10, -10]);
  
  const nameX = useTransform(x, [-100, 100], [5, -5]);
  const nameY = useTransform(y, [-100, 100], [5, -5]);
  
  const iconX = useTransform(x, [-100, 100], [15, -15]);
  const iconY = useTransform(y, [-100, 100], [15, -15]);
  
  const shadowBlur = useTransform(y, [-100, 100], [15, 5]);
  const shadowOpacity = useTransform(y, [-100, 100], [0.3, 0.15]);
  
  // Spring animations cho các chuyển động mượt mà
  const springConfig = { stiffness: 150, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  
  // Gesture binding cho mouse và touch
  const bind = useGesture(
    {
      onHover: ({ hovering }) => {
        if (!hovering) {
          x.set(0);
          y.set(0);
        }
      },
      onMove: ({ xy: [px, py] }) => {
        if (!cardRef.current) return;
        
        const rect = cardRef.current.getBoundingClientRect();
        // Tính toán vị trí tương đối của con trỏ
        const cx = px - rect.left - rect.width / 2;
        const cy = py - rect.top - rect.height / 2;
        
        x.set(cx);
        y.set(cy);
      },
    },
    {
      enabled: true,
      eventOptions: { passive: true },
    }
  );
  
  // Hiệu ứng fallback cho thiết bị di động
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Xử lý like
  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    if (onLike) onLike(pet, !liked);
    
    // Thêm hiệu ứng tim bay
    if (!liked) createHearts();
  };
  
  // Tạo hiệu ứng tim bay
  const [hearts, setHearts] = useState([]);
  
  const createHearts = () => {
    const newHearts = [];
    for (let i = 0; i < 7; i++) {
      newHearts.push({
        id: `heart-${Date.now()}-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 90 - 45,
        scale: 0.5 + Math.random() * 0.5,
        opacity: 0.6 + Math.random() * 0.4
      });
    }
    
    setHearts(prev => [...prev, ...newHearts]);
    
    // Xóa hearts sau 2s
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.some(n => n.id === h.id)));
    }, 2000);
  };
  
  // Mặc định ảnh nếu không có
  const petImage = pet.imageUrl || 'https://placekitten.com/400/400';
  
  return (
    <motion.div 
      className="relative perspective-[1000px] cursor-pointer w-full max-w-xs"
      ref={cardRef}
      {...(isMobile ? {} : bind())}
      onClick={() => onClick?.(pet)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        default: { type: "spring", stiffness: 300, damping: 20 },
        opacity: { duration: 0.3 }
      }}
    >
      {/* Card container with 3D effect */}
      <motion.div
        className="rounded-xl overflow-hidden shadow-xl bg-white border border-pink-100"
        style={{
          rotateX: isMobile ? 0 : springRotateX,
          rotateY: isMobile ? 0 : springRotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
          boxShadow: isMobile 
            ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            : `0 ${shadowBlur}px 25px -5px rgba(0, 0, 0, ${shadowOpacity})`
        }}
      >
        {/* Background image with parallax effect */}
        <div className="relative h-60 overflow-hidden">
          <motion.div
            className="absolute inset-0 scale-[1.1]" // Scale up a bit to prevent edges showing during parallax
            style={{
              x: isMobile ? 0 : bgX,
              y: isMobile ? 0 : bgY,
            }}
          >
            <img
              src={petImage}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Hearts animation on like */}
          {hearts.map(heart => (
            <motion.div
              key={heart.id}
              className="absolute z-10 text-pink-500 opacity-0"
              style={{
                top: `${heart.y}%`,
                left: `${heart.x}%`,
                rotate: heart.rotation,
                scale: heart.scale,
              }}
              initial={{ y: 0, opacity: heart.opacity }}
              animate={{ 
                y: -100, 
                opacity: 0,
                scale: [heart.scale, heart.scale * 1.5, heart.scale],
                rotate: [heart.rotation, heart.rotation + 20, heart.rotation - 20]
              }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <FaHeart size={24} />
            </motion.div>
          ))}
          
          {/* Like button */}
          <button
            className={`absolute top-4 right-4 p-3 rounded-full z-10 transition-all ${
              liked 
                ? 'bg-pink-500 text-white' 
                : 'bg-white/80 text-pink-500 hover:bg-pink-500 hover:text-white'
            }`}
            onClick={handleLike}
          >
            <FaHeart className={`text-lg ${liked ? 'animate-heartbeat' : ''}`} />
          </button>
          
          {/* Pet type tag */}
          <div className="absolute bottom-4 left-4 bg-white/80 px-3 py-1 rounded-full text-sm font-medium text-pink-800 backdrop-blur-sm flex items-center gap-1.5">
            <FaPaw className="text-pink-500" />
            <span>{pet.type || 'Mèo'}</span>
          </div>
        </div>
        
        {/* Content with parallax effect */}
        <div className="p-5 relative">
          {/* Pet name with parallax */}
          <motion.div
            style={{
              x: isMobile ? 0 : nameX,
              y: isMobile ? 0 : nameY,
              z: 20,
            }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{pet.name}</h3>
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
              <FaMapMarkerAlt />
              <span>{pet.location || 'Tp. Hồ Chí Minh'}</span>
            </div>
          </motion.div>
          
          {/* Details with parallax */}
          <motion.div 
            className="mb-4"
            style={{
              z: 30,
              y: isMobile ? 0 : nameY,
            }}
          >
            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="text-gray-600">
                <p className="text-sm font-medium">Tuổi</p>
                <p className="text-lg">{pet.age || '1 tuổi'}</p>
              </div>
              <div className="text-gray-600">
                <p className="text-sm font-medium">Giới tính</p>
                <p className="text-lg">{pet.gender || 'Đực'}</p>
              </div>
              <div className="text-gray-600">
                <p className="text-sm font-medium">Màu sắc</p>
                <p className="text-lg">{pet.color || 'Vàng'}</p>
              </div>
            </div>
          </motion.div>
          
          {/* Icons with stronger parallax */}
          <motion.div 
            className="absolute -right-2 -bottom-2 text-4xl text-pink-200 opacity-40"
            style={{
              x: isMobile ? 0 : iconX,
              y: isMobile ? 0 : iconY,
              z: 5,
              rotate: isMobile ? 0 : springRotateY,
            }}
          >
            <FaBone />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PetGestureCard; 