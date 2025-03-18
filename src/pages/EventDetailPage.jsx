import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, FaCalendarAlt, FaClock, FaMapMarkerAlt, 
  FaInfoCircle, FaUsers, FaRegBell, FaPaw, FaShare, 
  FaCopy, FaCheck, FaHeart, FaRegHeart
} from 'react-icons/fa';
import events from '../data/eventsData';
import imagePaths from '../utils/imageImports';
import './EventDetailPage.css';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [registered, setRegistered] = useState(false);

  // Fetch event data
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const foundEvent = events.find(e => e.id === Number(id));
      setEvent(foundEvent || null);
      setLoading(false);
    }, 600);
  }, [id]);

  // Lấy ảnh từ mock data
  const getImageSrc = () => {
    if (!event) return '';
    
    switch(event.id) {
      case 1: return imagePaths.adoptionEvent || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2669&q=80';
      case 2: return imagePaths.petCareWorkshop || 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80';
      case 3: return imagePaths.donationCampaign || 'https://images.unsplash.com/photo-1488330890490-c291ecf62571?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80';
      case 4: return imagePaths.freeCheckup || 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80';
      case 5: return imagePaths.charityRun || 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2586&q=80';
      case 6: return imagePaths.photoExhibition || 'https://images.unsplash.com/photo-1577083553190-8ec7f01713cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80';
      default: return 'https://images.unsplash.com/photo-1594559287589-c99ce789fc94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80';
    }
  };

  // Tạo ngẫu nhiên số người đã đăng ký
  const getRandomRegistrations = () => {
    return Math.floor(Math.random() * 50) + 10;
  };

  // Tính số ngày còn lại đến sự kiện
  const getDaysRemaining = () => {
    if (!event) return 0;
    
    const eventDateStr = event.date.split(' - ')[0]; // Lấy ngày bắt đầu nếu có khoảng thời gian
    const [day, month, year] = eventDateStr.split('/').map(num => parseInt(num));
    const eventDate = new Date(year, month - 1, day); // month là 0-based trong JavaScript
    const today = new Date();
    
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };

  // Lấy thông tin sự kiện phù hợp từng loại
  const getEventInfo = () => {
    if (!event) return '';
    
    if (event.title.includes("nhận nuôi")) {
      return "Cơ hội gặp gỡ và nhận nuôi những bé thú cưng đáng yêu";
    } else if (event.title.includes("workshop") || event.title.includes("hội thảo")) {
      return "Chia sẻ kiến thức từ các chuyên gia hàng đầu về thú cưng";
    } else if (event.title.includes("quyên góp") || event.title.includes("gây quỹ")) {
      return "Đóng góp để giúp đỡ những thú cưng kém may mắn";
    } else if (event.title.includes("khám")) {
      return "Chăm sóc sức khỏe miễn phí cho thú cưng của bạn";
    } else if (event.title.includes("triển lãm")) {
      return "Khám phá nghệ thuật và góp phần vào hoạt động từ thiện";
    } else {
      return "Tham gia cùng cộng đồng yêu thương thú cưng";
    }
  };

  // Handle share link copy
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Handle registration
  const handleRegister = () => {
    setRegistered(true);
    // In a real app, this would send registration data to the server
    setTimeout(() => {
      alert('Đăng ký thành công! Bạn sẽ nhận được email xác nhận trong vài phút.');
    }, 500);
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
            <FaRegBell className="text-5xl text-pink-500" />
          </motion.div>
          <p className="mt-4 text-gray-600">Đang tải thông tin sự kiện...</p>
        </div>
      </div>
    );
  }

  // Event not found
  if (!event) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="text-5xl text-red-400">
              <FaInfoCircle />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Không tìm thấy sự kiện</h2>
            <p className="text-gray-600 text-center">Sự kiện này không tồn tại hoặc đã bị xóa.</p>
            <Link 
              to="/events" 
              className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Quay lại trang sự kiện
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
          className="flex items-center text-gray-600 hover:text-pink-500 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Quay lại
        </button>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Hero image */}
          <div className="relative h-[300px] md:h-[400px] event-detail-hero">
            <img 
              src={getImageSrc()}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            
            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-white event-status-badge">
                  {event.status}
                </span>
                {getDaysRemaining() > 0 && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500 text-white">
                    Còn {getDaysRemaining()} ngày
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 event-detail-title">{event.title}</h1>
              <div className="flex items-center text-white/90 text-sm md:text-base">
                <FaCalendarAlt className="mr-2 text-pink-300" />
                <span>{event.date}</span>
                <span className="mx-2">|</span>
                <FaClock className="mr-2 text-pink-300" />
                <span>{event.time}</span>
              </div>
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
          
          {/* Event info */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                {/* Meta information */}
                <div className="mb-8 bg-pink-50/50 p-5 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex items-start event-meta-item p-3 rounded-lg">
                      <div className="bg-pink-100 p-3 rounded-full mr-3 flex-shrink-0">
                        <FaMapMarkerAlt className="text-pink-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Địa điểm</h3>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start event-meta-item p-3 rounded-lg">
                      <div className="bg-pink-100 p-3 rounded-full mr-3 flex-shrink-0">
                        <FaCalendarAlt className="text-pink-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Thời gian</h3>
                        <p className="text-gray-600">
                          {event.date}
                          <br />
                          {event.time}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start event-meta-item p-3 rounded-lg">
                      <div className="bg-pink-100 p-3 rounded-full mr-3 flex-shrink-0">
                        <FaUsers className="text-pink-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Người tham gia</h3>
                        <p className="text-gray-600">{getRandomRegistrations()} người đã đăng ký</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start event-meta-item p-3 rounded-lg">
                      <div className="bg-pink-100 p-3 rounded-full mr-3 flex-shrink-0">
                        <FaRegBell className="text-pink-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Trạng thái</h3>
                        <p className="text-gray-600">
                          {event.status}
                          {getDaysRemaining() > 0 && (
                            <span className="ml-2">- Còn {getDaysRemaining()} ngày</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 section-title-gradient">
                    Mô tả sự kiện
                  </h2>
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 info-card">
                    <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                      {event.description}
                    </p>
                    
                    <div className="bg-pink-50 border-l-4 border-pink-400 p-4 rounded-r-lg mb-6">
                      <h3 className="font-bold text-xl text-pink-800 mb-3">Về sự kiện "{event.title}"</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {getEventInfo()}
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-bold text-lg text-gray-800 mb-3">Lợi ích khi tham gia</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Cơ hội gặp gỡ cộng đồng những người yêu thích thú cưng</li>
                        <li>Trải nghiệm trực tiếp các hoạt động tương tác với thú cưng</li>
                        <li>Tham gia vào sự kiện có ý nghĩa xã hội tích cực</li>
                        <li>Nhận thông tin chăm sóc và nuôi dưỡng thú cưng từ chuyên gia</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <p className="text-blue-800 font-medium">
                        Sự kiện này hoàn toàn miễn phí và mở cửa cho tất cả mọi người. Hãy đăng ký tham gia để chúng tôi có thể chuẩn bị tốt nhất cho bạn!
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Photos section */}
                <div className="mb-8 event-gallery">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 section-title-gradient">
                    Hình ảnh sự kiện
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="rounded-lg overflow-hidden h-48 bg-pink-100 event-gallery-item">
                        <img 
                          src={getImageSrc()} 
                          alt={`Hình ảnh ${item}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Registration form */}
              <div>
                <div className="bg-white rounded-xl p-6 sticky top-24 shadow-lg border border-pink-100 registration-form">
                  <h2 className="text-xl font-bold mb-5 text-center text-pink-800">Đăng ký tham gia</h2>
                  
                  {registered ? (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 success-icon">
                        <FaCheck className="text-green-500 text-2xl" />
                      </div>
                      <h3 className="font-bold text-xl text-gray-800 mb-2">Đăng ký thành công!</h3>
                      <p className="text-gray-600 mb-4">
                        Cảm ơn bạn đã đăng ký tham gia sự kiện. Chúng tôi đã gửi email xác nhận đến địa chỉ email của bạn.
                      </p>
                      <button
                        onClick={() => setRegistered(false)}
                        className="text-pink-500 underline"
                      >
                        Đăng ký cho người khác
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleRegister();
                    }}>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Họ và tên</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                          placeholder="Nhập họ và tên của bạn"
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                          type="email"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                          placeholder="Nhập địa chỉ email của bạn"
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Số điện thoại</label>
                        <input
                          type="tel"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                          placeholder="Nhập số điện thoại của bạn"
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Số người tham gia</label>
                        <select
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                          required
                        >
                          <option value="">Chọn số người tham gia</option>
                          <option value="1">1 người</option>
                          <option value="2">2 người</option>
                          <option value="3">3 người</option>
                          <option value="4">4 người</option>
                          <option value="5">5 người</option>
                          <option value="more">Nhiều hơn 5 người</option>
                        </select>
                      </div>
                      
                      <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-2">Ghi chú (không bắt buộc)</label>
                        <textarea
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                          placeholder="Nhập ghi chú của bạn"
                          rows="3"
                        ></textarea>
                      </div>
                      
                      <div className="mb-5">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                            required
                          />
                          <span className="ml-2 text-gray-700">Tôi đồng ý với các điều khoản và điều kiện</span>
                        </label>
                      </div>
                      
                      <motion.button
                        type="submit"
                        className="w-full py-3 text-white rounded-lg font-medium flex items-center justify-center group shadow-md gradient-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaRegBell className="mr-2 text-lg" />
                        Đăng ký tham gia
                      </motion.button>
                      
                      <div className="mt-4 text-xs text-gray-500 flex items-start bg-gray-50 p-3 rounded-lg">
                        <FaInfoCircle className="mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                        <span>Thông tin của bạn sẽ được bảo mật và chỉ sử dụng cho mục đích đăng ký sự kiện.</span>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related events section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 section-title-gradient">
            Sự kiện liên quan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.filter(e => e.id !== event.id).slice(0, 3).map((relatedEvent) => (
              <Link 
                to={`/event/${relatedEvent.id}`} 
                key={relatedEvent.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full related-event-card"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={getImageSrc()}
                    alt={relatedEvent.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-3">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{relatedEvent.title}</h3>
                    <div className="flex items-center text-white/90 text-xs">
                      <FaCalendarAlt className="mr-1 text-pink-300" />
                      <span>{relatedEvent.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{relatedEvent.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-pink-500 font-medium">Xem chi tiết</span>
                    <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-xs">{relatedEvent.status}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage; 