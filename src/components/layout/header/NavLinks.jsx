import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

/**
 * Component hiển thị link điều hướng desktop
 */
export const NavLink = ({ to, children }) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) => `
        relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${isActive 
          ? 'text-pink-600 bg-pink-50'
          : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
        }
      `}
    >
      {children}
    </RouterNavLink>
  );
};

/**
 * Component quản lý các liên kết điều hướng desktop
 */
const NavLinks = () => {
  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Thú cưng', path: '/pets' },
    { name: 'Sự kiện', path: '/events' },
    { name: 'Quyên góp', path: '/donate' },
    { name: 'Blog', path: '/blog' },
    { name: 'Về chúng tôi', path: '/about' },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-2">
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavLinks; 