import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const SectionDots = ({ activeSection, sections, onDotClick }) => {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-center space-y-4">
      {sections.map((section, index) => (
        <motion.button
          key={index}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === index ? 'bg-purple-500 scale-125' : 'bg-gray-300'}`}
          onClick={() => onDotClick(index)}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Scroll to ${section} section`}
        />
      ))}
    </div>
  );
};

SectionDots.propTypes = {
  activeSection: PropTypes.number.isRequired,
  sections: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDotClick: PropTypes.func.isRequired
};

export default SectionDots; 