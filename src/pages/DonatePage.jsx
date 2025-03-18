import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHandHoldingHeart, FaPaw, FaHeartbeat, FaHospital, 
  FaClipboardCheck, FaShoppingBasket, FaHandsHelping, 
  FaArrowRight, FaGift, FaRegSmile, FaDonate
} from 'react-icons/fa';
import DonationCard from '../components/donate/DonationCard';
import { donationCampaigns, donationOptions } from '../data/donateData';

const DonatePage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [activeSection, setActiveSection] = useState('campaigns');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Reset scroll position when page loads
    window.scrollTo(0, 0);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option.amount === "Tùy chọn") {
      setCustomAmount('');
    }
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedOption) {
      alert('Vui lòng chọn một khoản quyên góp');
      return;
    }
    
    if (selectedOption.amount === "Tùy chọn" && (!customAmount || customAmount === '0')) {
      alert('Vui lòng nhập số tiền quyên góp');
      return;
    }
    
    // Show loading state
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowThankYou(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setShowThankYou(false);
        setSelectedOption(null);
        setCustomAmount('');
      }, 5000);
    }, 1500);
  };

  const formatCurrency = (amount) => {
    if (typeof amount === 'number') {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }
    return amount;
  };

  const impactItems = [
    { 
      icon: <FaPaw className="text-3xl text-purple-500" />,
      title: "Cứu trợ và nuôi dưỡng",
      description: "Mỗi tháng chúng tôi giải cứu và chăm sóc hơn 50 chú chó mèo bị bỏ rơi"
    },
    { 
      icon: <FaHeartbeat className="text-3xl text-red-500" />,
      title: "Chăm sóc y tế",
      description: "Cung cấp dịch vụ thú y cho hơn 200 thú cưng mỗi tháng, bao gồm cả phẫu thuật phức tạp"
    },
    { 
      icon: <FaHospital className="text-3xl text-blue-500" />,
      title: "Tiêm phòng & Triệt sản",
      description: "Thực hiện hơn 100 ca tiêm phòng và 80 ca triệt sản mỗi tháng để kiểm soát quần thể"
    },
    { 
      icon: <FaHandsHelping className="text-3xl text-green-500" />,
      title: "Tìm nhà mới",
      description: "Giúp hơn 40 thú cưng tìm được gia đình mới yêu thương mỗi tháng"
    }
  ];

  const otherWaysToHelp = [
    {
      icon: <FaPaw />,
      title: "Tình nguyện viên",
      description: "Dành thời gian của bạn để giúp đỡ các bé thú tại trung tâm"
    },
    {
      icon: <FaShoppingBasket />,
      title: "Quyên góp vật dụng",
      description: "Quyên góp thức ăn, đồ dùng, thuốc men cho trung tâm cứu trợ"
    },
    {
      icon: <FaClipboardCheck />,
      title: "Nhận nuôi",
      description: "Mang đến một mái ấm vĩnh viễn cho một bé thú đang cần tình thương"
    },
    {
      icon: <FaHandHoldingHeart />,
      title: "Nhà tạm nuôi",
      description: "Chăm sóc tạm thời cho thú cưng đang chờ được nhận nuôi"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 md:py-24 px-4 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white opacity-10"></div>
          <div className="absolute left-1/4 bottom-0 h-40 w-40 rounded-full bg-white opacity-10"></div>
          <div className="absolute right-1/3 top-1/3 h-32 w-32 rounded-full bg-white opacity-10"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between"
          >
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Mỗi đóng góp <br/>đều mang lại hy vọng</h1>
              <p className="text-lg md:text-xl opacity-90 mb-6 md:pr-10">
                Sự hỗ trợ của bạn giúp chúng tôi cứu trợ, chăm sóc và tìm nhà mới cho hàng trăm chú chó mèo bị bỏ rơi mỗi năm.
              </p>
              
              <motion.button
                className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium flex items-center group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('donateNow').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <FaDonate className="mr-2" />
                Quyên góp ngay
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
            
            <motion.div 
              className="md:w-1/3 flex justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <img 
                src="/src/assets/images/donation-hero.svg" 
                alt="Hỗ trợ thú cưng" 
                className="max-w-full h-auto rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Impact Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Tác động của sự đóng góp</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Mỗi đồng quyên góp đều mang lại sự thay đổi thực sự. Hãy xem qua những con số mà chúng tôi đã đạt được nhờ sự hỗ trợ của bạn.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactItems.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Navigation Tabs */}
      <section className="py-8 px-4 bg-white border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center md:justify-start space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            <button
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                activeSection === 'campaigns' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveSection('campaigns')}
            >
              Chiến dịch quyên góp
            </button>
            <button
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                activeSection === 'onetime' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveSection('onetime')}
            >
              Quyên góp một lần
            </button>
            <button
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                activeSection === 'other' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveSection('other')}
            >
              Các cách hỗ trợ khác
            </button>
          </div>
        </div>
      </section>

      {/* Content based on active section */}
      <AnimatePresence mode="wait">
        {activeSection === 'campaigns' && (
          <motion.section 
            key="campaigns"
            className="py-12 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Các chiến dịch đang quyên góp</h2>
                <p className="text-gray-600">
                  Chọn một chiến dịch mà bạn muốn hỗ trợ. Mỗi đồng góp đều quan trọng và mang lại sự thay đổi.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donationCampaigns.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <DonationCard campaign={campaign} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
        
        {activeSection === 'onetime' && (
          <motion.section 
            key="onetime"
            id="donateNow"
            className="py-12 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Quyên góp một lần</h2>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Chọn số tiền quyên góp</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {donationOptions.map((option) => (
                      <motion.button
                        key={option.id}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedOption?.id === option.id 
                            ? 'border-purple-600 bg-purple-50' 
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                        onClick={() => handleOptionSelect(option)}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-bold text-xl text-gray-800 mb-1">
                          {formatCurrency(option.amount)}
                        </div>
                        <div className="text-sm text-gray-600">{option.description}</div>
                      </motion.button>
                    ))}
                  </div>
                  
                  {selectedOption?.amount === "Tùy chọn" && (
                    <motion.div 
                      className="mt-4"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-gray-700 mb-2">Nhập số tiền (VNĐ):</label>
                      <input
                        type="text"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Ví dụ: 200000"
                      />
                    </motion.div>
                  )}
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Họ tên:</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Nhập họ tên của bạn"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email:</label>
                      <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Nhập địa chỉ email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Lời nhắn (không bắt buộc):</label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows="3"
                      placeholder="Nhập lời nhắn của bạn"
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <AnimatePresence>
                      {showThankYou ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
                        >
                          <div className="flex items-center justify-center text-green-500 mb-2">
                            <FaRegSmile className="text-3xl" />
                          </div>
                          <h3 className="text-xl font-bold text-green-700 mb-1">Cảm ơn bạn!</h3>
                          <p className="text-green-600">
                            Quyên góp của bạn sẽ giúp chúng tôi chăm sóc tốt hơn cho các bé thú cưng.
                          </p>
                        </motion.div>
                      ) : (
                        <motion.button
                          type="submit"
                          className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold flex items-center justify-center"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Đang xử lý...
                            </>
                          ) : (
                            <>
                              <FaHandHoldingHeart className="mr-2" />
                              Hoàn tất quyên góp
                            </>
                          )}
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </div>
            </div>
          </motion.section>
        )}
        
        {activeSection === 'other' && (
          <motion.section 
            key="other"
            className="py-12 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Các cách khác để hỗ trợ</h2>
                <p className="text-gray-600">
                  Ngoài quyên góp tiền, có nhiều cách khác để bạn có thể hỗ trợ cho các bé thú cưng.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {otherWaysToHelp.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <motion.button
                      className="text-purple-600 font-medium flex items-center group"
                      whileHover={{ x: 3 }}
                    >
                      Tìm hiểu thêm
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-2xl border border-purple-100"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                    <FaGift className="text-3xl text-purple-500 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Hộp quà tặng yêu thương</h3>
                    <p className="text-gray-600 mb-4">
                      Gửi một hộp quà tặng đặc biệt đến cho thú cưng tại trại cứu trợ. Bạn có thể đóng góp đồ chơi, chăn, thức ăn và những vật dụng khác để cải thiện cuộc sống của các bé.
                    </p>
                    <motion.button
                      className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Đăng ký gửi quà
                      <FaArrowRight className="ml-2" />
                    </motion.button>
                  </div>
                  <div className="md:w-1/3">
                    <img 
                      src="/src/assets/images/gift-box.jpg" 
                      alt="Hộp quà tặng" 
                      className="rounded-lg shadow-md max-w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Footer CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white mt-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Mỗi hành động nhỏ đều tạo nên sự thay đổi lớn
          </motion.h2>
          
          <motion.p 
            className="text-lg opacity-90 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Cùng chúng tôi xây dựng một thế giới tốt đẹp hơn cho thú cưng. Hãy đồng hành cùng sứ mệnh của chúng tôi ngay hôm nay.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.button
              className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection('campaigns')}
            >
              Khám phá các chiến dịch
            </motion.button>
            
            <motion.button
              className="px-8 py-3 bg-transparent border-2 border-white rounded-full font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection('onetime')}
            >
              Quyên góp ngay
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage; 