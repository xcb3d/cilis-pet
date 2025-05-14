/**
 * Hover Animations
 * Các hiệu ứng liên quan đến sự kiện hover
 */

// Thiết lập các hiệu ứng hover
export const setupHoverEffects = () => {
  console.log('Hover effects loaded and initialized');
};

/**
 * Creates sparkling stars effect for an element on hover
 * @param {string} selector - CSS selector for elements to attach the effect to
 * @param {number} starCount - Number of stars to create
 */
export const createSparkleEffect = (selector, starCount = 8) => {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;
  
  elements.forEach(element => {
    // Add necessary class
    element.classList.add('sparkle-container');
    
    // Create stars on hover only
    let stars = [];
    
    const createStars = () => {
      // Remove any existing stars first
      removeStars();
      
      // Create new stars
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'sparkle-star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 2}s`;
        star.style.animationDuration = `${Math.random() * 1 + 1}s`;
        
        element.appendChild(star);
        stars.push(star);
      }
    };
    
    const removeStars = () => {
      stars.forEach(star => {
        star.remove();
      });
      stars = [];
    };
    
    // Add event listeners
    element.addEventListener('mouseenter', createStars);
    element.addEventListener('mouseleave', removeStars);
  });
  
  // Cleanup function
  return () => {
    elements.forEach(element => {
      element.classList.remove('sparkle-container');
      
      const stars = element.querySelectorAll('.sparkle-star');
      stars.forEach(star => star.remove());
      
      element.removeEventListener('mouseenter', () => {});
      element.removeEventListener('mouseleave', () => {});
    });
  };
};

/**
 * Makes an element pulse glow on hover
 * @param {string} selector - CSS selector for elements to attach the effect to
 */
export const createPulseGlowEffect = (selector) => {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;
  
  elements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.classList.add('pulse-glow');
    });
    
    element.addEventListener('mouseleave', () => {
      element.classList.remove('pulse-glow');
    });
  });
  
  // Cleanup function
  return () => {
    elements.forEach(element => {
      element.classList.remove('pulse-glow');
      element.removeEventListener('mouseenter', () => {});
      element.removeEventListener('mouseleave', () => {});
    });
  };
};

/**
 * Creates a floating effect for elements on hover
 * @param {string} selector - CSS selector for elements to attach the effect to
 * @param {number} floatDistance - Distance to float in pixels
 */
export const createFloatingEffect = (selector, floatDistance = 5) => {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;
  
  // Create style if it doesn't exist
  if (!document.getElementById('floating-effect-style')) {
    const style = document.createElement('style');
    style.id = 'floating-effect-style';
    style.textContent = `
      .floating-transition {
        transition: transform 0.3s ease-out;
      }
      
      .floating-effect {
        transform: translateY(-${floatDistance}px);
      }
    `;
    document.head.appendChild(style);
  }
  
  elements.forEach(element => {
    element.classList.add('floating-transition');
    
    element.addEventListener('mouseenter', () => {
      element.classList.add('floating-effect');
    });
    
    element.addEventListener('mouseleave', () => {
      element.classList.remove('floating-effect');
    });
  });
  
  // Cleanup function
  return () => {
    elements.forEach(element => {
      element.classList.remove('floating-transition');
      element.classList.remove('floating-effect');
      element.removeEventListener('mouseenter', () => {});
      element.removeEventListener('mouseleave', () => {});
    });
  };
}; 