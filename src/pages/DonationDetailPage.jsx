import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowLeft, FaHandHoldingHeart, FaCalendarAlt, FaUsers,
  FaChevronRight, FaHeart, FaRegHeart, FaShare, FaCopy,
  FaCheck, FaTimes, FaInfoCircle, FaDonate, FaCreditCard,
  FaUniversity, FaQrcode, FaRedoAlt, FaPaw, FaFacebookF,
  FaTwitter, FaWhatsapp, FaLink, FaDownload, FaNewspaper,
  FaBell, FaRegCalendarAlt, FaRegNewspaper, FaRegQuestionCircle,
  FaChevronDown, FaChevronUp, FaPlayCircle, FaAngleLeft,
  FaAngleRight
} from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { donationCampaigns } from '../data/donateData';
import imagePaths from '../utils/imageImports';

const donationOptions = [
  { value: 50000, label: '50.000 ₫', impact: 'Thức ăn cho 1 chú chó trong 3 ngày' },
  { value: 100000, label: '100.000 ₫', impact: 'Vắc-xin cơ bản cho 1 bé mèo' },
  { value: 200000, label: '200.000 ₫', impact: 'Thuốc trị ký sinh trùng cho 5 bé thú' },
  { value: 500000, label: '500.000 ₫', impact: 'Chi phí phẫu thuật nhỏ cho 1 bé thú' }
];

