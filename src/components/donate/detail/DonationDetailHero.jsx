import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShare, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const DonationDetailHero = ({ 
  campaign, 
  heroImages, 
  isLiked, 
  setIsLiked, 
  setShowShareOptions, 
  showShareOptions,
  getProgressPercentage,
  getDaysRemaining
}) => {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  // Auto advance hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Handle hero image navigation
  const goToHeroImage = (index) => {
    setCurrentHeroImage(index);
  };

  const nextHeroImage = () => {
    setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevHeroImage = () => {
    setCurrentHeroImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="relative h-[300px] md:h-[400px] overflow-hidden">
      {heroImages.map((image, index) => (
        <motion.div
          key={image.id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentHeroImage === index ? 1 : 0,
            zIndex: currentHeroImage === index ? 1 : 0
          }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={image.url}
            alt={image.caption}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

      {/* Hero carousel controls */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${currentHeroImage === index ? 'bg-white w-6' : 'bg-white/50'
              }`}
            onClick={() => goToHeroImage(index)}
          ></button>
        ))}
      </div>

      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-10 hover:bg-black/50 transition-colors"
        onClick={prevHeroImage}
      >
        <FaAngleLeft />
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-10 hover:bg-black/50 transition-colors"
        onClick={nextHeroImage}
      >
        <FaAngleRight />
      </button>

      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getProgressPercentage() > 75 ? 'bg-green-500' : 'bg-blue-500'}`}>
            {getProgressPercentage() > 75 ? 'Sắp hoàn thành' : 'Đang quyên góp'}
          </span>
          {getDaysRemaining() !== "∞" && getDaysRemaining() <= 7 && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
              Gấp
            </span>
          )}
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{campaign?.title}</h1>
      </div>

      {/* Action buttons */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          className="bg-white/30 backdrop-blur-sm p-2 rounded-full text-white"
          onClick={() => setIsLiked(!isLiked)}
        >
          {isLiked ?
            <FaHeart className="text-red-500 text-lg" /> :
            <FaRegHeart className="text-lg" />
          }
        </button>
        <button
          className="bg-white/30 backdrop-blur-sm p-2 rounded-full text-white"
          onClick={() => setShowShareOptions(!showShareOptions)}
        >
          <FaShare className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default DonationDetailHero; 