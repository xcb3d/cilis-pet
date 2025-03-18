import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHeart, FaRegHeart, FaMars, FaVenus, FaDog, FaCat, 
  FaMapMarkerAlt, FaBirthdayCake, FaArrowLeft, FaPaw, 
  FaSyringe, FaClipboardCheck, FaHandHoldingHeart, FaHistory
} from 'react-icons/fa';
import pets from '../data/petsData';
import AdoptionForm from '../components/forms/AdoptionForm';
import PetTimeline from '../components/pets/PetTimeline';

const PetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  
  useEffect(() => {
    // Giả lập fetch dữ liệu
    const timer = setTimeout(() => {
      const foundPet = pets.find(p => p.id.toString() === id.toString());
      setPet(foundPet || null);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
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
            <Link 
              to="/pets" 
              className="bg-pink-100 text-pink-600 hover:bg-pink-200 px-6 py-3 rounded-full transition-colors flex items-center gap-2"
            >
              <FaArrowLeft /> Quay lại danh sách thú cưng
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
          className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors"
        >
          <FaArrowLeft />
          <span>Quay lại</span>
        </button>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pet Image Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              {/* Main Image */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative aspect-square">
                  <img 
                    src={pet.imageUrl || `https://source.unsplash.com/featured/?${pet.type.toLowerCase()},${pet.breed.toLowerCase()}`} 
                    alt={pet.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  {/* Like Button */}
                  <motion.button 
                    className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-white/40 transition-all duration-300"
                    onClick={() => setIsLiked(!isLiked)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isLiked ? (
                      <FaHeart className="text-2xl text-red-500" />
                    ) : (
                      <FaRegHeart className="text-2xl text-white" />
                    )}
                  </motion.button>
                  
                  {/* Status Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-600 shadow-sm">
                      {pet.status || "Đang được chăm sóc"}
                    </div>
                  </div>
                </div>
                
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
                  <motion.button
                    className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-pink-600 text-white 
                              rounded-xl font-medium shadow-lg hover:shadow-pink-200/50 transition-shadow"
                    onClick={() => setShowAdoptionForm(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <FaHandHoldingHeart />
                      <span>Nhận nuôi {pet.name}</span>
                    </div>
                  </motion.button>
                </div>
              </div>
              
              {/* Additional Info Cards */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className={`p-4 rounded-xl ${pet.isVaccinated ? 'bg-green-50' : 'bg-gray-50'} flex flex-col items-center text-center`}>
                  <FaSyringe className={`text-xl mb-1 ${pet.isVaccinated ? 'text-green-500' : 'text-gray-400'}`} />
                  <div className="font-medium text-sm">
                    {pet.isVaccinated ? 'Đã tiêm phòng' : 'Chưa tiêm phòng'}
                  </div>
                </div>
                
                <div className={`p-4 rounded-xl ${pet.isNeutered ? 'bg-green-50' : 'bg-gray-50'} flex flex-col items-center text-center`}>
                  <FaClipboardCheck className={`text-xl mb-1 ${pet.isNeutered ? 'text-green-500' : 'text-gray-400'}`} />
                  <div className="font-medium text-sm">
                    {pet.isNeutered ? 'Đã triệt sản' : 'Chưa triệt sản'}
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
                <div className="flex flex-wrap">
                  <button
                    className={`py-4 px-6 text-center font-medium text-sm ${
                      activeTab === 'about' 
                        ? 'text-pink-600 border-b-2 border-pink-500' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('about')}
                  >
                    Giới thiệu
                  </button>
                  <button
                    className={`py-4 px-6 text-center font-medium text-sm ${
                      activeTab === 'compatibility' 
                        ? 'text-pink-600 border-b-2 border-pink-500' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('compatibility')}
                  >
                    Tính cách & Thích hợp
                  </button>
                  <button
                    className={`py-4 px-6 text-center font-medium text-sm ${
                      activeTab === 'timeline' 
                        ? 'text-pink-600 border-b-2 border-pink-500' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('timeline')}
                  >
                    <div className="flex items-center gap-1.5">
                      <FaHistory className="text-xs" />
                      <span>Câu chuyện</span>
                    </div>
                  </button>
                  <button
                    className={`py-4 px-6 text-center font-medium text-sm ${
                      activeTab === 'adopt' 
                        ? 'text-pink-600 border-b-2 border-pink-500' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('adopt')}
                  >
                    Nhận nuôi
                  </button>
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
                  <div className="animate-fadeIn">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Nhận nuôi {pet.name}</h2>
                    
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
    </div>
  );
};

export default PetDetailPage; 