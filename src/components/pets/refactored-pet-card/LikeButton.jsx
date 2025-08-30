import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';

const LikeButton = ({ petId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  const emojis = ['❤️', '🐾', '💕', '😍', '🥰'];

  const createFloatingEmojis = useCallback((count = 5) => {
    const container = document.getElementById(`emoji-container-${petId}`);
    if (!container) return;

    // Clean up old emojis
    const oldEmojis = container.querySelectorAll('.floating-emoji');
    oldEmojis.forEach(emoji => emoji.remove());

    for (let i = 0; i < count; i++) {
      const emoji = document.createElement('div');
      emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.classList.add('floating-emoji');
      
      emoji.style.left = `${Math.random() * 80 + 10}%`;
      emoji.style.bottom = `${Math.random() * 20 + 10}%`;
      emoji.style.fontSize = `${Math.random() * 10 + 20}px`;
      emoji.style.animationDuration = `${Math.random() * 1 + 1.5}s`;
      emoji.style.animationDelay = `${Math.random() * 0.2}s`;
      
      container.appendChild(emoji);
      
      emoji.addEventListener('animationend', () => emoji.remove());
      setTimeout(() => emoji.remove(), 3000); // Fallback cleanup
    }
  }, [petId, emojis]);

  const handleLike = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLiked(prev => !prev);
    setShowEmojis(true);
    createFloatingEmojis(isLiked ? 3 : 8);
    
    setTimeout(() => setShowEmojis(false), 1000);
  }, [isLiked, createFloatingEmojis]);

  return (
    <motion.button
      className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-white/40 transition-all duration-300"
      onClick={handleLike}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ 
        scale: isLiked ? [1, 1.2, 1] : 1,
        transition: { duration: 0.3 }
      }}
      aria-label={isLiked ? `Remove ${petId} from favorites` : `Add ${petId} to favorites`}
      aria-pressed={isLiked}
    >
      {isLiked ? (
        <FaHeart className="text-2xl text-red-500" />
      ) : (
        <FaRegHeart className="text-2xl text-white" />
      )}
    </motion.button>
  );
};

LikeButton.propTypes = {
  petId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default LikeButton;
