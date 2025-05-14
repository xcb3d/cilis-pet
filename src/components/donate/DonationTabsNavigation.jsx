import React from 'react';
import PropTypes from 'prop-types';

const DonationTabsNavigation = ({ activeSection, setActiveSection }) => {
  return (
    <section className="py-8 px-4 bg-white border-t border-b border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center md:justify-start space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          <button
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              activeSection === 'campaigns' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveSection('campaigns')}
          >
            Chiến dịch quyên góp
          </button>
          <button
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              activeSection === 'onetime' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveSection('onetime')}
          >
            Quyên góp một lần
          </button>
          <button
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              activeSection === 'other' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveSection('other')}
          >
            Các cách hỗ trợ khác
          </button>
        </div>
      </div>
    </section>
  );
};

DonationTabsNavigation.propTypes = {
  activeSection: PropTypes.oneOf(['campaigns', 'onetime', 'other']).isRequired,
  setActiveSection: PropTypes.func.isRequired
};

export default DonationTabsNavigation; 