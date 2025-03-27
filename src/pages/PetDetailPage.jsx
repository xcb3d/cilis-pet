import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHeart, FaRegHeart, FaMars, FaVenus, FaDog, FaCat, 
  FaMapMarkerAlt, FaBirthdayCake, FaArrowLeft, FaPaw, 
  FaSyringe, FaClipboardCheck, FaHandHoldingHeart, FaHistory, FaUserFriends, FaHome, FaChild, FaCalendarAlt,
  FaImages, FaChevronLeft, FaChevronRight, FaTimes, FaShare, FaFacebook, FaTwitter, FaWhatsapp, FaLink, FaCopy
} from 'react-icons/fa';
import pets from '../data/petsData';
import AdoptionForm from '../components/forms/AdoptionForm';
import PetTimeline from '../components/pets/PetTimeline';
import PetButton from '../components/buttons/PetButton';

const PetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  
  // Thêm state cho gallery
  const [showGallery, setShowGallery] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]);
  
  // Thêm state cho scroll position
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showMobileAdoptButton, setShowMobileAdoptButton] = useState(false);
  
  // State cho share options - đã di chuyển lên
  const [showShareOptions, setShowShareOptions] = useState(false);
  // Ref cho share dropdown
  const shareMenuRef = useRef(null);
  
  // Tạo dữ liệu giả về số người quan tâm và thời gian giới hạn
  const getRandomInterestCount = () => {
    return Math.floor(Math.random() * 10) + 2; // 2-12 người
  };
  
  const getDeadlineDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7); // Mặc định thêm 7 ngày
    return date;
  };
  
  // Tính số ngày còn lại
  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const diff = deadline - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };
  
  const [interestedCount, setInterestedCount] = useState(0);
  const [adoptionDeadline, setAdoptionDeadline] = useState(null);
  
  // Theo dõi scroll position
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Hiện nút nhận nuôi khi scroll xuống xa hơn 300px
      setShowMobileAdoptButton(position > 300);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Xử lý click bên ngoài để đóng share menu - đã di chuyển lên
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Giả lập fetch dữ liệu
    const timer = setTimeout(() => {
      const foundPet = pets.find(p => p.id.toString() === id.toString());
      setPet(foundPet || null);
      setLoading(false);
      
      // Thêm dữ liệu giả về số người quan tâm và deadline
      if (foundPet) {
        setInterestedCount(getRandomInterestCount());
        setAdoptionDeadline(getDeadlineDate());
      }
      
      // Chuẩn bị gallery images từ timeline nếu có
      if (foundPet && foundPet.timeline && foundPet.timeline.length > 0) {
        const timelineImages = foundPet.timeline
          .filter(item => item.imageUrl)
          .map(item => ({
            url: item.imageUrl,
            caption: item.title
          }));
          
        // Thêm ảnh chính vào đầu gallery
        const mainImage = {
          url: foundPet.imageUrl || `https://source.unsplash.com/featured/?${foundPet.type.toLowerCase()},${foundPet.breed.toLowerCase()}`,
          caption: `${foundPet.name} - ${foundPet.breed}`
        };
        
        setGalleryImages([mainImage, ...timelineImages]);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  // Gallery controls
  const nextImage = () => {
    setActiveImageIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setActiveImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };
  
  const openGallery = (index = 0) => {
    setActiveImageIndex(index);
    setShowGallery(true);
    // Prevent body scrolling when gallery is open
    document.body.style.overflow = 'hidden';
  };
  
  const closeGallery = () => {
    setShowGallery(false);
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  };
  
  // Chia sẻ URL hiện tại - đã di chuyển lên
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const sharePet = (platform) => {
    if (!pet) return;
    
    const title = `Nhận nuôi ${pet.name} - ${pet.breed} ${pet.type} đáng yêu!`;
    const text = `${pet.name} đang tìm một gia đình mới. ${pet.description.substring(0, 100)}...`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + window.location.href)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(window.location.href)
          .then(() => {
            alert('Đã sao chép đường dẫn!');
          })
          .catch(err => {
            console.error('Không thể sao chép: ', err);
          });
        break;
      default:
        break;
    }
    
    if (shareUrl && platform !== 'copy') {
      window.open(shareUrl, '_blank');
    }
    
    setShowShareOptions(false);
  };
  
  // Các function để render dữ liệu
  const getGenderIcon = () => {
    if (!pet) return null;
    if (pet.gender === 'Đực') {
      return <FaMars className="text-blue-500" />;
    } else {
      return <FaVenus className="text-pink-500" />;
    }
  };
  
  const getTypeIcon = () => {
    if (!pet) return null;
    if (pet.type === 'Chó') {
      return <FaDog className="text-gray-700" />;
    } else {
      return <FaCat className="text-gray-700" />;
    }
  };
  
  const getGenderClass = () => {
    if (!pet) return '';
    if (pet.gender === 'Đực') {
      return 'bg-blue-100 text-blue-600';
    } else {
      return 'bg-pink-100 text-pink-600';
    }
  };
  
  const getAgeText = (age) => {
    if (!age) return 'Chưa xác định';
    
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
  
  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            <FaPaw className="text-5xl text-pink-400" />
          </motion.div>
          <p className="mt-4 text-gray-600">Đang tải thông tin thú cưng...</p>
        </div>
      </div>
    );
  }
  
  // Pet not found
  if (!pet) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col items-center gap-4 py-12">
            <FaPaw className="text-5xl text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-800">Không tìm thấy thú cưng</h2>
            <p className="text-gray-600 mb-4">Thú cưng bạn đang tìm kiếm không tồn tại hoặc đã được nhận nuôi.</p>
            <PetButton 
              text="Quay lại danh sách thú cưng"
              icon="paw"
              to="/pets"
              variant="light"
              size="md"
            />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      {/* Back button */}
      <div className="mb-6 flex justify-start">
        <PetButton 
          text="Quay lại"
          icon="paw"
          variant="light"
          size="sm"
          noEffects={true}
          rounded={false}
          onClick={() => navigate(-1)}
          className="hover:bg-transparent hover:text-pink-500"
        />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pet Image Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              {/* Main Image */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative aspect-square cursor-pointer" onClick={() => galleryImages.length > 0 && openGallery(0)}>
                  <img 
                    src={pet.imageUrl || `https://source.unsplash.com/featured/?${pet.type.toLowerCase()},${pet.breed.toLowerCase()}`} 
                    alt={pet.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  {/* Like Button */}
                  <PetButton 
                    icon={isLiked ? "heart" : ""} 
                    variant={isLiked ? "primary" : "light"} 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLiked(!isLiked);
                    }}
                    className={isLiked ? "text-white" : "text-white bg-white/20 backdrop-blur-sm hover:bg-white/40"}
                  >
                    {!isLiked && <FaRegHeart className="text-xl text-white" />}
                  </PetButton>
                  
                  {/* Gallery button if has timeline images */}
                  {galleryImages.length > 1 && (
                    <PetButton 
                      icon="images"
                      variant="light"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        openGallery(0);
                      }}
                      className="absolute top-4 left-4 text-white bg-white/20 backdrop-blur-sm hover:bg-white/40"
                    >
                      <FaImages className="text-lg text-white" />
                    </PetButton>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-600 shadow-sm">
                      {pet.status || "Đang được chăm sóc"}
                    </div>
                  </div>
                </div>
                
                {/* Thumbnail Gallery if has timeline images */}
                {galleryImages.length > 1 && (
                  <div className="p-3 flex gap-2 overflow-x-auto">
                    {galleryImages.map((image, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => openGallery(idx)}
                        className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer flex-shrink-0 border-2 ${idx === 0 ? 'border-pink-500' : 'border-transparent'}`}
                      >
                        <img 
                          src={image.url} 
                          alt={image.caption || `Ảnh ${idx+1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Pet Quick Info */}
                <div className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-gray-800">{pet.name}</h1>
                    <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${getGenderClass()} flex items-center gap-1.5`}>
                      {getGenderIcon()}
                      <span>{pet.gender}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center">
                      <div className="text-sm text-gray-500 mb-1">Loại thú cưng</div>
                      <div className="flex items-center gap-1.5 font-medium">
                        {getTypeIcon()}
                        <span>{pet.type}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center">
                      <div className="text-sm text-gray-500 mb-1">Tuổi</div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <FaBirthdayCake className="text-pink-500" />
                        <span>{getAgeText(pet.age)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center">
                      <div className="text-sm text-gray-500 mb-1">Giống</div>
                      <div className="font-medium">
                        {pet.breed}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center">
                      <div className="text-sm text-gray-500 mb-1">Vị trí</div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <FaMapMarkerAlt className="text-red-400" />
                        <span>{pet.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <PetButton
                    text={`Nhận nuôi ${pet.name}`}
                    icon="heart"
                    variant="gradient"
                    size="lg"
                    full={true}
                    onClick={() => setShowAdoptionForm(true)}
                  />
                </div>
              </div>
              
              {/* Additional Info Cards */}
              <div className="grid grid-cols-1 gap-4 mt-6">
                <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin sức khỏe</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Tiêm phòng */}
                    <div className={`${pet.isVaccinated ? 'bg-green-50' : 'bg-gray-50'} rounded-xl p-4 text-center`}>
                      <div className="flex flex-col items-center">
                        <div className="mb-2">
                          <FaSyringe className={`${pet.isVaccinated ? 'text-green-500' : 'text-gray-400'} text-xl`} />
                        </div>
                        <h4 className="font-medium text-sm text-gray-800">
                          {pet.isVaccinated ? 'Đã tiêm phòng' : 'Chưa tiêm phòng'}
                        </h4>
                        <p className={`text-xs ${pet.isVaccinated ? 'text-green-600' : 'text-gray-500'} mt-1`}>
                          {pet.isVaccinated ? 'Đầy đủ' : 'Đang lên lịch'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Triệt sản */}
                    <div className={`${pet.isNeutered ? 'bg-green-50' : 'bg-gray-50'} rounded-xl p-4 text-center`}>
                      <div className="flex flex-col items-center">
                        <div className="mb-2">
                          <FaClipboardCheck className={`${pet.isNeutered ? 'text-green-500' : 'text-gray-400'} text-xl`} />
                        </div>
                        <h4 className="font-medium text-sm text-gray-800">
                          {pet.isNeutered ? 'Đã triệt sản' : 'Chưa triệt sản'}
                        </h4>
                        <p className={`text-xs ${pet.isNeutered ? 'text-green-600' : 'text-gray-500'} mt-1`}>
                          {pet.isNeutered ? 'Phục hồi tốt' : 'Theo yêu cầu'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Sức khỏe */}
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <div className="flex flex-col items-center">
                        <div className="mb-2">
                          <FaPaw className="text-blue-500 text-xl" />
                        </div>
                        <h4 className="font-medium text-sm text-gray-800">
                          Sức khỏe
                        </h4>
                        <p className="text-xs text-blue-600 mt-1">Tốt</p>
                      </div>
                    </div>
                    
                    {/* Tình trạng */}
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <div className="flex flex-col items-center">
                        <div className="mb-2">
                          <FaHandHoldingHeart className="text-purple-500 text-xl" />
                        </div>
                        <h4 className="font-medium text-sm text-gray-800">
                          Tình trạng
                        </h4>
                        <p className="text-xs text-purple-600 mt-1">Sẵn sàng nhận nuôi</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Thông tin liên hệ */}
                <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Thông tin liên hệ</h3>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-gray-600">
                      Nếu bạn quan tâm đến {pet.name}, vui lòng điền form nhận nuôi hoặc liên hệ trực tiếp tại trung tâm:
                    </p>
                    <p className="font-medium flex items-center gap-2 text-gray-800">
                      <FaMapMarkerAlt className="text-red-500" />
                      {pet.location === 'Hà Nội' ? 'Số 123 Đường Láng, Đống Đa, Hà Nội' : 
                       pet.location === 'Hồ Chí Minh' ? 'Số 456 Điện Biên Phủ, Quận 3, TP.HCM' : 
                       'Số 789 Trần Phú, Hải Châu, Đà Nẵng'}
                    </p>
                    <p className="font-medium flex items-center gap-2 text-gray-800">
                      <FaPaw className="text-pink-500" />
                      Hotline: 1900 1234
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-gray-100">
                <div className="flex items-center justify-between pr-4">
                  <div className="flex flex-nowrap md:flex-wrap overflow-x-auto hide-scrollbar">
                    <PetButton
                      text="Giới thiệu"
                      variant="light"
                      noEffects={true}
                      rounded={false}
                      onClick={() => setActiveTab('about')}
                      className={`py-4 px-6 flex-shrink-0 ${
                        activeTab === 'about' 
                          ? 'bg-transparent !text-pink-600 border-b-2 border-pink-500 shadow-none' 
                          : 'bg-transparent text-gray-500 hover:text-gray-700 shadow-none'
                      }`}
                    />
                    <PetButton
                      text="Tính cách & Thích hợp"
                      variant="light"
                      noEffects={true}
                      rounded={false}
                      onClick={() => setActiveTab('compatibility')}
                      className={`py-4 px-6 flex-shrink-0 ${
                        activeTab === 'compatibility' 
                          ? 'bg-transparent !text-pink-600 border-b-2 border-pink-500 shadow-none' 
                          : 'bg-transparent text-gray-500 hover:text-gray-700 shadow-none'
                      }`}
                    />
                    <PetButton
                      text="Câu chuyện"
                      icon="paw"
                      variant="light"
                      noEffects={true}
                      rounded={false}
                      onClick={() => setActiveTab('timeline')}
                      className={`py-4 px-6 flex-shrink-0 ${
                        activeTab === 'timeline' 
                          ? 'bg-transparent !text-pink-600 border-b-2 border-pink-500 shadow-none' 
                          : 'bg-transparent text-gray-500 hover:text-gray-700 shadow-none'
                      }`}
                    />
                    <PetButton
                      text="Nhận nuôi"
                      variant="light"
                      noEffects={true}
                      rounded={false}
                      onClick={() => setActiveTab('adopt')}
                      className={`py-4 px-6 flex-shrink-0 ${
                        activeTab === 'adopt' 
                          ? 'bg-transparent !text-pink-600 border-b-2 border-pink-500 shadow-none' 
                          : 'bg-transparent text-gray-500 hover:text-gray-700 shadow-none'
                      }`}
                    />
                  </div>
                  
                  {/* Share Button */}
                  <div className="relative" ref={shareMenuRef}>
                    <button 
                      className="text-gray-500 hover:text-pink-500 p-2 rounded-full hover:bg-pink-50 transition-colors"
                      onClick={() => setShowShareOptions(!showShareOptions)}
                      aria-label="Chia sẻ"
                    >
                      <FaShare className="text-lg" />
                    </button>
                    
                    {/* Share Options Dropdown */}
                    {showShareOptions && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute right-0 top-12 bg-white shadow-xl rounded-xl p-3 z-50 w-64 border border-gray-100"
                      >
                        <div className="text-sm font-medium text-gray-700 mb-2 px-2">
                          Chia sẻ {pet.name}
                        </div>
                        <div className="flex flex-col gap-1">
                          <button 
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg w-full text-left"
                            onClick={() => sharePet('facebook')}
                          >
                            <FaFacebook className="text-blue-600 text-xl" />
                            <span className="text-gray-700">Facebook</span>
                          </button>
                          <button 
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg w-full text-left"
                            onClick={() => sharePet('twitter')}
                          >
                            <FaTwitter className="text-blue-400 text-xl" />
                            <span className="text-gray-700">Twitter</span>
                          </button>
                          <button 
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg w-full text-left"
                            onClick={() => sharePet('whatsapp')}
                          >
                            <FaWhatsapp className="text-green-500 text-xl" />
                            <span className="text-gray-700">WhatsApp</span>
                          </button>
                          <button 
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg w-full text-left"
                            onClick={() => sharePet('copy')}
                          >
                            <FaCopy className="text-gray-500 text-xl" />
                            <span className="text-gray-700">Sao chép đường dẫn</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'about' && (
                  <div className="animate-fadeIn">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Về {pet.name}</h2>
                    <div className="prose prose-pink max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {pet.description}
                      </p>
                      
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {pet.name} hiện đang được chăm sóc tại trung tâm của chúng tôi ở {pet.location}. 
                        {pet.gender === 'Đực' ? 'Bé' : 'Bé'} rất thân thiện và hòa đồng với con người 
                        {pet.type === 'Chó' 
                          ? ', thích vui chơi và luôn tràn đầy năng lượng.' 
                          : ', thích được vuốt ve và nằm phơi nắng.'
                        }
                      </p>
                      
                      <p className="text-gray-700 leading-relaxed">
                        {pet.name} đã được {pet.isVaccinated ? 'tiêm phòng đầy đủ' : 'kiểm tra sức khỏe'} 
                        và {pet.isNeutered ? 'đã được triệt sản' : 'chưa được triệt sản'}. 
                        {pet.gender === 'Đực' ? 'Bé' : 'Bé'} đã sẵn sàng tìm một gia đình yêu thương để có thể gọi là nhà.
                      </p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'compatibility' && (
                  <div className="animate-fadeIn">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Tính cách & Môi trường thích hợp</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-3">Tính cách</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <span className="bg-pink-100 text-pink-600 p-1 rounded-full">
                              <FaPaw className="text-xs" />
                            </span>
                            {pet.type === 'Chó' 
                              ? 'Thân thiện và thích vui đùa'
                              : 'Điềm tĩnh và quấn chủ'
                            }
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="bg-pink-100 text-pink-600 p-1 rounded-full">
                              <FaPaw className="text-xs" />
                            </span>
                            {pet.type === 'Chó' 
                              ? 'Dễ huấn luyện và nghe lời'
                              : 'Thông minh và tự lập'
                            }
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="bg-pink-100 text-pink-600 p-1 rounded-full">
                              <FaPaw className="text-xs" />
                            </span>
                            {pet.gender === 'Đực' 
                              ? 'Năng động và thích khám phá'
                              : 'Tinh tế và quan sát'
                            }
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-3">Phù hợp với</h3>
                        <ul className="space-y-2">
                          {pet.compatibility && pet.compatibility.map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="bg-blue-100 text-blue-600 p-1 rounded-full">
                                <FaPaw className="text-xs" />
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-pink-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">Lưu ý khi chăm sóc</h3>
                      <div className="prose prose-pink max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                          {pet.type === 'Chó' 
                            ? `${pet.name} là một chú chó ${pet.breed} cần được vận động hàng ngày và không gian để chơi đùa. 
                              Giống ${pet.breed} thường ${pet.breed === 'Corgi' || pet.breed === 'Chihuahua' ? 'rất năng động mặc dù kích thước nhỏ' : 'cần không gian rộng rãi và thời gian vui chơi'}.`
                            : `${pet.name} là một chú mèo ${pet.breed} ${pet.breed === 'Anh lông ngắn' || pet.breed === 'Munchkin' ? 'khá điềm tĩnh và thích nghi tốt với cuộc sống căn hộ' : 'thông minh và cần được kích thích tinh thần'}.
                              Giống mèo ${pet.breed} thường ${pet.breed === 'Maine Coon' || pet.breed === 'Ragdoll' ? 'có kích thước lớn và cần không gian sống phù hợp' : 'rất quấn người và thích được chơi đùa'}.`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'timeline' && (
                  <div className="animate-fadeIn">
                    <PetTimeline timeline={pet.timeline} />
                  </div>
                )}
                
                {activeTab === 'adopt' && (
                  <div className="animate-fadeIn" id="adoption-section">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Nhận nuôi {pet.name}</h2>
                    
                    {/* Thông tin thêm về nhận nuôi */}
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Thời gian còn lại */}
                      {adoptionDeadline && (
                        <div className="bg-orange-50 rounded-xl p-6 shadow-sm">
                          <div className="flex flex-col items-center text-center">
                            <div className="mb-3">
                              <FaCalendarAlt className="text-orange-500 text-2xl" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Thời gian xem xét hồ sơ</h3>
                            <p className="text-gray-600 text-sm mb-3">
                              Hồ sơ nhận nuôi {pet.name} đang mở và sẽ được xem xét trong:
                            </p>
                            <div className="mt-2">
                              <span className="text-4xl font-bold text-orange-500">{getDaysRemaining(adoptionDeadline)}</span>
                              <span className="text-gray-700 ml-2">ngày</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Số người quan tâm */}
                      <div className="bg-blue-50 rounded-xl p-6 shadow-sm">
                        <div className="flex flex-col items-center text-center">
                          <div className="mb-3">
                            <FaUserFriends className="text-blue-500 text-2xl" />
                          </div>
                          <h3 className="font-semibold text-gray-800 mb-2">Người quan tâm</h3>
                          <p className="text-gray-600 text-sm mb-3">
                            Hiện đã có người quan tâm đến {pet.name}:
                          </p>
                          <div className="mt-2">
                            <span className="text-4xl font-bold text-blue-500">{interestedCount}</span>
                            <span className="text-gray-700 ml-2">người</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="prose prose-pink max-w-none mb-8">
                      <p className="text-gray-700 leading-relaxed">
                        Cảm ơn bạn đã quan tâm đến việc nhận nuôi {pet.name}! Để bắt đầu quá trình nhận nuôi,
                        vui lòng điền vào mẫu đơn dưới đây. Chúng tôi sẽ liên hệ với bạn trong vòng 24-48 giờ
                        để thảo luận thêm về quá trình nhận nuôi và sắp xếp một cuộc gặp mặt với {pet.name}.
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-xl">
                      <AdoptionForm petId={pet.id} petName={pet.name} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fullscreen Gallery Modal */}
      {showGallery && galleryImages.length > 0 && (
        <div className="fixed inset-0 bg-black z-[9999] flex flex-col justify-center items-center">
          <div className="absolute top-4 right-4 z-10 flex gap-4">
            <button 
              className="text-white hover:text-pink-400 transition-colors"
              onClick={() => {
                /* Share functionality would go here */
                alert('Chia sẻ thú cưng này');
              }}
            >
              <FaShare className="text-2xl" />
            </button>
            <button 
              className="text-white hover:text-pink-400 transition-colors"
              onClick={closeGallery}
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>
          
          <div className="relative w-full h-[80vh] max-w-5xl px-4">
            <motion.img
              key={activeImageIndex}
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={galleryImages[activeImageIndex].url}
              alt={galleryImages[activeImageIndex].caption || `Ảnh ${activeImageIndex+1}`}
              className="w-full h-full object-contain"
            />
            
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 p-3 rounded-full backdrop-blur-sm text-white transition-colors"
              onClick={prevImage}
            >
              <FaChevronLeft className="text-2xl" />
            </button>
            
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 p-3 rounded-full backdrop-blur-sm text-white transition-colors"
              onClick={nextImage}
            >
              <FaChevronRight className="text-2xl" />
            </button>
          </div>
          
          <div className="mt-4 text-white text-center max-w-lg">
            <p className="font-medium text-lg">{galleryImages[activeImageIndex].caption || `Ảnh ${activeImageIndex+1} của ${pet.name}`}</p>
            <p className="text-sm text-gray-400">{activeImageIndex + 1} / {galleryImages.length}</p>
          </div>
        </div>
      )}
      
      {/* Mobile fixed adoption button */}
      {pet && showMobileAdoptButton && (
        <motion.div 
          className="fixed bottom-4 left-0 right-0 z-40 px-4 lg:hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <PetButton
            text={`Nhận nuôi ${pet.name}`}
            icon="heart"
            variant="gradient"
            size="lg"
            full={true}
            onClick={() => {
              setShowAdoptionForm(true);
              setActiveTab('adopt');
              // Scroll to adoption form
              const adoptionSection = document.getElementById('adoption-section');
              if (adoptionSection) {
                adoptionSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="shadow-xl"
          />
        </motion.div>
      )}
    </div>
  );
};

export default PetDetailPage; 