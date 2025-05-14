/**
 * Image Animations
 * Các hiệu ứng liên quan đến hình ảnh
 */

/**
 * Creates subtle animations for images (cinemagraph effect)
 * @param {string} selector - CSS selector for images to animate
 */
export const createCinemagraphEffect = (selector) => {
  const images = document.querySelectorAll(selector);
  if (!images.length) return;
  
  // Define animation effects
  const effects = ['zoom', 'pan', 'breathe', 'shimmer'];
  
  // Add required styles if not already present
  if (!document.getElementById('cinemagraph-styles')) {
    const style = document.createElement('style');
    style.id = 'cinemagraph-styles';
    style.textContent = `
      .cinemagraph-wrapper {
        position: relative;
        overflow: hidden;
        display: inline-block;
      }
      
      .cinemagraph-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        background: linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1));
      }
      
      .cinemagraph {
        display: block;
        transition: transform 0.5s ease-out;
      }
      
      .cinemagraph-zoom {
        animation: cinemagraph-zoom 10s infinite alternate ease-in-out;
      }
      
      .cinemagraph-pan {
        animation: cinemagraph-pan 15s infinite alternate ease-in-out;
      }
      
      .cinemagraph-breathe {
        animation: cinemagraph-breathe 5s infinite ease-in-out;
      }
      
      .cinemagraph-shimmer {
        animation: cinemagraph-shimmer 3s infinite ease-in-out;
      }
      
      @keyframes cinemagraph-zoom {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(1.05);
        }
      }
      
      @keyframes cinemagraph-pan {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(2%);
        }
      }
      
      @keyframes cinemagraph-breathe {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.03);
        }
      }
      
      @keyframes cinemagraph-shimmer {
        0%, 100% {
          opacity: 0.95;
        }
        50% {
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  images.forEach(image => {
    // Skip if already processed
    if (image.closest('.cinemagraph-wrapper')) {
      return;
    }
    
    // Create a wrapper for the image
    const wrapper = document.createElement('div');
    wrapper.className = 'cinemagraph-wrapper';
    
    // Clone the image and append it to the wrapper
    const imageParent = image.parentNode;
    imageParent.insertBefore(wrapper, image);
    wrapper.appendChild(image);
    
    // Create overlay for the effect
    const overlay = document.createElement('div');
    overlay.className = 'cinemagraph-overlay';
    wrapper.appendChild(overlay);
    
    // Add the animation effect
    image.classList.add('cinemagraph');
    
    // Randomize animation type
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    image.classList.add(`cinemagraph-${randomEffect}`);
  });
  
  // Cleanup function
  return () => {
    images.forEach(image => {
      image.classList.remove('cinemagraph');
      effects.forEach(effect => {
        image.classList.remove(`cinemagraph-${effect}`);
      });
      
      // Unwrap from cinemagraph wrapper
      const wrapper = image.closest('.cinemagraph-wrapper');
      if (wrapper) {
        const parent = wrapper.parentNode;
        parent.insertBefore(image, wrapper);
        wrapper.remove();
      }
    });
  };
};

/**
 * Creates an image reveal effect on scroll
 * @param {string} selector - CSS selector for images to animate
 */
export const createImageRevealEffect = (selector) => {
  const images = document.querySelectorAll(selector);
  if (!images.length) return;
  
  // Add required styles if not already present
  if (!document.getElementById('image-reveal-styles')) {
    const style = document.createElement('style');
    style.id = 'image-reveal-styles';
    style.textContent = `
      .image-reveal-wrapper {
        position: relative;
        overflow: hidden;
      }
      
      .image-reveal-wrapper img {
        display: block;
        width: 100%;
        height: auto;
      }
      
      .image-reveal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #FC9EBF;
        transform: translateX(0);
        transition: transform 0.7s cubic-bezier(0.77, 0, 0.175, 1);
      }
      
      .image-reveal-wrapper.revealed .image-reveal-overlay {
        transform: translateX(100%);
      }
      
      .image-reveal-wrapper img {
        transform: scale(1.2);
        transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        opacity: 0;
      }
      
      .image-reveal-wrapper.revealed img {
        transform: scale(1);
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Setup each image
  images.forEach((image) => {
    // Skip if already processed
    if (image.closest('.image-reveal-wrapper')) {
      return;
    }
    
    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'image-reveal-wrapper';
    
    // Clone the image and append it to the wrapper
    const imageParent = image.parentNode;
    imageParent.insertBefore(wrapper, image);
    wrapper.appendChild(image);
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'image-reveal-overlay';
    wrapper.appendChild(overlay);
  });
  
  // Intersection Observer to trigger the reveal effect
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const wrapper = entry.target;
        setTimeout(() => {
          wrapper.classList.add('revealed');
        }, 200);
        observer.unobserve(wrapper);
      }
    });
  }, {
    threshold: 0.2
  });
  
  // Observe all wrappers
  document.querySelectorAll('.image-reveal-wrapper').forEach(wrapper => {
    observer.observe(wrapper);
  });
  
  // Cleanup function
  return () => {
    document.querySelectorAll('.image-reveal-wrapper').forEach(wrapper => {
      observer.unobserve(wrapper);
      
      // Unwrap the image
      const image = wrapper.querySelector('img');
      if (image) {
        const parent = wrapper.parentNode;
        parent.insertBefore(image, wrapper);
        wrapper.remove();
      }
    });
  };
}; 