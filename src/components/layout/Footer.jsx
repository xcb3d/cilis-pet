import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaPaw, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaBone, FaCat, FaDog } from 'react-icons/fa';

const Footer = () => {
  const [bubbles, setBubbles] = useState([]);
  const currentYear = new Date().getFullYear();
  
  // Generate bubbles for animation
  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = [];
      for (let i = 0; i < 12; i++) {
        newBubbles.push({
          id: i,
          x: Math.random() * 100, // Position in % across width
          size: 10 + Math.random() * 30, // Size between 10-40px
          duration: 15 + Math.random() * 20, // Animation duration
          delay: Math.random() * 5,
          icon: Math.random() > 0.5 ? 'paw' : (Math.random() > 0.5 ? 'bone' : 'heart')
        });
      }
      setBubbles(newBubbles);
    };
    
    generateBubbles();
  }, []);
  
  // Footer links organized by section
  const footerLinks = [
    {
      title: 'Khám phá',
      links: [
        { name: 'Trang chủ', path: '/' },
        { name: 'Thú cưng', path: '/pets' },
        { name: 'Sự kiện', path: '/events' },
        { name: 'Quyên góp', path: '/donate' },
        { name: 'Về chúng tôi', path: '/about' },
      ],
    },
    {
      title: 'Hỗ trợ',
      links: [
        { name: 'Hướng dẫn nhận nuôi', path: '/guides' },
        { name: 'Chăm sóc thú cưng', path: '/pet-care' },
        { name: 'Câu hỏi thường gặp', path: '/faq' },
        { name: 'Liên hệ', path: '/contact' },
      ],
    },
    {
      title: 'Tham gia',
      links: [
        { name: 'Tình nguyện viên', path: '/volunteer' },
        { name: 'Báo cáo thú cưng lạc', path: '/report' },
        { name: 'Đối tác', path: '/partners' },
        { name: 'Cơ hội việc làm', path: '/careers' },
      ],
    },
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative overflow-hidden w-screen -ml-[calc(50vw-50%)] mr-[calc(50vw-50%)]">
      {/* Animated bubbles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute text-pink-200/30"
            initial={{ 
              x: `${bubble.x}%`, 
              y: '100%',
              opacity: 0.3,
            }}
            animate={{ 
              y: '-100%',
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{ fontSize: `${bubble.size}px` }}
          >
            {bubble.icon === 'paw' ? <FaPaw /> : bubble.icon === 'bone' ? <FaBone /> : <FaHeart />}
          </motion.div>
        ))}
      </div>

      {/* Wave Separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden z-10">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative w-full h-12 sm:h-16 md:h-20"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            className="fill-white opacity-100"
          />
        </svg>
      </div>
      
      {/* Main Footer Content */}
      <div className="w-full feminine-bg-gradient-pink pt-28 pb-8">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <motion.div 
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <FaPaw className="text-pink-500 text-xl" />
                </motion.div>
                <h2 className="feminine-title text-2xl font-bold text-gray-800">
                  <span className="text-pink-600">Cilis</span>Pet
                </h2>
              </div>
              
              <p className="text-gray-700 mb-6 feminine-body">
                Chúng tôi kết nối những trái tim yêu thương với những người bạn bốn chân đáng yêu, mang lại niềm vui cho cả hai.
              </p>
              
              <div className="flex items-center gap-3 mb-8">
                <motion.a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="feminine-pill feminine-pill-pink flex items-center justify-center w-10 h-10"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaFacebook className="text-lg" />
                </motion.a>
                
                <motion.a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="feminine-pill feminine-pill-lavender flex items-center justify-center w-10 h-10"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaInstagram className="text-lg" />
                </motion.a>
                
                <motion.a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="feminine-pill feminine-pill-mint flex items-center justify-center w-10 h-10"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTwitter className="text-lg" />
                </motion.a>
              </div>
              
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-gray-800 font-semibold mb-2 feminine-subtitle">Liên hệ</h3>
                <div className="space-y-2 text-sm">
                  <motion.div 
                    className="flex items-center gap-2 text-gray-600"
                    whileHover={{ x: 3, color: "#FF6B98" }}
                  >
                    <FaEnvelope className="text-pink-400" />
                    <span>hello@cilispet.com</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2 text-gray-600"
                    whileHover={{ x: 3, color: "#FF6B98" }}
                  >
                    <FaPhone className="text-pink-400" />
                    <span>+84 (28) 3822 9876</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-2 text-gray-600"
                    whileHover={{ x: 3, color: "#FF6B98" }}
                  >
                    <FaMapMarkerAlt className="text-pink-400 mt-1" />
                    <span>123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            {/* Links Sections */}
            <motion.div 
              className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col justify-between"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {footerLinks.map((section, idx) => (
                  <motion.div key={idx} variants={itemVariants}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 feminine-title relative inline-block">
                      {section.title}
                      <motion.span 
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-pink-300 to-pink-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      />
                    </h3>
                    <ul className="space-y-2">
                      {section.links.map((link, linkIdx) => (
                        <motion.li 
                          key={linkIdx} 
                          variants={itemVariants}
                          whileHover={{ x: 5 }}
                        >
                          <Link 
                            to={link.path} 
                            className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center gap-1"
                          >
                            <motion.span 
                              className="text-pink-400 text-xs"
                              initial={{ opacity: 0.5, scale: 1 }}
                              whileHover={{ 
                                opacity: 1, 
                                scale: 1.2, 
                                rotate: 180,
                                color: "#FF4081"
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              ❀
                            </motion.span>
                            {link.name}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
              
              {/* Newsletter */}
              <motion.div 
                className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm"
                variants={itemVariants}
                whileHover={{ boxShadow: '0 10px 25px rgba(249, 168, 212, 0.2)' }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2 feminine-title">Nhận thông tin mới</h3>
                <p className="text-gray-600 mb-3 text-sm">Đăng ký để nhận thông tin về các sự kiện và thú cưng mới.</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email" 
                    placeholder="Email của bạn" 
                    className="feminine-input flex-grow focus:border-pink-400"
                  />
                  <motion.button 
                    className="feminine-button feminine-button-gradient relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: '0 5px 15px rgba(249, 168, 212, 0.4)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Đăng ký</span>
                    <motion.span 
                      className="absolute inset-0 bg-white opacity-0"
                      whileHover={{ opacity: 0.2, x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Adopt Promo */}
            <motion.div 
              className="col-span-1"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-sm relative overflow-hidden h-full flex flex-col"
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 15px 30px rgba(249, 168, 212, 0.2)'
                }}
              >
                <div className="absolute -top-8 -right-8 text-pink-100 opacity-30 z-0">
                  <FaPaw className="text-[100px]" />
                </div>
                
                <div className="absolute -bottom-6 -left-6 text-lavender-100 opacity-30 z-0">
                  <FaHeart className="text-[80px]" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3 feminine-title relative z-10">Nhận nuôi ngay hôm nay</h3>
                
                <p className="text-gray-600 mb-6 relative z-10 flex-grow">
                  Có rất nhiều thú cưng đang chờ đợi một mái ấm yêu thương. Hãy mở rộng trái tim và ngôi nhà của bạn.
                </p>
                
                <div className="flex justify-center gap-4 mb-4 relative z-10">
                  <motion.div 
                    className="p-2 bg-pink-50 rounded-full"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaDog className="text-2xl text-pink-400" />
                  </motion.div>
                  <motion.div 
                    className="p-2 bg-lavender-50 rounded-full"
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaCat className="text-2xl text-purple-400" />
                  </motion.div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    to="/pets" 
                    className="feminine-button feminine-button-gradient w-full justify-center mt-auto relative z-10 group"
                  >
                    <FaHeart className="mr-1 group-hover:animate-heartbeat" />
                    Tìm bạn mới
                    <motion.span 
                      className="absolute inset-0 bg-white opacity-0"
                      whileHover={{ opacity: 0.2, x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-pink-200/30 text-center text-gray-600 text-sm">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© {currentYear} CilisPet. Tất cả quyền được bảo lưu.</p>
              
              <div className="flex gap-4 mt-2 md:mt-0">
                <Link to="/privacy" className="hover:text-pink-600 transition-colors hover:underline">
                  Chính sách bảo mật
                </Link>
                <Link to="/terms" className="hover:text-pink-600 transition-colors hover:underline">
                  Điều khoản dịch vụ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, color, link }) => (
  <motion.a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`w-10 h-10 ${color} rounded-full flex items-center justify-center shadow-md`}
    whileHover={{ 
      scale: 1.2,
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' 
    }}
    whileTap={{ scale: 0.9 }}
  >
    {icon}
  </motion.a>
);

export default Footer; 