import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHeart, FaAward, FaUsers, FaHandHoldingHeart
} from 'react-icons/fa';

const VALUES = [
  {
    icon: <FaHeart className="text-2xl text-pink-500" />,
    title: "Yêu thương không điều kiện",
    description: "Chúng tôi tin rằng mọi thú cưng đều xứng đáng được yêu thương và chăm sóc, bất kể xuất thân, tình trạng sức khỏe hay ngoại hình của chúng.",
    color: "from-pink-100 to-pink-200",
    textColor: "text-pink-700",
    borderColor: "border-pink-300",
    image: "/src/assets/images/dog-hero.svg"
  },
  {
    icon: <FaAward className="text-2xl text-yellow-500" />,
    title: "Chất lượng chăm sóc",
    description: "Chúng tôi cam kết cung cấp chăm sóc y tế, dinh dưỡng và tình cảm chất lượng cao nhất cho mọi thú cưng trong khả năng của mình.",
    color: "from-yellow-100 to-yellow-200",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-300",
    image: "/src/assets/images/timeline-medical.svg"
  },
  {
    icon: <FaUsers className="text-2xl text-blue-500" />,
    title: "Cộng đồng",
    description: "Chúng tôi xây dựng và nuôi dưỡng một cộng đồng những người yêu thương và bảo vệ động vật, cùng nhau tạo nên những thay đổi tích cực.",
    color: "from-blue-100 to-blue-200",
    textColor: "text-blue-700",
    borderColor: "border-blue-300",
    image: "/src/assets/images/timeline-activity.svg"
  },
  {
    icon: <FaHandHoldingHeart className="text-2xl text-green-500" />,
    title: "Trách nhiệm",
    description: "Chúng tôi hoạt động với sự minh bạch, chính trực và trách nhiệm đối với nhà tài trợ, tình nguyện viên và cộng đồng.",
    color: "from-green-100 to-green-200",
    textColor: "text-green-700",
    borderColor: "border-green-300",
    image: "/src/assets/images/timeline-training.svg"
  }
];

const CoreValuesSection = () => {
  return (
    <section data-section className="py-24 px-4 relative overflow-hidden">
      {/* Gradient Background with Better Visual Appeal */}
      <div className="absolute inset-0 bg-gradient-to-r from-pastel-lavender to-pastel-pink opacity-80 z-0"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white opacity-20"></div>
        <div className="absolute left-10 bottom-10 h-40 w-40 rounded-full bg-white opacity-20"></div>
        
        {/* Floating decorative elements */}
        <motion.div 
          className="absolute left-1/4 top-1/4"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src="/src/assets/images/heart-paw.svg" alt="" className="w-16 h-16 opacity-10" />
        </motion.div>
        
        <motion.div 
          className="absolute right-1/4 bottom-1/4"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <img src="/src/assets/images/paw-print.svg" alt="" className="w-12 h-12 opacity-10" />
        </motion.div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Visual connector to previous section */}
          <div className="flex justify-center mb-8">
            <div className="w-1 h-20 bg-gradient-to-b from-green-200 to-transparent"></div>
          </div>
          
          <span className="inline-block feminine-pill bg-white text-purple-600 mb-4 shadow-md">
            Giá trị cốt lõi
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 feminine-title">
            Những nguyên tắc <span className="text-purple-600">hướng dẫn</span> chúng tôi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto feminine-body mb-4">
            Tại Cilis Pet, mọi quyết định và hành động của chúng tôi đều dựa trên những giá trị cốt lõi sau.
            Những giá trị này không chỉ là lời nói, mà còn là cam kết thực sự của chúng tôi đối với thú cưng và cộng đồng.
          </p>
          
          {/* Visual divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-purple-300 to-pink-300 mx-auto my-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {VALUES.map((value, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${value.color} backdrop-blur-sm rounded-2xl shadow-lg border ${value.borderColor} overflow-hidden h-full`}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.2)" }}
            >
              {/* Card Header with Icon */}
              <div className="p-6 flex items-center justify-center flex-col text-center relative">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-md mb-4">
                  {value.icon}
                </div>
                
                <h3 className={`text-xl font-semibold mb-2 feminine-subtitle ${value.textColor}`}>
                  {value.title}
                </h3>
                
                {/* Wavy divider */}
                <div className="w-full h-6 overflow-hidden">
                  <svg viewBox="0 0 500 30" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}>
                    <path d="M0,0 C150,40 350,0 500,20 L500,00 L0,0 Z" style={{ stroke: "none", fill: "white" }}></path>
                  </svg>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="bg-white p-6 pt-2 flex-1 flex flex-col">
                <p className="text-gray-600 text-center feminine-body mb-6 flex-grow">
                  {value.description}
                </p>
                
                {/* Illustration */}
                <div className="w-full h-32 rounded-xl overflow-hidden mt-auto">
                  <img 
                    src={value.image} 
                    alt={value.title} 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Practical example */}
                <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                  <h4 className={`text-sm font-medium mb-1 ${value.textColor}`}>Ví dụ thực tế:</h4>
                  <p className="text-xs text-gray-500">
                    {index === 0 ? "Chúng tôi chăm sóc thú cưng khuyết tật với cùng mức độ quan tâm và tình yêu thương." : 
                     index === 1 ? "Mỗi thú cưng đều có kế hoạch dinh dưỡng và y tế riêng biệt phù hợp với nhu cầu cụ thể." :
                     index === 2 ? "Tổ chức các buổi gặp mặt định kỳ giữa người nhận nuôi để chia sẻ kinh nghiệm và hỗ trợ lẫn nhau." :
                     "Báo cáo tài chính minh bạch và cập nhật thường xuyên về tình hình hoạt động đến các nhà tài trợ."}
                  </p>
                </div>
              </div>
              
              {/* Visual indicator for connective storytelling */}
              <div className={`h-1 w-full ${index < 3 ? "lg:hidden" : ""}`}></div>
            </motion.div>
          ))}
        </div>
        
        {/* Wave divider for better section transition */}
        <div className="absolute -bottom-24 left-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block" style={{ width: "calc(100% + 1.3px)" }} height="70" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection; 