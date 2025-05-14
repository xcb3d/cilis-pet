import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaPaw, FaSearch, FaCalendarAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

/**
 * Icon component for Button
 */
const ButtonIcon = ({ name }) => {
  const iconMap = {
    heart: <FaHeart />,
    paw: <FaPaw />,
    search: <FaSearch />,
    calendar: <FaCalendarAlt />,
  };

  return iconMap[name] || null;
};

/**
 * Text component for Button
 */
const ButtonText = ({ children }) => {
  return <span className="button-text">{children}</span>;
};

/**
 * Main Button component using Compound Component pattern
 */
const Button = ({
  children,
  to,
  variant = 'primary',
  size = 'md',
  icon,
  text,
  full = false,
  rounded = true,
  className = '',
  noEffects = false,
  ...props
}) => {
  // Determine the correct component based on 'to' prop
  const Component = to ? Link : 'button';
  
  // Handle button variants
  const variantClasses = {
    primary: 'bg-pink-500 text-white hover:bg-pink-600',
    secondary: 'bg-purple-500 text-white hover:bg-purple-600',
    light: 'bg-white text-gray-800 hover:bg-gray-50',
    gradient: 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600',
  };
  
  // Handle button sizes
  const sizeClasses = {
    sm: 'text-xs py-2 px-4',
    md: 'text-sm py-2.5 px-5',
    lg: 'text-base py-3 px-6',
    icon: 'p-2',
  };

  // Build the final classes
  const buttonClasses = `
    inline-flex items-center justify-center gap-2 font-medium
    transition-all duration-300 shadow-sm
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.md}
    ${full ? 'w-full' : ''}
    ${rounded ? 'rounded-full' : 'rounded-lg'}
    ${noEffects ? '' : 'hover:shadow-md active:scale-95 transform'}
    ${className}
  `;

  // If children are provided, use them; otherwise, build from icon and text props
  const content = children || (
    <>
      {icon && <ButtonIcon name={icon} />}
      {text && <ButtonText>{text}</ButtonText>}
    </>
  );

  return (
    <Component to={to} className={buttonClasses} {...props}>
      {content}
    </Component>
  );
};

// Add the static components to the main component
Button.Icon = ButtonIcon;
Button.Text = ButtonText;

// PropTypes
Button.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'light', 'gradient']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'icon']),
  icon: PropTypes.string,
  text: PropTypes.string,
  full: PropTypes.bool,
  rounded: PropTypes.bool,
  className: PropTypes.string,
  noEffects: PropTypes.bool,
};

ButtonIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

ButtonText.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button; 