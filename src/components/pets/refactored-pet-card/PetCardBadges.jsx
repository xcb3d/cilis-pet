import React from 'react';
import { FaDog, FaCat } from 'react-icons/fa';
import PropTypes from 'prop-types';

const PetCardBadges = ({ pet }) => {
  const getTypeIcon = () => {
    return pet.type === 'Chó' ? 
      <FaDog className="text-gray-700" /> : 
      <FaCat className="text-gray-700" />;
  };

  const getTypeBadgeColor = () => {
    return pet.type === 'Chó' ? 
      'bg-blue-100 text-blue-600' : 
      'bg-purple-100 text-purple-600';
  };

  return (
    <>
      {/* Status Badge */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600 shadow-sm">
          {pet.status || "Đang được chăm sóc"}
        </div>
      </div>
      
      {/* Type Badge */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getTypeBadgeColor()}`}>
          {getTypeIcon()}
          <span>{pet.type}</span>
        </div>
      </div>
    </>
  );
};

PetCardBadges.propTypes = {
  pet: PropTypes.shape({
    type: PropTypes.string.isRequired,
    status: PropTypes.string,
  }).isRequired,
};

export default PetCardBadges;
