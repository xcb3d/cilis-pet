import React from 'react';
import { motion } from 'framer-motion';

const AboutCTA = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-pastel-mint to-pastel-blue text-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-white opacity-20"></div>
        <div className="absolute left-1/3 top-0 h-60 w-60 rounded-full bg-white opacity-20"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6 feminine-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Tham gia cùng chúng tôi trong sứ mệnh mang lại mái ấm cho thú cưng
        </motion.h2>
        
        <motion.p 
          className="text-lg opacity-90 mb-8 max-w-3xl mx-auto feminine-body"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Có nhiều cách để bạn có thể đóng góp và tạo nên sự thay đổi trong cuộc sống của những thú cưng đang cần sự giúp đỡ.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.a
            href="/donate"
            className="feminine-button feminine-button-pink shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Quyên góp ngay
          </motion.a>
          
          <motion.a
            href="/pets"
            className="feminine-button border-2 border-purple-600 text-purple-600 bg-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Nhận nuôi thú cưng
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCTA; 