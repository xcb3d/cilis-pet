import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, FaHandHoldingHeart, FaCalendarAlt, FaUsers, 
  FaChevronRight, FaHeart, FaRegHeart, FaShare, FaCopy, 
  FaCheck, FaTimes, FaInfoCircle, FaDonate
} from 'react-icons/fa';
import { donationCampaigns } from '../data/donateData';
import imagePaths from '../utils/imageImports';

const DonationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [donationAmount, setDonationAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Fetch campaign data
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundCampaign = donationCampaigns.find(c => c.id === Number(id));
      setCampaign(foundCampaign || null);
      setLoading(false);
    }, 800);
  }, [id]);

  // Handle share link copy
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    if (!campaign) return 0;
    return Math.min(Math.round((campaign.current / campaign.target) * 100), 100);
  };

  // Format currency to VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  };

  // Get progress bar color based on percentage
  const getProgressColor = () => {
    const percentage = getProgressPercentage();
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    if (percentage >= 25) return 'bg-yellow-500';
    return 'bg-pink-500';
  };

  // Get days remaining until end date
  const getDaysRemaining = () => {
    if (!campaign) return 0;
    if (campaign.endDate === 'Không thời hạn') return '∞';
    
    const endDateParts = campaign.endDate.split('/');
    const endDate = new Date(
      parseInt(endDateParts[2]), 
      parseInt(endDateParts[1]) - 1, 
      parseInt(endDateParts[0])
    );
    const today = new Date();
    const timeDiff = endDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return daysRemaining > 0 ? daysRemaining : 0;
  };

  // Get image source
  const getImageSrc = () => {
    if (!campaign) return '';

    switch(campaign.id) {
      case 1: return imagePaths.foodDonation || 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';
      case 2: return imagePaths.medicalFund || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';
      case 3: return imagePaths.playground || 'https://images.unsplash.com/photo-1511732351157-1865efcb7b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';
      case 4: return imagePaths.vaccination || 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80';
      default: return 'https://images.unsplash.com/photo-1583511655826-05700442b31b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1998&q=80';
    }
  };

  // Handle donation submit
  const handleDonationSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to the server
    console.log({
      campaignId: campaign?.id,
      amount: donationAmount === 'custom' ? customAmount : donationAmount,
      name,
      email,
      message,
      isAnonymous
    });
    
    // Show success message or redirect
    alert('Cảm ơn bạn đã quyên góp! Đây chỉ là demo, không có khoản thanh toán thực tế nào được thực hiện.');
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            <FaHandHoldingHeart className="text-5xl text-purple-500" />
          </motion.div>
          <p className="mt-4 text-gray-600">Đang tải thông tin chiến dịch...</p>
        </div>
      </div>
    );
  }

  // Campaign not found
  if (!campaign) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col items-center gap-4 py-12">
            <FaTimes className="text-5xl text-red-500" />
            <h2 className="text-2xl font-bold text-gray-800">Không tìm thấy chiến dịch quyên góp</h2>
            <p className="text-gray-600 text-center">Chiến dịch quyên góp này không tồn tại hoặc đã bị xóa.</p>
            <Link 
              to="/donate" 
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Quay lại trang quyên góp
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      {/* Back button */}
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Quay lại
        </button>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Hero image */}
          <div className="relative h-[300px] md:h-[400px]">
            <img 
              src={getImageSrc()}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getProgressPercentage() > 75 ? 'bg-green-500' : 'bg-blue-500'}`}>
                  {getProgressPercentage() > 75 ? 'Sắp hoàn thành' : 'Đang quyên góp'}
                </span>
                {getDaysRemaining() !== "∞" && getDaysRemaining() <= 7 && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
                    Gấp
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{campaign.title}</h1>
            </div>
            
            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button 
                className="bg-white/30 backdrop-blur-sm p-2 rounded-full text-white"
                onClick={() => setIsLiked(!isLiked)}
              >
                {isLiked ? 
                  <FaHeart className="text-red-500 text-lg" /> : 
                  <FaRegHeart className="text-lg" />
                }
              </button>
              <div className="relative">
                <button 
                  className="bg-white/30 backdrop-blur-sm p-2 rounded-full text-white"
                  onClick={() => setShowShareOptions(!showShareOptions)}
                >
                  <FaShare className="text-lg" />
                </button>
                
                {showShareOptions && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg p-3 w-48"
                  >
                    <button 
                      className="flex items-center w-full p-2 hover:bg-gray-100 rounded-md text-left"
                      onClick={handleCopyLink}
                    >
                      {copySuccess ? <FaCheck className="mr-2 text-green-500" /> : <FaCopy className="mr-2" />}
                      {copySuccess ? 'Đã sao chép' : 'Sao chép liên kết'}
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          
          {/* Campaign info */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                {/* Progress bar */}
                <div className="mb-8 bg-purple-50/50 p-5 rounded-xl">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-xl text-purple-700">{formatCurrency(campaign.current)}</span>
                    <span className="text-gray-500 font-medium">mục tiêu: {formatCurrency(campaign.target)}</span>
                  </div>
                  
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${getProgressColor()}`} 
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressPercentage()}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-gray-700 font-medium text-lg">
                      <span className="text-purple-600 font-bold">{getProgressPercentage()}%</span> hoàn thành
                    </span>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center">
                        <FaUsers className="mr-2 text-blue-500" />
                        <span className="font-medium">{campaign.supporters} người ủng hộ</span>
                      </div>
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-orange-500" />
                        {getDaysRemaining() === "∞" ? (
                          <span className="font-medium">Không thời hạn</span>
                        ) : (
                          <span className="font-medium">Còn <span className="text-red-500 font-bold">{getDaysRemaining()}</span> ngày</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 relative inline-block">
                    Thông tin chiến dịch
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></span>
                  </h2>
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {campaign.description}
                    </p>
                    
                    <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg mb-6">
                      <h3 className="font-bold text-xl text-purple-800 mb-3">Về chiến dịch "{campaign.title}"</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Chiến dịch này được khởi động nhằm mục đích hỗ trợ các thú cưng đang gặp khó khăn tại các trại cứu trợ. Mỗi đóng góp của bạn đều góp phần tạo nên sự thay đổi tích cực trong cuộc sống của những người bạn bốn chân đáng yêu.
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-bold text-lg text-gray-800 mb-3">Tại sao chiến dịch này quan trọng?</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Giúp cải thiện điều kiện sống cho các thú cưng tại trại cứu trợ</li>
                        <li>Cung cấp thức ăn, dịch vụ y tế và nơi ở an toàn</li>
                        <li>Tạo cơ hội để các thú cưng tìm được gia đình mới</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <p className="text-blue-800 font-medium">
                        Chúng tôi cam kết sử dụng 100% số tiền quyên góp cho mục đích của chiến dịch và sẽ cập nhật tiến độ sử dụng quỹ một cách minh bạch.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* How the funds will be used */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 relative inline-block">
                    Cách sử dụng quỹ
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl shadow-sm p-5 border-t-4 border-purple-500 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <div className="bg-purple-100 p-3 rounded-full mr-3 flex items-center justify-center">
                          <FaDonate className="text-purple-600 text-xl" />
                        </div>
                        <h3 className="font-bold text-xl text-purple-800">60%</h3>
                      </div>
                      <h4 className="font-bold text-gray-700 mb-2">Chi phí trực tiếp</h4>
                      <p className="text-gray-600">Thức ăn, vật dụng và dịch vụ y tế cho thú cưng</p>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm p-5 border-t-4 border-blue-500 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-100 p-3 rounded-full mr-3 flex items-center justify-center">
                          <FaDonate className="text-blue-600 text-xl" />
                        </div>
                        <h3 className="font-bold text-xl text-blue-800">30%</h3>
                      </div>
                      <h4 className="font-bold text-gray-700 mb-2">Cải thiện cơ sở vật chất</h4>
                      <p className="text-gray-600">Nâng cấp không gian sống và khu vui chơi</p>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm p-5 border-t-4 border-pink-500 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-3">
                        <div className="bg-pink-100 p-3 rounded-full mr-3 flex items-center justify-center">
                          <FaDonate className="text-pink-600 text-xl" />
                        </div>
                        <h3 className="font-bold text-xl text-pink-800">10%</h3>
                      </div>
                      <h4 className="font-bold text-gray-700 mb-2">Chi phí vận hành</h4>
                      <p className="text-gray-600">Quản lý chiến dịch và hoạt động hậu cần</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Donation form */}
              <div>
                <div className="bg-white rounded-xl p-6 sticky top-24 shadow-lg border border-purple-100">
                  <h2 className="text-xl font-bold mb-5 text-center text-purple-800">Quyên góp ngay</h2>
                  
                  <form onSubmit={handleDonationSubmit}>
                    {/* Donation amounts */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-3">Số tiền quyên góp</label>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        {[
                          { value: 50000, label: '50.000 ₫' },
                          { value: 100000, label: '100.000 ₫' },
                          { value: 200000, label: '200.000 ₫' },
                          { value: 500000, label: '500.000 ₫' }
                        ].map(option => (
                          <button
                            key={option.value}
                            type="button"
                            className={`py-3 px-3 rounded-lg border text-center transition-all ${
                              donationAmount === option.value
                              ? 'bg-purple-600 border-purple-600 text-white font-bold'
                              : 'bg-white border-gray-300 text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                            }`}
                            onClick={() => {
                              setDonationAmount(option.value);
                              setCustomAmount('');
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <input 
                          type="checkbox" 
                          id="customAmount" 
                          className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                          checked={donationAmount === 'custom'}
                          onChange={() => setDonationAmount('custom')}
                        />
                        <label htmlFor="customAmount" className="text-gray-700">Số tiền khác</label>
                      </div>
                      
                      {donationAmount === 'custom' && (
                        <input
                          type="number"
                          placeholder="Nhập số tiền (VNĐ)"
                          className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          min="1000"
                          step="1000"
                        />
                      )}
                    </div>
                    
                    {/* Personal info */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-3">Thông tin cá nhân</label>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <input 
                          type="checkbox" 
                          id="anonymousDonation" 
                          className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                          checked={isAnonymous}
                          onChange={() => setIsAnonymous(!isAnonymous)}
                        />
                        <label htmlFor="anonymousDonation" className="text-gray-700">Quyên góp ẩn danh</label>
                      </div>
                      
                      {!isAnonymous && (
                        <>
                          <input
                            type="text"
                            placeholder="Họ tên"
                            className="mb-3 w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          
                          <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </>
                      )}
                    </div>
                    
                    {/* Message */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-3">Lời nhắn (không bắt buộc)</label>
                      <textarea
                        placeholder="Nhập lời nhắn của bạn"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        rows="3"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                    
                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg 
                              font-medium flex items-center justify-center group shadow-md"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!donationAmount || (donationAmount === 'custom' && !customAmount)}
                    >
                      <FaHandHoldingHeart className="mr-2 text-lg" />
                      Quyên góp ngay
                      <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    
                    <div className="mt-4 text-xs text-gray-500 flex items-start bg-gray-50 p-3 rounded-lg">
                      <FaInfoCircle className="mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                      <span>Đây chỉ là demo, không có khoản thanh toán thực tế nào được thực hiện.</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related campaigns section could go here */}
      </div>
    </div>
  );
};

export default DonationDetailPage; 