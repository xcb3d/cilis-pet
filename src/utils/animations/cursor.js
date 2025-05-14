/**
 * Cursor Animations
 * Các hiệu ứng liên quan đến con trỏ chuột
 */

// Thiết lập tất cả các hiệu ứng con trỏ
export const setupCursorEffects = () => {
  console.log('Cursor effects loaded and initialized');
};

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
    const currentTime = Date.now();
    if (currentTime - lastPrintTime < delay) return;
    
    lastPrintTime = currentTime;
    
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
 * Creates custom cursor effects for different elements
 * @param {Object} cursorMappings - Mapping of selectors to cursor types
 */
export const createCustomCursorEffect = (cursorMappings) => {
  if (!cursorMappings || Object.keys(cursorMappings).length === 0) return;
  
  // Define custom cursors 
  const cursors = {
    paw: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><path d=\"M12 16c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zM20 16c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zM28 16c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zM24 24c0 4.42-3.58 8-8 8s-8-3.58-8-8h16z\" fill=\"%23FC9EBF\"/></svg>') 16 16, auto",
    heart: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><path d=\"M16 28c-0.266 0-0.5-0.094-0.688-0.281l-11.312-11.281c-1.75-1.75-2.719-4.156-2.719-6.719 0-5.281 4.281-9.719 9.719-9.719 2.594 0 5.031 1.031 6.656 2.875 1.813-1.813 4.594-2.875 7.344-2.875 5.281 0 9.719 4.281 9.719 9.719 0 2.594-1.031 5.031-2.875 6.875l-11.156 11.125c-0.188 0.188-0.422 0.281-0.688 0.281z\" fill=\"%23FC9EBF\"/></svg>') 16 16, auto",
    bone: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><path d=\"M8 20c-2.209 0-4-1.791-4-4s1.791-4 4-4c1.552 0 2.187-1.018 1.25-3-0.922-1.955 0.012-4 2.094-4 2.188 0 3.969 1.788 3.969 4 0 1.552 1.019 2.188 3 1.25 1.955-0.922 4 0.012 4 2.094 0 2.188-1.788 3.969-4 3.969-1.552 0-2.188 1.018-1.25 3 0.922 1.955-0.012 4-2.094 4-2.188 0-3.969-1.788-3.969-4 0-1.552-1.019-2.188-3-1.25-1.955 0.922-4-0.012-4-2.094z\" fill=\"%23FC9EBF\"/></svg>') 16 16, auto",
    fish: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><path d=\"M31.494 10.971c-0.146-0.223-0.428-0.31-0.673-0.207-3.206 1.348-5.933 1.437-8.13 0.265-0.355-0.189-0.787-0.061-0.976 0.295-0.034 0.065-0.056 0.133-0.070 0.202-0.146 0.021-0.292 0.068-0.421 0.145-0.355 0.211-0.499 0.665-0.341 1.048 0.774 1.871 0.564 3.439-0.625 4.669-1.398 1.444-3.728 1.403-3.781 1.402-0.421-0.015-0.779 0.312-0.795 0.734-0.016 0.421 0.312 0.779 0.734 0.795 0.076 0.003 0.757 0.021 1.623-0.148-1.113 0.548-2.194 0.9-3.175 1.15-2.305-0.469-7.443-2.175-7.394-8.791 0.051-6.86 6.753-9.889 12.025-9.889 2.712 0 5.378 0.564 7.925 1.677 0.392 0.171 0.848-0.008 1.019-0.399 0.171-0.391-0.008-0.848-0.399-1.019-2.728-1.19-5.574-1.794-8.545-1.794-8.215 0-13.511 4.592-13.56 10.402-0.033 4.422 2.089 7.567 5.976 9.141-0.104 0.026-0.207 0.051-0.308 0.076-0.399 0.099-0.717 0.401-0.839 0.799l-1.474 4.796c-0.067 0.218-0.058 0.451 0.024 0.664 0.082 0.214 0.232 0.391 0.426 0.504 0.27 0.156 0.65 0.089 1.020-0.188l3.461-2.604c0.165-0.125 0.287-0.296 0.346-0.489 0.059-0.194 0.052-0.401-0.021-0.591l-0.103-0.266c0.477-0.012 0.957-0.041 1.436-0.087 0.412-0.039 0.799-0.085 1.176-0.138l-0.078 0.201c-0.073 0.189-0.081 0.397-0.021 0.591 0.059 0.194 0.181 0.364 0.346 0.489l3.461 2.604c0.219 0.166 0.436 0.248 0.65 0.248 0.129 0 0.258-0.031 0.37-0.092 0.194-0.112 0.343-0.29 0.426-0.504 0.082-0.213 0.091-0.446 0.024-0.664l-1.474-4.796c-0.123-0.399-0.44-0.7-0.839-0.799-0.174-0.043-0.354-0.082-0.538-0.122 0.347-0.094 0.697-0.196 1.048-0.307 3.554-1.164 7.194-3.267 9.639-6.875 0.165-0.244 0.187-0.558 0.058-0.823zM19.551 25.674l-1.729-1.302 0.214-0.552c0.554-0.088 1.101-0.199 1.633-0.331l-0.118 0.384zM11.353 24.471l0.214 0.552-1.729 1.302-0.118-0.384c0.536 0.133 1.085 0.243 1.633 0.331z\" fill=\"%23FC9EBF\"/></svg>') 16 16, auto",
    cat: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><path d=\"M26.131 19.776c-2.108-2.109-2.738-5.106-2.738-5.106l-0.235-0.714c-0.241-0.603-0.826-1-1.463-1h-1.9l0.407-1.534c0.711-2.272-0.487-4.748-2.55-5.622-1.245-0.526-2.667-0.129-3.485 0.968l-6.23 8.319-0.938-0.938v-0.938l-1.875-0.938-3.75 3.75 0.938 1.875h0.938l0.938 0.938-1.875 5.625c-0.242 0.727 0.389 1.451 1.15 1.324l2.687-0.447c0.584-0.097 1.2 0.194 1.453 0.698l1.061 2.12c0.351 0.702 1.31 0.701 1.665 0l2.906-5.813c0.077-0.154 0.251-0.447 0.454-0.525 0.497-0.191 1.571 0.671 2.204 1.304 1.458 1.459 3.625 0.998 4.544 0.078l4.688-4.688c0.195-0.195 0.195-0.511 0-0.706zM16.875 17.563c-1.553 0-2.813-1.259-2.813-2.813s1.259-2.813 2.813-2.813c1.553 0 2.813 1.259 2.813 2.813s-1.259 2.813-2.813 2.813z\" fill=\"%23FC9EBF\"/></svg>') 16 16, auto",
    dog: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><path d=\"M27.894 11.726c-1.95-2.436-6.607-1.141-6.607-1.141s-7.384-8.887-9.132-3.451c-1.747 5.435 0.406 5.838 0.406 5.838s-6.187 2.845-5.778 5.691c0.406 2.845 3.553 2.233 3.553 2.233s-1.292 2.857 0.609 4.759c1.697 1.698 3.856 0.406 3.856 0.406s-0.609 2.644 2.438 3.654c2.436 0.811 3.654-1.218 3.654-1.218s3.856 1.421 5.35-1.421c1.495-2.842-0.2-4.96-0.2-4.96s5.757 0.913 6.367-1.624c0.609-2.538-3.248-4.96-3.248-4.96s0.683-1.969-1.267-3.806z\" fill=\"%23FC9EBF\"/></svg>') 16 16, auto",
    pointer: "pointer"
  };
  
  // Add event listeners to elements based on mapping
  Object.keys(cursorMappings).forEach(selector => {
    const cursorType = cursorMappings[selector];
    const elements = document.querySelectorAll(selector);
    
    if (!elements.length) return;
    
    elements.forEach(element => {
      element.style.cursor = cursors[cursorType] || cursorType;
    });
  });
};

