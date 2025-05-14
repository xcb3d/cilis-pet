import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteRight, FaQuoteLeft, FaStar, FaStarHalfAlt, FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';

const DonationTestimonials = ({ testimonials }) => {
  return (
    <motion.section 
      className="py-12 px-4 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Nhà hảo tâm nói gì về chúng tôi</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Hãy lắng nghe câu chuyện từ những người đã đồng hành cùng chúng tôi trong sứ mệnh cứu trợ và bảo vệ thú cưng.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 shadow-sm relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="absolute top-4 right-4 text-purple-500 opacity-50">
                <FaQuoteRight size={24} />
              </div>
              
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full mr-4 border-2 border-purple-200"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3 text-yellow-400">
                {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                  <FaStar key={i} />
                ))}
                {testimonial.rating % 1 !== 0 && <FaStarHalfAlt />}
              </div>
              
              <p className="text-gray-700 mb-4 italic relative">
                <FaQuoteLeft className="inline-block mr-1 mb-1 text-purple-300" size={16} />
                {testimonial.quote}
              </p>
              
              <div className="text-xs text-gray-500">{testimonial.date}</div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 flex justify-center">
          <div className="bg-gray-100 p-4 rounded-lg flex items-center max-w-3xl">
            <div className="mr-4 text-purple-600">
              <FaCheck className="p-1 rounded-full bg-purple-100" size={24} />
            </div>
            <div>
              <span className="text-gray-700 mr-1">Độ tin cậy:</span>
              <span className="font-bold text-purple-700">Xuất sắc</span>
              <span className="mx-2 text-gray-500">|</span>
              <span className="text-gray-700 mr-1">Số lượng nhà hảo tâm:</span>
              <span className="font-bold text-purple-700">1200+</span>
              <span className="mx-2 text-gray-500">|</span>
              <span className="text-gray-700 mr-1">Đánh giá trung bình:</span>
              <span className="font-bold text-purple-700">4.8/5</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

DonationTestimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      quote: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })
  ).isRequired
};

export default DonationTestimonials; 