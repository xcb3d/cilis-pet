import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Component hiển thị thông tin và hình ảnh của một thú cưng trong carousel
 */
const CarouselItem = ({ pet, isActive }) => {
  return (
    <motion.div
      className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
      initial={false}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <img
          src={pet.src}
          alt={pet.alt}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        
        {/* Pet info overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <h3 className="text-xl font-semibold">{pet.petInfo.name}</h3>
          <div className="flex gap-3 text-sm mt-1">
            <span>{pet.petInfo.age}</span>
            <span>•</span>
            <span>{pet.petInfo.gender}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

CarouselItem.propTypes = {
  pet: PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    petInfo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  isActive: PropTypes.bool.isRequired
};

export default CarouselItem; 