const paymentMethods = [
  { id: 'credit_card', name: 'Thẻ tín dụng/ghi nợ', icon: <FaCreditCard className="text-blue-500" /> },
  { id: 'bank_transfer', name: 'Chuyển khoản ngân hàng', icon: <FaUniversity className="text-green-500" /> },
  { id: 'e_wallet', name: 'Ví điện tử (MoMo, ZaloPay)', icon: <FaQrcode className="text-pink-500" /> }
];

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
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringPeriod, setRecurringPeriod] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [donationImpact, setDonationImpact] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [donationDetails, setDonationDetails] = useState(null);
  const [donationCertificateUrl, setDonationCertificateUrl] = useState('');

  // Mock data for recent donations
  const [recentDonations, setRecentDonations] = useState([
    { id: 1, name: 'Nguyễn V.A', amount: 100000, time: '5 phút trước', isAnonymous: false },
    { id: 2, name: 'Trần B.C', amount: 50000, time: '2 giờ trước', isAnonymous: true },
    { id: 3, name: 'Lê D.E', amount: 500000, time: '1 ngày trước', isAnonymous: false },
    { id: 4, name: 'Phạm F.G', amount: 200000, time: '2 ngày trước', isAnonymous: false },
    { id: 5, name: 'Hoàng H.I', amount: 1000000, time: '3 ngày trước', isAnonymous: false },
  ]);

  // State for showing recent donations
  const [showRecentDonations, setShowRecentDonations] = useState(false);

  // Mock campaign updates data
  const [campaignUpdates, setCampaignUpdates] = useState([
    {
      id: 1,
      date: '15/06/2023',
      title: 'Mua thức ăn đợt 1',
      content: 'Chúng tôi đã mua thức ăn cho 50 chú chó với số tiền 5 triệu đồng. Các bé rất vui và khỏe mạnh.',
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      date: '22/06/2023',
      title: 'Tổ chức tiêm phòng',
      content: 'Đã tổ chức tiêm phòng cho 20 bé mèo tại trại cứu trợ. Tất cả đều đã được tiêm vắc-xin đầy đủ.',
      image: 'https://images.unsplash.com/photo-1615812214208-6967bc31bab8?ixlib=rb-4.0.3&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      date: '30/06/2023',
      title: 'Bắt đầu xây dựng khu vui chơi',
      content: 'Chúng tôi đã bắt đầu xây dựng khu vui chơi mới cho các bé thú. Dự kiến sẽ hoàn thành trong 2 tuần tới.',
      image: 'https://images.unsplash.com/photo-1601758124277-17394f6a8489?ixlib=rb-4.0.3&auto=format&fit=crop&q=80'
    }
  ]);

  // State for expanded update
  const [expandedUpdate, setExpandedUpdate] = useState(null);

  // Mock FAQ data
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'Tiền quyên góp được sử dụng như thế nào?',
      answer: 'Toàn bộ số tiền quyên góp sẽ được phân bổ theo tỷ lệ: 60% cho chi phí trực tiếp (thức ăn, vật dụng, dịch vụ y tế), 30% cho việc cải thiện cơ sở vật chất, và 10% cho chi phí vận hành.'
    },
    {
      id: 2,
      question: 'Làm thế nào để tôi biết tiến độ thực hiện?',
      answer: 'Chúng tôi cập nhật tiến độ thực hiện chiến dịch thường xuyên trong phần "Cập nhật chiến dịch". Bạn cũng có thể đăng ký nhận thông báo qua email khi có cập nhật mới.'
    },
    {
      id: 3,
      question: 'Tôi có thể giúp đỡ bằng cách nào khác?',
      answer: 'Ngoài quyên góp tiền, bạn có thể giúp đỡ bằng cách chia sẻ chiến dịch này, tham gia làm tình nguyện viên, hoặc quyên góp vật phẩm như thức ăn, đồ dùng cho thú cưng.'
    }
  ]);

  // State for expanded FAQ
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Toggle FAQ expansion
  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  // Toggle update expansion
  const toggleUpdate = (id) => {
    setExpandedUpdate(expandedUpdate === id ? null : id);
  };

  // State for notification subscription
  const [notificationEmail, setNotificationEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Handle notification subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    // In a real app, this would send the email to the server
    console.log(`Subscribing ${notificationEmail} to campaign updates`);
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  // Campaign milestones
  const getMilestones = () => {
    if (!campaign) return [];

    return [
      { percentage: 25, label: 'Bắt đầu mua thức ăn', reached: getProgressPercentage() >= 25 },
      { percentage: 50, label: 'Bắt đầu nâng cấp chuồng trại', reached: getProgressPercentage() >= 50 },
      { percentage: 75, label: 'Bắt đầu dịch vụ y tế', reached: getProgressPercentage() >= 75 },
      { percentage: 100, label: 'Hoàn thành mục tiêu!', reached: getProgressPercentage() >= 100 }
    ];
  };

  // Countdown timer
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });

  // Setup countdown timer
  useEffect(() => {
    if (!campaign || campaign.endDate === 'Không thời hạn') return;

    const updateCountdown = () => {
      const endDateParts = campaign.endDate.split('/');
      const endDate = new Date(
        parseInt(endDateParts[2]),
        parseInt(endDateParts[1]) - 1,
        parseInt(endDateParts[0])
      );
      const now = new Date();

      if (endDate <= now) {
        setCountdown({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const timeDiff = endDate.getTime() - now.getTime();
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      setCountdown({ days, hours, minutes });
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, [campaign]);

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

  // Prepare share message when campaign data loads
  useEffect(() => {
    if (campaign) {
      setShareMessage(`Tôi đang ủng hộ chiến dịch "${campaign.title}" tại Cilis Pet! Hãy cùng tôi giúp đỡ các bé thú cưng cần giúp đỡ.`);
    }
  }, [campaign]);

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

    switch (campaign.id) {
      case 1: return imagePaths.foodDonation || 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';
      case 2: return imagePaths.medicalFund || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';
      case 3: return imagePaths.playground || 'https://images.unsplash.com/photo-1511732351157-1865efcb7b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';
      case 4: return imagePaths.vaccination || 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80';
      default: return 'https://images.unsplash.com/photo-1583511655826-05700442b31b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1998&q=80';
    }
  };

  // Calculate donation impact based on amount
  const calculateDonationImpact = (amount) => {
    if (!amount) return '';

    // Find exact match in donation options
    const option = donationOptions.find(opt => opt.value === Number(amount));
    if (option) return option.impact;

    // For custom amounts
    if (amount < 50000) return 'Hỗ trợ thức ăn cho thú cưng';
    if (amount < 100000) return 'Thức ăn cho nhiều bé thú trong vài ngày';
    if (amount < 200000) return 'Vắc-xin và thức ăn cho nhiều bé thú';
    if (amount < 500000) return 'Hỗ trợ y tế và chăm sóc cho nhiều bé thú';

    return 'Hỗ trợ toàn diện cho nhiều bé thú cưng tại trại cứu trợ';
  };

  // Update impact when donation amount changes
  useEffect(() => {
    if (donationAmount === 'custom') {
      setDonationImpact(calculateDonationImpact(Number(customAmount)));
    } else {
      setDonationImpact(calculateDonationImpact(donationAmount));
    }
  }, [donationAmount, customAmount]);

  // Handle donation submit
  const handleDonationSubmit = (e) => {
    e.preventDefault();

    // Store donation details for the thank you modal
    const details = {
      campaignId: campaign?.id,
      campaignTitle: campaign?.title,
      amount: donationAmount === 'custom' ? Number(customAmount) : donationAmount,
      name: isAnonymous ? 'Ẩn danh' : name,
      email,
      message,
      date: new Date().toLocaleDateString('vi-VN'),
      time: new Date().toLocaleTimeString('vi-VN')
    };

    // In a real app, this would send data to the server
    console.log(details);

    // Generate a mock certificate URL
    setDonationCertificateUrl(
      `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        `Chứng nhận quyên góp: ${details.name} đã quyên góp ${formatCurrency(details.amount)} cho chiến dịch "${details.campaignTitle}" vào ngày ${details.date}`
      )}`
    );

    // Show thank you modal instead of alert
    setDonationDetails(details);
    setShowThankYouModal(true);
  };

  // Close thank you modal
  const handleCloseThankYouModal = () => {
    setShowThankYouModal(false);
    // Reset form fields if needed
    setName('');
    setEmail('');
    setMessage('');
    setDonationAmount(null);
    setCustomAmount('');
    setIsAnonymous(false);
  };

  // Calculate donation impact for the thank you message
  const getDonationImpact = (amount) => {
    if (amount < 100000) return 'nuôi 1 chú chó trong 1 tuần';
    if (amount < 200000) return 'tiêm phòng cho 2 bé mèo';
    if (amount < 500000) return 'điều trị y tế cho 1 thú cưng bị bệnh';
    return 'cải thiện điều kiện sống cho nhiều thú cưng tại trại cứu trợ';
  };

  // Generate QR code data URL
  const getQRCodeUrl = () => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`;
  };

  // Handle social media sharing
  const handleShare = (platform) => {
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(shareMessage);

    let shareLink = '';

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${shareText}%20${shareUrl}`;
        break;
      case 'zalo':
        // Zalo doesn't have a standard web sharing API like others
        // This is a placeholder, in production you would use Zalo's SDK
        alert('Tính năng chia sẻ qua Zalo đang được phát triển');
        return;
      default:
        return;
    }

    window.open(shareLink, '_blank', 'width=600,height=400');
  };

  // Download QR code image
  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = getQRCodeUrl();
    link.download = `qrcode-${campaign?.id || 'donation'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Hero carousel
  const [heroImages, setHeroImages] = useState([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1583511655826-05700442b31b',
      caption: 'Hãy giúp đỡ những chú chó đang cần được yêu thương'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee',
      caption: 'Mỗi đóng góp của bạn là một mảnh ghép tạo nên cuộc sống tốt đẹp hơn cho thú cưng'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
      caption: 'Giúp chúng tôi chăm sóc những bé thú không nơi nương tựa'
    }
  ]);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  // Mock related campaigns
  const [relatedCampaigns, setRelatedCampaigns] = useState([]);

  // Auto advance hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Handle hero image navigation
  const goToHeroImage = (index) => {
    setCurrentHeroImage(index);
  };

  const nextHeroImage = () => {
    setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevHeroImage = () => {
    setCurrentHeroImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  // Get related campaigns (excluding current campaign)
  useEffect(() => {
    if (campaign) {
      // Filter out current campaign and get top 3 related ones
      const related = donationCampaigns
        .filter(c => c.id !== campaign.id)
        .slice(0, 3);

      setRelatedCampaigns(related);
    }
  }, [campaign]);

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
          <div className="relative h-[300px] md:h-[400px] overflow-hidden">
            {heroImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: currentHeroImage === index ? 1 : 0,
                  zIndex: currentHeroImage === index ? 1 : 0
                }}
                transition={{ duration: 0.7 }}
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            {/* Hero carousel controls */}
            <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-2 z-10">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${currentHeroImage === index ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                  onClick={() => goToHeroImage(index)}
                ></button>
              ))}
            </div>

            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-10 hover:bg-black/50 transition-colors"
              onClick={prevHeroImage}
            >
              <FaAngleLeft />
            </button>

            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-10 hover:bg-black/50 transition-colors"
              onClick={nextHeroImage}
            >
              <FaAngleRight />
            </button>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
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
                    className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-64 z-10"
                  >
                    <h3 className="text-sm font-bold text-gray-700 mb-2">Chia sẻ chiến dịch</h3>

                    {/* Social media share buttons */}
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <button
                        onClick={() => handleShare('facebook')}
                        className="flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg hover:bg-blue-100"
                        title="Chia sẻ lên Facebook"
                      >
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mb-1">
                          <FaFacebookF />
                        </div>
                        <span className="text-xs text-gray-600">Facebook</span>
                      </button>

                      <button
                        onClick={() => handleShare('twitter')}
                        className="flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg hover:bg-blue-100"
                        title="Chia sẻ lên Twitter"
                      >
                        <div className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center mb-1">
                          <FaTwitter />
                        </div>
                        <span className="text-xs text-gray-600">Twitter</span>
                      </button>

                      <button
                        onClick={() => handleShare('whatsapp')}
                        className="flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg hover:bg-blue-100"
                        title="Chia sẻ qua WhatsApp"
                      >
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mb-1">
                          <FaWhatsapp />
                        </div>
                        <span className="text-xs text-gray-600">WhatsApp</span>
                      </button>

                      <button
                        onClick={() => handleShare('zalo')}
                        className="flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg hover:bg-blue-100"
                        title="Chia sẻ qua Zalo"
                      >
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mb-1">
                          <SiZalo />
                        </div>
                        <span className="text-xs text-gray-600">Zalo</span>
                      </button>
                    </div>

                    {/* Share message */}
                    <div className="mb-3">
                      <label className="text-xs text-gray-600 block mb-1">Nội dung chia sẻ:</label>
                      <textarea
                        value={shareMessage}
                        onChange={(e) => setShareMessage(e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        rows="2"
                      ></textarea>
                    </div>

                    {/* Copy link button */}
                    <button
                      className="flex items-center w-full p-2 hover:bg-gray-100 rounded-md text-left mb-2"
                      onClick={handleCopyLink}
                    >
                      {copySuccess ? <FaCheck className="mr-2 text-green-500" /> : <FaLink className="mr-2 text-gray-500" />}
                      {copySuccess ? 'Đã sao chép' : 'Sao chép liên kết'}
                    </button>

                    {/* QR Code */}
                    <div>
                      <button
                        className="flex items-center w-full p-2 hover:bg-gray-100 rounded-md text-left"
                        onClick={() => setShowQRCode(!showQRCode)}
                      >
                        <FaQrcode className="mr-2 text-gray-500" />
                        {showQRCode ? 'Ẩn mã QR' : 'Hiện mã QR'}
                      </button>

                      {showQRCode && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-2 flex flex-col items-center"
                        >
                          <img
                            src={getQRCodeUrl()}
                            alt="QR Code"
                            className="w-32 h-32 mb-2"
                          />
                          <button
                            onClick={downloadQRCode}
                            className="text-xs flex items-center text-purple-600"
                          >
                            <FaDownload className="mr-1" /> Tải về
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Campaign info */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row">
              {/* Main content - chỉ để phần Thông tin chiến dịch trong grid */}
              <div className="w-full lg:w-[calc(100%-24rem)] lg:pr-8">
                {/* Progress bar */}
                <div className="mb-8 bg-purple-50/50 p-5 rounded-xl">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-xl text-purple-700">{formatCurrency(campaign.current)}</span>
                    <span className="text-gray-500 font-medium">mục tiêu: {formatCurrency(campaign.target)}</span>
                  </div>

                  {/* Progress bar with milestones */}
                  <div className="relative">
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${getProgressColor()}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgressPercentage()}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>

                    {/* Milestone markers */}
                    <div className="w-full h-3 absolute top-0 left-0">
                      {getMilestones().map((milestone, index) => (
                        <div
                          key={index}
                          className="absolute top-0 transform -translate-x-1/2 group hover:z-toast"
                          style={{ left: `${milestone.percentage}%` }}
                        >
                          <div
                            className={`w-3 h-3 rounded-full border-2 border-white ${milestone.reached ? 'bg-green-500' : 'bg-gray-400'
                              }`}
                          ></div>
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            <span
                              className={`text-xs font-medium px-1.5 py-0.5 rounded whitespace-nowrap ${milestone.reached
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-500'
                                }`}
                            >
                              {milestone.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-between items-center mt-8">
                    <span className="text-gray-700 font-medium text-lg mb-2 md:mb-0">
                      <span className="text-purple-600 font-bold">{getProgressPercentage()}%</span> hoàn thành
                    </span>
                    <div className="flex flex-wrap items-center gap-4">
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

                  {/* Recent Donations Section */}
                  <div className="mt-4">
                    <button
                      onClick={() => setShowRecentDonations(!showRecentDonations)}
                      className="text-sm text-purple-600 font-medium flex items-center"
                    >
                      {showRecentDonations ? (
                        <>
                          <FaChevronRight className="mr-1 transform rotate-90" />
                          Ẩn danh sách quyên góp gần đây
                        </>
                      ) : (
                        <>
                          <FaChevronRight className="mr-1" />
                          Xem quyên góp gần đây
                        </>
                      )}
                    </button>

                    {showRecentDonations && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden"
                      >
                        <ul className="divide-y divide-gray-100">
                          {recentDonations.map(donation => (
                            <li key={donation.id} className="p-3 flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                  <FaHandHoldingHeart className="text-purple-500" />
                                </div>
                                <div>
                                  <span className="font-medium block">
                                    {donation.isAnonymous ? 'Ẩn danh' : donation.name}
                                  </span>
                                  <span className="text-xs text-gray-500">{donation.time}</span>
                                </div>
                              </div>
                              <span className="font-bold text-purple-700">
                                {formatCurrency(donation.amount)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>

                  {/* Countdown timer for urgent campaigns */}
                  {campaign.endDate !== 'Không thời hạn' && getDaysRemaining() <= 7 && getDaysRemaining() > 0 && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
                      <h4 className="text-sm font-bold text-red-700 mb-2 flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        Thời gian còn lại:
                      </h4>
                      <div className="flex justify-center gap-3">
                        <div className="text-center">
                          <div className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                            {countdown.days}
                          </div>
                          <div className="text-xs mt-1 text-red-700">Ngày</div>
                        </div>
                        <div className="text-center">
                          <div className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                            {countdown.hours}
                          </div>
                          <div className="text-xs mt-1 text-red-700">Giờ</div>
                        </div>
                        <div className="text-center">
                          <div className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                            {countdown.minutes}
                          </div>
                          <div className="text-xs mt-1 text-red-700">Phút</div>
                        </div>
                      </div>
                    </div>
                  )}
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
              </div>

              {/* Donation form */}
              <div className="w-full lg:w-96 lg:ml-auto">
                <div className="bg-white rounded-xl p-6 sticky top-24 shadow-lg border border-purple-100">
                  <h2 className="text-xl font-bold mb-5 text-center text-purple-800">Quyên góp ngay</h2>

                  <form onSubmit={handleDonationSubmit}>
                    {/* Donation amounts */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-3">Số tiền quyên góp</label>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        {donationOptions.map(option => (
                          <button
                            key={option.value}
                            type="button"
                            className={`py-3 px-3 rounded-lg border text-center transition-all ${donationAmount === option.value
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
                        <div className="mt-2">
                          <input
                            type="number"
                            placeholder="Nhập số tiền (VNĐ)"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            min="1000"
                            step="1000"
                          />
                        </div>
                      )}

                      {/* Donation Impact */}
                      {donationImpact && (
                        <div className="mt-3 p-2 bg-purple-50 rounded-lg text-sm text-purple-700 flex items-start">
                          <FaPaw className="mr-2 mt-0.5 flex-shrink-0" />
                          <span>{donationImpact}</span>
                        </div>
                      )}
                    </div>

                    {/* Recurring donation options */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <input
                          type="checkbox"
                          id="recurringDonation"
                          className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                          checked={isRecurring}
                          onChange={() => setIsRecurring(!isRecurring)}
                        />
                        <label htmlFor="recurringDonation" className="text-gray-700 font-medium">
                          Quyên góp định kỳ
                          <span className="text-xs ml-2 bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Tiết kiệm 5%</span>
                        </label>
                      </div>

                      {isRecurring && (
                        <div className="ml-6">
                          <p className="text-sm text-gray-600 mb-2">Chọn tần suất:</p>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${recurringPeriod === 'monthly'
                                  ? 'bg-purple-600 border-purple-600 text-white'
                                  : 'bg-white border-gray-300 text-gray-700 hover:bg-purple-50'
                                }`}
                              onClick={() => setRecurringPeriod('monthly')}
                            >
                              <FaRedoAlt className="inline mr-1 text-xs" /> Hàng tháng
                            </button>
                            <button
                              type="button"
                              className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${recurringPeriod === 'quarterly'
                                  ? 'bg-purple-600 border-purple-600 text-white'
                                  : 'bg-white border-gray-300 text-gray-700 hover:bg-purple-50'
                                }`}
                              onClick={() => setRecurringPeriod('quarterly')}
                            >
                              <FaRedoAlt className="inline mr-1 text-xs" /> Hàng quý
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Payment methods */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-3">Phương thức thanh toán</label>
                      <div className="space-y-2">
                        {paymentMethods.map(method => (
                          <div
                            key={method.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-all flex items-center ${paymentMethod === method.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-300 hover:border-purple-300'
                              }`}
                            onClick={() => setPaymentMethod(method.id)}
                          >
                            <div className="mr-3">{method.icon}</div>
                            <div>{method.name}</div>
                            {paymentMethod === method.id && <FaCheck className="ml-auto text-green-500" />}
                          </div>
                        ))}
                      </div>
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
                      disabled={!donationAmount || (donationAmount === 'custom' && !customAmount) || !paymentMethod}
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

        {/* Các phần nằm ngoài grid, full width */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 p-6 md:p-8">
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

          {/* Campaign Updates Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 relative inline-block">
              Cập nhật chiến dịch
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></span>
            </h2>

            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              {/* Timeline updates - improved design */}
              <div className="space-y-6 mb-8">
                {campaignUpdates.map((update) => (
                  <div
                    key={update.id}
                    className="relative"
                  >
                    <div className="flex items-start">
                      {/* Circle marker with animation */}
                      <div className="relative mr-4 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-purple-100 border-2 border-purple-300 flex items-center justify-center z-10 relative shadow-sm">
                          <FaRegCalendarAlt className="text-purple-600 text-lg" />
                        </div>
                        {update.id !== campaignUpdates.length && (
                          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-300 to-purple-100"></div>
                        )}
                      </div>

                      <div className="flex-1">
                        {/* Date with better styling */}
                        <div className="mb-2 inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-medium">
                          {update.date}
                        </div>
                        
                        {/* Update card with hover effects */}
                        <div
                          className={`bg-white rounded-xl border overflow-hidden transition-all duration-200 ease-in-out
                            ${expandedUpdate === update.id ? 'shadow-md border-purple-200' : 'border-gray-200 hover:border-purple-200 hover:shadow-sm'}`}
                        >
                          <div
                            className="p-4 cursor-pointer flex justify-between items-center transition-colors duration-200 ease-in-out hover:bg-purple-50/50"
                            onClick={() => toggleUpdate(update.id)}
                            aria-expanded={expandedUpdate === update.id}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && toggleUpdate(update.id)}
                          >
                            <h3 className="font-bold text-gray-800 text-lg">{update.title}</h3>
                            <motion.div 
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${expandedUpdate === update.id ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}
                              animate={{ rotate: expandedUpdate === update.id ? 180 : 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <FaChevronDown />
                            </motion.div>
                          </div>

                          <AnimatePresence initial={false}>
                            {expandedUpdate === update.id && (
                              <motion.div
                                key={`content-${update.id}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ 
                                  opacity: 1, 
                                  height: "auto"
                                }}
                                exit={{ 
                                  opacity: 0, 
                                  height: 0 
                                }}
                                transition={{ 
                                  type: "spring", 
                                  stiffness: 500, 
                                  damping: 40, 
                                  mass: 1
                                }}
                                className="border-t border-gray-100 overflow-hidden"
                              >
                                <div className="p-4">
                                  <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.3 }}
                                    className="mb-4 rounded-lg overflow-hidden shadow-sm"
                                  >
                                    <img
                                      src={update.image}
                                      alt={update.title}
                                      className="w-full h-52 md:h-64 object-cover transform transition-transform duration-700 hover:scale-105"
                                      loading="lazy"
                                    />
                                  </motion.div>
                                  <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.3 }}
                                    className="text-gray-700 leading-relaxed"
                                  >
                                    {update.content}
                                  </motion.p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="gap-8 mt-10">
                {/* FAQ section - improved design */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-800 text-lg mb-5 flex items-center">
                    <div className="p-2 bg-purple-50 rounded-full mr-3">
                      <FaRegQuestionCircle className="text-purple-600" />
                    </div>
                    Câu hỏi thường gặp
                  </h3>
                  
                  <div className="space-y-3">
                    {faqs.map((faq) => (
                      <div
                        key={faq.id}
                        className={`border rounded-xl overflow-hidden transition-all duration-200 ease-in-out
                          ${expandedFaq === faq.id ? 'border-purple-200 shadow-sm' : 'border-gray-200 hover:border-purple-200 hover:shadow-sm'}`}
                      >
                        <div
                          className={`p-4 cursor-pointer flex justify-between items-center transition-colors duration-200 ease-in-out hover:bg-purple-50/50`}
                          onClick={() => toggleFaq(faq.id)}
                          aria-expanded={expandedFaq === faq.id}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && toggleFaq(faq.id)}
                        >
                          <h4 className="font-medium text-gray-800">{faq.question}</h4>
                          <motion.div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${expandedFaq === faq.id ? 'bg-purple-200 text-purple-700' : 'bg-gray-100 text-gray-500'}`}
                            animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <FaChevronDown />
                          </motion.div>
                        </div>

                        <AnimatePresence initial={false}>
                          {expandedFaq === faq.id && (
                            <motion.div
                              key={`faq-content-${faq.id}`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ 
                                opacity: 1, 
                                height: "auto" 
                              }}
                              exit={{ 
                                opacity: 0, 
                                height: 0 
                              }}
                              transition={{ 
                                type: "spring", 
                                stiffness: 500, 
                                damping: 40, 
                                mass: 1
                              }}
                              className="border-t border-gray-100 overflow-hidden"
                            >
                              <div className="p-4 bg-white">
                                <motion.p 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1, duration: 0.3 }}
                                  className="text-gray-700 leading-relaxed"
                                >
                                  {faq.answer}
                                </motion.p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                  
                  {/* Extra help link */}
                  <div className="mt-5 pt-4 border-t border-gray-100 text-center">
                    <Link to="/faq" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                      <FaRegQuestionCircle className="mr-2" />
                      Xem thêm câu hỏi khác
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related campaigns section */}
        <div className="mt-10 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Các chiến dịch liên quan</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCampaigns.map(relatedCampaign => (
              <Link
                to={`/donate/${relatedCampaign.id}`}
                key={relatedCampaign.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={
                      relatedCampaign.id === 1 ? 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8'
                        : relatedCampaign.id === 2 ? 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d'
                          : relatedCampaign.id === 3 ? 'https://images.unsplash.com/photo-1511732351157-1865efcb7b7b'
                            : 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee'
                    }
                    alt={relatedCampaign.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{relatedCampaign.title}</h3>
                  </div>

                  {/* Show urgency tag if needed */}
                  {relatedCampaign.endDate !== 'Không thời hạn' && (
                    <>
                      {(() => {
                        const endDateParts = relatedCampaign.endDate.split('/');
                        const endDate = new Date(
                          parseInt(endDateParts[2]),
                          parseInt(endDateParts[1]) - 1,
                          parseInt(endDateParts[0])
                        );
                        const today = new Date();
                        const timeDiff = endDate.getTime() - today.getTime();
                        const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

                        if (daysRemaining <= 7 && daysRemaining > 0) {
                          return (
                            <span className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                              Còn {daysRemaining} ngày
                            </span>
                          );
                        }
                        return null;
                      })()}
                    </>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {relatedCampaign.description}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-auto">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-bold text-purple-700">
                        {Math.round((relatedCampaign.current / relatedCampaign.target) * 100)}%
                      </span>
                      <span className="text-gray-500">
                        {new Intl.NumberFormat('vi-VN').format(relatedCampaign.current)} ₫
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${Math.round((relatedCampaign.current / relatedCampaign.target) * 100) >= 75
                            ? 'bg-green-500'
                            : Math.round((relatedCampaign.current / relatedCampaign.target) * 100) >= 50
                              ? 'bg-blue-500'
                              : Math.round((relatedCampaign.current / relatedCampaign.target) * 100) >= 25
                                ? 'bg-yellow-500'
                                : 'bg-pink-500'
                          }`}
                        style={{ width: `${Math.min(Math.round((relatedCampaign.current / relatedCampaign.target) * 100), 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center text-xs text-gray-500">
                      <FaUsers className="mr-1" />
                      {relatedCampaign.supporters} người ủng hộ
                    </div>
                    <div className="text-purple-600 font-medium text-sm flex items-center">
                      Xem chi tiết
                      <FaChevronRight className="ml-1 text-xs" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              to="/donate"
              className="px-6 py-2.5 bg-white border border-purple-500 text-purple-600 rounded-full hover:bg-purple-50 transition-colors flex items-center font-medium"
            >
              Xem tất cả chiến dịch
              <FaChevronRight className="ml-2" />
            </Link>
          </div>
        </div>

        {/* Organization info summary */}
        <div className="bg-purple-50 rounded-xl p-6 mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center flex-shrink-0 border-2 border-purple-200">
              <FaHandHoldingHeart className="text-4xl text-purple-600" />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Về Cilis Pet</h3>
              <p className="text-gray-600 mb-4">
                Cilis Pet là tổ chức phi lợi nhuận hoạt động vì quyền lợi và phúc lợi của động vật, đặc biệt là những thú cưng bị bỏ rơi hoặc ngược đãi. Chúng tôi đã cứu trợ hơn 1,000+ thú cưng và tìm mái ấm mới cho 700+ bé từ năm 2020.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <div className="text-2xl font-bold text-purple-700 mb-1">1,000+</div>
                  <div className="text-sm text-gray-600">Thú cưng được cứu trợ</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <div className="text-2xl font-bold text-purple-700 mb-1">700+</div>
                  <div className="text-sm text-gray-600">Thú cưng tìm được mái ấm</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                  <div className="text-2xl font-bold text-purple-700 mb-1">300M+</div>
                  <div className="text-sm text-gray-600">Đã quyên góp (VNĐ)</div>
                </div>
              </div>

              <Link
                to="/about"
                className="text-purple-600 font-medium hover:underline inline-flex items-center"
              >
                Tìm hiểu thêm về tổ chức
                <FaChevronRight className="ml-1 text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Modal */}
      {showThankYouModal && donationDetails && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-md w-full shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white relative">
              <button
                className="absolute top-3 right-3 text-white/80 hover:text-white"
                onClick={handleCloseThankYouModal}
              >
                <FaTimes />
              </button>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                  <FaCheck className="text-purple-600 text-3xl" />
                </div>
                <h2 className="text-2xl font-bold text-center">Cảm ơn bạn đã quyên góp!</h2>
                <p className="text-white/90 text-center mt-2">
                  Đóng góp của bạn sẽ tạo nên sự thay đổi lớn
                </p>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">Chi tiết quyên góp</h3>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex justify-between py-2 border-b border-purple-100">
                    <span className="text-gray-600">Số tiền:</span>
                    <span className="font-bold text-purple-700">{formatCurrency(donationDetails.amount)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-purple-100">
                    <span className="text-gray-600">Người quyên góp:</span>
                    <span className="font-bold">{donationDetails.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-purple-100">
                    <span className="text-gray-600">Ngày:</span>
                    <span className="font-bold">{donationDetails.date}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Chiến dịch:</span>
                    <span className="font-bold">{donationDetails.campaignTitle}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-2">Tác động của bạn</h3>
                <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r-md">
                  <p className="text-green-800">
                    Với {formatCurrency(donationDetails.amount)}, bạn đã giúp {getDonationImpact(donationDetails.amount)}!
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">Chứng nhận quyên góp</h3>
                <div className="flex justify-center">
                  <img
                    src={donationCertificateUrl}
                    alt="Chứng nhận quyên góp"
                    className="w-36 h-36 border border-gray-200 rounded-md"
                  />
                </div>
                <div className="flex justify-center mt-2">
                  <button
                    className="text-purple-600 flex items-center text-sm"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = donationCertificateUrl;
                      link.download = 'chung-nhan-quyen-gop.png';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <FaDownload className="mr-1" /> Tải về chứng nhận
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-gray-800 mb-3">Bạn có thể</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 hover:bg-purple-50 transition-colors"
                  onClick={() => {
                    setShowThankYouModal(false);
                    setShowShareOptions(true);
                  }}
                >
                  <FaShare className="text-purple-600 mb-2" />
                  <span className="text-sm text-gray-800">Chia sẻ chiến dịch</span>
                </button>

                <button
                  className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 hover:bg-purple-50 transition-colors"
                  onClick={() => {
                    setShowThankYouModal(false);
                    setNotificationEmail(email);
                  }}
                >
                  <FaBell className="text-purple-600 mb-2" />
                  <span className="text-sm text-gray-800">Theo dõi cập nhật</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DonationDetailPage; 