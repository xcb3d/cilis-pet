import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

/**
 * PetGallery - Thư viện ảnh thú cưng với hiệu ứng cuộn ngang mượt mà
 * 
 * @param {Object} props
 * @param {Array} props.images - Mảng các URL ảnh
 * @param {string} props.title - Tiêu đề thư viện
 * @param {Function} props.onImageClick - Callback khi click vào ảnh
 */
const PetGallery = ({ images = [], title = "Thư viện ảnh thú cưng", onImageClick }) => {
  const galleryRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Motion values
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  
  // Tính toán độ rộng tổng thể để giới hạn kéo
  useEffect(() => {
    if (galleryRef.current) {
      // Tính toán chiều rộng của container và content
      const containerWidth = galleryRef.current.clientWidth;
      const contentWidth = galleryRef.current.scrollWidth;
      
      // Cập nhật giới hạn kéo (khoảng cách tối đa có thể kéo)
      setWidth(contentWidth - containerWidth);
    }
  }, [images, galleryRef]);
  
  // Gesture handler cho việc kéo ngang
  const bindDrag = useDrag(({ offset: [ox], direction: [dx], down, velocity: [vx] }) => {
    // Áp dụng giới hạn kéo
    const newX = Math.max(-width, Math.min(0, ox));
    x.set(newX);
    
    // Hiệu ứng quán tính khi thả
    if (!down && width > 0) {
      // Tính toán vị trí mới dựa trên vận tốc và hướng
      const inertia = vx * dx * 50;
      const projectedX = Math.max(-width, Math.min(0, newX + inertia));
      
      // Áp dụng hiệu ứng spring cho chuyển động trơn tru
      springX.set(projectedX);
    }
  });
  
  // Xử lý click vào ảnh
  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    onImageClick && onImageClick(image, index);
  };
  
  // Điều khiển gallery với nút
  const scrollGallery = (direction) => {
    const currentX = x.get();
    const scrollAmount = 300 * direction; // Cuộn 300px mỗi lần nhấn
    const newX = Math.max(-width, Math.min(0, currentX + scrollAmount));
    
    // Áp dụng animation cho việc cuộn
    springX.set(newX);
  };
  
  return (
    <div className="relative py-8">
      {/* Tiêu đề */}
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{title}</h2>
      
      {/* Gallery container */}
      <div 
        className="relative overflow-hidden px-4"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Nút điều khiển trái */}
        {showControls && width > 0 && (
          <motion.button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 rounded-full p-3 text-pink-500 hover:bg-white hover:text-pink-600 transition-all shadow-md"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 5 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={() => scrollGallery(1)}
          >
            <FaArrowLeft />
          </motion.button>
        )}
        
        {/* Nút điều khiển phải */}
        {showControls && width > 0 && (
          <motion.button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 rounded-full p-3 text-pink-500 hover:bg-white hover:text-pink-600 transition-all shadow-md"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: -5 }}
            exit={{ opacity: 0, x: 10 }}
            onClick={() => scrollGallery(-1)}
          >
            <FaArrowRight />
          </motion.button>
        )}
        
        {/* Gallery content */}
        <motion.div 
          ref={galleryRef}
          className="flex gap-4 cursor-grab"
          style={{ x: springX }}
          {...bindDrag()}
          whileTap={{ cursor: "grabbing" }}
        >
          {images.map((image, index) => (
            <motion.div 
              key={index} 
              className="min-w-[250px] h-64 relative rounded-xl overflow-hidden shadow-md"
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                scale: { type: "spring", stiffness: 300 }
              }}
              onClick={() => handleImageClick(image, index)}
            >
              <img 
                src={image} 
                alt={`Pet Image ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500"
              />
              
              {/* Overlay khi hover */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
                whileHover={{ opacity: 1 }}
              >
                <button className="text-white bg-pink-500 hover:bg-pink-600 rounded-full p-2">
                  <FaSearch className="text-sm" />
                </button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Lightbox cho ảnh được chọn */}
      {selectedImage && (
        <motion.div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.img 
            src={selectedImage} 
            alt="Enlarged pet image" 
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          
          <motion.button
            className="absolute top-4 right-4 text-white bg-pink-500 hover:bg-pink-600 rounded-full p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default PetGallery; 