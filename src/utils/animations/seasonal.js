/**
 * Seasonal Animations
 * Các hiệu ứng trang trí theo mùa
 */

// Thiết lập các hiệu ứng mùa vụ
export const setupSeasonalEffects = () => {
  console.log('Seasonal effects loaded and initialized');
  
  // Tự động xác định mùa nếu cần
  const currentSeason = detectSeason();
  createSeasonalEffect(currentSeason);
};

/**
 * Tạo hiệu ứng trang trí theo mùa
 * @param {string} season - Mùa ('spring', 'summer', 'autumn', 'winter', 'christmas', 'newyear', 'valentine', 'auto')
 * @param {string} containerId - ID của container
 */
export const createSeasonalEffect = (season = 'auto', containerId = 'root') => {
  // Tự động phát hiện mùa nếu chưa xác định
  if (season === 'auto') {
    season = detectSeason();
  }
  
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Tạo container cho hiệu ứng mùa nếu chưa có
  let seasonalContainer = document.getElementById('seasonal-effect-container');
  if (!seasonalContainer) {
    seasonalContainer = document.createElement('div');
    seasonalContainer.id = 'seasonal-effect-container';
    seasonalContainer.className = 'seasonal-effect-container';
    seasonalContainer.style.position = 'fixed';
    seasonalContainer.style.top = '0';
    seasonalContainer.style.left = '0';
    seasonalContainer.style.width = '100%';
    seasonalContainer.style.height = '100%';
    seasonalContainer.style.pointerEvents = 'none';
    seasonalContainer.style.zIndex = '9998';
    seasonalContainer.style.overflow = 'hidden';
    document.body.appendChild(seasonalContainer);
  }
  
  // Xóa hiệu ứng cũ nếu có
  seasonalContainer.innerHTML = '';
  
  // Thêm style cho hiệu ứng mùa
  addSeasonalStyles(season);
  
  // Tạo hiệu ứng theo mùa
  switch (season) {
    case 'spring':
      createSpringEffect(seasonalContainer);
      break;
    case 'summer':
      createSummerEffect(seasonalContainer);
      break;
    case 'autumn':
      createAutumnEffect(seasonalContainer);
      break;
    case 'winter':
      createWinterEffect(seasonalContainer);
      break;
    case 'christmas':
      createChristmasEffect(seasonalContainer);
      break;
    case 'newyear':
      createNewYearEffect(seasonalContainer);
      break;
    case 'valentine':
      createValentineEffect(seasonalContainer);
      break;
    default:
      // Mặc định không có hiệu ứng
      break;
  }
};

/**
 * Phát hiện mùa hiện tại dựa vào thời gian
 * @returns {string} Tên mùa
 */
const detectSeason = () => {
  const now = new Date();
  const month = now.getMonth(); // 0-11
  const day = now.getDate(); // 1-31
  
  // Valentine's Day
  if (month === 1 && day >= 10 && day <= 14) {
    return 'valentine';
  }
  
  // Christmas
  if (month === 11 && day >= 15 && day <= 25) {
    return 'christmas';
  }
  
  // New Year
  if ((month === 11 && day >= 26) || (month === 0 && day <= 5)) {
    return 'newyear';
  }
  
  // Regular seasons
  if (month >= 2 && month < 5) {
    return 'spring';
  } else if (month >= 5 && month < 8) {
    return 'summer';
  } else if (month >= 8 && month < 11) {
    return 'autumn';
  } else {
    return 'winter';
  }
};

/**
 * Thêm styles cho hiệu ứng mùa
 * @param {string} season - Mùa
 */
