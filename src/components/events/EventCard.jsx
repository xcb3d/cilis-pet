import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaInfoCircle, FaTimes, FaUsers, FaRegBell, FaPaw } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import imagePaths from '../../utils/imageImports';
import './EventCard.css';

const EventCard = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Lấy ảnh từ mock data
  const getImageSrc = () => {
    switch(event.id) {
      case 1: return imagePaths.adoptionEvent;
      case 2: return imagePaths.petCareWorkshop;
      case 3: return imagePaths.donationCampaign;
      case 4: return imagePaths.freeCheckup;
      case 5: return imagePaths.charityRun;
      case 6: return imagePaths.photoExhibition;
      default: return imagePaths.heartPaw;
    }
  };

  // Tạo ngẫu nhiên số người đã đăng ký
  const getRandomRegistrations = () => {
    return Math.floor(Math.random() * 50) + 10;
  };

  // Tính số ngày còn lại đến sự kiện
  const getDaysRemaining = () => {
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

  return (
    <motion.div
      className="event-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="event-card-image-container">
        <img
          src={getImageSrc()}
          alt={event.title}
          className="event-card-image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        <div className="absolute top-3 left-3 bg-pink-500 text-white rounded-full px-3 py-1 text-xs font-medium shadow-sm">
          {event.status}
        </div>
        
        {getDaysRemaining() > 0 && (
          <div className="absolute top-3 right-3 bg-purple-600 text-white rounded-full px-3 py-1 text-xs font-medium shadow-sm">
            Còn {getDaysRemaining()} ngày
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 w-full p-3">
          <h3 className="text-lg font-bold text-white mb-1 event-card-title line-clamp-1">{event.title}</h3>
          <div className="flex items-center text-white/90 text-xs">
            <FaCalendarAlt className="mr-1 text-pink-300" />
            <span>{event.date}</span>
          </div>
        </div>
      </div>
      
      <div className="event-card-inner">
        <div className="event-card-meta">
          <div className="flex items-center text-gray-600 text-sm">
            <div className="flex items-center mr-4">
              <FaClock className="mr-1 text-pink-400 flex-shrink-0" />
              <span className="truncate">{event.time}</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-1 text-pink-400 flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm event-card-description">{event.description}</p>
        
        <div className="event-card-footer">
          <div className="flex items-center text-gray-600 text-sm">
            <FaUsers className="mr-1 text-pink-400" />
            <span>{getRandomRegistrations()} người đã đăng ký</span>
          </div>
          
          <Link
            to={`/event/${event.id}`}
            className="px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-medium hover:bg-pink-200 transition-colors"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
      
      {/* Modal chi tiết sự kiện - giữ lại modal hiện tại cho tương thích với code cũ */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors z-10"
                  onClick={() => setShowDetails(false)}
                >
                  <FaTimes />
                </button>
                
                <div className="h-60 relative">
                  <img 
                    src={getImageSrc()}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs">
                        {event.status}
                      </span>
                      {getDaysRemaining() > 0 && (
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs">
                          Còn {getDaysRemaining()} ngày
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-white">{event.title}</h2>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-4 text-gray-800">Chi tiết sự kiện</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <FaCalendarAlt className="mt-1 mr-3 text-pink-500" />
                          <div>
                            <p className="font-medium text-gray-800">Ngày</p>
                            <p className="text-gray-600">{event.date}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FaClock className="mt-1 mr-3 text-pink-500" />
                          <div>
                            <p className="font-medium text-gray-800">Thời gian</p>
                            <p className="text-gray-600">{event.time}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FaMapMarkerAlt className="mt-1 mr-3 text-pink-500" />
                          <div>
                            <p className="font-medium text-gray-800">Địa điểm</p>
                            <p className="text-gray-600">{event.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FaUsers className="mt-1 mr-3 text-pink-500" />
                          <div>
                            <p className="font-medium text-gray-800">Số người tham gia</p>
                            <p className="text-gray-600">{getRandomRegistrations()} người đã đăng ký</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-4 text-gray-800">Mô tả</h3>
                      <p className="text-gray-600 mb-4 whitespace-pre-line">{event.description}</p>
                      
                      <div className="bg-pink-50 p-4 rounded-lg">
                        <p className="text-pink-700 text-sm">{getEventInfo()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <Link
                      to={`/event/${event.id}`}
                      className="px-6 py-2.5 bg-pink-500 text-white rounded-full font-medium flex items-center hover:bg-pink-600 transition-colors"
                    >
                      <FaRegBell className="mr-2" />
                      Xem trang sự kiện
                    </Link>
                    
                    <button
                      className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
                      onClick={() => setShowDetails(false)}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EventCard; 