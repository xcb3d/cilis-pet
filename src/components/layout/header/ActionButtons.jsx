import React from 'react';
import PetButton from '../../buttons/PetButton';

/**
 * Component hiển thị các nút hành động trong header
 */
const ActionButtons = () => {
  return (
    <div className="hidden md:flex items-center gap-3">
      <PetButton
        to="/adopt"
        text="Nhận nuôi"
        icon="heart"
        variant="light"
        size="sm"
        className="!bg-white/80 backdrop-blur-sm text-pink-600 border border-pink-200 hover:bg-pink-50"
      />
      
      <PetButton
        text="Tìm kiếm"
        icon="search"
        variant="primary"
        size="sm"
        onClick={() => alert('Tính năng tìm kiếm sẽ sớm ra mắt!')}
        className="feminine-button-pink"
      />
    </div>
  );
};

export default ActionButtons; 