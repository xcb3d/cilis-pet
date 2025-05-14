import React from 'react';
import { motion } from 'framer-motion';

const ValueInActionSection = () => {
  return (
    <motion.div
      className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-purple-100"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-center text-purple-700 mb-6">Giá trị trong hành động</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="bg-pink-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <img src="/src/assets/images/heart-paw.svg" alt="" className="w-10 h-10" />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Cứu hộ khẩn cấp</h4>
          <p className="text-gray-600 text-sm">
            Đội cứu hộ 24/7 sẵn sàng ứng cứu thú cưng trong các tình huống khẩn cấp như thiên tai, tai nạn.
          </p>
        </div>
        
        <div className="text-center">
          <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <img src="/src/assets/images/timeline-medical.svg" alt="" className="w-10 h-10" />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Phẫu thuật miễn phí</h4>
          <p className="text-gray-600 text-sm">
            Chương trình phẫu thuật và chăm sóc y tế miễn phí cho thú cưng của các gia đình có hoàn cảnh khó khăn.
          </p>
        </div>
        
        <div className="text-center">
          <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <img src="/src/assets/images/timeline-training.svg" alt="" className="w-10 h-10" />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Giáo dục cộng đồng</h4>
          <p className="text-gray-600 text-sm">
            Tổ chức các buổi tập huấn, hội thảo về chăm sóc thú cưng có trách nhiệm tại các trường học.
          </p>
        </div>
      </div>
      
      {/* Call to action bridge */}
      <div className="text-center mt-8">
        <p className="text-gray-600 italic">
          "Mỗi giá trị cốt lõi đều được thể hiện qua hành động cụ thể hàng ngày của chúng tôi."
        </p>
        <div className="mt-4">
          <motion.a 
            href="/volunteer"
            className="text-purple-600 font-medium underline hover:text-purple-800 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Tìm hiểu cách bạn có thể tham gia →
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ValueInActionSection; 