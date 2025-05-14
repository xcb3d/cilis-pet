import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PetButton from '../../buttons/PetButton';

/**
 * Component hiển thị link cho menu mobile
 */
const MobileNavLink = ({ to, children, onClick }) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) => `
        px-4 py-3 rounded-xl text-base font-medium transition-all duration-300
        ${isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-800 hover:bg-pink-50'}
      `}
      onClick={onClick}
    >
      {children}
    </RouterNavLink>
  );
};

/**
 * Component menu dành cho thiết bị di động
 */
const MobileMenu = ({ isOpen, onClose }) => {
  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Thú cưng', path: '/pets' },
    { name: 'Sự kiện', path: '/events' },
    { name: 'Quyên góp', path: '/donate' },
    { name: 'Blog', path: '/blog' },
    { name: 'Về chúng tôi', path: '/about' },
  ];

  return (
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
                <MobileNavLink
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                >
                  {link.name}
                </MobileNavLink>
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
                onClick={onClose}
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
                  onClose();
                }}
                className="!rounded-xl"
              />
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 