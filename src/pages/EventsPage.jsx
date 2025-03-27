import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EventCard from '../components/events/EventCard';
import eventsData from '../data/eventsData';
import { 
  FaCalendarCheck, FaMapMarkedAlt, FaBookReader, FaStar, FaPaw, 
  FaSearch, FaCalendarAlt, FaFilter, FaHeart, FaBars, FaTimes,
  FaListUl, FaThLarge, FaRegCalendarAlt, FaChevronLeft, FaChevronRight, FaUsers
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EventsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', or 'calendar'
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [dateRange, setDateRange] = useState('all'); // 'all', 'today', 'thisWeek', 'thisMonth'
  
  // Get unique locations from events data
  const locations = useMemo(() => {
    const allLocations = eventsData.map(event => {
      const locationParts = event.location.split(',');
      return locationParts[locationParts.length - 1].trim();
    });
    return ['all', ...new Set(allLocations)];
  }, []);
  
  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('eventFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);
  
  // Save favorites to localStorage when changed
  useEffect(() => {
    localStorage.setItem('eventFavorites', JSON.stringify(favorites));
  }, [favorites]);
  
  // Toggle favorite status
  const toggleFavorite = (eventId) => {
    setFavorites(prev => {
      if (prev.includes(eventId)) {
        return prev.filter(id => id !== eventId);
      } else {
        return [...prev, eventId];
      }
    });
  };

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

  // Filter events by date range
  const filterByDate = (event) => {
    if (dateRange === 'all') return true;
    
    const eventDateStr = event.date.split(' - ')[0];
    const [day, month, year] = eventDateStr.split('/').map(num => parseInt(num));
    const eventDate = new Date(year, month - 1, day);
    const today = new Date();
    
    // Reset hours to compare just the dates
    today.setHours(0, 0, 0, 0);
    
    if (dateRange === 'today') {
      return eventDate.getDate() === today.getDate() &&
             eventDate.getMonth() === today.getMonth() &&
             eventDate.getFullYear() === today.getFullYear();
    }
    
    if (dateRange === 'thisWeek') {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      return eventDate >= weekStart && eventDate <= weekEnd;
    }
    
    if (dateRange === 'thisMonth') {
      return eventDate.getMonth() === today.getMonth() &&
             eventDate.getFullYear() === today.getFullYear();
    }
    
    return true;
  };
  
  // Filter events by location
  const filterByLocation = (event) => {
    if (selectedLocation === 'all') return true;
    
    const locationParts = event.location.split(',');
    const eventCity = locationParts[locationParts.length - 1].trim();
    
    return eventCity === selectedLocation;
  };
  
  // Filter events by search query
  const filterBySearch = (event) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      event.title.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query)
    );
  };
  
  // Filter events by favorites
  const filterByFavorites = (event) => {
    if (!showOnlyFavorites) return true;
    return favorites.includes(event.id);
  };

  // Apply all filters to get filtered events
  const filteredEvents = useMemo(() => {
    return eventsData.filter(event => {
      const matchesType = activeFilter === 'all' || getEventType(event) === activeFilter;
      const matchesSearch = filterBySearch(event);
      const matchesLocation = filterByLocation(event);
      const matchesDate = filterByDate(event);
      const matchesFavorites = filterByFavorites(event);
      
      return matchesType && matchesSearch && matchesLocation && matchesDate && matchesFavorites;
    });
  }, [activeFilter, searchQuery, selectedLocation, dateRange, showOnlyFavorites, favorites]);

  // Count events by type (keep this for the filter buttons)
  const eventCounts = useMemo(() => ({
    all: eventsData.length,
    adoption: eventsData.filter(event => getEventType(event) === 'adoption').length,
    workshop: eventsData.filter(event => getEventType(event) === 'workshop').length,
    fundraising: eventsData.filter(event => getEventType(event) === 'fundraising').length,
    other: eventsData.filter(event => getEventType(event) === 'other').length
  }), []);

  // Group events by month and day for calendar view
  const groupedEvents = useMemo(() => {
    const grouped = {};
    
    filteredEvents.forEach(event => {
      const eventDateStr = event.date.split(' - ')[0];
      const [day, month, year] = eventDateStr.split('/').map(num => parseInt(num));
      const dateKey = `${year}-${month.toString().padStart(2, '0')}`;
      const dayKey = day.toString();
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = {};
      }
      
      if (!grouped[dateKey][dayKey]) {
        grouped[dateKey][dayKey] = [];
      }
      
      grouped[dateKey][dayKey].push(event);
    });
    
    return grouped;
  }, [filteredEvents]);
  
  // State for calendar view
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
  });

  // Navigation for calendar view
  const navigateMonth = (direction) => {
    const [year, month] = currentMonth.split('-').map(Number);
    const date = new Date(year, month - 1);
    
    if (direction === 'prev') {
      date.setMonth(date.getMonth() - 1);
    } else {
      date.setMonth(date.getMonth() + 1);
    }
    
    setCurrentMonth(`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`);
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

        {/* Search Bar and View Toggles */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm sự kiện..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              />
            </div>
            
            {/* Control Buttons */}
            <div className="flex items-center gap-3">
              {/* Toggle Show Favorites Only */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  showOnlyFavorites
                    ? 'bg-pink-500 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-pink-50'
                }`}
              >
                <FaHeart className={showOnlyFavorites ? 'text-white' : 'text-pink-500'} />
                <span>Yêu thích</span>
              </motion.button>
              
              {/* Toggle Advanced Filters */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  showAdvancedFilters
                    ? 'bg-purple-500 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-purple-50'
                }`}
              >
                <FaFilter className={showAdvancedFilters ? 'text-white' : 'text-purple-500'} />
                <span className="hidden sm:inline">Bộ lọc</span>
              </motion.button>
              
              {/* View Mode Toggles */}
              <div className="bg-white border border-gray-200 rounded-full flex overflow-hidden shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <FaThLarge className="text-sm" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <FaListUl className="text-sm" />
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-3 py-2 ${viewMode === 'calendar' ? 'bg-pink-100 text-pink-600' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <FaRegCalendarAlt className="text-sm" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Advanced Filters */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 bg-white rounded-xl p-4 shadow-md overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Location Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    >
                      <option value="all">Tất cả địa điểm</option>
                      {locations.filter(loc => loc !== 'all').map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Date Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian</label>
                    <select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    >
                      <option value="all">Tất cả</option>
                      <option value="today">Hôm nay</option>
                      <option value="thisWeek">Tuần này</option>
                      <option value="thisMonth">Tháng này</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-800">Sự kiện nổi bật</h2>
                <span className="inline-block animate-pulse bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-2 py-1 rounded-md">
                  HOT
                </span>
              </div>
              <div className="flex items-center gap-1 bg-pink-100 px-3 py-1 rounded-full text-sm text-pink-700">
                <FaStar className="text-yellow-500" />
                <span>Hãy tham gia ngay!</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-pink-100">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-72 lg:h-auto overflow-hidden">
                  <img 
                    src={eventsData[0].id === 1 ? 
                      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2669&q=80' : 
                      'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
                    }
                    alt={eventsData[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70" />
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-pink-500 text-white rounded-full px-3 py-1 text-sm font-medium shadow-md">
                    {eventsData[0].status}
                    </div>
                    
                    <div className="bg-purple-500 text-white rounded-full px-3 py-1 text-sm font-medium shadow-md flex items-center gap-1">
                      <FaCalendarCheck className="text-xs" /> {eventsData[0].date.split(' - ')[0]}
                    </div>
                  </div>
                
                {/* Favorite Button cho sự kiện nổi bật */}
                <button 
                  onClick={() => toggleFavorite(eventsData[0].id)}
                    className={`absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full ${
                    favorites.includes(eventsData[0].id) 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/40'
                  } transition-colors shadow-md z-10`}
                  aria-label={favorites.includes(eventsData[0].id) ? "Bỏ yêu thích" : "Yêu thích"}
                >
                  <FaHeart className={favorites.includes(eventsData[0].id) ? 'animate-pulse' : ''} />
                </button>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white flex items-center gap-1">
                        <FaMapMarkedAlt className="text-pink-300" />
                        <span className="truncate max-w-[200px]">{eventsData[0].location.split(',')[0]}</span>
                      </div>
                      
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white flex items-center gap-1">
                        <FaUsers className="text-pink-300" />
                        <span>{Math.floor(Math.random() * 50) + 30} người</span>
                      </div>
                    </div>
                  </div>
                </div>
                
              <div className="p-6 lg:p-8 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">{eventsData[0].title}</h3>
                  
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start text-gray-600">
                      <FaCalendarCheck className="mt-1 mr-3 text-pink-500 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-700">Ngày tổ chức</p>
                        <p>{eventsData[0].date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start text-gray-600">
                      <FaMapMarkedAlt className="mt-1 mr-3 text-pink-500 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-700">Địa điểm</p>
                        <p className="line-clamp-2">{eventsData[0].location}</p>
                      </div>
                    </div>
                  </div>
                  
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg mb-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-pink-100 rounded-full -mr-8 -mt-8 opacity-50" />
                      <p className="text-gray-700 leading-relaxed relative z-10">{eventsData[0].description}</p>
                  </div>
                </div>
                
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Thời gian còn lại</span>
                      <div className="flex items-center text-pink-600 font-bold">
                        <span className="animate-pulse">⏱</span>
                        <span className="ml-2">Còn {(() => {
                          const eventDateStr = eventsData[0].date.split(' - ')[0];
                          const [day, month, year] = eventDateStr.split('/').map(num => parseInt(num));
                          const eventDate = new Date(year, month - 1, day);
                          const today = new Date();
                          const diffTime = eventDate - today;
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                          return diffDays > 0 ? diffDays : 0;
                        })()} ngày</span>
                      </div>
                  </div>
                  
                    <motion.a 
                    href={eventsData[0].registrationLink} 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-lg transition duration-300 hover:from-pink-600 hover:to-pink-700 font-medium shadow-md text-center"
                  >
                    Đăng ký tham gia ngay
                    </motion.a>
                </div>
                </div>
              </div>
            </div>
          </motion.div>

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
            <>
              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 events-grid">
                  {filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <EventCard 
                        event={event} 
                        isFavorite={favorites.includes(event.id)}
                        onToggleFavorite={() => toggleFavorite(event.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* List View */}
              {viewMode === 'list' && (
                <div className="space-y-4">
                  {filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-40 relative flex-shrink-0">
                          <img 
                            src={event.id === 1 ? 
                              'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2669&q=80' : 
                              'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80'
                            }
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-pink-500 text-white rounded-full px-2 py-0.5 text-xs font-medium">
                            {event.status}
                          </div>
                        </div>
                        
                        <div className="p-4 flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
                            <button
                              onClick={() => toggleFavorite(event.id)}
                              className={`p-2 rounded-full ${favorites.includes(event.id) ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
                              aria-label={favorites.includes(event.id) ? "Bỏ yêu thích" : "Yêu thích"}
                            >
                              <FaHeart className={favorites.includes(event.id) ? 'animate-pulse' : ''} />
                            </button>
                          </div>
                          
                          <div className="flex flex-wrap gap-3 mb-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <FaCalendarAlt className="text-pink-500" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaMapMarkedAlt className="text-pink-500" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                          
                          <div className="mt-auto flex justify-between items-center">
                            <span className="text-sm text-gray-500">{getEventType(event) === 'adoption' ? 'Nhận nuôi' : getEventType(event) === 'workshop' ? 'Workshop & Khám' : 'Gây quỹ'}</span>
                            <Link
                              to={`/event/${event.id}`}
                              className="px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full text-sm font-medium hover:bg-pink-200 transition-colors"
                            >
                              Xem chi tiết
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Calendar View */}
              {viewMode === 'calendar' && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  {/* Calendar Header */}
                  <div className="flex justify-between items-center bg-pink-50 p-4">
                    <button 
                      onClick={() => navigateMonth('prev')}
                      className="p-2 rounded-full hover:bg-pink-100 text-gray-700"
                    >
                      <FaChevronLeft />
                    </button>
                    
                    <h3 className="text-lg font-semibold text-gray-800">
                      {(() => {
                        const [year, month] = currentMonth.split('-');
                        const date = new Date(parseInt(year), parseInt(month) - 1);
                        return new Intl.DateTimeFormat('vi-VN', { month: 'long', year: 'numeric' }).format(date);
                      })()}
                    </h3>
                    
                    <button 
                      onClick={() => navigateMonth('next')}
                      className="p-2 rounded-full hover:bg-pink-100 text-gray-700"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                  
                  {/* Calendar Grid */}
                  <div className="p-4">
                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                      {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day, index) => (
                        <div key={index} className="py-2 font-medium text-gray-500">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-2">
                      {(() => {
                        const [year, month] = currentMonth.split('-').map(Number);
                        const firstDay = new Date(year, month - 1, 1);
                        const lastDay = new Date(year, month, 0);
                        const daysInMonth = lastDay.getDate();
                        const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday
                        
                        const calendarDays = [];
                        
                        // Add empty cells for days before the first day of the month
                        for (let i = 0; i < startingDayOfWeek; i++) {
                          calendarDays.push(
                            <div key={`empty-${i}`} className="h-32 p-1 bg-gray-50 rounded-lg"></div>
                          );
                        }
                        
                        // Add cells for each day of the month
                        for (let day = 1; day <= daysInMonth; day++) {
                          const dayStr = day.toString();
                          const dateKey = currentMonth;
                          const hasEvents = groupedEvents[dateKey] && groupedEvents[dateKey][dayStr];
                          const todayDate = new Date();
                          const isToday = todayDate.getDate() === day && 
                                          todayDate.getMonth() === month - 1 && 
                                          todayDate.getFullYear() === year;
                          
                          calendarDays.push(
                            <div 
                              key={`day-${day}`}
                              className={`h-32 p-1 rounded-lg border overflow-hidden ${
                                isToday 
                                  ? 'border-pink-500 bg-pink-50' 
                                  : hasEvents 
                                    ? 'border-gray-200 bg-white hover:border-pink-200' 
                                    : 'border-gray-100 bg-gray-50'
                              }`}
                            >
                              <div className="h-full flex flex-col">
                                <div className={`text-right py-1 px-2 text-sm ${isToday ? 'font-bold text-pink-600' : ''}`}>
                                  {day}
                                </div>
                                
                                <div className="flex-grow overflow-y-auto scrollbar-hide">
                                  {hasEvents && groupedEvents[dateKey][dayStr].map((event) => (
                                    <div 
                                      key={event.id} 
                                      className="mb-1 px-2 py-1 text-xs bg-pink-100 text-pink-800 rounded truncate"
                                      title={event.title}
                                      onClick={() => window.location.href = `/event/${event.id}`}
                                    >
                                      {event.title}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        }
                        
                        return calendarDays;
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center">
              <FaSearch className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Không có sự kiện nào</h3>
              <p className="text-gray-600 mb-6">Hiện không có sự kiện nào thuộc loại này. Hãy chọn loại sự kiện khác hoặc thay đổi bộ lọc.</p>
              <button 
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                  setSelectedLocation('all');
                  setDateRange('all');
                  setShowOnlyFavorites(false);
                }}
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