import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown, FaStar, FaRegLightbulb } from 'react-icons/fa';
import PropTypes from 'prop-types';

const AboutPageHero = () => {
  return (
    <section data-section className="min-h-screen flex items-center relative overflow-hidden" style={{
      background: `linear-gradient(135deg, rgba(230, 230, 250, 0.9) 0%, rgba(255, 209, 220, 0.9) 100%)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-white opacity-20 animate-pulse"></div>
        <div className="absolute left-1/4 bottom-0 h-40 w-40 rounded-full bg-white opacity-20 animate-float"></div>
        <div className="absolute right-1/3 top-1/3 h-32 w-32 rounded-full bg-white opacity-20"></div>
        <div className="absolute left-10 top-20 h-20 w-20 rounded-full bg-white opacity-20 animate-bounce"></div>
        
        {/* Paw print decorations */}
        <div className="absolute top-1/4 right-1/3">
          <img src="/src/assets/images/paw-print.svg" alt="" className="w-12 h-12 opacity-20 transform rotate-12" />
        </div>
        <div className="absolute bottom-1/3 left-1/4">
          <img src="/src/assets/images/paw-print.svg" alt="" className="w-8 h-8 opacity-20 transform -rotate-15" />
        </div>
        <div className="absolute top-2/3 right-1/4">
          <img src="/src/assets/images/heart-paw.svg" alt="" className="w-16 h-16 opacity-15 transform rotate-6" />
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10 px-4 py-16 md:py-24">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block feminine-pill feminine-bg-lavender text-indigo-700 mb-6">
            Thành lập từ 2015
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 feminine-title text-indigo-900 tracking-tight">
            Về <span className="text-pink-600">Cilis Pet</span>
          </h1>
          
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto feminine-body text-indigo-800 leading-relaxed">
            Cilis Pet là tổ chức phi lợi nhuận với sứ mệnh tạo nên một thế giới nơi mỗi thú cưng đều có một mái ấm yêu thương và được chăm sóc xứng đáng.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center mt-8 flex-wrap gap-3"
          >
            <div className="bg-white/40 backdrop-filter backdrop-blur-sm px-6 py-3 rounded-full inline-flex items-center shadow-lg">
              <FaStar className="text-yellow-500 mr-2" />
              <span className="font-medium text-indigo-900">Đã giúp đỡ hơn 5,000+ thú cưng</span>
            </div>
            <div className="bg-white/40 backdrop-filter backdrop-blur-sm px-6 py-3 rounded-full inline-flex items-center shadow-lg">
              <FaRegLightbulb className="text-green-500 mr-2" />
              <span className="font-medium text-indigo-900">3 trung tâm cứu trợ toàn quốc</span>
            </div>
          </motion.div>
          
          {/* Call to action buttons */}
          <motion.div 
            className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.a
              href="/donate"
              className="feminine-button feminine-button-pink shadow-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Quyên góp ngay
            </motion.a>
            
            <motion.a
              href="/pets"
              className="feminine-button border-2 border-purple-600 text-purple-600 bg-white px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Nhận nuôi thú cưng
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="text-indigo-800 mb-2 text-sm font-medium">Khám phá thêm</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FaArrowDown className="text-indigo-800 mx-auto" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Wave divider for better section transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-1 z-10">
        <svg className="relative block" style={{ width: "calc(100% + 1.3px)" }} height="70" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
    </section>
  );
};

export default AboutPageHero; 