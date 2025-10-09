/**
 * Animation Utilities for Cilis Pet
 * Adds cute and feminine interactive animations
 */

/**
 * Creates a trail of paw prints that follow the mouse cursor
 * @param {string} containerId - ID of the container element
 */
export const createPawPrintTrail = (containerId = 'root') => {
  const container = document.getElementById(containerId);
  if (!container) return;

  let lastPrintTime = 0;
  const delay = 300; // Time between prints in ms
  
  const handleMouseMove = (e) => {
    console.log("ddd")
    const currentTime = Date.now();
    if (currentTime - lastPrintTime < delay) return;
    
    lastPrintTime = currentTime;
    console.log("conflict2");
    
    // Create paw print element
    const pawPrint = document.createElement('div');
    pawPrint.className = 'paw-print';
    pawPrint.style.left = `${e.clientX - 10}px`;
    pawPrint.style.top = `${e.clientY - 10}px`;
    
    // Randomly rotate the paw print
    const rotation = Math.random() * 360;
    pawPrint.style.transform = `rotate(${rotation}deg)`;
    
    // Add to container
    container.appendChild(pawPrint);
    
    // Remove after animation completes
    setTimeout(() => {
      pawPrint.remove();
    }, 2000);
  };
  
  container.addEventListener('mousemove', handleMouseMove);

  // Cleanup function
  return () => {
    container.removeEventListener('mousemove', handleMouseMove);
  };
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
 * Creates sparkling stars effect for an element
 * @param {string} selector - CSS selector for elements to attach the effect to
 * @param {number} starCount - Number of stars to create
 */
export const createSparkleEffect = (selector, starCount = 8) => {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;
  
  elements.forEach(element => {
    element.classList.add('sparkle-container');
    
    // Create random stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'sparkle-star';
      
      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Random animation delay
      star.style.animationDelay = `${Math.random() * 2}s`;
      
      element.appendChild(star);
    }
  });
};

/**
 * Adds a button hover confetti effect
 * @param {string} selector - CSS selector for buttons to attach the effect to
 * @param {number} count - Number of confetti pieces
 */
export const createConfettiButtonEffect = (selector, count = 10) => {
  const buttons = document.querySelectorAll(selector);
  if (!buttons.length) return;
  
  buttons.forEach(button => {
    button.classList.add('confetti-button');
    
    // Create confetti pieces
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      
      // Random position
      confetti.style.left = `${Math.random() * 100}%`;
      
      // Random color
      const colors = ['#FFD1DC', '#E6E6FA', '#C9F7E7', '#FFDAB9', '#FFB6C1', '#DCD0FF'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.backgroundColor = randomColor;
      
      // Random animation delay
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      
      button.appendChild(confetti);
    }
  });
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
};

/**
 * Creates subtle animations for images (cinemagraph effect)
 * @param {string} selector - CSS selector for images to animate
 */
export const createCinemagraphEffect = (selector) => {
  const images = document.querySelectorAll(selector);
  if (!images.length) return;
  
  images.forEach(image => {
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
    const effects = ['zoom', 'pan', 'breathe', 'shimmer'];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    image.classList.add(`cinemagraph-${randomEffect}`);
  });
};

/**
 * Creates custom stickers that float on the page
 * @param {string} containerId - ID of the container element
 * @param {number} count - Number of stickers to create
 */
