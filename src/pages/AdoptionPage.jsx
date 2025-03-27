import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdoptionForm from '../components/forms/AdoptionForm';
import { FaPaw, FaClipboardCheck, FaHome, FaCalendarAlt, FaHeart } from 'react-icons/fa';

const AdoptionPage = () => {
  return (
    <div className="py-12 bg-[#FEF2F7]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4 ">Đăng ký nhận nuôi</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
              Hãy điền đầy đủ thông tin vào đơn đăng ký dưới đây. Chúng tôi sẽ xem xét đơn của bạn và liên hệ trong thời gian sớm nhất.
          </p>
        </motion.div>
        
        {/* Adoption Process */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl p-8 mb-12 shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center  flex items-center justify-center gap-2">
            <FaPaw className="text-pink-500" /> Quy trình nhận nuôi
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center mb-4 relative shadow-md">
                <FaClipboardCheck className="text-pink-500 text-2xl" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full text-white flex items-center justify-center font-bold shadow-md">
                  1
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Điền đơn đăng ký</h3>
              <p className="text-gray-600 leading-relaxed">
                Hoàn thành đơn đăng ký với đầy đủ thông tin cá nhân và môi trường sống của bạn.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 relative shadow-md">
                <FaPaw className="text-blue-500 text-2xl" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full text-white flex items-center justify-center font-bold shadow-md">
                  2
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Xét duyệt</h3>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi sẽ xem xét đơn đăng ký của bạn và kiểm tra thông tin một cách cẩn thận.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-4 relative shadow-md">
                <FaCalendarAlt className="text-green-500 text-2xl" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full text-white flex items-center justify-center font-bold shadow-md">
                  3
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Gặp gỡ thú cưng</h3>
              <p className="text-gray-600 leading-relaxed">
                Sắp xếp thời gian để bạn đến gặp gỡ và tương tác với thú cưng mà bạn muốn nhận nuôi.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-4 relative shadow-md">
                <FaHome className="text-purple-500 text-2xl" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full text-white flex items-center justify-center font-bold shadow-md">
                  4
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Chào mừng về nhà</h3>
              <p className="text-gray-600 leading-relaxed">
                Hoàn tất các thủ tục và đưa người bạn mới về nhà để bắt đầu cuộc sống hạnh phúc.
              </p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Adoption Requirements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay:  0.2 }}
          className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-8 mb-12 shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-2">
            <FaHeart className="text-pink-500" /> Yêu cầu nhận nuôi
          </h2>
          
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-start"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full text-white flex items-center justify-center font-bold mr-4 mt-0.5 shadow-md flex-shrink-0">1</div>
              <div className="bg-white p-4 rounded-xl shadow-sm flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Tuổi tác</h3>
                <p className="text-gray-600 leading-relaxed">Người nhận nuôi phải từ 18 tuổi trở lên và có khả năng tài chính để chăm sóc thú cưng.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-start"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full text-white flex items-center justify-center font-bold mr-4 mt-0.5 shadow-md flex-shrink-0">2</div>
              <div className="bg-white p-4 rounded-xl shadow-sm flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Nơi ở</h3>
                <p className="text-gray-600 leading-relaxed">Có nơi ở ổn định và an toàn cho thú cưng. Nếu bạn thuê nhà, cần có sự đồng ý của chủ nhà.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-start"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full text-white flex items-center justify-center font-bold mr-4 mt-0.5 shadow-md flex-shrink-0">3</div>
              <div className="bg-white p-4 rounded-xl shadow-sm flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Thời gian</h3>
                <p className="text-gray-600 leading-relaxed">Cam kết dành thời gian để chăm sóc, vui chơi và tương tác với thú cưng.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-start"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full text-white flex items-center justify-center font-bold mr-4 mt-0.5 shadow-md flex-shrink-0">4</div>
              <div className="bg-white p-4 rounded-xl shadow-sm flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Cam kết lâu dài</h3>
                <p className="text-gray-600 leading-relaxed">Thú cưng là một cam kết lâu dài, bạn cần sẵn sàng chăm sóc cho thú cưng trong suốt cuộc đời của chúng.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-start"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full text-white flex items-center justify-center font-bold mr-4 mt-0.5 shadow-md flex-shrink-0">5</div>
              <div className="bg-white p-4 rounded-xl shadow-sm flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Tiêm phòng và triệt sản</h3>
                <p className="text-gray-600 leading-relaxed">Cam kết tiêm phòng đầy đủ và triệt sản thú cưng nếu chưa được thực hiện.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Adoption Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl p-8 shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 !flex items-center justify-center gap-2">
            <FaClipboardCheck className="text-pink-500" /> 
            Đơn đăng ký nhận nuôi
          </h2>
          <AdoptionForm />
        </motion.div>
      </div>
    </div>
  );
};

export default AdoptionPage; 