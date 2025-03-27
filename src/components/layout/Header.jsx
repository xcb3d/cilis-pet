import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaw, FaBars, FaTimes, FaHome, FaDog, FaCalendarAlt, FaHeart, FaInfoCircle, FaSearch, FaBookOpen } from 'react-icons/fa';
import PetButton from '../buttons/PetButton';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    // Close mobile menu when changing routes
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Thú cưng', path: '/pets' },
    { name: 'Sự kiện', path: '/events' },
    { name: 'Quyên góp', path: '/donate' },
    { name: 'Blog', path: '/blog' },
    { name: 'Về chúng tôi', path: '/about' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-header transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 relative z-10"
          >
            <motion.div 
              className={`rounded-full p-2 ${
                scrolled ? 'bg-pink-100' : 'bg-white/80 backdrop-blur-sm'
              }`}
              whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
            >
              <FaPaw className={`text-2xl ${scrolled ? 'text-pink-500' : 'text-pink-400'}`} />
            </motion.div>
            <div className="flex flex-col">
              <h1 className="feminine-title text-xl md:text-2xl font-bold text-gray-800">
                <span className="text-pink-500">Cilis</span>
                <span>Pet</span>
              </h1>
              <div className="text-xs text-gray-500 -mt-1 font-medium">Companion for Life</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                  }
                `}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Buttons */}
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

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <PetButton
              onClick={() => setIsOpen(!isOpen)}
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
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => `
                      px-4 py-3 rounded-xl text-base font-medium transition-all duration-300
                      ${isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-800 hover:bg-pink-50'}
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}
                
                <div className="pt-2 pb-1">
                  <div className="border-t border-pink-200/50 w-full my-2"></div>
                </div>
                
                <PetButton
                  to="/adopt"
                  text="Nhận nuôi"
                  icon="heart"
                  variant="light"
                  size="lg"
                  full={true}
                  rounded={false}
                  onClick={() => setIsOpen(false)}
                  className="!rounded-xl border border-pink-200 text-pink-600"
                />
                
                <PetButton
                  text="Tìm kiếm"
                  icon="search"
                  variant="gradient"
                  size="lg"
                  full={true}
                  rounded={false}
                  onClick={() => {
                    alert('Tính năng tìm kiếm sẽ sớm ra mắt!');
                    setIsOpen(false);
                  }}
                  className="!rounded-xl"
                />
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Desktop Nav Link
const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <RouterNavLink 
      to={to} 
      className={`relative px-4 py-2 font-medium text-base transition-colors overflow-hidden group`}
    >
      <span className={`relative z-10 ${isActive ? 'text-pink-600' : 'text-gray-700 group-hover:text-pink-500'}`}>
        {children}
      </span>
      
      {/* Indicator for active link */}
      <motion.span 
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-500 transform origin-left transition-transform duration-300 ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
        layoutId="navIndicator"
        style={{ borderRadius: '2px' }}
      />
      
      {/* Hover effect */}
      <span className="absolute inset-0 w-full h-full bg-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-lg" />
    </RouterNavLink>
  );
};

// Mobile Nav Link
const MobileNavLink = ({ to, children, icon, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <RouterNavLink 
      to={to} 
      className={`flex items-center gap-3 p-3 rounded-lg ${
        isActive 
          ? 'bg-pink-50 text-pink-600' 
          : 'text-gray-700 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <span className={isActive ? 'text-pink-500' : 'text-gray-500'}>
        {icon}
      </span>
      <span>{children}</span>
    </RouterNavLink>
  );
};

export default Header; 