export const createCustomStickers = (containerId = 'root', count = 5) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Sticker types with corresponding emojis/images
  const stickerTypes = [
    { type: 'paw', content: '🐾', className: 'sticker-paw' },
    { type: 'heart', content: '❤️', className: 'sticker-heart' },
    { type: 'cat', content: '🐱', className: 'sticker-cat' },
    { type: 'dog', content: '🐶', className: 'sticker-dog' },
    { type: 'bone', content: '🦴', className: 'sticker-bone' },
    { type: 'fish', content: '🐟', className: 'sticker-fish' },
    { type: 'house', content: '🏠', className: 'sticker-house' },
    { type: 'custom-paw', svgPath: 'M23.3333 16.6667C23.3333 20.3486 20.3486 23.3333 16.6667 23.3333C12.9848 23.3333 10 20.3486 10 16.6667C10 12.9848 12.9848 10 16.6667 10C20.3486 10 23.3333 12.9848 23.3333 16.6667Z M43.3333 23.3333C43.3333 27.0152 40.3486 30 36.6667 30C32.9848 30 30 27.0152 30 23.3333C30 19.6514 32.9848 16.6667 36.6667 16.6667C40.3486 16.6667 43.3333 19.6514 43.3333 23.3333Z M70 23.3333C70 27.0152 67.0152 30 63.3333 30C59.6514 30 56.6667 27.0152 56.6667 23.3333C56.6667 19.6514 59.6514 16.6667 63.3333 16.6667C67.0152 16.6667 70 19.6514 70 23.3333Z M90 16.6667C90 20.3486 87.0152 23.3333 83.3333 23.3333C79.6514 23.3333 76.6667 20.3486 76.6667 16.6667C76.6667 12.9848 79.6514 10 83.3333 10C87.0152 10 90 12.9848 90 16.6667Z M73.3333 50C73.3333 61.0457 64.3791 70 53.3333 70C42.2876 70 33.3333 61.0457 33.3333 50C33.3333 38.9543 42.2876 30 53.3333 30C64.3791 30 73.3333 38.9543 73.3333 50Z', className: 'sticker-svg-paw' },
    { type: 'custom-heart', svgPath: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z', className: 'sticker-svg-heart' }
  ];
  
  // Create sticker container if it doesn't exist
  let stickerContainer = document.getElementById('sticker-container');
  if (!stickerContainer) {
    stickerContainer = document.createElement('div');
    stickerContainer.id = 'sticker-container';
    stickerContainer.className = 'sticker-container';
    document.body.appendChild(stickerContainer);
  }
  
  // Create stickers
  for (let i = 0; i < count; i++) {
    const randomStickerType = stickerTypes[Math.floor(Math.random() * stickerTypes.length)];
    
    const sticker = document.createElement('div');
    sticker.className = `floating-sticker ${randomStickerType.className}`;
    
    // Set sticker content
    if (randomStickerType.content) {
      sticker.textContent = randomStickerType.content;
    } else if (randomStickerType.svgPath) {
      // Create SVG element
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', randomStickerType.svgPath);
      
      svg.appendChild(path);
      sticker.appendChild(svg);
    }
    
    // Position stickers on the sides of the screen
    // Determine if this sticker should be on the left or right side
    const isLeftSide = i % 2 === 0;
    
    if (isLeftSide) {
      // Left side positioning (0-15% of screen width)
      sticker.style.left = `${Math.random() * 15}%`;
    } else {
      // Right side positioning (85-100% of screen width)
      sticker.style.left = `${85 + Math.random() * 15}%`;
    }
    
    // Distribute vertically
    sticker.style.top = `${10 + (i * 20) + (Math.random() * 10)}%`;
    
    // Random size
    const size = 20 + Math.random() * 30;
    sticker.style.width = `${size}px`;
    sticker.style.height = `${size}px`;
    
    // Random animation duration
    const duration = 20 + Math.random() * 40;
    sticker.style.animationDuration = `${duration}s`;
    
    // Random animation delay
    sticker.style.animationDelay = `${Math.random() * 10}s`;
    
    // Make draggable
    sticker.setAttribute('draggable', 'true');
    
    // Add to container
    stickerContainer.appendChild(sticker);
    
    // Add drag functionality
    sticker.addEventListener('dragstart', handleDragStart);
    sticker.addEventListener('dragend', handleDragEnd);
  }
  
  // Drag handlers
  function handleDragStart(e) {
    this.style.opacity = '0.4';
    this.classList.add('sticker-dragging');
    
    // Store the sticker's initial position for the drag operation
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.id);
  }
  
  function handleDragEnd(e) {
    this.style.opacity = '1';
    this.classList.remove('sticker-dragging');
    
    // Update position
    const x = e.clientX;
    const y = e.clientY;
    
    this.style.left = `${x}px`;
    this.style.top = `${y}px`;
    
    // Stop animation
    this.style.animation = 'none';
  }
};

/**
 * Creates seasonal weather effects on the page
 * @param {string} season - The season to create effects for (spring, summer, fall, winter)
 * @param {string} containerId - ID of the container element
 */
