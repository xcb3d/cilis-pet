import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EventCard from '../components/events/EventCard';
import eventsData from '../data/eventsData';
import { FaCalendarCheck, FaMapMarkedAlt, FaBookReader, FaStar, FaPaw, FaSearch } from 'react-icons/fa';

const EventsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Lọc sự kiện theo loại
  const filteredEvents = activeFilter === 'all' 
    ? eventsData 
    : eventsData.filter(event => getEventType(event) === activeFilter);

  // Xác định loại sự kiện
  function getEventType(event) {
    if (event.title.toLowerCase().includes('nhận nuôi')) {
      return 'adoption';
    } else if (event.title.toLowerCase().includes('workshop') || event.title.toLowerCase().includes('hội thảo') || event.title.toLowerCase().includes('khám')) {
      return 'workshop';
    } else if (event.title.toLowerCase().includes('quyên góp') || event.title.toLowerCase().includes('gây quỹ') || event.title.toLowerCase().includes('triển lãm')) {
      return 'fundraising';
    } else {
      return 'other';
    }
  }

  // Count events by type
  const eventCounts = {
    all: eventsData.length,
    adoption: eventsData.filter(event => getEventType(event) === 'adoption').length,
    workshop: eventsData.filter(event => getEventType(event) === 'workshop').length,
    fundraising: eventsData.filter(event => getEventType(event) === 'fundraising').length,
    other: eventsData.filter(event => getEventType(event) === 'other').length
  };

  return (
    <div className="py-12 bg-[#FEF2F7] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 right-0 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-32 -left-20 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute top-1/3 left-20 w-16 h-16 bg-yellow-100 rounded-full blur-xl opacity-40" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4 heading-cute relative inline-block">
            Sự kiện & Hoạt động
            <motion.div 
              className="absolute -right-10 -top-8"
              animate={{ rotate: [0, 15, -5, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <FaStar className="text-yellow-400 text-xl" />
            </motion.div>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Tham gia cùng chúng tôi trong các sự kiện và hoạt động hấp dẫn để gặp gỡ thú cưng cần nhận nuôi, 
            học hỏi về chăm sóc thú cưng và kết nối với cộng đồng yêu thú cưng.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="mb-8 flex flex-wrap justify-center">
          <div className="bg-white shadow-md rounded-full p-1.5 flex flex-wrap justify-center gap-2">
            <FilterButton 
              label="Tất cả" 
              count={eventCounts.all}
              icon={<FaCalendarCheck />}
              active={activeFilter === 'all'} 
              onClick={() => setActiveFilter('all')} 
            />
            <FilterButton 
              label="Nhận nuôi" 
              count={eventCounts.adoption}
              icon={<FaPaw />}
              active={activeFilter === 'adoption'} 
              onClick={() => setActiveFilter('adoption')} 
            />
            <FilterButton 
              label="Workshop & Khám" 
              count={eventCounts.workshop}
              icon={<FaBookReader />}
              active={activeFilter === 'workshop'} 
              onClick={() => setActiveFilter('workshop')} 
            />
            <FilterButton 
              label="Gây quỹ" 
              count={eventCounts.fundraising}
              icon={<FaMapMarkedAlt />}
              active={activeFilter === 'fundraising'} 
              onClick={() => setActiveFilter('fundraising')} 
            />
          </div>
        </div>

        {/* Why Attend Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-8 mb-12 shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center heading-cute">Tại sao nên tham gia sự kiện?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl shadow-sm"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mb-4 shadow-md">
                <FaPaw className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Gặp gỡ thú cưng</h3>
              <p className="text-gray-600">
                Tương tác trực tiếp với các thú cưng đang cần được nhận nuôi và tìm hiểu về tính cách của chúng.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mb-4 shadow-md">
                <FaBookReader className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Học hỏi kiến thức</h3>
              <p className="text-gray-600">
                Tham gia các buổi hội thảo, workshop để học hỏi kiến thức chăm sóc thú cưng từ các chuyên gia.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mb-4 shadow-md">
                <FaMapMarkedAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Kết nối cộng đồng</h3>
              <p className="text-gray-600">
                Gặp gỡ những người yêu thú cưng khác, chia sẻ kinh nghiệm và mở rộng mạng lưới của bạn.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Featured Event */}
        {eventsData.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Sự kiện nổi bật</h2>
              <div className="flex items-center gap-1 bg-pink-100 px-3 py-1 rounded-full text-sm text-pink-700">
                <FaStar className="text-yellow-500" />
                <span>Hãy tham gia ngay!</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-80 lg:h-auto">
                  <img 
                    src={eventsData[0].id === 1 ? 
                      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2669&q=80' : 
                      'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
                    }
                    alt={eventsData[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70" />
                  <div className="absolute top-4 left-4 bg-pink-500 text-white rounded-full px-3 py-1 text-sm font-medium shadow-md">
                    {eventsData[0].status}
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{eventsData[0].title}</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <FaCalendarCheck className="mr-3 text-pink-500" />
                      <div>
                        <p className="font-medium">Ngày tổ chức</p>
                        <p>{eventsData[0].date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkedAlt className="mr-3 text-pink-500" />
                      <div>
                        <p className="font-medium">Địa điểm</p>
                        <p>{eventsData[0].location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{eventsData[0].description}</p>
                  
                  <a 
                    href={eventsData[0].registrationLink} 
                    className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-lg transition duration-300 hover:from-pink-600 hover:to-pink-700 font-medium shadow-md"
                  >
                    Đăng ký tham gia ngay
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Events List */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <span>Tất cả sự kiện</span>
            {filteredEvents.length > 0 && (
              <span className="ml-3 bg-pink-100 text-pink-700 rounded-full text-sm px-3 py-1">
                {filteredEvents.length} sự kiện
              </span>
            )}
          </h2>
          
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 events-grid">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center">
              <FaSearch className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Không có sự kiện nào</h3>
              <p className="text-gray-600 mb-6">Hiện không có sự kiện nào thuộc loại này. Hãy chọn loại sự kiện khác.</p>
              <button 
                onClick={() => setActiveFilter('all')}
                className="inline-block bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Xem tất cả sự kiện
              </button>
            </div>
          )}
        </div>

        {/* Subscription */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-8 shadow-md relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-200 rounded-full opacity-30" />
          <div className="absolute top-10 -left-10 w-20 h-20 bg-purple-200 rounded-full opacity-30" />
          
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md"
            >
              <FaCalendarCheck className="text-white text-2xl" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Nhận thông báo về sự kiện mới</h2>
            <p className="text-gray-600 mb-6">
              Đăng ký để nhận thông báo về các sự kiện mới nhất của chúng tôi. Chúng tôi hứa sẽ không gửi spam!
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="px-4 py-3 rounded-lg border-gray-300 border flex-grow focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-sm"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit" 
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-3 rounded-lg transition duration-300 shadow-md font-medium"
              >
                Đăng ký ngay
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const FilterButton = ({ label, count, icon, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
      active
        ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md'
        : 'text-gray-500 hover:bg-pink-50'
    }`}
  >
    <span className={`${active ? 'text-white' : 'text-pink-500'}`}>
      {icon}
    </span>
    <span>{label}</span>
    {count > 0 && (
      <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
        active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'
      }`}>
        {count}
      </span>
    )}
  </motion.button>
);

export default EventsPage; 