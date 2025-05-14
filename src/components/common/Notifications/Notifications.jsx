import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimesCircle,
  FaTimes,
} from 'react-icons/fa';
import { useApp } from '../../../context/AppContext';

// Map các loại thông báo với icon và style tương ứng
const notificationStyles = {
  success: {
    icon: <FaCheckCircle className="text-xl" />,
    className: 'bg-green-50 border-green-500 text-green-700',
    iconClass: 'text-green-500',
  },
  error: {
    icon: <FaTimesCircle className="text-xl" />,
    className: 'bg-red-50 border-red-500 text-red-700',
    iconClass: 'text-red-500',
  },
  warning: {
    icon: <FaExclamationTriangle className="text-xl" />,
    className: 'bg-yellow-50 border-yellow-500 text-yellow-700',
    iconClass: 'text-yellow-500',
  },
  info: {
    icon: <FaInfoCircle className="text-xl" />,
    className: 'bg-blue-50 border-blue-500 text-blue-700',
    iconClass: 'text-blue-500',
  },
};

/**
 * Component hiển thị một thông báo
 */
const Notification = ({ notification, onClose }) => {
  const { type = 'info', message, title } = notification;
  const style = notificationStyles[type] || notificationStyles.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`rounded-lg border-l-4 p-4 flex items-start shadow-md mb-3 ${style.className}`}
    >
      <div className={`mr-3 ${style.iconClass}`}>{style.icon}</div>
      <div className="flex-1">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <p className="text-sm">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Close notification"
      >
        <FaTimes />
      </button>
    </motion.div>
  );
};

/**
 * Component hiển thị tất cả thông báo từ AppContext
 */
const Notifications = () => {
  const { state, actions } = useApp();
  const { notifications } = state;

  return (
    <div className="fixed top-20 right-4 z-50 w-80 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onClose={() => actions.removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications; 