import React, { useState } from 'react';
import { FaRegCalendarAlt, FaChevronDown } from 'react-icons/fa';

const CampaignUpdatesSection = ({ campaignUpdates }) => {
  const [expandedUpdate, setExpandedUpdate] = useState(null);

  // Toggle update expansion
  const toggleUpdate = (id) => {
    setExpandedUpdate(expandedUpdate === id ? null : id);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 relative inline-block">
        Cập nhật chiến dịch
        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></span>
      </h2>

      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
        {/* Timeline updates - improved design */}
        <div className="space-y-6 mb-8">
          {campaignUpdates.map((update) => (
            <div
              key={update.id}
              className="relative"
            >
              <div className="flex items-start">
                {/* Circle marker with animation */}
                <div className="relative mr-4 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-purple-100 border-2 border-purple-300 flex items-center justify-center z-10 relative shadow-sm">
                    <FaRegCalendarAlt className="text-purple-600 text-lg" />
                  </div>
                  {update.id !== campaignUpdates.length && (
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-300 to-purple-100"></div>
                  )}
                </div>

                <div className="flex-1">
                  {/* Date with better styling */}
                  <div className="mb-2 inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-medium">
                    {update.date}
                  </div>
                  
                  {/* Update card with hover effects */}
                  <div
                    className={`bg-white rounded-xl border overflow-hidden transition-all duration-200 ease-in-out
                      ${expandedUpdate === update.id ? 'shadow-md border-purple-200' : 'border-gray-200 hover:border-purple-200 hover:shadow-sm'}`}
                  >
                    <div
                      className="p-4 cursor-pointer flex justify-between items-center transition-colors duration-200 ease-in-out hover:bg-purple-50/50"
                      onClick={() => toggleUpdate(update.id)}
                      aria-expanded={expandedUpdate === update.id}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && toggleUpdate(update.id)}
                    >
                      <h3 className="font-bold text-gray-800 text-lg">{update.title}</h3>
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${expandedUpdate === update.id ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}
                        style={{ transform: expandedUpdate === update.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        <FaChevronDown />
                      </div>
                    </div>

                    {expandedUpdate === update.id && (
                      <div
                        className="border-t border-gray-100 overflow-hidden"
                      >
                        <div className="p-4">
                          <div className="mb-4 rounded-lg overflow-hidden shadow-sm">
                            <img
                              src={update.image}
                              alt={update.title}
                              className="w-full h-52 md:h-64 object-cover transform transition-transform duration-700 hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {update.content}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignUpdatesSection; 