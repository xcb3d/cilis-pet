import React from 'react';
import { FaMars, FaVenus, FaDog, FaCat, FaMapMarkerAlt, FaBirthdayCake } from 'react-icons/fa';
import PropTypes from 'prop-types';

const PetCardInfo = ({ pet }) => {
  const getGenderIcon = () => {
    return pet.gender === 'Đực' ? 
      <FaMars className="text-blue-500" /> : 
      <FaVenus className="text-pink-500" />;
  };

  const getGenderClass = (gender) => {
    return gender === 'Đực' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600';
  };

  const getAgeText = (age) => {
    if (typeof age === 'string' && age.includes('tuổi')) return age;
    if (typeof age === 'string' && !isNaN(age)) return `${age} tuổi`;
    if (typeof age === 'number') return `${age} tuổi`;
    return 'Chưa xác định';
  };

  return (
    <div className="p-5 feminine-card-content relative z-1">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
        <div className={`px-2 py-1 rounded-full text-xs ${getGenderClass(pet.gender)} flex items-center gap-1`}>
          {getGenderIcon()}
          <span>{pet.gender}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-medium text-gray-600">
          {pet.breed}
        </span>
        <span className="text-gray-400">•</span>
        <div className="flex items-center gap-1 text-gray-600 text-sm">
          <FaBirthdayCake className="text-pink-500" />
          <span>{getAgeText(pet.age)}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-1 text-gray-600 text-sm mb-4">
        <FaMapMarkerAlt className="text-red-400" />
        <span>{pet.location}</span>
      </div>
      
      <div className="line-clamp-2 text-gray-600 mb-4 text-sm">
        {pet.description}
      </div>
      
      <div className="flex flex-wrap gap-1 mt-auto">
        {pet.compatibility && pet.compatibility.slice(0, 2).map((tag, index) => (
          <span 
            key={index} 
            className="px-2 py-1 bg-lavender-50 text-lavender-600 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
        {pet.compatibility && pet.compatibility.length > 2 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
            +{pet.compatibility.length - 2}
          </span>
        )}
      </div>
    </div>
  );
};

PetCardInfo.propTypes = {
  pet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    breed: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gender: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    compatibility: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default PetCardInfo;
