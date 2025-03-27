import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaHandHoldingHeart, FaPaw, FaHeartbeat, FaHospital, 
  FaClipboardCheck, FaShoppingBasket, FaHandsHelping, 
  FaArrowRight, FaGift, FaRegSmile, FaDonate,
  FaExclamationCircle, FaCheckCircle, FaCreditCard, 
  FaUniversity, FaPaypal, FaMobileAlt, FaCheck, FaTimes,
  FaQuoteLeft, FaQuoteRight, FaStar, FaStarHalfAlt,
  FaUtensils, FaSyringe, FaHome, FaHeart, FaPrescriptionBottle,
  FaUserMd, FaBoxOpen
} from 'react-icons/fa';
import DonationCard from '../components/donate/DonationCard';
import { donationCampaigns, donationOptions } from '../data/donateData';

const DonatePage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [activeSection, setActiveSection] = useState('campaigns');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Thêm state cho form validation
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    amount: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      name: "Nguyễn Minh Tuấn",
      role: "Nhà tài trợ thường xuyên",
      avatar: "/src/assets/images/author-mt.svg",
      rating: 5,
      quote: "Tôi rất hài lòng khi thấy được tác động thực sự từ những đóng góp của mình. Cảm ơn cilis-pet vì đã cứu trợ và giúp đỡ rất nhiều thú cưng có hoàn cảnh khó khăn.",
      date: "2 tháng trước"
    },
    {
      id: 2,
      name: "Lê Thu Hà",
      role: "Tình nguyện viên",
      avatar: "/src/assets/images/author-lh.svg",
      rating: 5,
      quote: "Không chỉ quyên góp tiền, tôi còn tham gia với vai trò tình nguyện viên. Được tận mắt chứng kiến từng đồng góp giúp cải thiện cuộc sống cho các bé thú là một trải nghiệm tuyệt vời.",
      date: "1 tháng trước"
    },
    {
      id: 3,
      name: "Chu Hương",
      role: "Nhà hảo tâm",
      avatar: "/src/assets/images/author-ch.svg",
      rating: 4.5,
      quote: "Quy trình quyên góp rất minh bạch, tôi luôn nhận được báo cáo về cách tiền của tôi được sử dụng. Điều này tạo sự tin tưởng rất lớn khi hỗ trợ các chiến dịch.",
      date: "3 tuần trước"
    }
  ];

  // Dữ liệu phân bố quyên góp
  const donationDistribution = [
    { category: "Thức ăn", percentage: 35, icon: <FaUtensils className="text-xl text-orange-500" />, color: "bg-orange-500" },
    { category: "Y tế & Thuốc men", percentage: 30, icon: <FaSyringe className="text-xl text-blue-500" />, color: "bg-blue-500" },
    { category: "Chỗ ở & Trang thiết bị", percentage: 20, icon: <FaHome className="text-xl text-green-500" />, color: "bg-green-500" },
    { category: "Tiêm phòng & Triệt sản", percentage: 15, icon: <FaUserMd className="text-xl text-purple-500" />, color: "bg-purple-500" }
  ];

  // Dữ liệu câu chuyện thành công
  const successStories = [
    {
      id: 1,
      name: "Miu",
      imageUrl: "/src/assets/images/timeline-rescue.svg",
      story: "Miu được cứu từ một trại nuôi nhốt, với tình trạng suy dinh dưỡng nghiêm trọng. Sau 3 tháng chăm sóc, Miu đã phục hồi hoàn toàn và tìm được gia đình mới.",
      stats: { daysInCare: 90, medicalProcedures: 8, donorsHelped: 46 }
    },
    {
      id: 2,
      name: "Buddy",
      imageUrl: "/src/assets/images/timeline-medical.svg", 
      story: "Buddy bị bỏ rơi với chân bị gãy. Nhờ chiến dịch quyên góp của chúng tôi, Buddy đã được phẫu thuật thành công và hiện đang sống hạnh phúc với gia đình mới.",
      stats: { daysInCare: 120, medicalProcedures: 12, donorsHelped: 72 }
    },
    {
      id: 3,
      name: "Kitty",
      imageUrl: "/src/assets/images/timeline-training.svg",
      story: "Kitty được tìm thấy trong tình trạng sợ người. Sau 6 tháng được huấn luyện và yêu thương, Kitty đã trở thành một chú mèo thân thiện và được nhận nuôi.",
      stats: { daysInCare: 180, medicalProcedures: 5, donorsHelped: 38 }
    }
  ];

  useEffect(() => {
    // Reset scroll position when page loads
    window.scrollTo(0, 0);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // Reset form error trường amount
    setFormErrors({...formErrors, amount: ''});
    
    if (option.amount === "Tùy chọn") {
      setCustomAmount('');
    }
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
      // Clear error when user starts typing
      if (value) {
        setFormErrors({...formErrors, amount: ''});
      }
    }
  };
  
  // Xử lý nhập liệu form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  // Kiểm tra email hợp lệ
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset errors
    const errors = {
      fullName: '',
      email: '',
      amount: ''
    };
    
    let hasError = false;
    
    // Validate full name
    if (!formData.fullName.trim()) {
      errors.fullName = 'Vui lòng nhập họ tên của bạn';
      hasError = true;
    }
    
    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Vui lòng nhập địa chỉ email';
      hasError = true;
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Địa chỉ email không hợp lệ';
      hasError = true;
    }
    
    // Validate donation amount
    if (!selectedOption) {
      errors.amount = 'Vui lòng chọn một khoản quyên góp';
      hasError = true;
    } else if (selectedOption.amount === "Tùy chọn") {
      if (!customAmount || customAmount === '0') {
        errors.amount = 'Vui lòng nhập số tiền quyên góp';
        hasError = true;
      } else if (parseInt(customAmount) < 10000) {
        errors.amount = 'Số tiền quyên góp tối thiểu là 10,000 VNĐ';
        hasError = true;
      }
    }
    
    // Update errors state
    setFormErrors(errors);
    
    if (hasError) {
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
        setFormData({
          fullName: '',
          email: '',
          message: ''
        });
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
      icon: <FaBoxOpen />,
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

  // Render form phần quyên góp một lần
  const renderDonateOnceForm = () => (
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
            
            {/* Hiển thị lỗi cho phần chọn số tiền */}
            {formErrors.amount && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 text-red-500 flex items-center"
              >
                <FaExclamationCircle className="mr-1" />
                <span>{formErrors.amount}</span>
              </motion.div>
            )}
            
            {selectedOption?.amount === "Tùy chọn" && (
              <motion.div 
                className="mt-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-gray-700 mb-2">Nhập số tiền (VNĐ):</label>
                <div className="relative">
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className={`w-full p-3 pl-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                      formErrors.amount ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ví dụ: 200000"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    VNĐ
                  </div>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  * Số tiền quyên góp tối thiểu là 10,000 VNĐ
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Payment methods */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Phương thức thanh toán</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <motion.button
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  paymentMethod === 'card' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('card')}
                whileHover={{ y: -2 }}
              >
                <FaCreditCard className={`text-2xl mb-1 ${paymentMethod === 'card' ? 'text-purple-600' : 'text-gray-600'}`} />
                <span className="text-sm">Thẻ tín dụng</span>
              </motion.button>
              
              <motion.button
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  paymentMethod === 'bank' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('bank')}
                whileHover={{ y: -2 }}
              >
                <FaUniversity className={`text-2xl mb-1 ${paymentMethod === 'bank' ? 'text-purple-600' : 'text-gray-600'}`} />
                <span className="text-sm">Chuyển khoản</span>
              </motion.button>
              
              <motion.button
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  paymentMethod === 'ewallet' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('ewallet')}
                whileHover={{ y: -2 }}
              >
                <FaMobileAlt className={`text-2xl mb-1 ${paymentMethod === 'ewallet' ? 'text-purple-600' : 'text-gray-600'}`} />
                <span className="text-sm">Ví điện tử</span>
              </motion.button>
              
              <motion.button
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  paymentMethod === 'paypal' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('paypal')}
                whileHover={{ y: -2 }}
              >
                <FaPaypal className={`text-2xl mb-1 ${paymentMethod === 'paypal' ? 'text-purple-600' : 'text-gray-600'}`} />
                <span className="text-sm">PayPal</span>
              </motion.button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Họ tên:</label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                      formErrors.fullName ? 'border-red-500' : formData.fullName ? 'border-green-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập họ tên của bạn"
                  />
                  {formData.fullName && !formErrors.fullName && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                      <FaCheckCircle />
                    </div>
                  )}
                </div>
                {formErrors.fullName && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-red-500 text-sm flex items-center"
                  >
                    <FaExclamationCircle className="mr-1" />
                    <span>{formErrors.fullName}</span>
                  </motion.div>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email:</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                      formErrors.email ? 'border-red-500' : formData.email && isValidEmail(formData.email) ? 'border-green-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập địa chỉ email"
                  />
                  {formData.email && isValidEmail(formData.email) && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                      <FaCheckCircle />
                    </div>
                  )}
                </div>
                {formErrors.email && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-red-500 text-sm flex items-center"
                  >
                    <FaExclamationCircle className="mr-1" />
                    <span>{formErrors.email}</span>
                  </motion.div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Lời nhắn (không bắt buộc):</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
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
                    className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                  >
                    <div className="flex items-center justify-center text-green-500 mb-4">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <FaRegSmile className="text-4xl" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">Cảm ơn bạn!</h3>
                    <p className="text-green-600 mb-3">
                      Quyên góp của bạn sẽ giúp chúng tôi chăm sóc tốt hơn cho các bé thú cưng.
                    </p>
                    <div className="inline-flex items-center text-green-600 font-medium">
                      <FaCheck className="mr-2" />
                      Chúng tôi đã gửi email xác nhận đến {formData.email}
                    </div>
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
  );

  // Render testimonials section
  const renderTestimonials = () => (
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

  // Render donation impact section - to enhance the current impact section
  const renderEnhancedImpactSection = () => (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Tác động của quyên góp</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Mỗi đồng quyên góp đều được sử dụng hiệu quả để cải thiện cuộc sống của các bé thú cưng. 
            Xem cách chúng tôi phân bổ nguồn lực và những câu chuyện thành công từ sự giúp đỡ của bạn.
          </p>
        </motion.div>
        
        {/* Donation Distribution Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">Phân bổ quyên góp</h3>
            
            <div className="space-y-6">
              {donationDistribution.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-2 font-medium">{item.category}</span>
                    </div>
                    <span className="font-bold">{item.percentage}%</span>
                  </div>
                  
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${item.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="font-semibold text-gray-700 mb-2">Hiệu quả quyên góp</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">95%</div>
                  <div className="text-xs text-gray-500">trực tiếp đến thú cưng</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">3%</div>
                  <div className="text-xs text-gray-500">vận hành</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">2%</div>
                  <div className="text-xs text-gray-500">marketing</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Annual Impact Stats */}
          <motion.div 
            className="p-6 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-6">Tác động năm 2023</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-3 mx-auto">
                  <FaPaw className="text-xl text-white" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">624</div>
                  <div className="text-sm opacity-80">Thú cưng được cứu trợ</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-3 mx-auto">
                  <FaHome className="text-xl text-white" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">453</div>
                  <div className="text-sm opacity-80">Thú cưng tìm được nhà mới</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-3 mx-auto">
                  <FaSyringe className="text-xl text-white" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">872</div>
                  <div className="text-sm opacity-80">Ca tiêm phòng & triệt sản</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-3 mx-auto">
                  <FaHandHoldingHeart className="text-xl text-white" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">1,206</div>
                  <div className="text-sm opacity-80">Nhà hảo tâm đã đóng góp</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white/10 p-4 rounded-lg">
              <div className="flex items-center">
                <FaHeart className="text-red-300 mr-2" />
                <span className="font-semibold">Tổng số tiền quyên góp:</span>
                <span className="ml-auto font-bold text-xl">2,367,500,000 ₫</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Success Stories Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Câu chuyện thành công</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <motion.div
                key={story.id}
                className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative h-48 bg-gray-100">
                  <img 
                    src={story.imageUrl} 
                    alt={story.name} 
                    className="w-full h-full object-contain p-4"
                  />
                  <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Đã nhận nuôi
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{story.name}</h4>
                  <p className="text-gray-600 mb-4 flex-grow">{story.story}</p>
                  
                  <div className="grid grid-cols-3 gap-2 text-center text-sm mt-auto">
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="font-bold text-purple-600">{story.stats.daysInCare}</div>
                      <div className="text-gray-500">ngày chăm sóc</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="font-bold text-purple-600">{story.stats.medicalProcedures}</div>
                      <div className="text-gray-500">thủ thuật y tế</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="font-bold text-purple-600">{story.stats.donorsHelped}</div>
                      <div className="text-gray-500">người quyên góp</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              className="inline-flex items-center px-6 py-3 bg-purple-100 text-purple-700 rounded-full font-medium transition-colors"
              whileHover={{ backgroundColor: "#e9d5ff", y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Xem thêm câu chuyện
              <FaArrowRight className="ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );

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

      {/* Enhanced Impact Section - Replace existing impact section */}
      {renderEnhancedImpactSection()}

      {/* Testimonials Section */}
      {renderTestimonials()}

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
        
        {activeSection === 'onetime' && renderDonateOnceForm()}
        
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