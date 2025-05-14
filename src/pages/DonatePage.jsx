import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
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

// Import các component mới
import DonatePageHero from '../components/donate/DonatePageHero';
import DonationImpactSection from '../components/donate/DonationImpactSection';
import DonationTestimonials from '../components/donate/DonationTestimonials';
import DonationForm from '../components/donate/DonationForm';
import OtherWaysToHelp from '../components/donate/OtherWaysToHelp';
import DonationCTA from '../components/donate/DonationCTA';
import DonationCampaignsSection from '../components/donate/DonationCampaignsSection';
import DonationTabsNavigation from '../components/donate/DonationTabsNavigation';

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

  // Các cách khác để hỗ trợ
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

  // Xử lý cuộn đến form quyên góp
  const scrollToForm = () => {
    document.getElementById('donateNow').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <DonatePageHero scrollToForm={scrollToForm} />

      {/* Enhanced Impact Section */}
      <DonationImpactSection 
        donationDistribution={donationDistribution} 
        successStories={successStories} 
      />

      {/* Testimonials Section */}
      <DonationTestimonials testimonials={testimonials} />

      {/* Donation Navigation Tabs */}
      <DonationTabsNavigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />

      {/* Content based on active section */}
      <AnimatePresence mode="wait">
        {activeSection === 'campaigns' && (
          <DonationCampaignsSection campaigns={donationCampaigns} />
        )}
        
        {activeSection === 'onetime' && (
          <DonationForm 
            donationOptions={donationOptions}
            handleSubmit={handleSubmit}
            formData={formData}
            formErrors={formErrors}
            handleInputChange={handleInputChange}
            handleOptionSelect={handleOptionSelect}
            selectedOption={selectedOption}
            customAmount={customAmount}
            handleCustomAmountChange={handleCustomAmountChange}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            showThankYou={showThankYou}
            isSubmitting={isSubmitting}
            formatCurrency={formatCurrency}
          />
        )}
        
        {activeSection === 'other' && (
          <OtherWaysToHelp helpOptions={otherWaysToHelp} />
        )}
      </AnimatePresence>

      {/* Footer CTA Section */}
      <DonationCTA 
        onExploreClick={() => setActiveSection('campaigns')}
        onDonateClick={() => setActiveSection('onetime')} 
      />
    </div>
  );
};

export default DonatePage; 