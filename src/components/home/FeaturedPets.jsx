import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PetCard from '../pets/PetCard';
import { Link } from 'react-router-dom';
import { FaPaw, FaStar, FaChevronRight, FaDog, FaCat, FaHeart } from 'react-icons/fa';
import './FeaturedPets.css';

// Import dữ liệu từ file petsData.js
import petsData from '../../data/petsData';

const FeaturedPets = () => {
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Dữ liệu thực cho thú cưng nổi bật (lấy 3 pet đầu tiên từ dữ liệu)
  const featuredPets = [
    {
      id: petsData[0].id,
      name: petsData[0].name,
      type: petsData[0].type,
      breed: petsData[0].breed,
      age: petsData[0].age,
      gender: petsData[0].gender,
      location: petsData[0].location,
      description: petsData[0].description,
      imageUrl: petsData[0].imageUrl,
      status: petsData[0].status,
      isVaccinated: petsData[0].isVaccinated,
      isNeutered: petsData[0].isNeutered,
      compatibility: petsData[0].compatibility,
    },
    {
      id: petsData[1].id,
      name: petsData[1].name,
      type: petsData[1].type,
      breed: petsData[1].breed,
      age: petsData[1].age,
      gender: petsData[1].gender,
      location: petsData[1].location,
      description: petsData[1].description,
      imageUrl: petsData[1].imageUrl,
      status: petsData[1].status,
      isVaccinated: petsData[1].isVaccinated,
      isNeutered: petsData[1].isNeutered,
      compatibility: petsData[1].compatibility,
    },
    {
      id: petsData[2].id,
      name: petsData[2].name,
      type: petsData[2].type,
      breed: petsData[2].breed,
      age: petsData[2].age,
      gender: petsData[2].gender,
      location: petsData[2].location,
      description: petsData[2].description,
      imageUrl: petsData[2].imageUrl,
      status: petsData[2].status,
      isVaccinated: petsData[2].isVaccinated,
      isNeutered: petsData[2].isNeutered,
      compatibility: petsData[2].compatibility,
    },
  ];
  
  // Lọc thú cưng theo loại
  const filteredPets = activeFilter === 'Tất cả' 
    ? featuredPets 
    : featuredPets.filter(pet => pet.type === activeFilter);
  
  useEffect(() => {
    // Mô phỏng việc lấy dữ liệu từ API
    const fetchPets = async () => {
      try {
        // Đây chỉ là dữ liệu mẫu, trong thực tế sẽ được lấy từ API
        const mockPets = [
          {
            id: 1,
            name: 'Mèo Corgi',
            type: 'Mèo',
            breed: 'Corgi',
            age: '2 tuổi',
            gender: 'Đực',
            imageUrl: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            description: 'Mèo Corgi dễ thương, thân thiện và rất yêu trẻ em.'
          },
          {
            id: 2,
            name: 'Mèo Shiba',
            type: 'Mèo',
            breed: 'Shiba Inu',
            age: '1 tuổi',
            gender: 'Cái',
            imageUrl: 'https://images.unsplash.com/photo-1574144283411-bbbc7783d089?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
            description: 'Mèo Shiba thông minh, lanh lợi và rất trung thành.'
          },
          {
            id: 3,
            name: 'Mèo Golden',
            type: 'Mèo',
            breed: 'Golden Retriever',
            age: '3 tuổi',
            gender: 'Đực',
            imageUrl: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            description: 'Mèo Golden thân thiện, vui vẻ và rất thích vui chơi.'
          },
          {
            id: 4,
            name: 'Mèo Husky',
            type: 'Mèo',
            breed: 'Husky',
            age: '2 tuổi',
            gender: 'Cái',
            imageUrl: 'https://images.unsplash.com/photo-1605725657590-b2cf0d31b1a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            description: 'Mèo Husky năng động, thích phiêu lưu và rất thông minh.'
          }
        ];

        setPets(mockPets);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching pets:', error);
        setIsLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (isLoading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <section className="py-16 bg-[#FEF2F7] relative overflow-hidden">
      {/* Phần tử trang trí */}
      <div className="absolute -top-24 right-0 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-32 -left-20 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <div className="inline-flex items-center mb-4">
              <motion.div 
                className="bg-gradient-to-r from-pink-200 to-purple-200 p-2 rounded-lg mr-3"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaStar className="text-pink-600 text-xl" />
              </motion.div>
              <span className="text-sm font-medium text-pink-600 bg-white px-4 py-1.5 rounded-full shadow-sm">
                Thú cưng nổi bật
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Đáng yêu đang đợi bạn!</h2>
            <p className="text-gray-600 max-w-2xl">
              Những thú cưng đặc biệt này đang mong đợi được tìm một mái ấm vĩnh viễn. 
              Mỗi bé đều có câu chuyện và tính cách riêng, hãy tìm hiểu để tìm người bạn phù hợp với bạn!
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center mt-6 md:mt-0"
          >
            <div className="bg-white shadow-md rounded-full p-1 flex space-x-1">
              <FilterButton 
                label="Tất cả" 
                icon={<FaPaw />}
                active={activeFilter === 'Tất cả'} 
                onClick={() => setActiveFilter('Tất cả')} 
              />
              <FilterButton 
                label="Chó" 
                icon={<FaDog />}
                active={activeFilter === 'Chó'} 
                onClick={() => setActiveFilter('Chó')} 
              />
              <FilterButton 
                label="Mèo" 
                icon={<FaCat />}
                active={activeFilter === 'Mèo'} 
                onClick={() => setActiveFilter('Mèo')} 
              />
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet, index) => (
              <motion.div
                key={pet.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="pet-card feminine-card rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl" data-pet-type={pet.type}>
                  <div className="relative pet-image-hover overflow-hidden h-48">
                    <img 
                      src={pet.imageUrl} 
                      alt={pet.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      data-effect="cinemagraph"
                    />
                    <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md feminine-like-button transition-transform duration-300 hover:scale-110">
                      <FaHeart className="text-pink-400 hover:text-pink-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 heading-cute">{pet.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{pet.breed} • {pet.age}</p>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{pet.description}</p>
                    <Link 
                      to={`/pet/${pet.id}`} 
                      className="feminine-button-gradient rounded-full px-4 py-2 text-sm font-medium inline-block"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-gray-500 flex flex-col items-center">
                <FaPaw className="text-4xl mb-4 text-pink-300" />
                <p className="text-xl font-medium mb-2">Không tìm thấy thú cưng nào</p>
                <p>Không có bé cưng nào phù hợp với bộ lọc của bạn.</p>
              </div>
            </motion.div>
          )}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link 
            to="/pets" 
            className="inline-flex items-center gap-2 bg-white text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-full shadow-md transition duration-300"
          >
            <span>Xem tất cả thú cưng</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaChevronRight className="text-sm" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
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