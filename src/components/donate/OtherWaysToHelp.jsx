import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaGift } from 'react-icons/fa';
import PropTypes from 'prop-types';

const OtherWaysToHelp = ({ helpOptions }) => {
  return (
    <motion.section 
      key="other"
      className="py-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Các cách khác để hỗ trợ</h2>
          <p className="text-gray-600">
            Ngoài quyên góp tiền, có nhiều cách khác để bạn có thể hỗ trợ cho các bé thú cưng.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {helpOptions.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <motion.button
                className="text-purple-600 font-medium flex items-center group"
                whileHover={{ x: 3 }}
              >
                Tìm hiểu thêm
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-2xl border border-purple-100"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <FaGift className="text-3xl text-purple-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Hộp quà tặng yêu thương</h3>
              <p className="text-gray-600 mb-4">
                Gửi một hộp quà tặng đặc biệt đến cho thú cưng tại trại cứu trợ. Bạn có thể đóng góp đồ chơi, chăn, thức ăn và những vật dụng khác để cải thiện cuộc sống của các bé.
              </p>
              <motion.button
                className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Đăng ký gửi quà
                <FaArrowRight className="ml-2" />
              </motion.button>
            </div>
            <div className="md:w-1/3">
              <img 
                src="/src/assets/images/gift-box.jpg" 
                alt="Hộp quà tặng" 
                className="rounded-lg shadow-md max-w-full h-auto"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

OtherWaysToHelp.propTypes = {
  helpOptions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired
};

export default OtherWaysToHelp; 