export const createSeasonalEffect = (season = 'auto', containerId = 'root') => {
  // Auto-detect season based on month if not specified
  if (season === 'auto') {
    const month = new Date().getMonth(); // 0-11
    if (month >= 2 && month <= 4) season = 'spring';
    else if (month >= 5 && month <= 7) season = 'summer';
    else if (month >= 8 && month <= 10) season = 'fall';
    else season = 'winter';
  }
  
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Create weather container if it doesn't exist
  let weatherContainer = document.getElementById('weather-effect-container');
  if (!weatherContainer) {
    weatherContainer = document.createElement('div');
    weatherContainer.id = 'weather-effect-container';
    weatherContainer.className = 'weather-effect-container';
    document.body.appendChild(weatherContainer);
  }
  
  // Clear existing weather effects
  weatherContainer.innerHTML = '';
  
  // Set up effects based on season
  let particleCount = 0;
  let particleType = '';
  let particleClass = '';
  
  switch (season) {
    case 'spring':
      particleCount = 20;
      particleType = 'spring';
      particleClass = 'weather-petal';
      // Add spring background effect
      document.body.classList.add('spring-bg');
      document.body.classList.remove('summer-bg', 'fall-bg', 'winter-bg');
      break;
      
    case 'summer':
      particleCount = 15;
      particleType = 'summer';
      particleClass = 'weather-butterfly';
      // Add summer background effect
      document.body.classList.add('summer-bg');
      document.body.classList.remove('spring-bg', 'fall-bg', 'winter-bg');
      break;
      
    case 'fall':
      particleCount = 30;
      particleType = 'fall';
      particleClass = 'weather-leaf';
      // Add fall background effect
      document.body.classList.add('fall-bg');
      document.body.classList.remove('spring-bg', 'summer-bg', 'winter-bg');
      break;
      
    case 'winter':
      particleCount = 50;
      particleType = 'winter';
      particleClass = 'weather-snow';
      // Add winter background effect
      document.body.classList.add('winter-bg');
      document.body.classList.remove('spring-bg', 'summer-bg', 'fall-bg');
      break;
  }
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = `weather-particle ${particleClass}`;
    
    // Set content based on type
    if (particleType === 'spring') {
      const petals = ['🌸', '🌷', '🌹', '🌺', '🌼', '🌻'];
      particle.textContent = petals[Math.floor(Math.random() * petals.length)];
    } else if (particleType === 'summer') {
      const butterflies = ['🦋', '🐝', '🐞'];
      particle.textContent = butterflies[Math.floor(Math.random() * butterflies.length)];
    } else if (particleType === 'fall') {
      const leaves = ['🍁', '🍂', '🍃'];
      particle.textContent = leaves[Math.floor(Math.random() * leaves.length)];
    } else if (particleType === 'winter') {
      // For snow, we'll use a special snowflake div
      particle.innerHTML = '❄️';
    }
    
    // Random starting position
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `-50px`;
    
    // Random size
    const size = 10 + Math.random() * 20;
    particle.style.fontSize = `${size}px`;
    
    // Random fall duration
    const duration = 10 + Math.random() * 20;
    particle.style.animationDuration = `${duration}s`;
    
    // Random delay
    const delay = Math.random() * 15;
    particle.style.animationDelay = `${delay}s`;
    
    // Add horizontal movement for certain particles
    if (particleType === 'fall' || particleType === 'winter') {
      particle.style.animationName = 'weatherFall, weatherSway';
    }
    
    // Add to container
    weatherContainer.appendChild(particle);
  }
  
  // Return a function to change the season
  return (newSeason) => createSeasonalEffect(newSeason, containerId);
};

/**
 * Changes cursor on hover for specific elements
 * @param {Object} cursorMappings - Object with selectors as keys and cursor types as values
 */
