import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { Link } from 'react-router-dom';
import { FaHeart, FaPaw, FaInfoCircle } from 'react-icons/fa';

/**
 * DraggablePetCard - Thẻ thú cưng có thể kéo thả với hiệu ứng tương tác
 * 
 * @param {Object} props
 * @param {Object} props.pet - Thông tin thú cưng 
 * @param {Function} props.onLike - Callback khi thích thú cưng
 * @param {Function} props.onDislike - Callback khi không thích
 * @param {Function} props.onRemove - Callback khi thẻ được loại bỏ khỏi danh sách
 */
const DraggablePetCard = ({ pet, onLike, onDislike, onRemove }) => {
  const [isGone, setIsGone] = useState(false);
  
  // Motion values để theo dõi vị trí và xoay
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  
  // Độ trong suốt của các biểu tượng like/dislike
  const likeOpacity = useTransform(x, [0, 150], [0, 1]);
  const dislikeOpacity = useTransform(x, [-150, 0], [1, 0]);
  
  // Scale biến đổi khi vuốt
  const scale = useTransform(
    x, 
    [-300, -150, 0, 150, 300], 
    [0.8, 0.9, 1, 0.9, 0.8]
  );
  
  // Gesture handler cho việc kéo thả
  const bindDrag = useDrag(({ down, movement: [mx], direction: [xDir], velocity, last }) => {
    const swipeThreshold = velocity > 0.3;
    
    if (!down && (Math.abs(mx) > 100 || swipeThreshold)) {
      // Xác định hành động dựa trên hướng vuốt
      if (xDir > 0) {
        onLike && onLike(pet);
      } else {
        onDislike && onDislike(pet);
      }
      
      // Kích hoạt hiệu ứng biến mất
      setIsGone(true);
      
      // Gọi callback onRemove sau khi animation kết thúc
      setTimeout(() => {
        onRemove && onRemove(pet.id);
      }, 200);
    }
    
    // Cập nhật vị trí
    x.set(down ? mx : 0);
    y.set(down ? 0 : 0);
  });

  if (isGone) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="relative"
        style={{ 
          x, 
          y, 
          rotate,
          scale,
          touchAction: 'none', // Ngăn chặn scroll trên touch devices khi đang kéo
        }}
        {...bindDrag()}
        whileTap={{ cursor: "grabbing" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Thẻ thú cưng */}
        <div className="card-hover-effect max-w-xs rounded-xl overflow-hidden shadow-lg bg-white border border-pink-100 transition-all duration-300 cursor-grab">
          {/* Hình ảnh thú cưng */}
          <div className="relative h-64 overflow-hidden">
            <img 
              src={pet.imageUrl || 'https://placekitten.com/300/300'} 
              alt={pet.name} 
              className="w-full h-full object-cover transition-transform duration-500"
            />
            
            {/* Like/Dislike indicators */}
            <motion.div 
              className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-xl transform rotate-12 border-2 border-white"
              style={{ opacity: likeOpacity }}
            >
              YÊU THÍCH!
            </motion.div>
            
            <motion.div 
              className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-xl transform -rotate-12 border-2 border-white"
              style={{ opacity: dislikeOpacity }}
            >
              BỎ QUA
            </motion.div>
          </div>
          
          {/* Thông tin thú cưng */}
          <div className="p-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
              <span className="text-sm font-medium bg-pink-100 text-pink-800 py-1 px-2 rounded-full">
                {pet.breed || 'Không rõ giống'}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
              <FaPaw className="text-pink-500" />
              <span>{pet.age || '1 tuổi'}</span>
              <span className="mx-2">•</span>
              <span>{pet.gender || 'Đực'}</span>
            </div>
            
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">{pet.description || 'Một bé thú cưng đáng yêu đang tìm kiếm một mái ấm mới.'}</p>
            
            <div className="flex justify-between items-center">
              <Link
                to={`/pet/${pet.id}`}
                className="text-pink-500 hover:text-pink-700 flex items-center gap-1 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FaInfoCircle />
                <span>Chi tiết</span>
              </Link>
              
              <button 
                className="p-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onLike && onLike(pet);
                  setIsGone(true);
                  setTimeout(() => onRemove && onRemove(pet.id), 200);
                }}
              >
                <FaHeart className="text-xl" />
              </button>
            </div>
          </div>
          
          {/* Hướng dẫn vuốt */}
          <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-500 opacity-70">
            Vuốt qua phải để thích, vuốt qua trái để bỏ qua
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DraggablePetCard; 