import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Accessible Card Component with proper ARIA attributes
 */
const AccessibleCard = ({
  children,
  title,
  description,
  onClick,
  href,
  className = '',
  animate = true,
  role = 'article',
  ...props
}) => {
  const Component = onClick ? 'button' : href ? 'a' : 'div';
  const isInteractive = onClick || href;
  
  const cardProps = {
    className: `card ${className} ${isInteractive ? 'card--interactive' : ''}`,
    role: isInteractive ? 'button' : role,
    tabIndex: isInteractive ? 0 : undefined,
    'aria-label': title || description,
    'aria-describedby': description ? `${props.id}-desc` : undefined,
    onClick: onClick,
    href: href,
    onKeyDown: isInteractive ? (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.(e);
      }
    } : undefined,
    ...props
  };

  const content = (
    <>
      {title && (
        <h3 className="card__title" id={`${props.id}-title`}>
          {title}
        </h3>
      )}
      {description && (
        <p className="card__description" id={`${props.id}-desc`}>
          {description}
        </p>
      )}
      {children}
    </>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={isInteractive ? { y: -4 } : undefined}
        transition={{ duration: 0.3 }}
        {...cardProps}
      >
        {content}
      </motion.div>
    );
  }

  return <Component {...cardProps}>{content}</Component>;
};

AccessibleCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string,
  className: PropTypes.string,
  animate: PropTypes.bool,
  role: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default AccessibleCard;