const addSeasonalStyles = (season) => {
  // Xóa style cũ nếu có
  const existingStyle = document.getElementById('seasonal-effect-styles');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  // Tạo style mới
  const style = document.createElement('style');
  style.id = 'seasonal-effect-styles';
  
  // Style theo mùa
  switch (season) {
    case 'spring':
      style.textContent = `
        .petal {
          position: absolute;
          background-size: 100% 100%;
          opacity: 0.8;
          animation: fall linear forwards;
        }
        
        @keyframes fall {
          from {
            transform: translateY(-5vh) rotate(0deg) translateX(0);
          }
          to {
            transform: translateY(105vh) rotate(360deg) translateX(calc(10vw * var(--drift)));
          }
        }
      `;
      break;
    case 'summer':
      style.textContent = `
        .sunray {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at var(--x) var(--y), rgba(255, 255, 150, 0.15) 0%, transparent 70%);
          pointer-events: none;
          opacity: 0;
          animation: sunray-fade 5s ease-in-out infinite;
        }
        
        @keyframes sunray-fade {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        .butterfly {
          position: absolute;
          width: 20px;
          height: 20px;
          background-size: 100% 100%;
          animation: butterfly-fly 15s linear infinite;
          filter: hue-rotate(calc(var(--hue) * 1deg));
        }
        
        @keyframes butterfly-fly {
          0% {
            transform: translate(0, 50vh) rotate(0deg);
          }
          25% {
            transform: translate(25vw, 20vh) rotate(15deg);
          }
          50% {
            transform: translate(50vw, 50vh) rotate(0deg);
          }
          75% {
            transform: translate(75vw, 30vh) rotate(-15deg);
          }
          100% {
            transform: translate(100vw, 50vh) rotate(0deg);
          }
        }
      `;
      break;
    case 'autumn':
      style.textContent = `
        .leaf {
          position: absolute;
          background-size: 100% 100%;
          opacity: 0.8;
          animation: fall-rotate linear forwards;
        }
        
        @keyframes fall-rotate {
          from {
            transform: translateY(-5vh) rotate(0deg) translateX(0);
          }
          to {
            transform: translateY(105vh) rotate(720deg) translateX(calc(20vw * var(--drift)));
          }
        }
      `;
      break;
    case 'winter':
      style.textContent = `
        .snowflake {
          position: absolute;
          color: white;
          user-select: none;
          opacity: 0.8;
          animation: fall-slow linear forwards;
        }
        
        @keyframes fall-slow {
          from {
            transform: translateY(-5vh) rotate(0deg) translateX(0);
          }
          to {
            transform: translateY(105vh) rotate(360deg) translateX(calc(10vw * var(--drift)));
          }
        }
      `;
      break;
    case 'christmas':
      style.textContent = `
        .snowflake {
          position: absolute;
          color: white;
          user-select: none;
          opacity: 0.8;
          animation: fall-slow linear forwards;
        }
        
        .ornament {
          position: fixed;
          background-size: 100% 100%;
          opacity: 0.8;
          z-index: 9999;
        }
        
        @keyframes fall-slow {
          from {
            transform: translateY(-5vh) rotate(0deg) translateX(0);
          }
          to {
            transform: translateY(105vh) rotate(360deg) translateX(calc(10vw * var(--drift)));
          }
        }
      `;
      break;
    case 'newyear':
      style.textContent = `
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          opacity: 0.9;
          animation: confetti-fall linear forwards;
        }
        
        .firework {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          opacity: 0;
          transform-origin: center;
          animation: explode 1s ease-out forwards;
        }
        
        @keyframes confetti-fall {
          from {
            transform: translateY(-5vh) rotate(0deg);
          }
          to {
            transform: translateY(105vh) rotate(720deg);
          }
        }
        
        @keyframes explode {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(var(--scale));
            opacity: 0;
          }
        }
      `;
      break;
    case 'valentine':
      style.textContent = `
        .heart {
          position: absolute;
          color: #FF6B8B;
          opacity: 0.8;
          user-select: none;
          animation: float-up-slow 10s linear forwards;
        }
        
        @keyframes float-up-slow {
          from {
            transform: translateY(105vh) scale(0.5) rotate(0deg);
            opacity: 0.8;
          }
          to {
            transform: translateY(-5vh) scale(1.5) rotate(360deg);
            opacity: 0;
          }
        }
      `;
      break;
  }
  
  // Thêm style vào document
  document.head.appendChild(style);
};

/**
 * Hiệu ứng mùa xuân (hoa rơi)
 * @param {HTMLElement} container - Container chứa hiệu ứng
 */
