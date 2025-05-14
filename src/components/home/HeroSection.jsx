import React from 'react';
import { Link } from 'react-router-dom';
import { FaCat, FaDog } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { PetCarousel } from './carousel';
import BokehEffect from '../utils/BokehEffect';
import SeasonalThemeToggle from '../utils/SeasonalThemeToggle';
import PetButton from '../buttons/PetButton';
import Button from '../common/Button';
import './HeroSection.css';

/**
 * Component hiển thị phần hero của trang chủ
 */
const HeroSection = () => {
  const { theme, updateTheme } = useTheme('spring', 'cilispet-theme');
  
  return (
    <div className={`hero-section relative apply-seasonal-theme feminine-theme-${theme}`}>
      {/* Theme toggler */}
      <div className="absolute right-4 z-30">
        <SeasonalThemeToggle onThemeChange={updateTheme} initialTheme={theme} />
      </div>
      
      {/* Bokeh effect */}
      <BokehEffect count={20} colorful={true} opacity={0.2} />
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left column - Text content */}
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
              Khám phá thế giới thú cưng dễ thương, đáng yêu và tìm người bạn đồng hành hoàn hảo tại Cilis Pet.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {/* Using the new Button component */}
              <Button 
                to="/pets?type=cat" 
                variant="primary"
                className="!bg-purple-500 !text-white"
              >
                <Button.Icon name="paw" />
                <Button.Text>Xem Mèo</Button.Text>
                <FaCat className="ml-1 text-lg" />
              </Button>
              
              {/* Using the existing PetButton for backward compatibility */}
              <PetButton 
                to="/pets" 
                text="Xem Chó"
                icon="paw"
                variant="primary" 
                size="md"
                className="!bg-pink-500 !text-white feminine-button-candy fairy-light"
              >
                <FaDog className="text-lg" />
              </PetButton>
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
          
          {/* Right column - Pet carousel */}
          <div className="md:w-1/2 relative">
            <motion.div 
              className="home-hero-image rounded-2xl overflow-hidden shadow-2xl glow-pink relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{ height: '450px' }}
            >
              <PetCarousel />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 