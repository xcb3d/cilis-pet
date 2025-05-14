import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHandHoldingHeart, FaTimes } from 'react-icons/fa';

// Import components
import DonationDetailHero from '../components/donate/detail/DonationDetailHero';
import DonationProgressSection from '../components/donate/detail/DonationProgressSection';
import CampaignInfoSection from '../components/donate/detail/CampaignInfoSection';
import DonationDetailForm from '../components/donate/detail/DonationDetailForm';
import FundUsageSection from '../components/donate/detail/FundUsageSection';
import CampaignUpdatesSection from '../components/donate/detail/CampaignUpdatesSection';
import FaqSection from '../components/donate/detail/FaqSection';
import RelatedCampaignsSection from '../components/donate/detail/RelatedCampaignsSection';
import OrganizationSummary from '../components/donate/detail/OrganizationSummary';
import ThankYouModal from '../components/donate/detail/ThankYouModal';
import ShareOptionsPopup from '../components/donate/detail/ShareOptionsPopup';

import { donationCampaigns } from '../data/donateData';

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
  const [recentDonations] = useState([
    { id: 1, name: 'Nguyễn V.A', amount: 100000, time: '5 phút trước', isAnonymous: false },
    { id: 2, name: 'Trần B.C', amount: 50000, time: '2 giờ trước', isAnonymous: true },
    { id: 3, name: 'Lê D.E', amount: 500000, time: '1 ngày trước', isAnonymous: false },
    { id: 4, name: 'Phạm F.G', amount: 200000, time: '2 ngày trước', isAnonymous: false },
    { id: 5, name: 'Hoàng H.I', amount: 1000000, time: '3 ngày trước', isAnonymous: false },
  ]);

  // Mock campaign updates data
  const [campaignUpdates] = useState([
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

  // Mock FAQ data
  const [faqs] = useState([
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

  // Countdown timer
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });

  // State for notification subscription
  const [notificationEmail, setNotificationEmail] = useState('');
  const [_isSubscribed, setIsSubscribed] = useState(false);

  // Hero carousel
  const [heroImages] = useState([
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

  // Mock related campaigns
  const [relatedCampaigns, setRelatedCampaigns] = useState([]);

  // Handle notification subscription
  const _handleSubscribe = (e) => {
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

  // Calculate donation impact based on amount
  const calculateDonationImpact = (amount) => {
    if (!amount) return '';

    // Find exact match in donation options
    const option = [
      { value: 50000, label: '50.000 ₫', impact: 'Thức ăn cho 1 chú chó trong 3 ngày' },
      { value: 100000, label: '100.000 ₫', impact: 'Vắc-xin cơ bản cho 1 bé mèo' },
      { value: 200000, label: '200.000 ₫', impact: 'Thuốc trị ký sinh trùng cho 5 bé thú' },
      { value: 500000, label: '500.000 ₫', impact: 'Chi phí phẫu thuật nhỏ cho 1 bé thú' }
    ].find(opt => opt.value === Number(amount));
    
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
          <div
            className="animate-spin"
          >
            <FaHandHoldingHeart className="text-5xl text-purple-500" />
          </div>
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
          <div className="relative">
            <DonationDetailHero 
              campaign={campaign}
              heroImages={heroImages}
              isLiked={isLiked}
              setIsLiked={setIsLiked}
              setShowShareOptions={setShowShareOptions}
              showShareOptions={showShareOptions}
              getProgressPercentage={getProgressPercentage}
              getDaysRemaining={getDaysRemaining}
            />
            
            <div className="absolute z-20 top-4 right-4">
              <div className="relative">
                <ShareOptionsPopup 
                  showShareOptions={showShareOptions}
                  shareMessage={shareMessage}
                  setShareMessage={setShareMessage}
                  handleShare={handleShare}
                  handleCopyLink={handleCopyLink}
                  copySuccess={copySuccess}
                  showQRCode={showQRCode}
                  setShowQRCode={setShowQRCode}
                  getQRCodeUrl={getQRCodeUrl}
                  downloadQRCode={downloadQRCode}
                />
              </div>
            </div>
          </div>

          {/* Campaign info */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row">
              {/* Main content - left side */}
              <div className="w-full lg:w-[calc(100%-24rem)] lg:pr-8">
                {/* Progress bar */}
                <DonationProgressSection
                  campaign={campaign}
                  formatCurrency={formatCurrency}
                  getProgressPercentage={getProgressPercentage}
                  getProgressColor={getProgressColor}
                  getDaysRemaining={getDaysRemaining}
                  countdown={countdown}
                  recentDonations={recentDonations}
                  getMilestones={getMilestones}
                />

                {/* Description */}
                <CampaignInfoSection campaign={campaign} />
              </div>

              {/* Donation form - right side */}
              <DonationDetailForm
                donationAmount={donationAmount}
                setDonationAmount={setDonationAmount}
                customAmount={customAmount}
                setCustomAmount={setCustomAmount}
                isRecurring={isRecurring}
                setIsRecurring={setIsRecurring}
                recurringPeriod={recurringPeriod}
                setRecurringPeriod={setRecurringPeriod}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                isAnonymous={isAnonymous}
                setIsAnonymous={setIsAnonymous}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                message={message}
                setMessage={setMessage}
                handleDonationSubmit={handleDonationSubmit}
                donationImpact={donationImpact}
              />
            </div>
          </div>
        </div>

        {/* Additional sections below main content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 p-6 md:p-8">
          {/* How the funds will be used */}
          <FundUsageSection />

          {/* Campaign Updates Section */}
          <CampaignUpdatesSection campaignUpdates={campaignUpdates} />

          {/* FAQ section */}
          <div className="gap-8 mt-10">
            <FaqSection faqs={faqs} />
          </div>
        </div>

        {/* Related campaigns section */}
        <RelatedCampaignsSection relatedCampaigns={relatedCampaigns} />

        {/* Organization info summary */}
        <OrganizationSummary />
      </div>

      {/* Thank You Modal */}
      <ThankYouModal
        showThankYouModal={showThankYouModal}
        handleCloseThankYouModal={handleCloseThankYouModal}
        donationDetails={donationDetails}
        formatCurrency={formatCurrency}
        getDonationImpact={getDonationImpact}
        donationCertificateUrl={donationCertificateUrl}
        setShowShareOptions={setShowShareOptions}
        setShowThankYouModal={setShowThankYouModal}
        setNotificationEmail={setNotificationEmail}
        email={email}
      />
    </div>
  );
};

export default DonationDetailPage; 