const createSpringEffect = (container) => {
  const petalsCount = 20;
  const colors = ['#FFCAD4', '#F4ACB7', '#9D8189', '#D8E2DC', '#FFE5D9'];
  
  for (let i = 0; i < petalsCount; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    // Kích thước ngẫu nhiên
    const size = Math.random() * 15 + 10;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    
    // Vị trí ban đầu ngẫu nhiên
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.setProperty('--drift', Math.random() * 2 - 1);
    
    // Thời gian rơi ngẫu nhiên
    const fallDuration = Math.random() * 10 + 8;
    petal.style.animationDuration = `${fallDuration}s`;
    
    // Thời gian bắt đầu ngẫu nhiên
    petal.style.animationDelay = `${Math.random() * 10}s`;
    
    // Màu sắc ngẫu nhiên
    const color = colors[Math.floor(Math.random() * colors.length)];
    petal.style.backgroundColor = color;
    petal.style.borderRadius = '50% 0 50% 0';
    petal.style.boxShadow = `0 0 5px ${color}`;
    
    container.appendChild(petal);
  }
};

/**
 * Hiệu ứng mùa hè (bướm và ánh nắng)
 * @param {HTMLElement} container - Container chứa hiệu ứng
 */
const createSummerEffect = (container) => {
  // Tạo hiệu ứng ánh nắng
  const sunray = document.createElement('div');
  sunray.className = 'sunray';
  sunray.style.setProperty('--x', '70%');
  sunray.style.setProperty('--y', '20%');
  container.appendChild(sunray);
  
  // Tạo bướm bay
  const butterfliesCount = 5;
  
  for (let i = 0; i < butterfliesCount; i++) {
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly';
    
    // Hue ngẫu nhiên
    butterfly.style.setProperty('--hue', Math.random() * 360);
    
    // Kích thước ngẫu nhiên
    const size = Math.random() * 15 + 15;
    butterfly.style.width = `${size}px`;
    butterfly.style.height = `${size}px`;
    
    // Vị trí ban đầu ngẫu nhiên
    butterfly.style.top = `${Math.random() * 80}vh`;
    
    // Thời gian và trễ ngẫu nhiên
    const duration = Math.random() * 20 + 15;
    butterfly.style.animationDuration = `${duration}s`;
    butterfly.style.animationDelay = `${Math.random() * 5}s`;
    
    // Nội dung bướm
    butterfly.innerHTML = '🦋';
    butterfly.style.fontSize = `${size}px`;
    
    container.appendChild(butterfly);
  }
};

/**
 * Hiệu ứng mùa thu (lá rơi)
 * @param {HTMLElement} container - Container chứa hiệu ứng
 */
const createAutumnEffect = (container) => {
  const leavesCount = 15;
  const leafTypes = ['🍁', '🍂', '🍃'];
  
  for (let i = 0; i < leavesCount; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    
    // Kích thước ngẫu nhiên
    const size = Math.random() * 15 + 15;
    leaf.style.fontSize = `${size}px`;
    
    // Vị trí ban đầu ngẫu nhiên
    leaf.style.left = `${Math.random() * 100}vw`;
    leaf.style.setProperty('--drift', Math.random() * 2 - 1);
    
    // Thời gian rơi ngẫu nhiên
    const fallDuration = Math.random() * 15 + 10;
    leaf.style.animationDuration = `${fallDuration}s`;
    
    // Thời gian bắt đầu ngẫu nhiên
    leaf.style.animationDelay = `${Math.random() * 15}s`;
    
    // Loại lá ngẫu nhiên
    const leafType = leafTypes[Math.floor(Math.random() * leafTypes.length)];
    leaf.innerHTML = leafType;
    
    container.appendChild(leaf);
  }
};

/**
 * Hiệu ứng mùa đông (tuyết rơi)
 * @param {HTMLElement} container - Container chứa hiệu ứng
 */
const createWinterEffect = (container) => {
  const snowflakesCount = 30;
  const snowflakeTypes = ['❄️', '❅', '❆', '✻', '✼', '❊'];
  
  for (let i = 0; i < snowflakesCount; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    
    // Kích thước ngẫu nhiên
    const size = Math.random() * 15 + 10;
    snowflake.style.fontSize = `${size}px`;
    
    // Vị trí ban đầu ngẫu nhiên
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.setProperty('--drift', Math.random() * 2 - 1);
    
    // Thời gian rơi và thời gian trễ ngẫu nhiên
    const fallDuration = Math.random() * 15 + 10;
    snowflake.style.animationDuration = `${fallDuration}s`;
    snowflake.style.animationDelay = `${Math.random() * 10}s`;
    
    // Loại tuyết ngẫu nhiên
    const snowflakeType = snowflakeTypes[Math.floor(Math.random() * snowflakeTypes.length)];
    snowflake.innerHTML = snowflakeType;
    
    container.appendChild(snowflake);
  }
};

