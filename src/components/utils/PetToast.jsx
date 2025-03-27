import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PetToast component - A cute toast notification system with pet theme
 * Usage:
 * const toastRef = useRef(null);
 * 
 * // Then call like this:
 * toastRef.current.show({ message: 'Đã lưu!', type: 'success' });
 */
const PetToast = forwardRef(({ position = 'bottom-right' }, ref) => {
  const [toasts, setToasts] = useState([]);
  
  // Position style mapping
  const positionStyles = {
    'top-right': { top: '1rem', right: '1rem' },
    'top-left': { top: '1rem', left: '1rem' },
    'bottom-right': { bottom: '1rem', right: '1rem' },
    'bottom-left': { bottom: '1rem', left: '1rem' },
    'top-center': { top: '1rem', left: '50%', transform: 'translateX(-50%)' },
    'bottom-center': { bottom: '1rem', left: '50%', transform: 'translateX(-50%)' }
  };
  
  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    show: ({ message, type = 'info', duration = 3000 }) => {
      const id = Date.now();
      
      // Add toast to list
      setToasts(prev => [...prev, { id, message, type, duration }]);
      
      // Auto-remove after duration
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      }, duration);
    }
  }));
  
  // Helper to get the right icon based on type
  const getIconForType = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '🐾';
    }
  };
  
  // Helper to get pet emoji based on type
  const getPetForType = (type) => {
    switch (type) {
      case 'success': return '🐶'; // Happy dog
      case 'error': return '😿'; // Sad cat
      case 'warning': return '🦊'; // Alert fox
      case 'info': return '🐰'; // Curious rabbit
      default: return '🐱'; // Default cat
    }
  };
  
  return (
    <div 
      className="fixed z-50 flex flex-col gap-3"
      style={positionStyles[position]}
    >
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className={`toast-cute ${toast.type}`}
          >
            <span className="toast-icon">{getPetForType(toast.type)}</span>
            <span>{toast.message}</span>
            <span className="toast-icon opacity-70">{getIconForType(toast.type)}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});

export default PetToast; 