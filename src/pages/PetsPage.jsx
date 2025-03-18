import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PetCard from '../components/pets/PetCard';
import petsData from '../data/petsData';
import { FaDog, FaCat, FaSearch, FaFilter, FaMapMarkerAlt } from 'react-icons/fa';

const PetsPage = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    searchTerm: ''
  });
  
  // Lấy danh sách thú cưng từ mock data khi component mount
  useEffect(() => {
    setPets(petsData);
    setFilteredPets(petsData);
  }, []);
  
  // Lọc danh sách thú cưng khi filters thay đổi
  useEffect(() => {
    const results = pets.filter(pet => {
      const matchesType = !filters.type || pet.type === filters.type;
      const matchesLocation = !filters.location || pet.location === filters.location;
      const matchesSearchTerm = !filters.searchTerm || 
        pet.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      return matchesType && matchesLocation && matchesSearchTerm;
    });
    
    setFilteredPets(results);
  }, [filters, pets]);
  
  // Xử lý thay đổi bộ lọc
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Xử lý submit form tìm kiếm
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Đã xử lý trong useEffect
  };
  
  // Reset bộ lọc
  const resetFilters = () => {
    setFilters({
      type: '',
      location: '',
      searchTerm: ''
    });
  };
  
  // Lấy danh sách các địa điểm duy nhất
  const locations = [...new Set(pets.map(pet => pet.location))];
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Thú cưng đang tìm nhà</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Tìm người bạn đồng hành hoàn hảo của bạn trong số những thú cưng đáng yêu đang tìm kiếm mái ấm vĩnh viễn.
          </p>
        </motion.div>
        
        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <form 
              onSubmit={handleSearchSubmit} 
              className="relative flex-grow"
            >
              <input
                type="text"
                name="searchTerm"
                value={filters.searchTerm}
                onChange={handleFilterChange}
                placeholder="Tìm kiếm theo tên, giống..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition duration-300"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>
            
            <button 
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition duration-300 md:w-auto"
            >
              <FaFilter /> {filterOpen ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
            </button>
          </div>
          
          {/* Filter Options */}
          {filterOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Loại thú cưng
                </label>
                <div className="flex gap-4">
                  <button
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition duration-300 ${
                      filters.type === 'Chó' 
                        ? 'bg-blue-100 border-blue-300 text-blue-700' 
                        : 'border-gray-300 hover:bg-gray-100'
                    }`}
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      type: prev.type === 'Chó' ? '' : 'Chó'
                    }))}
                  >
                    <FaDog /> Chó
                  </button>
                  
                  <button
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition duration-300 ${
                      filters.type === 'Mèo' 
                        ? 'bg-purple-100 border-purple-300 text-purple-700' 
                        : 'border-gray-300 hover:bg-gray-100'
                    }`}
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      type: prev.type === 'Mèo' ? '' : 'Mèo'
                    }))}
                  >
                    <FaCat /> Mèo
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Địa điểm
                </label>
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition duration-300"
                >
                  <option value="">Tất cả địa điểm</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Results */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="text-gray-600">
              <span className="font-medium">{filteredPets.length}</span> thú cưng được tìm thấy
              {(filters.type || filters.location) && (
                <span className="ml-2">
                  {filters.location && (
                    <span className="inline-flex items-center bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm mr-2">
                      <FaMapMarkerAlt className="mr-1" /> {filters.location}
                    </span>
                  )}
                  {filters.type && (
                    <span className="inline-flex items-center bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                      {filters.type === 'Chó' ? <FaDog className="mr-1" /> : <FaCat className="mr-1" />} {filters.type}
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>
          
          {filteredPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPets.map((pet, index) => (
                <motion.div 
                  key={pet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="h-full"
                >
                  <PetCard pet={pet} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearch className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy thú cưng nào</h3>
              <p className="text-gray-600 mb-6">
                Không có thú cưng nào phù hợp với bộ lọc của bạn. Hãy thử các bộ lọc khác.
              </p>
              <button 
                onClick={resetFilters}
                className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetsPage; 