/**
 * Creates a trail effect that follows the cursor
 * @param {number} trailCount - Number of trail elements
 */
export const createCursorTrailEffect = (trailCount = 5) => {
  const container = document.getElementById('cursor-trail-container');
  if (!container) return;
  
  // Create trail elements
  const trailElements = [];
  for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.position = 'absolute';
    trail.style.width = '8px';
    trail.style.height = '8px';
    trail.style.borderRadius = '50%';
    trail.style.backgroundColor = '#FC9EBF';
    trail.style.opacity = (1 - i / trailCount) * 0.7;
    trail.style.pointerEvents = 'none';
    trail.style.transition = 'transform 0.1s, opacity 0.5s';
    trail.style.transform = 'translate(-50%, -50%)';
    trail.style.zIndex = 9999;
    
    container.appendChild(trail);
    trailElements.push({
      element: trail,
      x: 0,
      y: 0
    });
  }
  
  // Store mouse position
  let mouseX = 0;
  let mouseY = 0;
  
  // Update trail positions
  const updateTrail = () => {
    // Update each trail element
    trailElements.forEach((trail, index) => {
      // Calculate delay based on index
      const delay = index * 2;
      
      // Only update position after delay frames
      if (delay === 0) {
        trail.x = mouseX;
        trail.y = mouseY;
      } else {
        // Smoothly move towards target position
        trail.x += (mouseX - trail.x) / delay;
        trail.y += (mouseY - trail.y) / delay;
      }
      
      // Update element position
      trail.element.style.left = `${trail.x}px`;
      trail.element.style.top = `${trail.y}px`;
    });
    
    requestAnimationFrame(updateTrail);
  };
  
  // Track mouse position
  const handleMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };
  
  // Start animation
  document.addEventListener('mousemove', handleMouseMove);
  updateTrail();
  
  // Cleanup function
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    trailElements.forEach(trail => {
      trail.element.remove();
    });
  };
}; 