import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PetCardImage from './PetCardImage';
import PetCardInfo from './PetCardInfo';
import PetCardBadges from './PetCardBadges';

const PetCard = ({ pet }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/pet/${pet.id}`} aria-label={`View details for ${pet.name}`}>
      <motion.div
        className="bg-white rounded-2xl overflow-hidden shadow-lg h-full feminine-card relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        layout
      >
        <PetCardImage pet={pet} isHovered={isHovered} />
        <PetCardInfo pet={pet} />
      </motion.div>
    </Link>
  );
};

PetCard.propTypes = {
  pet: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    type: PropTypes.string.isRequired,
    breed: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gender: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    compatibility: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default PetCard;

