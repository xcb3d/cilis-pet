import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import PetButton from '../../buttons/PetButton';

/**
 * Nút đóng/mở menu trên mobile
 */
const MobileMenuToggle = ({ isOpen, toggle }) => {
  return (
    <div className="flex md:hidden">
      <PetButton
        onClick={toggle}
        variant={isOpen ? "light" : "light"}
        size="icon"
        className={`${isOpen ? 'bg-pink-100' : 'bg-white/80 backdrop-blur-sm'}`}
        noEffects={true}
      >
        {isOpen ? (
          <FaTimes className="text-pink-600 text-xl" />
        ) : (
          <FaBars className="text-pink-500 text-xl" />
        )}
      </PetButton>
    </div>
  );
};

export default MobileMenuToggle; 