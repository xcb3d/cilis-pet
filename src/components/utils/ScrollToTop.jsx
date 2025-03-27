import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component - scrolls to top on route change 
 * and provides a cute "back to top" button
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Show/hide button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowButton(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {showButton && (
        <button 
          className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center shadow-md hover:bg-pink-200 transition-all group"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            boxShadow: '0 5px 15px rgba(255, 182, 193, 0.5)',
            animation: 'floatButton 3s infinite alternate ease-in-out'
          }}
        >
          <div className="relative flex items-center justify-center">
            {/* Pet emoji that changes on hover */}
            <div 
              className="text-2xl transition-all duration-300 group-hover:opacity-0 group-hover:transform group-hover:translate-y-[-20px]"
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
              }}
            >
              🐱
            </div>
            
            {/* Arrow appears on hover */}
            <div 
              className="text-2xl opacity-0 transform translate-y-[20px] transition-all duration-300 group-hover:opacity-100 group-hover:transform group-hover:translate-y-[0px]"
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
              }}
            >
              ⬆️
            </div>
          </div>
        </button>
      )}

      <style jsx="true">{`
        @keyframes floatButton {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </>
  );
};

export default ScrollToTop; 