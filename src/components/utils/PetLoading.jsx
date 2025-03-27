import React, { useEffect, useState } from 'react';

/**
 * PetLoading component - A cute loading indicator with pet-themed animations
 * @param {Object} props
 * @param {boolean} props.show - Whether to show the loading indicator
 * @param {string} props.message - Optional custom message to display
 */
const PetLoading = ({ show = false, message = 'Đang tải...' }) => {
  const [pet, setPet] = useState('🐱');
  
  // Cycle through different pet emojis
  useEffect(() => {
    if (!show) return;
    
    const pets = ['🐱', '🐶', '🐰', '🐹', '🦊', '🐻'];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % pets.length;
      setPet(pets[currentIndex]);
    }, 800);
    
    return () => clearInterval(interval);
  }, [show]);
  
  if (!show) return null;
  
  return (
    <div className="pet-loading">
      <div className="pet-loading-indicator">
        <div className="pet-loading-animation">
          {pet}
        </div>
        <div className="pet-loading-text">
          {message}
        </div>
      </div>
    </div>
  );
};

export default PetLoading; 