import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPaw, FaHeart, FaCat, FaDog, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import BokehEffect from '../utils/BokehEffect';
import SeasonalThemeToggle from '../utils/SeasonalThemeToggle';
import './HeroSection.css';

const HeroSection = () => {
  const [currentSeason, setCurrentSeason] = useState('spring');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Mảng chứa các hình ảnh và thông tin tương ứng
  const petImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1686&q=80",
      alt: "Mèo xinh đẹp",
      petInfo: {
        name: "Mèo Munchkin",
        age: "1 tuổi",
        gender: "Cái"
      }
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
      alt: "Chó Husky đáng yêu",
      petInfo: {
        name: "Husky Siberian",
        age: "2 tuổi",
        gender: "Đực"
      }
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1736&q=80",
      alt: "Mèo Bengal",
      petInfo: {
        name: "Mèo Bengal",
        age: "1.5 tuổi",
        gender: "Đực"
      }
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      alt: "Chó Golden Retriever",
      petInfo: {
        name: "Golden Retriever",
        age: "3 tuổi",
        gender: "Đực"
      }
    }
  ];
  
  // Xử lý chuyển đổi hình ảnh
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? petImages.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev === petImages.length - 1 ? 0 : prev + 1));
  };
  
  // Tự động chuyển ảnh mỗi 8 giây
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextImage();
    }, 8000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Xử lý khi thay đổi mùa
  const handleSeasonChange = (season) => {
    setCurrentSeason(season);
    // Thêm class theme vào hero section
    document.querySelector('.hero-section').className = document.querySelector('.hero-section').className
      .replace(/feminine-theme-\w+/g, '')
      .trim();
    document.querySelector('.hero-section').classList.add(`feminine-theme-${season}`);
  };
  
  useEffect(() => {
    // Khởi tạo theme khi component mount
    const savedTheme = localStorage.getItem('cilispet-theme') || 'spring';
    handleSeasonChange(savedTheme);
  }, []);
  
  // Lấy thông tin pet hiện tại
  const currentPet = petImages[currentImageIndex];
  
  return (
    <div className="hero-section relative apply-seasonal-theme">
      {/* Theme toggler */}
      <div className="absolute top-4 right-4 z-30">
        <SeasonalThemeToggle onThemeChange={handleSeasonChange} initialTheme={currentSeason} />
      </div>
      
      {/* Bokeh effect */}
      <BokehEffect count={20} colorful={true} opacity={0.2} />
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-pink-600 hero-title glitter-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Kết nối với người bạn <br className="hidden md:inline" /> 
              <motion.span 
                className="hero-title-accent shimmer-border"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                đặc biệt
              </motion.span> của bạn
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 text-gray-600 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Khám phá thế giới thú cưng dễ thương, đáng yêu và tìm người bạn đồng hành hoàn hảo tại Cilis Pet Shop.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link to="/cats" className="feminine-button feminine-button-pink fairy-light">
                <FaCat className="text-lg" /> Xem Mèo
              </Link>
              <Link to="/dogs" className="feminine-button feminine-button-candy fairy-light">
                <FaDog className="text-lg" /> Xem Chó
              </Link>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-6 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div className="flex -space-x-3">
                <img src="https://randomuser.me/api/portraits/women/62.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
              </div>
              <span className="text-gray-500 text-sm">
                <span className="font-semibold text-pink-600">500+</span> người đã tìm thấy bạn đồng hành
              </span>
            </motion.div>
          </div>
          <div className="md:w-1/2 relative">
            <motion.div 
              className="home-hero-image rounded-2xl overflow-hidden shadow-2xl glow-pink relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {/* Nút điều hướng hình ảnh */}
              <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm h-10 w-10 rounded-full flex items-center justify-center z-10 hover:bg-white/90 transition-all shadow-md group"
                onClick={handlePrevImage}
              >
                <FaChevronLeft className="text-pink-500 group-hover:scale-110 transition-transform" />
              </button>
              
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm h-10 w-10 rounded-full flex items-center justify-center z-10 hover:bg-white/90 transition-all shadow-md group"
                onClick={handleNextImage}
              >
                <FaChevronRight className="text-pink-500 group-hover:scale-110 transition-transform" />
              </button>
              
              {/* Image slider với AnimatePresence để animate khi switching */}
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentPet.id}
                  src={currentPet.src}
                  alt={currentPet.alt}
                  className="w-full h-[400px] object-cover rounded-2xl"
                  data-effect="cinemagraph"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              
              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {petImages.map((_, index) => (
                  <button 
                    key={index} 
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? 'bg-white w-6' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
              
              {/* Overlay với hiệu ứng bokeh nhỏ */}
              <div className="absolute inset-0 pointer-events-none">
                <BokehEffect count={10} opacity={0.15} maxSize={40} minSize={10} />
              </div>
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-6 -right-6 w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5, type: "spring" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <FaPaw className="text-3xl text-pink-500" />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-6 -left-6 w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.5, type: "spring" }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaHeart className="text-3xl text-purple-500" />
              </motion.div>
            </motion.div>
            
            {/* Thông tin pet hiện tại */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentPet.id}
                className="absolute top-4 left-6 w-full bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs feminine-card"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <h3 className="font-semibold mb-1 heading-cute">{currentPet.petInfo.name}</h3>
                <p className="text-sm text-gray-600">Tuổi: {currentPet.petInfo.age} • Giới tính: {currentPet.petInfo.gender}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#FFF1F5" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,133.3C672,117,768,139,864,165.3C960,192,1056,224,1152,208C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection; 