import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScroll } from '../../hooks/useScroll';
import { 
  Logo, 
  NavLinks, 
  ActionButtons, 
  MobileMenu, 
  MobileMenuToggle 
} from './header/index';

/**
 * Component header của toàn bộ ứng dụng
 */
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScroll(20);
  const location = useLocation();

  // Đóng menu khi đổi route
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-header transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo scrolled={scrolled} />

          {/* Desktop Navigation */}
          <NavLinks />

          {/* Action Buttons */}
          <ActionButtons />

          {/* Mobile Menu Button */}
          <MobileMenuToggle 
            isOpen={isOpen} 
            toggle={toggleMenu} 
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </header>
  );
};

export default Header; 