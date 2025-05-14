import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useCarousel } from '../../../hooks/useCarousel';
import CarouselItem from './CarouselItem';
import PropTypes from 'prop-types';

// Mảng chứa các hình ảnh và thông tin thú cưng mặc định
const DEFAULT_PETS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1686&q=80",
    alt: "Mèo xinh đẹp",
    petInfo: {
      name: "Mèo Munchkin",
      age: "1 tuổi",
      gender: "Cái"
    }
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
    alt: "Chó Husky đáng yêu",
    petInfo: {
      name: "Husky Siberian",
      age: "2 tuổi",
      gender: "Đực"
    }
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1736&q=80",
    alt: "Mèo Bengal",
    petInfo: {
      name: "Mèo Bengal",
      age: "1.5 tuổi",
      gender: "Đực"
    }
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    alt: "Chó Golden Retriever",
    petInfo: {
      name: "Golden Retriever",
      age: "3 tuổi",
      gender: "Đực"
    }
  }
];

/**
 * Component hiển thị carousel hình ảnh thú cưng
 */
const PetCarousel = ({ pets = DEFAULT_PETS, interval = 8000, autoPlay = true }) => {
  const { currentIndex, next, prev, setIndex } = useCarousel(pets, interval, autoPlay);

  return (
    <div className="relative w-full h-full">
      {/* Carousel items */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        {pets.map((pet, index) => (
          <CarouselItem 
            key={pet.id} 
            pet={pet} 
            isActive={index === currentIndex} 
          />
        ))}
      </div>
      
      {/* Navigation buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm p-2 h-10 w-10 rounded-full shadow-md text-pink-500 hover:bg-white z-20"
        onClick={prev}
        aria-label="Previous pet"
      >
        <FaChevronLeft className="mx-auto" />
      </button>
      
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm p-2 h-10 w-10 rounded-full shadow-md text-pink-500 hover:bg-white z-20"
        onClick={next}
        aria-label="Next pet"
      >
        <FaChevronRight className="mx-auto" />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {pets.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-4' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => setIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

PetCarousel.propTypes = {
  pets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      petInfo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        age: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired
      }).isRequired
    })
  ),
  interval: PropTypes.number,
  autoPlay: PropTypes.bool
};

export default PetCarousel; 