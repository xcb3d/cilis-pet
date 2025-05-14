import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPaw, FaArrowRight } from 'react-icons/fa';
import './FeaturedPets.css';
import useFetch from '../../hooks/useFetch';
import { useApp } from '../../context/AppContext';
import Button from '../common/Button';

// Component hiển thị skeleton loading
const PetCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <div className="h-48 bg-gray-200 animate-pulse"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-1/2"></div>
      <div className="flex justify-between items-center">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
        <div className="h-8 bg-gray-200 rounded-full animate-pulse w-8"></div>
      </div>
    </div>
  </div>
);

// Component hiển thị thẻ thú cưng
const FeaturedPetCard = ({ pet }) => {
  const { actions } = useApp();
  
  const handleFavorite = () => {
    actions.addFavorite(pet);
    actions.addNotification({
      type: 'success',
      title: 'Đã thêm vào yêu thích',
      message: `Đã thêm ${pet.name} vào danh sách yêu thích của bạn.`,
    });
  };
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-48">
        <img 
          src={pet.image} 
          alt={pet.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md cursor-pointer hover:bg-pink-50 transition-colors duration-300"
          onClick={handleFavorite}
        >
          <FaPaw className="text-pink-500 text-lg" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{pet.name}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{pet.breed}</span>
          <span className="mx-2">•</span>
          <span>{pet.age}</span>
          <span className="mx-2">•</span>
          <span>{pet.gender}</span>
        </div>
        <div className="flex justify-between items-center">
          <Link 
            to={`/pet/${pet.id}`} 
            className="text-pink-500 hover:text-pink-600 transition-colors duration-300 font-medium flex items-center gap-1"
          >
            Xem chi tiết
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Component hiển thị danh sách thú cưng nổi bật trên trang chủ
 */
const FeaturedPets = () => {
  // Sử dụng useFetch để lấy dữ liệu thú cưng nổi bật
  const { data: pets, loading, error } = useFetch('pets', { featured: true });
  
  if (error) {
    return (
      <div className="text-center text-red-500 my-8">
        <p>Đã xảy ra lỗi khi tải dữ liệu: {error}</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.div 
          className="inline-flex items-center justify-center mb-4 bg-pink-100 rounded-full p-2"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaPaw className="text-pink-500 text-2xl" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Thú cưng nổi bật</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hãy gặp gỡ những người bạn đáng yêu đang tìm kiếm một mái ấm mới. Mỗi bé đều có câu chuyện riêng và đang chờ đợi tình yêu từ bạn.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          // Hiển thị skeleton loading khi đang tải dữ liệu
          Array(4).fill(0).map((_, index) => (
            <PetCardSkeleton key={index} />
          ))
        ) : (
          // Hiển thị danh sách thú cưng
          pets && pets.map(pet => (
            <FeaturedPetCard key={pet.id} pet={pet} />
          ))
        )}
      </div>
      
      <div className="text-center mt-10">
        <Button 
          to="/pets" 
          variant="primary"
          className="feminine-button-pink"
        >
          <Button.Text>Xem tất cả thú cưng</Button.Text>
          <Button.Icon name="paw" />
        </Button>
      </div>
    </div>
  );
};

const FilterButton = ({ label, icon, active, onClick }) => (
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
    {label}
  </motion.button>
);

export default FeaturedPets; 