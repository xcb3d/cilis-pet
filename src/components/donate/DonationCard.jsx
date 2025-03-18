import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRegHeart, FaHeart, FaCalendarAlt, FaUsers, FaChevronRight, FaHandHoldingHeart } from 'react-icons/fa';
import imagePaths from '../../utils/imageImports';

const DonationCard = ({ campaign }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Lấy ảnh từ mock data
  const getImageSrc = () => {
    switch(campaign.id) {
      case 1: return imagePaths.foodDonation || 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';
      case 2: return imagePaths.medicalFund || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';
      case 3: return imagePaths.playground || 'https://images.unsplash.com/photo-1511732351157-1865efcb7b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';
      case 4: return imagePaths.vaccination || 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80';
      default: return 'https://images.unsplash.com/photo-1583511655826-05700442b31b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1998&q=80';
    }
  };

  // Tính phần trăm hoàn thành
  const progressPercentage = Math.min(Math.round((campaign.current / campaign.target) * 100), 100);

  // Format số tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  };

  // Get color based on progress percentage
  const getProgressColor = () => {
    if (progressPercentage >= 75) return 'bg-green-500';
    if (progressPercentage >= 50) return 'bg-blue-500';
    if (progressPercentage >= 25) return 'bg-yellow-500';
    return 'bg-pink-500';
  };

  // Get days remaining
  const getDaysRemaining = () => {
    if (campaign.endDate === 'Không thời hạn') return '∞';
    
    const endDateParts = campaign.endDate.split('/');
    const endDate = new Date(
      parseInt(endDateParts[2]), 
      parseInt(endDateParts[1]) - 1, 
      parseInt(endDateParts[0])
    );
    const today = new Date();
    const timeDiff = endDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return daysRemaining > 0 ? daysRemaining : 0;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <motion.div
      className="rounded-xl overflow-hidden shadow-md h-full bg-white transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={getImageSrc()}
          alt={campaign.title}
          className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out"
          style={{ 
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${progressPercentage > 75 ? 'bg-green-500' : 'bg-blue-500'}`}>
            {progressPercentage > 75 ? 'Sắp hoàn thành' : 'Đang quyên góp'}
          </span>
          {daysRemaining !== "∞" && daysRemaining <= 7 && (
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
              Gấp
            </span>
          )}
        </div>
        
        {/* Like button */}
        <button 
          className="absolute top-3 right-3 bg-white/30 backdrop-blur-sm p-2 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
        >
          {isLiked ? 
            <FaHeart className="text-red-500 text-lg transition-all duration-300" /> : 
            <FaRegHeart className="text-gray-100 text-lg transition-all duration-300" />
          }
        </button>
      </div>

      <Link to={`/donation/${campaign.id}`} className="block">
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 text-ellipsis overflow-hidden whitespace-nowrap">{campaign.title}</h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.description}</p>
          
          {/* Progress section */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{formatCurrency(campaign.current)}</span>
              <span className="text-gray-500">mục tiêu: {formatCurrency(campaign.target)}</span>
            </div>
            
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${getProgressColor()}`} 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
            
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500 font-medium">{progressPercentage}% hoàn thành</span>
            </div>
          </div>
          
          {/* Meta information */}
          <div className="flex justify-between text-gray-500 text-sm mb-4">
            <div className="flex items-center">
              <FaUsers className="mr-1 text-blue-500" />
              <span>{campaign.supporters} người ủng hộ</span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-1 text-orange-500" />
              {daysRemaining === "∞" ? (
                <span>Không thời hạn</span>
              ) : (
                <span>Còn {daysRemaining} ngày</span>
              )}
            </div>
          </div>
          
          {/* Donate button */}
          <motion.button
            className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg 
                      font-medium flex items-center justify-center group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/donation/${campaign.id}`;
            }}
          >
            <FaHandHoldingHeart className="mr-2" />
            Quyên góp ngay
            <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
};

export default DonationCard; 