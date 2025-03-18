import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaw, FaHeart, FaSearch, FaDog, FaCat, FaBone, FaArrowRight, FaChevronLeft, FaChevronRight, FaStar, FaGem } from 'react-icons/fa';
import { FaHandHoldingHeart } from 'react-icons/fa';
import dogImage from '../../assets/images/dog-hero.svg';
import catImage from '../../assets/images/cat-hero.svg';
import imagePaths from '../../utils/imageImports';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [particles, setParticles] = useState([]);
  const [floatingHearts, setFloatingHearts] = useState([]);
  
  // Hero slides data
  const slides = [
    {
      title: "Hãy nhận nuôi một người bạn đáng yêu đang cần mái ấm",
      subtitle: "Các thú cưng đang chờ được bạn nhận nuôi",
      description: "Mỗi thú cưng tại Cilis Pet đều mang trong mình câu chuyện đặc biệt và đang chờ đợi một gia đình yêu thương. Hãy mở rộng trái tim và đón một người bạn mới đáng yêu về nhà!",
      cta: "Tìm thú cưng",
      image: imagePaths.dogHero,
      color: "from-pink-100 to-pink-50",
      accent: "bg-pink-400"
    },
    {
      title: "Mang tình yêu và niềm vui đến cho ngôi nhà của bạn",
      subtitle: "Ủng hộ và giúp đỡ thú cưng khó khăn",
      description: "Các bé thú cưng tại Cilis Pet đều được chăm sóc tận tình, tiêm phòng đầy đủ và đang mong được đến một ngôi nhà mới. Một người bạn nhỏ sẽ mang đến biết bao niềm vui và tình yêu!",
      cta: "Ủng hộ ngay",
      image: imagePaths.catHero,
      color: "from-purple-100 to-purple-50",
      accent: "bg-purple-400"
    }
  ];
  
  // Auto slide
  useEffect(() => {
    let slideInterval;
    if (isPlaying) {
      slideInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 5000);
    }
    
    return () => {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    };
  }, [isPlaying, slides.length]);
  
  // Generate particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 8 + Math.random() * 15,
          duration: 15 + Math.random() * 30,
          type: Math.random() > 0.5 ? 'paw' : Math.random() > 0.5 ? 'heart' : 'bone',
          delay: Math.random() * 10,
          rotate: Math.random() * 360
        });
      }
      setParticles(newParticles);
    };
    
    generateParticles();
  }, []);
  
  // Generate floating hearts
  useEffect(() => {
    const hearts = Array.from({ length: 15 }, (_, i) => ({
      id: `heart-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 10 + Math.random() * 15,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * 5
    }));
    
    setFloatingHearts(hearts);
  }, []);
  
  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    setIsPlaying(false);
  };
  
  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    setIsPlaying(false);
  };
  
  const currentSlide = slides[currentIndex];

  // Facts about rescued pets
  const stats = [
    { number: "500+", label: "Thú cưng được nhận nuôi" },
    { number: "1,200+", label: "Người hỗ trợ" },
    { number: "5,000+", label: "Người theo dõi" }
  ];
  
  // Các màu sắc cho slide hiện tại
  const themeColors = {
    main: currentIndex === 0 
      ? { bg: 'feminine-bg-gradient-pink', accent: 'pink', light: '#FEF2F7', medium: '#FCE5EE' }
      : { bg: 'feminine-bg-gradient-mint', accent: 'mint', light: '#F5FFFA', medium: '#E3FCE9' }
  };
  
  return (
    <div className="relative overflow-hidden">
      {/* Hero Background with Pastel Colors */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 ${themeColors.main.bg} transition-colors duration-700`} />
        <div className="absolute inset-0 overflow-hidden">
          {/* Decorative bubbles */}
          <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-white opacity-20 feminine-bubble"></div>
          <div className="absolute left-1/4 -bottom-20 h-60 w-60 rounded-full bg-white opacity-20 feminine-bubble"></div>
          <div className="absolute right-1/3 top-1/3 h-40 w-40 rounded-full bg-white opacity-20 feminine-bubble"></div>
          
          {/* Additional decorations */}
          <div className="absolute top-10 left-[10%] w-24 h-24 rounded-full bg-gradient-to-br from-pink-200/40 to-pink-300/40 animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[15%] w-32 h-32 rounded-full bg-gradient-to-br from-purple-200/30 to-purple-300/30 animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Additional Sparkles and Stars */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute z-0"
          style={{
            left: `${10 + (i * 10) + (Math.random() * 5)}%`,
            top: `${5 + (Math.random() * 80)}%`,
            opacity: 0.3,
          }}
          animate={{
            scale: [0.7, 1, 0.7],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          {i % 2 === 0 ? (
            <FaStar className={`text-${themeColors.main.accent}-300`} style={{ fontSize: `${10 + (Math.random() * 10)}px` }} />
          ) : (
            <FaGem className="text-lavender-300" style={{ fontSize: `${8 + (Math.random() * 8)}px` }} />
          )}
        </motion.div>
      ))}

      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute z-0"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: 0.4,
            transform: `rotate(${particle.rotate}deg)`,
            animation: `float ${particle.duration}s infinite`,
            animationDelay: `${particle.delay}s`
          }}
        >
          {particle.type === 'paw' && (
            <FaPaw className={`text-${themeColors.main.accent}-300/40`} style={{ fontSize: `${particle.size}px` }} />
          )}
          {particle.type === 'heart' && (
            <FaHeart className={`text-${themeColors.main.accent}-300/40`} style={{ fontSize: `${particle.size}px` }} />
          )}
          {particle.type === 'bone' && (
            <FaBone className={`text-${themeColors.main.accent}-300/40`} style={{ fontSize: `${particle.size}px` }} />
          )}
        </div>
      ))}

      {/* Main Hero Content */}
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[60vh]">
          {/* Text Content */}
          <motion.div
            key={`text-${currentIndex}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <motion.div 
              className="inline-block feminine-pill bg-white/80 backdrop-blur-sm text-gray-800 mb-4 px-4 py-2 flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {currentIndex === 0 ? <FaPaw className="text-pink-500" /> : <FaHandHoldingHeart className="text-mint-500" />}
              </motion.div>
              <span>{currentSlide.subtitle}</span>
            </motion.div>
            
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-4  leading-tight feminine-title text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {currentSlide.title.split(' ').map((word, i) => (
                <span key={i} className="relative inline-block mr-2">
                  {word}
                  {(i === 3 || i === 8) && (
                    <motion.span 
                      className={`absolute -bottom-2 left-0 h-3 w-full ${
                        currentIndex === 0 ? 'bg-pink-200/70' : 'bg-mint-200/70'
                      } -z-10 rounded`}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
                    />
                  )}
                </span>
              ))}
            </motion.h1>
            
            <motion.p 
              className="text-gray-700 text-lg mb-8 max-w-xl mx-auto lg:mx-0 feminine-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {currentSlide.description}
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link 
                to={currentIndex === 0 ? "/pets" : "/donate"} 
                className={`feminine-button feminine-button-${themeColors.main.accent} shadow-md group`}
              >
                {currentSlide.cta}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, repeatType: "loop" }}
                >
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
              
              <Link 
                to="/about" 
                className="feminine-button bg-white/70 backdrop-blur-sm text-gray-700 border border-gray-200 hover:bg-white/90"
              >
                Tìm hiểu thêm
              </Link>
            </motion.div>
            
            {/* Stats section */}
            <motion.div
              className="mt-6 grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  whileHover={{ y: -5 }}
                >
                  <motion.p 
                    className={`text-2xl font-bold text-${themeColors.main.accent}-600`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.7 + (index * 0.1), 
                      duration: 0.5,
                      type: "spring"
                    }}
                  >
                    {stat.number}
                  </motion.p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Image */}
          <motion.div
            key={`image-${currentIndex}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center relative"
          >
            {/* Background glow */}
            <div className={`absolute inset-0 bg-${themeColors.main.accent}-300/10 blur-3xl rounded-full`}></div>
            
            {/* Decorative elements */}
            <motion.div 
              className={`absolute -top-5 -right-5 z-20 bg-${themeColors.main.accent}-400 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg`}
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, 0, -10, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              {currentIndex === 0 ? <FaDog className="text-xl" /> : <FaCat className="text-xl" />}
            </motion.div>
            
            <motion.div 
              className={`absolute -bottom-5 -left-5 z-20 bg-${themeColors.main.accent}-300 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg`}
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, -5, 0, 5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <FaHeart className="text-xl" />
            </motion.div>
            
            <motion.div 
              className="relative w-full max-w-md feminine-float"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Paw marks behind the image */}
              <div className="absolute -right-16 top-1/3 opacity-20">
                <motion.div 
                  animate={{ rotate: [0, 15, 0, -15, 0] }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  <FaPaw className={`text-4xl text-${themeColors.main.accent}-600`} />
                </motion.div>
              </div>
              <div className="absolute -left-16 bottom-1/3 opacity-20">
                <motion.div 
                  animate={{ rotate: [0, -15, 0, 15, 0] }}
                  transition={{ duration: 10, repeat: Infinity }}
                >
                  <FaPaw className={`text-4xl text-${themeColors.main.accent}-600`} />
                </motion.div>
              </div>
              
              {/* Base glow effect */}
              <div className={`absolute inset-0 bg-${themeColors.main.accent}-200 opacity-30 rounded-full blur-xl -z-20`}></div>
              
              {/* Main image */}
              <motion.div 
                className="relative z-10 bg-white p-4 rounded-3xl shadow-lg"
                animate={{ rotate: [0, 1, 0, -1, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="overflow-hidden rounded-2xl relative">
                  <img 
                    src={currentSlide.image} 
                    alt="Hero" 
                    className="w-full h-auto filter drop-shadow-lg transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-30"></div>
                </div>
              </motion.div>
              
              {/* Radial glow behind image */}
              <div className="absolute -inset-8 rounded-full bg-white/30 backdrop-blur-sm -z-10"></div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Slide Controls */}
        <div className="flex justify-center mt-6 mb-16 gap-4">
          <button
            onClick={handlePrevSlide}
            className="p-2 rounded-full bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-white/80 transition-colors"
            aria-label="Previous slide"
          >
            <FaChevronLeft />
          </button>
          
          <div className="flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-10 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? `bg-${themeColors.main.accent}-500 w-16` 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={handleNextSlide}
            className="p-2 rounded-full bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-white/80 transition-colors"
            aria-label="Next slide"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      
      {/* Adopter Showcase Section - Full Width */}
      <div className="relative py-10 bg-white/50 backdrop-blur-sm border-t border-b border-white/40 shadow-inner">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 top-20 h-60 w-60 rounded-full bg-gradient-to-br from-lavender-100/20 to-lavender-200/20 feminine-bubble"></div>
          <div className="absolute left-1/4 -bottom-20 h-40 w-40 rounded-full bg-gradient-to-br from-mint-100/20 to-mint-200/20 feminine-bubble"></div>
        </div>
        
        {/* Floating characters */}
        <div className="absolute bottom-5 left-[5%] z-10">
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <FaPaw className={`text-3xl text-${themeColors.main.accent}-300/60`} />
          </motion.div>
        </div>
        
        <div className="absolute top-8 right-[8%] z-10">
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, -10, 0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <FaHeart className={`text-2xl text-${themeColors.main.accent}-300/60`} />
          </motion.div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 relative inline-block">
              Các gia đình hạnh phúc đã nhận nuôi
              <motion.div 
                className={`absolute -bottom-1 left-0 right-0 h-1 bg-${themeColors.main.accent}-300/70 rounded-full`}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </h3>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-3 md:gap-5 pt-3 pb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`avatar-${i}`}
                className={`rounded-full border-2 w-12 h-12 md:w-16 md:h-16 overflow-hidden ${
                  i % 2 === 0 ? 'border-pink-300' : 'border-purple-300'
                }`}
                whileHover={{ scale: 1.1, y: -5 }}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <div className={`w-full h-full ${
                  i % 3 === 0 ? 'bg-pink-200' : i % 3 === 1 ? 'bg-lavender-200' : 'bg-mint-100'
                } flex items-center justify-center`}>
                  <FaHeart className={`${
                    i % 3 === 0 ? 'text-pink-500' : i % 3 === 1 ? 'text-purple-500' : 'text-green-500'
                  } text-base md:text-xl`} />
                </div>
              </motion.div>
            ))}
            
            <motion.div
              className="rounded-full bg-gray-100 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-2 border-dashed border-gray-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <span className="text-gray-500 font-bold text-sm md:text-base">+120</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="text-center text-gray-600 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <p className="text-sm md:text-base">
              Cùng tham gia với hơn 120 gia đình hạnh phúc đã nhận nuôi thú cưng từ Cilis Pet
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Wave Decoration */}
      <div className="relative h-16 md:h-24 overflow-hidden bg-gradient-to-b from-white/50 to-transparent">
        <svg 
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill={themeColors.main.light}
            fillOpacity="1"
            d="M0,288L48,266.7C96,245,192,203,288,181.3C384,160,480,160,576,170.7C672,181,768,203,864,213.3C960,224,1056,224,1152,202.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <svg 
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ opacity: 0.5 }}
        >
          <path
            fill={themeColors.main.medium}
            fillOpacity="0.8"
            d="M0,160L48,176C96,192,192,224,288,234.7C384,245,480,235,576,213.3C672,192,768,160,864,160C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero; 