export const createCustomCursorEffect = (cursorMappings) => {
  // Create a style element for custom cursors
  const style = document.createElement('style');
  document.head.appendChild(style);
  
  let styleRules = '';
  
  // Process each mapping
  Object.entries(cursorMappings).forEach(([selector, cursorType]) => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    
    // Add CSS rule for this selector
    switch (cursorType) {
      case 'heart':
        styleRules += `${selector}:hover { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="%23FF86A5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>') 16 16, auto; }\n`;
        break;
      case 'paw':
        styleRules += `${selector}:hover { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="%23FF86A5"><path d="M6 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm12 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-6 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm12 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-6-12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>') 16 16, auto; }\n`;
        break;
      case 'cat':
        styleRules += `${selector}:hover { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="%239E9E9E"><path d="M12 8L10.67 8.09C9.81 7.07 7.4 4.5 5 4.5C5 4.5 3.03 7.46 4.96 11.41C4.41 12.24 4.07 12.67 4 13.66L2.07 13.95L2.28 14.93L4.04 14.67L4.18 15.38L2.61 16.32L3.08 17.21L4.53 16.32C5.68 18.76 8.59 20 12 20C15.41 20 18.32 18.76 19.47 16.32L20.92 17.21L21.39 16.32L19.82 15.38L19.96 14.67L21.72 14.93L21.93 13.95L20 13.66C19.93 12.67 19.59 12.24 19.04 11.41C20.97 7.46 19 4.5 19 4.5C16.6 4.5 14.19 7.07 13.33 8.09L12 8z"/></svg>') 16 16, auto; }\n`;
        break;
      case 'pointer':
        styleRules += `${selector}:hover { cursor: pointer; }\n`;
        break;
      case 'sparkle':
        styleRules += `${selector}:hover { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="%23FFD700"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>') 16 16, auto; }\n`;
        break;
      default:
        styleRules += `${selector}:hover { cursor: ${cursorType}; }\n`;
    }
    
    // Add data attributes for animation purposes
    elements.forEach(element => {
      element.setAttribute('data-custom-cursor', cursorType);
    });
  });
  
  // Add the style rules
  style.textContent = styleRules;
  
  // Create hover effect with scaling
  const addHoverEffect = (element) => {
    const cursorType = element.getAttribute('data-custom-cursor');
    if (!cursorType) return;
    
    element.addEventListener('mouseenter', () => {
      // Add special effects based on cursor type
      switch (cursorType) {
        case 'heart':
          element.classList.add('cursor-heart-hover');
          break;
        case 'paw':
          element.classList.add('cursor-paw-hover');
          break;
        case 'cat':
          element.classList.add('cursor-cat-hover');
          break;
        case 'sparkle':
          element.classList.add('cursor-sparkle-hover');
          break;
      }
    });
    
    element.addEventListener('mouseleave', () => {
      // Remove all special cursor effects
      element.classList.remove(
        'cursor-heart-hover',
        'cursor-paw-hover',
        'cursor-cat-hover',
        'cursor-sparkle-hover'
      );
    });
  };
  
  // Apply hover effects to all elements with custom cursors
  document.querySelectorAll('[data-custom-cursor]').forEach(addHoverEffect);
};

/**
 * Creates a cursor trail effect that follows the mouse with animal shapes
 * @param {number} trailCount - Number of trailing elements
 */
