import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaMars, FaVenus, FaDog, FaCat, FaMapMarkerAlt, FaBirthdayCake } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import pawPattern from '../../assets/images/paw-print.svg';

const PetCard = ({ pet }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  
  // Emoji animations
  const emojis = ['❤️', '🐾', '💕', '😍', '🥰'];
  
  // Lấy emoji ngẫu nhiên
  const getRandomEmoji = () => {
    return emojis[Math.floor(Math.random() * emojis.length)];
  };
  
  // Like animation
  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Toggle like state
    setIsLiked(!isLiked);
    
    // Always create emoji animation on toggle for better user feedback
    setShowEmojis(true);
    createFloatingEmojis(isLiked ? 3 : 8); // Show more emojis when liking
    
    // Create heart beat effect on the button
    const likeButton = e.currentTarget;
    likeButton.classList.add('animate-pulse');
    setTimeout(() => {
      likeButton.classList.remove('animate-pulse');
      setShowEmojis(false);
    }, 1000);
  };
  
  // Tạo các emoji phát sáng
  const createFloatingEmojis = (count = 5) => {
    const emojiContainer = document.getElementById(`emoji-container-${pet.id}`);
    if (!emojiContainer) return;
    
    // Xóa tất cả emoji cũ trước khi thêm mới để tránh trùng lặp
    const oldEmojis = emojiContainer.querySelectorAll('.floating-emoji');
    oldEmojis.forEach(emoji => emoji.remove());
    
    for (let i = 0; i < count; i++) {
      const emoji = document.createElement('div');
      emoji.innerText = getRandomEmoji();
      emoji.classList.add('floating-emoji');
      
      // Vị trí ngẫu nhiên
      emoji.style.left = `${Math.random() * 80 + 10}%`;
      // Thêm randomness cho vị trí bắt đầu và kích thước
      emoji.style.bottom = `${Math.random() * 20 + 10}%`;
      emoji.style.fontSize = `${Math.random() * 10 + 20}px`;
      
      // Random animation timing
      emoji.style.animationDuration = `${Math.random() * 1 + 1.5}s`;
      emoji.style.animationDelay = `${Math.random() * 0.2}s`;
      
      emojiContainer.appendChild(emoji);
      
      // Sử dụng animationend event để tự động xóa emoji sau khi animation kết thúc
      emoji.addEventListener('animationend', () => {
        emoji.remove();
      });
      
      // Backup timeout để đảm bảo emoji được xóa nếu animationend không hoạt động
      setTimeout(() => {
        if (emoji.parentNode === emojiContainer) {
          emoji.remove();
        }
      }, 3000);
    }
  };
  
  // Hàm tạo mẫu nền
  const getBgPattern = () => {
    return {
      backgroundImage: `url(${pawPattern})`,
      backgroundSize: '120px',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      opacity: 0.04,
    };
  };
  
  // Biểu tượng giới tính
  const getGenderIcon = () => {
    if (pet.gender === 'Đực') {
      return <FaMars className="text-blue-500" />;
    } else {
      return <FaVenus className="text-pink-500" />;
    }
  };
  
  // Biểu tượng loại thú cưng
  const getTypeIcon = () => {
    if (pet.type === 'Chó') {
      return <FaDog className="text-gray-700" />;
    } else {
      return <FaCat className="text-gray-700" />;
    }
  };
  
  // Màu nền cho badge loại thú cưng
  const getTypeBadgeColor = () => {
    if (pet.type === 'Chó') {
      return 'bg-blue-100 text-blue-600';
    } else {
      return 'bg-purple-100 text-purple-600';
    }
  };
  
  // Xử lý đường dẫn hình ảnh
  const getImageSrc = () => {
    // Nếu chúng ta có imageUrl từ dữ liệu và nó không chứa undefined, sử dụng nó
    if (pet.imageUrl && !pet.imageUrl.includes('undefined')) {
      return pet.imageUrl;
    }
    
    // Tạo search term dựa trên loại thú cưng và giống
    const petType = pet.type === 'Chó' ? 'dog' : 'cat';
    const breed = pet.breed ? pet.breed.toLowerCase().replace(/\s+/g, '-') : '';
    
    // Sử dụng Unsplash source API để lấy ảnh thực tế
    // Chúng ta sử dụng pet.id như một seed để luôn lấy cùng một ảnh cho cùng một thú cưng
    return `https://source.unsplash.com/featured/?${petType},${breed}&sig=${pet.id}`;
  };
  
  // Fallback image
  const getFallbackImage = () => {
    // Nếu ảnh không tải được, sử dụng ảnh mặc định
    const img = document.querySelector(`#pet-img-${pet.id}`);
    if (img) {
      img.onerror = () => {
        img.src = pet.type === 'Chó' 
          ? 'https://unsplash.com/photos/a-golden-retriever-sitting-on-a-sandy-beach-FTbC150wV8Q'
          : 'https://unsplash.com/photos/black-and-white-cat-lying-on-brown-bamboo-chair-inside-room-gKXKBY-C-Dk';
      };
    }
  };
  
  // Định dạng tuổi
  const getAgeText = (age) => {
    // Xử lý trường hợp chuỗi đã có định dạng "X tuổi"
    if (typeof age === 'string' && age.includes('tuổi')) {
      return age;
    }
    
    // Xử lý trường hợp tuổi là chuỗi nhưng có thể chuyển thành số
    if (typeof age === 'string' && !isNaN(age)) {
      return `${age} tuổi`;
    }
    
    // Xử lý trường hợp tuổi là số
    if (typeof age === 'number') {
      return `${age} tuổi`;
    }
    
    // Trường hợp không có tuổi hoặc không hợp lệ
    return 'Chưa xác định';
  };
  
  // Màu sắc dựa trên giới tính
  const getGenderClass = (gender) => {
    if (gender === 'Đực') {
      return 'bg-blue-100 text-blue-600';
    } else {
      return 'bg-pink-100 text-pink-600';
    }
  };
  
  return (
    <Link to={`/pet/${pet.id}`}>
      <motion.div 
        className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 h-full feminine-card relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 z-0" 
          style={getBgPattern()}
        />
        
        {/* Pet Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            id={`pet-img-${pet.id}`}
            src={getImageSrc()}
            alt={pet.name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ 
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
            onLoad={getFallbackImage}
          />
          
          {/* Love Button */}
          <motion.button 
            className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-white/40 transition-all duration-300"
            onClick={toggleLike}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0.8 }}
            animate={{ 
              scale: isLiked ? [1, 1.2, 1] : 1,
              transition: { duration: 0.3 }
            }}
            aria-label="Like this pet"
          >
            {isLiked ? (
              <FaHeart className="text-2xl text-red-500" />
            ) : (
              <FaRegHeart className="text-2xl text-white" />
            )}
          </motion.button>
          
          {/* Status Badge */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600 shadow-sm">
              {pet.status || "Đang được chăm sóc"}
            </div>
          </div>
          
          {/* Type Badge */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getTypeBadgeColor()}`}>
              {getTypeIcon()}
              <span>{pet.type}</span>
            </div>
          </div>
          
          {/* Emoji Container */}
          <div 
            id={`emoji-container-${pet.id}`} 
            className="absolute inset-0 overflow-hidden pointer-events-none"
          ></div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        
        {/* Pet Info */}
        <div className="p-5 feminine-card-content relative z-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
            <div className={`px-2 py-1 rounded-full text-xs ${getGenderClass(pet.gender)} flex items-center gap-1`}>
              {getGenderIcon()}
              <span>{pet.gender}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-600">
              {pet.breed}
            </span>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <FaBirthdayCake className="text-pink-500" />
              <span>{getAgeText(pet.age)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-gray-600 text-sm mb-4">
            <FaMapMarkerAlt className="text-red-400" />
            <span>{pet.location}</span>
          </div>
          
          <div className="line-clamp-2 text-gray-600 mb-4 text-sm">
            {pet.description}
          </div>
          
          <div className="flex flex-wrap gap-1 mt-auto">
            {pet.compatibility && pet.compatibility.slice(0, 2).map((tag, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-lavender-50 text-lavender-600 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
            {pet.compatibility && pet.compatibility.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                +{pet.compatibility.length - 2}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PetCard; 