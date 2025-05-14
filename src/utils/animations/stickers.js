/**
 * Stickers Animation
 * Tạo các sticker trang trí cho trang web
 */

/**
 * Creates custom stickers that float on the page
 * @param {string} containerId - ID of the container element
 * @param {number} count - Number of stickers to create
 */
export const createCustomStickers = (containerId = 'root', count = 5) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Add required styles if not already present
  if (!document.getElementById('sticker-styles')) {
    const style = document.createElement('style');
    style.id = 'sticker-styles';
    style.textContent = `
      .sticker {
        position: absolute;
        user-select: none;
        pointer-events: none;
        z-index: 9995;
        opacity: 0.8;
        animation: float-around 20s ease-in-out infinite alternate;
        transform-origin: center;
      }
      
      @keyframes float-around {
        0% {
          transform: translate(0, 0) rotate(0deg);
        }
        25% {
          transform: translate(calc(var(--drift-x) * 20px), calc(var(--drift-y) * 15px)) rotate(calc(var(--rotation) * 10deg));
        }
        50% {
          transform: translate(calc(var(--drift-x) * -10px), calc(var(--drift-y) * 25px)) rotate(calc(var(--rotation) * -5deg));
        }
        75% {
          transform: translate(calc(var(--drift-x) * 15px), calc(var(--drift-y) * -10px)) rotate(calc(var(--rotation) * 15deg));
        }
        100% {
          transform: translate(calc(var(--drift-x) * -5px), calc(var(--drift-y) * -20px)) rotate(calc(var(--rotation) * -10deg));
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Sticker types with corresponding emojis/content
  const stickerTypes = [
    { type: 'paw', content: '🐾', className: 'sticker-paw' },
    { type: 'heart', content: '❤️', className: 'sticker-heart' },
    { type: 'cat', content: '🐱', className: 'sticker-cat' },
    { type: 'dog', content: '🐶', className: 'sticker-dog' },
    { type: 'bone', content: '🦴', className: 'sticker-bone' },
    { type: 'fish', content: '🐟', className: 'sticker-fish' },
    { type: 'house', content: '🏠', className: 'sticker-house' },
    { type: 'star', content: '⭐', className: 'sticker-star' },
    { type: 'flower', content: '🌸', className: 'sticker-flower' },
    { type: 'ribbon', content: '🎀', className: 'sticker-ribbon' }
  ];
  
  // Create sticker container if it doesn't exist
  let stickerContainer = document.getElementById('sticker-container');
  if (!stickerContainer) {
    stickerContainer = document.createElement('div');
    stickerContainer.id = 'sticker-container';
    stickerContainer.className = 'sticker-container';
    stickerContainer.style.position = 'fixed';
    stickerContainer.style.top = '0';
    stickerContainer.style.left = '0';
    stickerContainer.style.width = '100%';
    stickerContainer.style.height = '100%';
    stickerContainer.style.pointerEvents = 'none';
    stickerContainer.style.zIndex = '9990';
    document.body.appendChild(stickerContainer);
  }
  
  // Create stickers
  for (let i = 0; i < count; i++) {
    // Get random sticker type
    const randomStickerType = stickerTypes[Math.floor(Math.random() * stickerTypes.length)];
    
    // Create sticker element
    const sticker = document.createElement('div');
    sticker.className = `sticker ${randomStickerType.className}`;
    sticker.innerHTML = randomStickerType.content;
    
    // Set random size
    const size = Math.random() * 20 + 25;
    sticker.style.fontSize = `${size}px`;
    
    // Set random position
    sticker.style.top = `${Math.random() * 80 + 10}vh`;
    sticker.style.left = `${Math.random() * 80 + 10}vw`;
    
    // Set random animation parameters
    sticker.style.setProperty('--drift-x', Math.random() * 2 - 1);
    sticker.style.setProperty('--drift-y', Math.random() * 2 - 1);
    sticker.style.setProperty('--rotation', Math.random() * 2 - 1);
    
    // Set random animation duration and delay
    sticker.style.animationDuration = `${Math.random() * 15 + 15}s`;
    sticker.style.animationDelay = `${Math.random() * 5}s`;
    
    // Add to container
    stickerContainer.appendChild(sticker);
  }
  
  // Cleanup function
  return () => {
    const stickers = document.querySelectorAll('.sticker');
    stickers.forEach(sticker => {
      sticker.remove();
    });
  };
}; 