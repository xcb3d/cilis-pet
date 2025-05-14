import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPaw } from 'react-icons/fa';

/**
 * Component hiển thị logo của ứng dụng
 */
const Logo = ({ scrolled }) => {
  return (
    <Link 
      to="/" 
      className="flex items-center gap-2 relative z-10"
    >
      <motion.div 
        className={`rounded-full p-2 ${
          scrolled ? 'bg-pink-100' : 'bg-white/80 backdrop-blur-sm'
        }`}
        whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
      >
        <FaPaw className={`text-2xl ${scrolled ? 'text-pink-500' : 'text-pink-400'}`} />
      </motion.div>
      <div className="flex flex-col">
        <h1 className="feminine-title text-xl md:text-2xl font-bold text-gray-800">
          <span className="text-pink-500">Cilis</span>
          <span>Pet</span>
        </h1>
        <div className="text-xs text-gray-500 -mt-1 font-medium">Companion for Life</div>
      </div>
    </Link>
  );
};

export default Logo; 