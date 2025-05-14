import React from 'react';
import { motion } from 'framer-motion';
import { FaPaw, FaHeart, FaUsers, FaRegCompass } from 'react-icons/fa';
import PropTypes from 'prop-types';

const MISSION_ITEMS = [
  {
    icon: <FaPaw className="text-3xl text-purple-500" />,
    title: "Cứu trợ & Chăm sóc",
    description: "Giải cứu thú cưng bị bỏ rơi, cung cấp nơi ở tạm thời và chăm sóc y tế",
    color: "feminine-bg-lavender",
    image: "/src/assets/images/timeline-rescue.svg"
  },
  {
    icon: <FaHeart className="text-3xl text-pink-500" />,
    title: "Kết nối & Nhận nuôi",
    description: "Kết nối thú cưng với những gia đình yêu thương mới thông qua quá trình nhận nuôi trách nhiệm",
    color: "feminine-bg-pink",
    image: "/src/assets/images/pet-house.svg"
  },
  {
    icon: <FaUsers className="text-3xl text-blue-500" />,
    title: "Giáo dục & Vận động",
    description: "Nâng cao nhận thức về quyền lợi động vật và thúc đẩy việc nuôi thú cưng có trách nhiệm",
    color: "feminine-bg-mint",
    image: "/src/assets/images/timeline-training.svg"
  }
];

const MissionSection = () => {
  return (
    <section data-section className="py-24 px-4 bg-white relative">
      <div className="absolute left-0 right-0 h-16 bg-gradient-to-b from-purple-50 to-transparent top-0 opacity-50"></div>
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Visual connector to previous section */}
          <div className="w-1 h-24 bg-gradient-to-b from-transparent to-purple-200 mx-auto -mt-8 mb-8 rounded-full"></div>
          
          <span className="inline-block feminine-pill feminine-bg-lavender text-indigo-700 mb-4">
            Sứ mệnh của chúng tôi
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 feminine-title leading-tight">
            Tạo nên sự thay đổi tích cực <br/> cho thú cưng cần giúp đỡ
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto feminine-body">
            Cilis Pet hoạt động với sứ mệnh cứu trợ, chăm sóc và tìm mái ấm mới cho những thú cưng 
            bị bỏ rơi, bị ngược đãi hoặc vô gia cư. Chúng tôi tin rằng mỗi sinh mệnh đều xứng đáng 
            có được tình yêu thương và sự an toàn.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line between cards */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-purple-100 hidden md:block"></div>
          
          {MISSION_ITEMS.map((item, index) => (
            <motion.div 
              key={index}
              className="feminine-card hover:shadow-lg transition-all duration-500 overflow-hidden relative z-10 bg-white"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.1)" }}
            >
              <div className={`h-2 ${item.color}`}></div>
              <div className="p-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto bg-gray-50 shadow-md">
                  {item.icon}
                </div>
                
                {/* Added illustration */}
                <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt="" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = "/src/assets/images/dog-hero.svg";
                    }}
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center feminine-subtitle">{item.title}</h3>
                <p className="text-gray-600 text-center feminine-body">{item.description}</p>
                
                {/* Added stat metrics for visual enhancement */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-purple-600">
                      {index === 0 ? "3,200+" : index === 1 ? "1,800+" : "20+"}
                    </span>
                    <p className="text-sm text-gray-500">
                      {index === 0 ? "Thú cưng được cứu hộ" : index === 1 ? "Thú cưng có mái ấm mới" : "Chương trình giáo dục"}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Progress indicator */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center z-20">
                <div className={`w-4 h-4 rounded-full ${
                  index === 0 ? "bg-purple-500" : index === 1 ? "bg-pink-500" : "bg-blue-500"
                }`}></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Journey bridge to next section */}
        <div className="flex justify-center mt-16">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="text-center mb-6">
              <FaRegCompass className="text-3xl text-purple-500 mx-auto" />
              <p className="text-purple-700 font-medium mt-2">Hành trình của chúng tôi</p>
            </div>
            <div className="w-0.5 h-16 bg-gradient-to-b from-purple-300 to-transparent mx-auto"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection; 