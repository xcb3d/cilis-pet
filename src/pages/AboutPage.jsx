import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaPaw, FaHeart, FaHandHoldingHeart, FaUsers, 
  FaHistory, FaAward, FaPhone, FaEnvelope, 
  FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter,
  FaQuoteLeft, FaQuoteRight, FaStar, FaArrowDown,
  FaRegLightbulb, FaRegCompass
} from 'react-icons/fa';

// Navigation dots component for improved section navigation
const SectionDots = ({ activeSection, sections, onDotClick }) => {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-center space-y-4">
      {sections.map((section, index) => (
        <motion.button
          key={index}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === index ? 'bg-purple-500 scale-125' : 'bg-gray-300'}`}
          onClick={() => onDotClick(index)}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Scroll to ${section} section`}
        />
      ))}
    </div>
  );
};

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

// Main component
const AboutPage = () => {
  const [activeSection, setActiveSection] = React.useState(0);
  const sectionRefs = React.useRef([]);
  const sections = ["hero", "mission", "story", "team", "values", "contact", "cta"];

  React.useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: "-10% 0px -10% 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setActiveSection(index);
        }
      });
    }, observerOptions);

    // Initialize refs if needed
    if (sectionRefs.current.length === 0) {
      sectionRefs.current = sections.map(() => React.createRef());
    }

    // Set up observers
    document.querySelectorAll('[data-section]').forEach((section, index) => {
      section.dataset.index = index;
      sectionObserver.observe(section);
    });

    return () => {
      document.querySelectorAll('[data-section]').forEach(section => {
        sectionObserver.unobserve(section);
      });
    };
  }, []);

  const scrollToSection = (index) => {
    document.querySelectorAll('[data-section]')[index].scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen relative overflow-hidden">
      {/* Navigation Dots */}
      <SectionDots 
        activeSection={activeSection} 
        sections={sections} 
        onDotClick={scrollToSection} 
      />

      {/* Hero Section with Enhanced Visual Design */}
      <section data-section className="min-h-screen flex items-center relative overflow-hidden" style={{
        background: `linear-gradient(135deg, rgba(230, 230, 250, 0.9) 0%, rgba(255, 209, 220, 0.9) 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-white opacity-20 animate-pulse"></div>
          <div className="absolute left-1/4 bottom-0 h-40 w-40 rounded-full bg-white opacity-20 animate-float"></div>
          <div className="absolute right-1/3 top-1/3 h-32 w-32 rounded-full bg-white opacity-20"></div>
          <div className="absolute left-10 top-20 h-20 w-20 rounded-full bg-white opacity-20 animate-bounce"></div>
          
          {/* Paw print decorations */}
          <div className="absolute top-1/4 right-1/3">
            <img src="/src/assets/images/paw-print.svg" alt="" className="w-12 h-12 opacity-20 transform rotate-12" />
          </div>
          <div className="absolute bottom-1/3 left-1/4">
            <img src="/src/assets/images/paw-print.svg" alt="" className="w-8 h-8 opacity-20 transform -rotate-15" />
          </div>
          <div className="absolute top-2/3 right-1/4">
            <img src="/src/assets/images/heart-paw.svg" alt="" className="w-16 h-16 opacity-15 transform rotate-6" />
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 px-4 py-16 md:py-24">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block feminine-pill feminine-bg-lavender text-indigo-700 mb-6">
              Thành lập từ 2015
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 feminine-title text-indigo-900 tracking-tight">
              Về <span className="text-pink-600">Cilis Pet</span>
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto feminine-body text-indigo-800 leading-relaxed">
              Cilis Pet là tổ chức phi lợi nhuận với sứ mệnh tạo nên một thế giới nơi mỗi thú cưng đều có một mái ấm yêu thương và được chăm sóc xứng đáng.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex justify-center mt-8 flex-wrap gap-3"
            >
              <div className="bg-white/40 backdrop-filter backdrop-blur-sm px-6 py-3 rounded-full inline-flex items-center shadow-lg">
                <FaStar className="text-yellow-500 mr-2" />
                <span className="font-medium text-indigo-900">Đã giúp đỡ hơn 5,000+ thú cưng</span>
              </div>
              <div className="bg-white/40 backdrop-filter backdrop-blur-sm px-6 py-3 rounded-full inline-flex items-center shadow-lg">
                <FaRegLightbulb className="text-green-500 mr-2" />
                <span className="font-medium text-indigo-900">3 trung tâm cứu trợ toàn quốc</span>
              </div>
            </motion.div>
            
            {/* Call to action buttons */}
            <motion.div 
              className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.a
                href="/donate"
                className="feminine-button feminine-button-pink shadow-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Quyên góp ngay
              </motion.a>
              
              <motion.a
                href="/pets"
                className="feminine-button border-2 border-purple-600 text-purple-600 bg-white px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Nhận nuôi thú cưng
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p className="text-indigo-800 mb-2 text-sm font-medium">Khám phá thêm</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaArrowDown className="text-indigo-800 mx-auto" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Wave divider for better section transition */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-1 z-10">
          <svg className="relative block" style={{ width: "calc(100% + 1.3px)" }} height="70" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Mission Section with Enhanced Visual Cards */}
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

      {/* Our Story Section with Feminine Design */}
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

      {/* Team Section with Rounded Cards */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block feminine-pill feminine-bg-blue text-blue-700 mb-4">
              Đội ngũ của chúng tôi
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 feminine-title">Những người yêu thương động vật</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto feminine-body">
              Đội ngũ Cilis Pet bao gồm các chuyên gia, bác sĩ thú y, nhà huấn luyện và những người đam mê chăm sóc động vật.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Nguyễn Minh Anh",
                position: "Nhà sáng lập & Giám đốc",
                bio: "10 năm kinh nghiệm trong lĩnh vực bảo vệ động vật, Thạc sĩ Công tác xã hội",
                image: "/src/assets/images/team-1.jpg",
                color: "feminine-bg-pink"
              },
              {
                name: "Trần Thanh Hà",
                position: "Giám đốc Y tế",
                bio: "Bác sĩ thú y với chuyên môn về phẫu thuật và chăm sóc đặc biệt",
                image: "/src/assets/images/team-2.jpg",
                color: "feminine-bg-lavender"
              },
              {
                name: "Lê Văn Hùng",
                position: "Quản lý Trung tâm Cứu trợ",
                bio: "Chuyên gia về hành vi động vật và phục hồi chức năng cho thú cưng bị ngược đãi",
                image: "/src/assets/images/team-3.jpg",
                color: "feminine-bg-mint"
              },
              {
                name: "Phạm Thu Trang",
                position: "Điều phối viên Tình nguyện",
                bio: "Chuyên gia tổ chức sự kiện và quản lý mạng lưới tình nguyện viên",
                image: "/src/assets/images/team-4.jpg",
                color: "feminine-bg-coral"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="feminine-card overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className={`h-3 ${member.color}`}></div>
                <div className="relative h-56 bg-gray-100">
                  <img 
                    src={member.image}
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = index % 2 === 0 ? 
                        "/src/assets/images/dog-hero.svg" : 
                        "/src/assets/images/cat-hero.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
                </div>
                <div className="p-5 relative">
                  <div className="absolute -top-8 left-4 w-16 h-16 rounded-full border-4 border-white overflow-hidden">
                    <img 
                      src={member.image}
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = index % 2 === 0 ? 
                          "/src/assets/images/dog-hero.svg" : 
                          "/src/assets/images/cat-hero.svg";
                      }}
                    />
                  </div>
                  <div className="pt-6">
                    <h3 className="text-lg font-bold text-gray-800 feminine-subtitle">{member.name}</h3>
                    <p className="text-purple-600 font-medium text-sm mb-2">{member.position}</p>
                    <p className="text-gray-600 text-sm feminine-body">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section with Enhanced Visual Design */}
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
            {[
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
            ].map((value, index) => (
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
          
          {/* Value in Action - Real Impact */}
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
        </div>
        
        {/* Wave divider for better section transition */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block" style={{ width: "calc(100% + 1.3px)" }} height="70" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Contact Section with Soft Design */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block feminine-pill feminine-bg-coral text-red-700 mb-4">
              Liên hệ với chúng tôi
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 feminine-title">Hãy kết nối với chúng tôi</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto feminine-body">
              Có thắc mắc hoặc muốn hỗ trợ? Đừng ngần ngại liên hệ với chúng tôi qua các kênh dưới đây.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <FaPhone className="text-2xl text-pink-500" />,
                title: "Gọi cho chúng tôi",
                info: "(+84) 123 456 789",
                details: "Thứ Hai - Thứ Sáu, 8:00 - 17:00",
                color: "feminine-bg-pink"
              },
              {
                icon: <FaEnvelope className="text-2xl text-purple-500" />,
                title: "Email",
                info: "info@cilispet.vn",
                details: "Chúng tôi sẽ phản hồi trong vòng 24 giờ",
                color: "feminine-bg-lavender"
              },
              {
                icon: <FaMapMarkerAlt className="text-2xl text-blue-500" />,
                title: "Địa chỉ",
                info: "123 Đường Cứu Trợ, Quận Thanh Xuân, Hà Nội",
                details: "Trung tâm cứu trợ chính",
                color: "feminine-bg-mint"
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                className="feminine-card text-center"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className={`h-2 ${contact.color}`}></div>
                <div className="p-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gray-50">
                    {contact.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 feminine-subtitle">{contact.title}</h3>
                  <p className="text-gray-800 font-medium mb-1">{contact.info}</p>
                  <p className="text-gray-500 text-sm">{contact.details}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: <FaFacebook className="text-xl" />, color: "feminine-button-pink", name: "Facebook" },
              { icon: <FaInstagram className="text-xl" />, color: "feminine-button-mint", name: "Instagram" },
              { icon: <FaTwitter className="text-xl" />, color: "feminine-button-coral", name: "Twitter" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                className={`${social.color} px-6 py-3 rounded-full flex items-center gap-2 font-medium shadow-md feminine-button`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
                <span>Theo dõi trên {social.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Pastel Colors */}
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
    </div>
  );
};

export default AboutPage; 