export const createCursorTrailEffect = (trailCount = 5) => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  // Create trail container if it doesn't exist
  let trailContainer = document.getElementById('cursor-trail-container');
  if (!trailContainer) {
    trailContainer = document.createElement('div');
    trailContainer.id = 'cursor-trail-container';
    trailContainer.style.position = 'fixed';
    trailContainer.style.top = '0';
    trailContainer.style.left = '0';
    trailContainer.style.width = '100%';
    trailContainer.style.height = '100%';
    trailContainer.style.pointerEvents = 'none';
    trailContainer.style.zIndex = '9998';
    document.body.appendChild(trailContainer);
  }
  
  // Create the trail elements
  const trailElements = [];
  const emojis = ['🐱', '🐶', '🐰', '🐹', '🦊', '🐻'];
  
  for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    const emoji = emojis[i % emojis.length];
    trail.className = 'cursor-trail-element';
    trail.innerHTML = emoji;
    trail.style.position = 'fixed';
    trail.style.opacity = (1 - (i / trailCount)) * 0.5; // Elements fade out
    trail.style.fontSize = `${20 - (i * 2)}px`; // Elements get smaller
    trail.style.zIndex = '9998';
    trail.style.pointerEvents = 'none';
    trail.style.transition = 'transform 0.1s ease-out, opacity 0.3s ease-out';
    trail.style.transform = 'translate(-50%, -50%)';
    trailContainer.appendChild(trail);
    trailElements.push(trail);
  }
  
  // Position data
  let mouseX = 0;
  let mouseY = 0;
  let positions = Array(trailCount).fill().map(() => ({ x: 0, y: 0 }));
  
  // Update position of trail elements
  const updateTrail = () => {
    // Update positions array (first position is current mouse position)
    positions.unshift({ x: mouseX, y: mouseY });
    positions = positions.slice(0, trailCount);
    
    // Update each trail element position
    trailElements.forEach((trail, index) => {
      const pos = positions[index] || positions[positions.length - 1];
      if (pos) {
        trail.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${1 - (index * 0.05)})`;
        
        // Rotation effect
        const rotation = Math.sin(Date.now() / 1000 + index) * 15;
        trail.style.transform += ` rotate(${rotation}deg)`;
      }
    });
    
    requestAnimationFrame(updateTrail);
  };
  
  // Track mouse movement
  const handleMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };
  
  // Start animation
  window.addEventListener('mousemove', handleMouseMove);
  updateTrail();
  
  // Return cleanup function
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    if (trailContainer) {
      trailContainer.remove();
    }
  };
};

/**
 * Applies all interactive animations to the page
 */
export const initializeAllAnimations = () => {
  // Wait for DOM to be fully loaded
  window.addEventListener('DOMContentLoaded', () => {
    // Add paw print cursor to the whole site
    document.body.classList.add('cute-cursor');
    
    // Create paw print trail
    createPawPrintTrail('root');
    
    // Add cursor trail effect
    createCursorTrailEffect(5);
    
    // Add heart click effect to like buttons
    createHeartClickEffect('.feminine-like-button, button:has(.fa-heart), .pet-card');
    
    // Add sparkling effect to headings and important elements
    createSparkleEffect('.feminine-title, .heading-cute, h1, .pet-card h3');
    
    // Add confetti to action buttons
    createConfettiButtonEffect('.feminine-button-pink, .feminine-button-gradient, .feminine-button-candy');
    
    // Add pulse glow effect to images and cards
    createPulseGlowEffect('.feminine-card:hover .feminine-image, .pet-image-hover:hover');
    
    // Add custom cursor effects on hover
    createCustomCursorEffect({
      // Links and buttons
      '.feminine-button': 'heart',
      'a': 'pointer',
      'button': 'pointer',
      
      // Pet related elements
      '.pet-card': 'paw',
      '.pet-image-hover': 'paw',
      '.adoption-form-container': 'heart',
      
      // Social icons
      '.feminine-pill': 'sparkle',
      
      // Special sections
      '.feminine-like-button': 'heart',
      '.feminine-card': 'pointer',
      
      // Cat specific elements
      '.pet-card[data-pet-type="Mèo"]': 'cat',
      'img[alt*="cat"], img[alt*="mèo"]': 'cat',
    });
    
    // Add cinemagraph effects to featured pet images
    createCinemagraphEffect('.pet-card img, .pet-image-hover img, .home-hero-image');
    
    // Add custom stickers - increased from 3 to 5
    createCustomStickers('root', 5);
    
    // Add seasonal weather effects
    const changeSeasonFn = createSeasonalEffect('auto');
    
    // Add season toggle to footer if you want to change seasons manually
    const footer = document.querySelector('footer');
    if (footer) {
      const seasonToggle = document.createElement('div');
      seasonToggle.className = 'season-toggle';
      seasonToggle.innerHTML = `
        <button class="season-btn spring-btn" data-season="spring">🌸</button>
        <button class="season-btn summer-btn" data-season="summer">☀️</button>
        <button class="season-btn fall-btn" data-season="fall">🍂</button>
        <button class="season-btn winter-btn" data-season="winter">❄️</button>
      `;
      
      // Add click event listeners for season buttons
      seasonToggle.querySelectorAll('.season-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          changeSeasonFn(btn.dataset.season);
          
          // Update active button
          seasonToggle.querySelectorAll('.season-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
      
      footer.appendChild(seasonToggle);
    }
  });
}; 