/**
 * Hiệu ứng Giáng sinh
 * @param {HTMLElement} container - Container chứa hiệu ứng
 */
const createChristmasEffect = (container) => {
  // Tạo tuyết rơi
  createWinterEffect(container);
  
  // Thêm trang trí Giáng sinh
  const ornaments = ['🎄', '🎁', '🔔', '🎅', '⛄'];
  const positions = [
    { top: '10px', right: '10px', size: '40px' },
    { top: '10px', left: '10px', size: '35px' },
    { bottom: '10px', left: '10px', size: '30px' },
    { bottom: '10px', right: '10px', size: '45px' }
  ];
  
  for (let i = 0; i < 4; i++) {
    const ornament = document.createElement('div');
    ornament.className = 'ornament';
    
    // Vị trí
    Object.keys(positions[i]).forEach(key => {
      ornament.style[key] = positions[i][key];
    });
    
    // Nội dung
    ornament.innerHTML = ornaments[i % ornaments.length];
    ornament.style.fontSize = positions[i].size;
    
    container.appendChild(ornament);
  }
};

/**
 * Hiệu ứng Năm mới
 * @param {HTMLElement} container - Container chứa hiệu ứng
 */
const createNewYearEffect = (container) => {
  // Tạo confetti
  const confettiCount = 100;
  const colors = ['#FF5252', '#FFD740', '#69F0AE', '#40C4FF', '#FF4081', '#8C9EFF'];
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Kích thước ngẫu nhiên
    const size = Math.random() * 8 + 5;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    
    // Vị trí ban đầu ngẫu nhiên
    confetti.style.left = `${Math.random() * 100}vw`;
    
    // Thời gian rơi ngẫu nhiên
    const fallDuration = Math.random() * 5 + 2;
    confetti.style.animationDuration = `${fallDuration}s`;
    
    // Thời gian trễ ngẫu nhiên
    confetti.style.animationDelay = `${Math.random() * 5}s`;
    
    // Màu sắc ngẫu nhiên
    const color = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.backgroundColor = color;
    
    container.appendChild(confetti);
  }
  
  // Tạo pháo hoa
  const createFirework = () => {
    const x = Math.random() * 100;
    const y = Math.random() * 60 + 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'firework';
      
      // Vị trí
      particle.style.left = `${x}vw`;
      particle.style.top = `${y}vh`;
      
      // Màu sắc
      particle.style.backgroundColor = color;
      
      // Độ lớn vụ nổ
      const scale = Math.random() * 20 + 10;
      particle.style.setProperty('--scale', scale);
      
      // Hướng bắn
      const angle = (i / particleCount) * 360;
      particle.style.transform = `rotate(${angle}deg)`;
      
      container.appendChild(particle);
      
      // Xóa sau khi hiệu ứng kết thúc
      setTimeout(() => {
        particle.remove();
      }, 1000);
    }
  };
  
  // Tạo pháo hoa ngẫu nhiên
  const fireInterval = setInterval(() => {
    createFirework();
  }, 2000);
  
  // Dừng sau 30 giây
  setTimeout(() => {
    clearInterval(fireInterval);
  }, 30000);
};

/**
 * Hiệu ứng Valentine
 * @param {HTMLElement} container - Container chứa hiệu ứng
 */
const createValentineEffect = (container) => {
  const heartsCount = 25;
  const heartTypes = ['❤️', '💕', '💖', '💗', '💓', '💘'];
  
  for (let i = 0; i < heartsCount; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    
    // Kích thước ngẫu nhiên
    const size = Math.random() * 20 + 15;
    heart.style.fontSize = `${size}px`;
    
    // Vị trí ban đầu ngẫu nhiên
    heart.style.left = `${Math.random() * 100}vw`;
    
    // Thời gian bay ngẫu nhiên
    const floatDuration = Math.random() * 15 + 8;
    heart.style.animationDuration = `${floatDuration}s`;
    
    // Thời gian trễ ngẫu nhiên
    heart.style.animationDelay = `${Math.random() * 10}s`;
    
    // Loại tim ngẫu nhiên
    const heartType = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    heart.innerHTML = heartType;
    
    container.appendChild(heart);
  }
}; 