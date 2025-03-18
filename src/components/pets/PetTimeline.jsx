import React from 'react';
import { motion } from 'framer-motion';
import { FaPaw, FaHospital, FaGraduationCap, FaBirthdayCake, FaHeart, FaRunning, FaImage } from 'react-icons/fa';
import { images } from '../../utils/imageImports';

const PetTimeline = ({ timeline }) => {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="text-center py-12 bg-pink-50/50 rounded-xl">
        <FaPaw className="text-4xl text-pink-300 mx-auto mb-4" />
        <h3 className="text-xl text-gray-600">Câu chuyện đang được cập nhật...</h3>
        <p className="text-gray-500 mt-2">Chúng tôi sẽ sớm chia sẻ hành trình của bé với bạn!</p>
      </div>
    );
  }

  // Sắp xếp timeline theo thứ tự thời gian
  const sortedTimeline = [...timeline].sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('-'));
    const dateB = new Date(b.date.split('/').reverse().join('-'));
    return dateA - dateB;
  });

  // Icon tương ứng với từng loại sự kiện
  const getEventIcon = (type) => {
    switch (type) {
      case 'rescue':
        return <FaHeart className="text-red-500" />;
      case 'medical':
        return <FaHospital className="text-blue-500" />;
      case 'training':
        return <FaGraduationCap className="text-yellow-500" />;
      case 'birth':
        return <FaBirthdayCake className="text-pink-500" />;
      case 'milestone':
        return <FaPaw className="text-purple-500" />;
      case 'activity':
        return <FaRunning className="text-green-500" />;
      default:
        return <FaPaw className="text-pink-500" />;
    }
  };

  // Màu nền tương ứng với từng loại sự kiện
  const getEventColor = (type) => {
    switch (type) {
      case 'rescue':
        return 'bg-red-100 border-red-300';
      case 'medical':
        return 'bg-blue-100 border-blue-300';
      case 'training':
        return 'bg-yellow-100 border-yellow-300';
      case 'birth':
        return 'bg-pink-100 border-pink-300';
      case 'milestone':
        return 'bg-purple-100 border-purple-300';
      case 'activity':
        return 'bg-green-100 border-green-300';
      default:
        return 'bg-pink-100 border-pink-300';
    }
  };

  // Kiểm tra và chuẩn bị hình ảnh
  const getImageSrc = (imageUrl, eventType) => {
    if (!imageUrl) {
      // Nếu không có imageUrl, sử dụng placeholder tương ứng với loại sự kiện
      return images.timeline.byType[eventType] || images.timeline.byType['default'];
    }
    
    // Kiểm tra nếu URL là string
    if (typeof imageUrl === 'string') {
      // Kiểm tra nếu là URL online
      if (imageUrl.startsWith('http') || imageUrl.startsWith('https')) {
        return imageUrl; 
      }
    }
    
    // Nếu không phải URL hợp lệ, sử dụng placeholder tương ứng
    return images.timeline.byType[eventType] || images.timeline.byType['default'];
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center relative">
        <span className="relative z-10">Câu chuyện của bé</span>
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-3 bg-pink-200/50 w-full max-w-[180px] -z-10"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </h2>

      <div className="relative">
        {/* Line xuyên suốt */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 rounded-full z-0"></div>

        <div className="relative z-10">
          {sortedTimeline.map((event, index) => (
            <motion.div 
              key={event.id || index}
              className={`flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline node */}
              <div className="order-1 md:order-none flex flex-col items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white border-4 border-pink-300 shadow-lg z-10">
                  {getEventIcon(event.type)}
                </div>
                <div className="text-sm font-medium text-gray-500 mt-2">{event.date}</div>
              </div>

              {/* Content */}
              <motion.div 
                className={`flex-1 p-6 rounded-xl shadow-md border-2 ${getEventColor(event.type)} max-w-lg`}
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(249, 168, 212, 0.2)' }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="rounded-lg overflow-hidden h-48 w-full relative">
                  {event.imageUrl ? (
                    <img 
                      src={getImageSrc(event.imageUrl, event.type)} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = images.timeline.byType[event.type] || images.timeline.byType['default'];
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-pink-50 p-4">
                      <FaImage className="text-3xl text-pink-300 mb-3" />
                      <p className="text-center text-sm text-pink-500">
                        Hình ảnh đang được cập nhật
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Finishing point */}
      <motion.div 
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white border-4 border-pink-400 shadow-lg">
          <FaHeart className="text-2xl text-pink-500" />
        </div>
        <div className="text-center mt-4">
          <h3 className="text-xl font-bold text-gray-800">Hãy là người tiếp theo trong câu chuyện</h3>
          <p className="text-gray-600 mt-2 max-w-md mx-auto">Bạn có thể trở thành một phần quan trọng trong cuộc đời của bé. Hãy đến và tạo nên những kỷ niệm đáng nhớ cùng nhau.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PetTimeline; 