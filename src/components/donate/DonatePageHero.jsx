import React from 'react';
import { motion } from 'framer-motion';
import { FaDonate, FaArrowRight } from 'react-icons/fa';

const DonatePageHero = ({ scrollToForm }) => {
  return (
    <motion.div 
      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 md:py-24 px-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white opacity-10"></div>
        <div className="absolute left-1/4 bottom-0 h-40 w-40 rounded-full bg-white opacity-10"></div>
        <div className="absolute right-1/3 top-1/3 h-32 w-32 rounded-full bg-white opacity-10"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          <div className="md:w-2/3 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Mỗi đóng góp <br/>đều mang lại hy vọng</h1>
            <p className="text-lg md:text-xl opacity-90 mb-6 md:pr-10">
              Sự hỗ trợ của bạn giúp chúng tôi cứu trợ, chăm sóc và tìm nhà mới cho hàng trăm chú chó mèo bị bỏ rơi mỗi năm.
            </p>
            
            <motion.button
              className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium flex items-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToForm}
            >
              <FaDonate className="mr-2" />
              Quyên góp ngay
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
          
          <motion.div 
            className="md:w-1/3 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <img 
              src="/src/assets/images/donation-hero.svg" 
              alt="Hỗ trợ thú cưng" 
              className="max-w-full h-auto rounded-lg shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DonatePageHero; 