/**
 * Animation Utilities Index
 * Exports all animation modules with lazy loading
 */

// Hàm khởi tạo tổng hợp - đây là API chính được export
export const initializeAllAnimations = async () => {
  try {
    // Khởi tạo các hiệu ứng cơ bản (eager loaded)
    const { setupBasicAnimations } = await import('./basic');
    setupBasicAnimations();
    
    // Lắng nghe sự kiện để lazy load các module khác khi cần
    setupLazyLoading();
  } catch (error) {
    console.error('Failed to initialize animations:', error);
  }
};

// Hàm thiết lập lazy loading các module animation
const setupLazyLoading = () => {
  // Lazy load các hiệu ứng con trỏ khi di chuyển chuột
  document.addEventListener('mousemove', lazyLoadCursorEffects, { once: true });
  
  // Lazy load các hiệu ứng click khi click
  document.addEventListener('click', lazyLoadClickEffects, { once: true });
  
  // Lazy load các hiệu ứng hover khi hover
  document.addEventListener('mouseover', lazyLoadHoverEffects, { once: true });
  
  // Lazy load các hiệu ứng mùa vụ sau khi trang đã tải xong
  if (document.readyState === 'complete') {
    lazyLoadSeasonalEffects();
  } else {
    window.addEventListener('load', lazyLoadSeasonalEffects, { once: true });
  }
};

// Hàm lazy load các hiệu ứng con trỏ
const lazyLoadCursorEffects = async () => {
  try {
    const { setupCursorEffects } = await import('./cursor');
    setupCursorEffects();
  } catch (error) {
    console.error('Failed to load cursor effects:', error);
  }
};

// Hàm lazy load các hiệu ứng click
const lazyLoadClickEffects = async () => {
  try {
    const { setupClickEffects } = await import('./click');
    setupClickEffects();
  } catch (error) {
    console.error('Failed to load click effects:', error);
  }
};

// Hàm lazy load các hiệu ứng hover
const lazyLoadHoverEffects = async () => {
  try {
    const { setupHoverEffects } = await import('./hover');
    setupHoverEffects();
  } catch (error) {
    console.error('Failed to load hover effects:', error);
  }
};

// Hàm lazy load các hiệu ứng mùa vụ
const lazyLoadSeasonalEffects = async () => {
  try {
    const { setupSeasonalEffects } = await import('./seasonal');
    setupSeasonalEffects();
  } catch (error) {
    console.error('Failed to load seasonal effects:', error);
  }
};

// Tạo và export hàm để load một hiệu ứng cụ thể theo yêu cầu
export const loadSpecificAnimation = async (animationType) => {
  let animationFunction = null;
  
  switch (animationType) {
    case 'stickers':
      {
        const { createCustomStickers } = await import('./stickers');
        animationFunction = createCustomStickers;
      }
      break;
    case 'sparkle':
      {
        const { createSparkleEffect } = await import('./hover');
        animationFunction = createSparkleEffect;
      }
      break;
    case 'confetti':
      {
        const { createConfettiButtonEffect } = await import('./click');
        animationFunction = createConfettiButtonEffect;
      }
      break;
    case 'pawPrint':
      {
        const { createPawPrintTrail } = await import('./cursor');
        animationFunction = createPawPrintTrail;
      }
      break;
    case 'hearts':
      {
        const { createHeartClickEffect } = await import('./click');
        animationFunction = createHeartClickEffect;
      }
      break;
    case 'cinemagraph':
      {
        const { createCinemagraphEffect } = await import('./image');
        animationFunction = createCinemagraphEffect;
      }
      break;
    case 'cursor':
      {
        const { createCustomCursorEffect } = await import('./cursor');
        animationFunction = createCustomCursorEffect;
      }
      break;
    case 'trail':
      {
        const { createCursorTrailEffect } = await import('./cursor');
        animationFunction = createCursorTrailEffect;
      }
      break;
    case 'seasonal':
      {
        const { createSeasonalEffect } = await import('./seasonal');
        animationFunction = createSeasonalEffect;
      }
      break;
    default:
      console.warn(`Animation type '${animationType}' not found`);
  }
  
  return animationFunction;
}; 