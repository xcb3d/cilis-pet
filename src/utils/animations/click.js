/**
 * Click Animations
 * Các hiệu ứng liên quan đến sự kiện click
 */

// Thiết lập các hiệu ứng click
export const setupClickEffects = () => {
  console.log('Click effects loaded and initialized');
};

/**
 * Creates hearts floating effect when an element is clicked
 * @param {string} selector - CSS selector for elements to attach the effect to
 * @param {number} count - Number of hearts to create
 */
export const createHeartClickEffect = (selector, count = 7) => {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;
  
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const container = document.getElementById('heart-trail-container');
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart-trail';
      heart.innerHTML = '❤️';
      
      // Randomize position around the center
      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 40;
      
      heart.style.left = `${centerX + offsetX}px`;
      heart.style.top = `${centerY + offsetY}px`;
      heart.style.fontSize = `${Math.random() * 10 + 12}px`;
      
      // Randomize animation duration
      heart.style.animationDuration = `${Math.random() * 0.5 + 0.8}s`;
      
      container.appendChild(heart);
      
      // Remove after animation completes
      setTimeout(() => {
        heart.remove();
      }, 1500);
    }
  };
  
  elements.forEach(element => {
    element.addEventListener('click', handleClick);
  });
  
  // Cleanup function
  return () => {
    elements.forEach(element => {
      element.removeEventListener('click', handleClick);
    });
  };
};

/**
 * Adds a button confetti effect on click
 * @param {string} selector - CSS selector for buttons to attach the effect to
 * @param {number} count - Number of confetti pieces
 */
export const createConfettiButtonEffect = (selector, count = 10) => {
  const buttons = document.querySelectorAll(selector);
  if (!buttons.length) return;
  
  // Create confetti element and add to container
  const createConfetti = (x, y, container) => {
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      
      // Position at click point
      confetti.style.left = `${x}px`;
      confetti.style.top = `${y}px`;
      
      // Size
      confetti.style.width = `${Math.random() * 8 + 5}px`;
      confetti.style.height = `${Math.random() * 4 + 3}px`;
      
      // Random color
      const colors = ['#FFD1DC', '#E6E6FA', '#C9F7E7', '#FFDAB9', '#FFB6C1', '#DCD0FF'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.backgroundColor = randomColor;
      
      // Random rotation
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      // Style
      confetti.style.position = 'absolute';
      confetti.style.pointerEvents = 'none';
      
      // Generate random angles and distances
      const angle = Math.random() * Math.PI * 2; // 0 to 2π radians
      const velocity = Math.random() * 5 + 5;
      const translateX = Math.cos(angle) * velocity * (Math.random() * 10 + 10);
      const translateY = Math.sin(angle) * velocity * (Math.random() * 10 + 10);
      
      // Apply animation
      confetti.animate([
        { 
          transform: `translate(0, 0) rotate(${Math.random() * 360}deg)`,
          opacity: 1 
        },
        { 
          transform: `translate(${translateX}px, ${translateY}px) rotate(${Math.random() * 360 + 360}deg)`,
          opacity: 0 
        }
      ], {
        duration: Math.random() * 500 + 700,
        easing: 'cubic-bezier(0,.9,.57,1)',
        fill: 'forwards'
      });
      
      container.appendChild(confetti);
      
      // Remove after animation
      setTimeout(() => {
        confetti.remove();
      }, 1200);
    }
  };
  
  // Create container if it doesn't exist
  let confettiContainer = document.getElementById('confetti-container');
  if (!confettiContainer) {
    confettiContainer = document.createElement('div');
    confettiContainer.id = 'confetti-container';
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);
  }
  
  // Add click handler to buttons
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    createConfetti(x, y, confettiContainer);
  };
  
  buttons.forEach(button => {
    button.addEventListener('click', handleClick);
  });
  
  // Cleanup function
  return () => {
    buttons.forEach(button => {
      button.removeEventListener('click', handleClick);
    });
  };
}; 