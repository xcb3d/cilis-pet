import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import PropTypes from 'prop-types';

const SuccessStories = ({ stories }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Câu chuyện thành công</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="relative h-48 bg-gray-100">
              <img 
                src={story.imageUrl} 
                alt={story.name} 
                className="w-full h-full object-contain p-4"
              />
              <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Đã nhận nuôi
              </div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
              <h4 className="text-xl font-bold text-gray-800 mb-2">{story.name}</h4>
              <p className="text-gray-600 mb-4 flex-grow">{story.story}</p>
              
              <div className="grid grid-cols-3 gap-2 text-center text-sm mt-auto">
                <div className="bg-gray-50 p-2 rounded">
                  <div className="font-bold text-purple-600">{story.stats.daysInCare}</div>
                  <div className="text-gray-500">ngày chăm sóc</div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="font-bold text-purple-600">{story.stats.medicalProcedures}</div>
                  <div className="text-gray-500">thủ thuật y tế</div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="font-bold text-purple-600">{story.stats.donorsHelped}</div>
                  <div className="text-gray-500">người quyên góp</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          className="inline-flex items-center px-6 py-3 bg-purple-100 text-purple-700 rounded-full font-medium transition-colors"
          whileHover={{ backgroundColor: "#e9d5ff", y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Xem thêm câu chuyện
          <FaArrowRight className="ml-2" />
        </motion.button>
      </motion.div>
    </div>
  );
};

SuccessStories.propTypes = {
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      story: PropTypes.string.isRequired,
      stats: PropTypes.shape({
        daysInCare: PropTypes.number.isRequired,
        medicalProcedures: PropTypes.number.isRequired,
        donorsHelped: PropTypes.number.isRequired
      }).isRequired
    })
  ).isRequired
};

export default SuccessStories; 