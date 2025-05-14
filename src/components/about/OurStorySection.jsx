import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHistory, FaPaw, FaHandHoldingHeart, 
  FaQuoteLeft, FaQuoteRight 
} from 'react-icons/fa';

const OurStorySection = () => {
  return (
    <section data-section className="py-24 px-4 feminine-bg-mint relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-white opacity-20"></div>
        <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-white opacity-20"></div>
        
        {/* Added decorative elements */}
        <div className="absolute bottom-32 right-24">
          <motion.img 
            src="/src/assets/images/paw-print.svg" 
            className="w-20 h-20 opacity-20" 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="absolute top-1/3 left-1/3">
          <motion.img 
            src="/src/assets/images/heart-paw.svg" 
            className="w-16 h-16 opacity-20" 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="md:w-1/2"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block feminine-pill feminine-bg-pink text-pink-700 mb-4">
              Câu chuyện của chúng tôi
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 feminine-title">Từ tình yêu thương đến hành động</h2>
            
            {/* Enhanced storytelling structure with visual cues */}
            <div className="text-gray-700 space-y-6 feminine-body relative border-l-2 border-pink-200 pl-6">
              {/* Chapter 1: Beginning */}
              <div className="relative">
                <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-pink-500 shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <h3 className="text-xl text-pink-700 mb-2 font-semibold">Khởi đầu đầy cảm hứng</h3>
                <p className="leading-relaxed">
                  <strong className="text-purple-600">2015:</strong> Cilis Pet được thành lập bởi Nguyễn Minh Anh và một nhóm 5 người yêu động vật, khởi đầu từ một trung tâm cứu trợ nhỏ ở Hà Nội.
                </p>
              </div>
              
              {/* Chapter 2: Growth */}
              <div className="relative">
                <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-purple-500 shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <h3 className="text-xl text-purple-700 mb-2 font-semibold">Giai đoạn phát triển</h3>
                <p className="leading-relaxed">
                  <strong className="text-purple-600">2017-2019:</strong> Mở rộng hoạt động với trung tâm thứ hai tại TP.HCM, tăng khả năng cứu trợ và chăm sóc lên 50 thú cưng mỗi tháng. Tạo dựng mạng lưới 100+ tình nguyện viên.
                </p>
              </div>
              
              {/* Chapter 3: Current */}
              <div className="relative">
                <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-blue-500 shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <h3 className="text-xl text-blue-700 mb-2 font-semibold">Hiện tại và tương lai</h3>
                <p className="leading-relaxed">
                  <strong className="text-purple-600">2020-nay:</strong> Phát triển thành tổ chức quy mô toàn quốc với 3 trung tâm tại Hà Nội, TP.HCM và Đà Nẵng. Đến nay, Cilis Pet đã giải cứu và tìm nhà mới cho hơn 5000 chú chó, mèo.
                </p>
              </div>
              
              {/* Future vision */}
              <div className="relative">
                <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-green-500 shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <h3 className="text-xl text-green-700 mb-2 font-semibold">Tầm nhìn tương lai</h3>
                <p className="leading-relaxed">
                  Chúng tôi đặt mục tiêu mở rộng ra 5 trung tâm trên toàn quốc, phát triển chương trình giáo dục về quyền lợi động vật trong trường học, và vận động chính sách bảo vệ động vật toàn diện hơn.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.div 
                className="flex items-center gap-2 text-gray-700 feminine-bg-lavender p-4 rounded-xl shadow-md" 
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="p-2 bg-white rounded-full shadow-md">
                  <FaHistory className="text-purple-500" />
                </div>
                <div>
                  <p className="font-bold">8+</p>
                  <p className="text-sm">Năm hoạt động</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-2 text-gray-700 feminine-bg-pink p-4 rounded-xl shadow-md" 
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="p-2 bg-white rounded-full shadow-md">
                  <FaPaw className="text-pink-500" />
                </div>
                <div>
                  <p className="font-bold">5000+</p>
                  <p className="text-sm">Thú cưng được giúp đỡ</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-2 text-gray-700 feminine-bg-mint p-4 rounded-xl shadow-md" 
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="p-2 bg-white rounded-full shadow-md">
                  <FaHandHoldingHeart className="text-green-500" />
                </div>
                <div>
                  <p className="font-bold">200+</p>
                  <p className="text-sm">Tình nguyện viên</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="md:w-1/2"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Image gallery in asymmetric grid */}
            <div className="grid grid-cols-6 grid-rows-6 gap-3 h-full">
              <div className="col-span-4 row-span-3 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/src/assets/images/about-story.jpg"
                  alt="Cilis Pet team rescuing animals" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/src/assets/images/dog-hero.svg";
                  }}
                />
              </div>
              
              <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-xl bg-white p-2">
                <div className="relative h-full rounded-xl overflow-hidden">
                  <img 
                    src="/src/assets/images/timeline-rescue.svg"
                    alt="Animal rescue" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/70 to-transparent flex items-end">
                    <p className="text-white text-sm font-medium p-2">Cứu trợ</p>
                  </div>
                </div>
              </div>
              
              <div className="col-span-2 row-span-1 rounded-2xl overflow-hidden shadow-xl bg-white p-2">
                <div className="relative h-full rounded-xl overflow-hidden">
                  <img 
                    src="/src/assets/images/timeline-medical.svg"
                    alt="Medical care" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/70 to-transparent flex items-end">
                    <p className="text-white text-sm font-medium p-2">Chăm sóc</p>
                  </div>
                </div>
              </div>
              
              <div className="col-span-2 row-span-3 rounded-2xl overflow-hidden shadow-xl bg-white p-2">
                <div className="relative h-full rounded-xl overflow-hidden">
                  <img 
                    src="/src/assets/images/pet-house.svg"
                    alt="Forever home" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-500/70 to-transparent flex items-end">
                    <p className="text-white text-sm font-medium p-2">Mái ấm mới</p>
                  </div>
                </div>
              </div>
              
              <div className="col-span-4 row-span-3 rounded-2xl overflow-hidden shadow-xl relative">
                <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-md max-w-[250px]">
                  <div className="flex items-start mb-2">
                    <FaQuoteLeft className="text-pink-400 mr-1 text-sm mt-1" />
                    <p className="text-sm italic text-gray-700">Mỗi thú cưng đều có quyền được yêu thương và chăm sóc như bất kỳ thành viên nào trong gia đình</p>
                    <FaQuoteRight className="text-pink-400 ml-1 text-sm mt-1" />
                  </div>
                  <p className="text-right text-xs font-medium text-gray-900">- Minh Anh, Founder</p>
                </div>
                
                <img 
                  src="/src/assets/images/timeline-training.svg"
                  alt="Cilis Pet education program" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/src/assets/images/cat-hero.svg";
                  }}
                />
              </div>
            </div>
            
            {/* "Before and After" transformation story */}
            <div className="mt-6 bg-white rounded-2xl p-4 shadow-lg">
              <h3 className="text-center text-purple-700 font-semibold mb-2">Câu chuyện chuyển đổi</h3>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <p className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">Trước</p>
                  <img 
                    src="/src/assets/images/dog-hero.svg"
                    alt="Before rescue" 
                    className="w-full h-28 object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center text-purple-500">→</div>
                <div className="flex-1 relative">
                  <p className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">Sau</p>
                  <img 
                    src="/src/assets/images/dog-hero.svg"
                    alt="After adoption" 
                    className="w-full h-28 object-cover rounded-lg"
                  />
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">Luna - Từ bị bỏ rơi đến có gia đình mới yêu thương</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave divider for transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10">
        <svg className="relative block" style={{ width: "calc(100% + 1.3px)" }} height="70" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
    </section>
  );
};

export default OurStorySection; 