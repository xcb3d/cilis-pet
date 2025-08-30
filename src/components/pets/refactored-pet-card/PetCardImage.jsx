import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import LikeButton from './LikeButton';
import PetCardBadges from './PetCardBadges';

const PetCardImage = ({ pet, isHovered }) => {
  const [imageError, setImageError] = useState(false);

  const getImageSrc = () => {
    if (pet.imageUrl && !pet.imageUrl.includes('undefined')) {
      return pet.imageUrl;
    }
    
    const petType = pet.type === 'Chó' ? 'dog' : 'cat';
    const breed = pet.breed ? pet.breed.toLowerCase().replace(/\s+/g, '-') : '';
    return `https://source.unsplash.com/400x300/?${petType},${breed}&sig=${pet.id}`;
  };

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
    }
  };

  const getFallbackImage = () => {
    return pet.type === 'Chó' 
      ? 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop'
      : 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop';
  };

  return (
    <div className="relative h-64 overflow-hidden">
      <motion.img
        src={imageError ? getFallbackImage() : getImageSrc()}
        alt={`${pet.name} - ${pet.type}`}
        className="w-full h-full object-cover transition-transform duration-500"
        style={{ 
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
        onError={handleImageError}
        loading="lazy"
      />
      
      <LikeButton petId={pet.id} />
      <PetCardBadges pet={pet} />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      
      {/* Emoji Container for animations */}
      <div 
        id={`emoji-container-${pet.id}`} 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
};

PetCardImage.propTypes = {
  pet: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    type: PropTypes.string.isRequired,
    breed: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  isHovered: PropTypes.bool.isRequired,
};

export default PetCardImage;
