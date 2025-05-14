/**
 * Basic Animations
 * Các hiệu ứng cơ bản được tải khi khởi động ứng dụng
 */

// Thiết lập các hiệu ứng cơ bản
export const setupBasicAnimations = () => {
  // Thiết lập container cho các hiệu ứng
  setupContainers();
  
  // Thêm các class css cần thiết
  addRequiredStyles();
  
  console.log('Basic animations initialized');
};

// Thiết lập các container cần thiết cho hiệu ứng
const setupContainers = () => {
  // Container cho heart trail
  if (!document.getElementById('heart-trail-container')) {
    const heartContainer = document.createElement('div');
    heartContainer.id = 'heart-trail-container';
    heartContainer.className = 'heart-trail-container';
    document.body.appendChild(heartContainer);
  }
  
  // Container cho stickers
  if (!document.getElementById('sticker-container')) {
    const stickerContainer = document.createElement('div');
    stickerContainer.id = 'sticker-container';
    stickerContainer.className = 'sticker-container';
    document.body.appendChild(stickerContainer);
  }
  
  // Container cho cursor trail
  if (!document.getElementById('cursor-trail-container')) {
    const trailContainer = document.createElement('div');
    trailContainer.id = 'cursor-trail-container';
    trailContainer.className = 'cursor-trail-container';
    document.body.appendChild(trailContainer);
  }
};

// Thêm các style CSS cần thiết
const addRequiredStyles = () => {
  // Kiểm tra nếu style đã tồn tại
  if (document.getElementById('animation-base-styles')) {
    return;
  }
  
  const styleElement = document.createElement('style');
  styleElement.id = 'animation-base-styles';
  styleElement.textContent = `
    .heart-trail-container, .sticker-container, .cursor-trail-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    
    .heart-trail {
      position: absolute;
      animation: float-up 1.5s ease-out forwards;
    }
    
    .sparkle-container {
      position: relative;
      overflow: hidden;
    }
    
    .sparkle-star {
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: #FFD700;
      border-radius: 50%;
      opacity: 0;
      animation: sparkle 2s ease-in-out infinite;
    }
    
    .pulse-glow {
      animation: pulse 1.5s ease-in-out infinite;
    }
    
    .paw-print {
      position: absolute;
      width: 20px;
      height: 20px;
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.7;
      animation: fade-out 2s forwards;
    }
    
    @keyframes float-up {
      0% {
        transform: translateY(0) scale(0.5);
        opacity: 0.5;
      }
      100% {
        transform: translateY(-100px) scale(1);
        opacity: 0;
      }
    }
    
    @keyframes sparkle {
      0%, 100% {
        opacity: 0;
        transform: scale(0.5);
      }
      50% {
        opacity: 0.8;
        transform: scale(1);
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        box-shadow: 0 0 5px 2px rgba(255, 182, 193, 0.5);
      }
      50% {
        box-shadow: 0 0 15px 5px rgba(255, 182, 193, 0.8);
      }
    }
    
    @keyframes fade-out {
      0% {
        opacity: 0.7;
      }
      100% {
        opacity: 0;
      }
    }
  `;
  
  document.head.appendChild(styleElement);
}; 