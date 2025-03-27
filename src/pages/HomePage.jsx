import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import FeaturedPets from '../components/home/FeaturedPets';
import { Link } from 'react-router-dom';
import { FaPaw, FaCalendarAlt, FaHandHoldingHeart, FaHeart, FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import PetButton from '../components/buttons/PetButton';

const HomePage = () => {
  const [visibleTestimonial, setVisibleTestimonial] = useState(0);
  const [confetti, setConfetti] = useState([]);

  const testimonials = [
    {
      name: "Minh Anh",
      pet: "Milo (Corgi)",
      image: "https://i.pravatar.cc/100?img=5",
      quote: "Milo đã thay đổi cuộc sống của tôi! Cảm ơn Cilis Pet đã giúp chúng tôi tìm thấy nhau. Quá trình nhận nuôi diễn ra rất suôn sẻ và đội ngũ hỗ trợ rất tận tình."
    },
    {
      name: "Thanh Hà",
      pet: "Luna (Mèo Anh lông ngắn)",
      image: "https://i.pravatar.cc/100?img=9",
      quote: "Luna là niềm vui mỗi ngày của tôi. Từ khi nhận nuôi bé từ Cilis Pet, căn nhà của tôi đã tràn ngập tiếng cười. Cảm ơn vì đã mang Luna đến với cuộc sống của tôi!"
    },
    {
      name: "Hoàng Nam",
      pet: "Coco (Husky)",
      image: "https://i.pravatar.cc/100?img=3",
      quote: "Cilis Pet không chỉ giúp tôi tìm được Coco mà còn hỗ trợ rất nhiều trong quá trình chăm sóc Coco. Đội ngũ tư vấn luôn sẵn sàng giải đáp mọi thắc mắc của tôi."
    },
  ];

  const createConfetti = () => {
    const newConfetti = Array.from({ length: 20 }, (_, index) => ({
      id: Date.now() + index,
      x: Math.random() * 100,
      y: -10,
      size: Math.random() * 8 + 5,
      opacity: 0.8 + Math.random() * 0.2,
      rotation: Math.random() * 360,
      type: Math.random() > 0.5 ? 'heart' : Math.random() > 0.5 ? 'paw' : 'star',
      color: ['#FF8FAB', '#F96483', '#DA7F8F', '#FFC4D0', '#FFACC7'][Math.floor(Math.random() * 5)]
    }));

    setConfetti(prev => [...prev, ...newConfetti]);

    // Xóa confetti sau khi animation kết thúc
    setTimeout(() => {
      setConfetti(prev => prev.filter(c => !newConfetti.some(n => n.id === c.id)));
    }, 3000);
  };

  // Chuyển testimonial mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="homepage-wrapper">
      {/* Hero Section */}
      <HeroSection />

      {/* Rest of the components */}

      {/* Featured Pets */}
      <section className="py-16 relative">
        <FeaturedPets />

        {/* Why Adopt Section */}
        <section className="py-16 bg-white paw-pattern relative overflow-hidden">
          {/* Confetti effect */}
          <AnimatePresence>
            {confetti.map(item => (
              <motion.div
                key={item.id}
                className="fixed z-50 pointer-events-none"
                initial={{ x: `${item.x}vw`, y: `${item.y}vh`, opacity: 0, rotation: 0, scale: 0 }}
                animate={{
                  y: [`${item.y}vh`, `${item.y + 100}vh`],
                  opacity: [0, item.opacity, 0],
                  rotation: [0, item.rotation],
                  scale: [0, 1, 0.5]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, ease: "easeOut" }}
                style={{ color: item.color, fontSize: `${item.size}px` }}
              >
                {item.type === 'heart' && <FaHeart />}
                {item.type === 'paw' && <FaPaw />}
                {item.type === 'star' && <FaStar />}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Decorative elements */}
          <div className="absolute -left-16 top-1/3 w-32 h-32 bg-pink-100 rounded-full opacity-50" />
          <div className="absolute -right-16 bottom-1/4 w-40 h-40 bg-purple-100 rounded-full opacity-50" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className='flex items-center justify-center gap-4'>
                <div className="inline-flex items-center justify-center mb-4">
                  <div className="p-1.5 bg-pink-100 rounded-full">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FaHandHoldingHeart className="text-pink-500 text-2xl" />
                    </motion.div>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4 heading-cute">Tại sao nên nhận nuôi một bé cưng?</h2>
              </div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Khi bạn nhận nuôi một thú cưng từ chúng tôi, bạn không chỉ cứu sống một sinh mạng nhỏ bé mà còn mang đến ngôi nhà bạn một người bạn đồng hành đáng yêu và trung thành.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="card-cute bg-pastel-pink p-8 text-center group"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-md group-hover:animate-wiggle">
                  <FaPaw className="text-pink-500 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Cứu sống một sinh mạng bé nhỏ</h3>
                <p className="text-gray-600">
                  Mỗi năm có hàng ngàn thú cưng bị bỏ rơi. Khi bạn nhận nuôi, bạn đang mang đến cho những sinh mạng nhỏ bé này cơ hội để có một cuộc sống hạnh phúc và đầy yêu thương.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card-cute bg-pastel-mint p-8 text-center group"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-md group-hover:animate-wiggle">
                  <FaHandHoldingHeart className="text-green-500 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Người bạn đồng hành đáng yêu</h3>
                <p className="text-gray-600">
                  Thú cưng nhận nuôi thường rất trung thành và biết ơn. Họ sẽ luôn bên cạnh bạn, mang đến vô vàn niềm vui và những khoảnh khắc đáng nhớ trong cuộc sống.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="card-cute bg-pastel-lavender p-8 text-center group"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-md group-hover:animate-wiggle">
                  <FaCalendarAlt className="text-purple-500 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Được chăm sóc chu đáo</h3>
                <p className="text-gray-600">
                  Các bé cưng từ Cilis Pet đều đã được tiêm phòng, khám sức khỏe và nhiều bé đã được triệt sản, sẵn sàng cho mái ấm mới đầy tình thương.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center mt-12"
            >
              <PetButton
                text="Tìm hiểu thêm về nhận nuôi"
                icon="paw"
                size="lg"
                variant="primary"
                onClick={() => {
                  createConfetti();
                  window.location.href = '/adopt';
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gradient-to-r from-pink-100 to-purple-100">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className='flex items-center justify-center gap-4'>
                <span className="text-sm font-medium text-pink-600 bg-white px-4 py-1.5 rounded-full shadow-sm inline-block mb-4">
                  Câu chuyện hạnh phúc
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mb-4 heading-cute">
                  Những mái ấm hạnh phúc
                </h2>
              </div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Hãy nghe những câu chuyện từ các gia đình đã nhận nuôi thú cưng từ Cilis Pet. Mỗi câu chuyện là một hành trình yêu thương.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                {testimonials.map((testimonial, index) => (
                  index === visibleTestimonial && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center relative"
                    >
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="avatar-cute w-16 h-16 object-cover"
                        />
                      </div>

                      <div className="mt-8">
                        <FaQuoteLeft className="text-pink-200 text-2xl inline-block mb-4" />
                        <p className="text-gray-700 mb-6 italic">
                          {testimonial.quote}
                        </p>
                        <FaQuoteRight className="text-pink-200 text-2xl inline-block" />

                        <div className="mt-4">
                          <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                          <p className="text-sm text-pink-500">với {testimonial.pet}</p>
                        </div>
                      </div>

                      {/* Dots indicator */}
                      <div className="flex justify-center gap-2 mt-6">
                        {testimonials.map((_, i) => (
                          <button
                            key={i}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${i === visibleTestimonial
                                ? 'bg-pink-500 w-6'
                                : 'bg-pink-200 hover:bg-pink-300'
                              }`}
                            onClick={() => setVisibleTestimonial(i)}
                            aria-label={`Testimonial ${i + 1}`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-pink-500 to-pink-600 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-12 text-white opacity-20"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl mx-auto"
            >
              {/* Top decorative pink curved shape */}
              <div className="h-24 bg-gradient-to-r from-pink-400 to-pink-500 relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full">
                  <path fill="white" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,170.7C960,160,1056,160,1152,149.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
              </div>
              
              <div className="p-8 pt-0 pb-12 bg-white">
                {/* Floating heart icon */}
                <motion.div
                  className="relative -top-12 bg-white w-20 h-20 rounded-full shadow-lg flex items-center justify-center mx-auto border-4 border-pink-100"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <FaHeart className="text-pink-500 text-3xl" />
                  </motion.div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 mx-auto relative inline-block"
                >
                  <span className="relative z-10">Bạn đã sẵn sàng <span className="text-pink-500">mang lại niềm vui</span> cho một bé cưng?</span>
                  <span className="absolute left-0 bottom-1 w-full h-3 bg-pink-100 rounded-lg -z-0"></span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg mb-10 max-w-2xl mx-auto text-gray-600"
                >
                  Hàng trăm bé cưng đáng yêu đang chờ đợi một gia đình đầy tình thương. 
                  <br className="hidden sm:block" />
                  Hãy mở rộng trái tim và đón một bé về nhà bạn!
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <PetButton 
                    text="Xem thú cưng"
                    icon="paw"
                    to="/pets"
                    variant="primary"
                    size="lg"
                  />

                  <PetButton
                    text="Ủng hộ"
                    icon="heart"
                    to="/donate"
                    variant="outline"
                    size="lg"
                  />

                  <PetButton 
                    text="Trải nghiệm tương tác mới"
                    to="/gesture-demo"
                    variant="gradient"
                    size="lg"
                  >
                    <span role="img" aria-label="sparkles">✨</span>
                  </PetButton>
                </motion.div>
              </div>
              
              {/* Paw print background pattern */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
                <div className="paw-pattern absolute top-5 left-5 transform rotate-12">
                  <FaPaw className="text-5xl" />
                </div>
                <div className="paw-pattern absolute top-20 right-10 transform -rotate-12">
                  <FaPaw className="text-5xl" />
                </div>
                <div className="paw-pattern absolute bottom-10 left-20 transform rotate-45">
                  <FaPaw className="text-5xl" />
                </div>
                <div className="paw-pattern absolute bottom-20 right-5 transform -rotate-25">
                  <FaPaw className="text-5xl" />
                </div>
              </div>
            </motion.div>
            
            {/* Blog Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto mt-16 bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 bg-pink-50 p-8 flex items-center justify-center">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                      Blog về chăm sóc thú cưng
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Khám phá các bài viết bổ ích về chăm sóc, huấn luyện và dinh dưỡng cho thú cưng của bạn.
                    </p>
                    <Link 
                      to="/blog" 
                      className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-full transition duration-300 hover:shadow-lg hover:text-white"
                    >
                      Đọc ngay
                    </Link>
                  </div>
                </div>
                <div className="md:w-3/5 p-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                    <div className="relative group overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1516734212186-b967eb982183" 
                        alt="Huấn luyện thú cưng" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                        <span className="text-white font-medium">Mẹo huấn luyện chó con</span>
                      </div>
                    </div>
                    <div className="relative group overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba" 
                        alt="Dinh dưỡng cho mèo" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                        <span className="text-white font-medium">Dinh dưỡng cho mèo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Stats below the main card */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center"
              >
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <FaPaw className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-bold mb-1">100+</h3>
                <p className="text-white/80">Thú cưng đang chờ nhận nuôi</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center"
              >
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <FaHeart className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-bold mb-1">500+</h3>
                <p className="text-white/80">Gia đình hạnh phúc</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center"
              >
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <FaHandHoldingHeart className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-bold mb-1">10+</h3>
                <p className="text-white/80">Năm kinh nghiệm</p>
              </motion.div>
            </div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-12 text-white opacity-20"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </section>
      </section>
    </div>
  );
};

export default HomePage; 