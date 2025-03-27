import { useEffect } from 'react';
import { initializeAllAnimations } from '../../utils/animationUtils';

/**
 * Effects component to initialize all visual effects
 * This component doesn't render anything visually but sets up all the animations
 */
const Effects = () => {
  useEffect(() => {
    // Initialize all animations when component mounts
    initializeAllAnimations();
    
    // Create containers for effects
    createContainer('heart-trail-container');
    createContainer('sticker-container');
    createContainer('weather-effect-container');
    createContainer('global-bokeh-container');
    createContainer('cursor-trail-container');
    
    // Add bokeh and fairy light effects to global elements
    addGlobalEffects();
    
    // Clean up function
    return () => {
      // If needed, remove containers on unmount
      // However, in most cases we want these to persist throughout the app
    };
  }, []);
  
  // Helper function to create containers
  const createContainer = (id) => {
    if (!document.getElementById(id)) {
      const container = document.createElement('div');
      container.id = id;
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.pointerEvents = 'none';
      container.style.zIndex = '1000';
      container.style.overflow = 'hidden';
      document.body.appendChild(container);
    }
  };
  
  // Thêm các hiệu ứng toàn cục
  const addGlobalEffects = () => {
    // Thêm bokeh cho toàn trang
    addGlobalBokeh();
    
    // Thêm fairy light effect cho các phần tử quan trọng
    document.querySelectorAll('.feminine-card, .feminine-button, h1, h2').forEach(el => {
      if (!el.classList.contains('fairy-light')) {
        el.classList.add('fairy-light');
      }
    });
    
    // Thêm glitter text effect cho các headings
    document.querySelectorAll('h1, h2, .feminine-section-title').forEach(el => {
      if (!el.classList.contains('glitter-text')) {
        el.classList.add('glitter-text');
      }
    });
    
    // Thêm shimmer border cho các card quan trọng
    document.querySelectorAll('.feminine-testimonial, .feminine-theme-toggle').forEach(el => {
      if (!el.classList.contains('shimmer-border')) {
        el.classList.add('shimmer-border');
      }
    });
  };
  
  // Tạo hiệu ứng bokeh cho toàn trang
  const addGlobalBokeh = () => {
    const container = document.getElementById('global-bokeh-container');
    if (!container) return;
    
    // Màu pastel cho bokeh
    const pastelColors = [
      "255, 209, 220", // Hồng
      "230, 230, 250", // Lavender
      "201, 247, 231", // Mint
      "255, 218, 185", // Peach
      "255, 249, 196", // Vàng nhạt
      "220, 235, 252"  // Xanh da trời nhạt
    ];
    
    // Tạo 15 bokeh cho toàn trang
    for (let i = 0; i < 15; i++) {
      const size = 30 + Math.random() * 70; // Kích thước 30-100px
      
      // Vị trí ngẫu nhiên
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      // Animation duration và delay
      const duration = 15 + Math.random() * 20;
      const delay = Math.random() * 5;
      
      // Di chuyển theo hướng ngẫu nhiên
      const travelX = (Math.random() - 0.5) * 100;
      const travelY = -50 - Math.random() * 100;
      
      // Chọn màu ngẫu nhiên
      const color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
      
      // Tạo phần tử bokeh
      const bokeh = document.createElement('div');
      bokeh.classList.add('bokeh');
      bokeh.style.width = `${size}px`;
      bokeh.style.height = `${size}px`;
      bokeh.style.background = `radial-gradient(circle at center, rgba(${color},0.5) 0%, rgba(${color},0) 70%)`;
      bokeh.style.left = `${posX}%`;
      bokeh.style.top = `${posY}%`;
      bokeh.style.animationDuration = `${duration}s`;
      bokeh.style.animationDelay = `${delay}s`;
      bokeh.style.setProperty('--bokeh-opacity', '0.15');
      bokeh.style.setProperty('--bokeh-travel-x', `${travelX}px`);
      bokeh.style.setProperty('--bokeh-travel-y', `${travelY}px`);
      
      container.appendChild(bokeh);
    }
  };
  
  // This component doesn't render anything visible
  return null;
};

export default Effects; 