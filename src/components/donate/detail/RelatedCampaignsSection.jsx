import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaChevronRight } from 'react-icons/fa';

const RelatedCampaignsSection = ({ relatedCampaigns }) => {
  return (
    <div className="mt-10 mb-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Các chiến dịch liên quan</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedCampaigns.map(relatedCampaign => (
          <Link
            to={`/donate/${relatedCampaign.id}`}
            key={relatedCampaign.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={
                  relatedCampaign.id === 1 ? 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8'
                    : relatedCampaign.id === 2 ? 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d'
                      : relatedCampaign.id === 3 ? 'https://images.unsplash.com/photo-1511732351157-1865efcb7b7b'
                        : 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee'
                }
                alt={relatedCampaign.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg">{relatedCampaign.title}</h3>
              </div>

              {/* Show urgency tag if needed */}
              {relatedCampaign.endDate !== 'Không thời hạn' && (
                <>
                  {(() => {
                    const endDateParts = relatedCampaign.endDate.split('/');
                    const endDate = new Date(
                      parseInt(endDateParts[2]),
                      parseInt(endDateParts[1]) - 1,
                      parseInt(endDateParts[0])
                    );
                    const today = new Date();
                    const timeDiff = endDate.getTime() - today.getTime();
                    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    if (daysRemaining <= 7 && daysRemaining > 0) {
                      return (
                        <span className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                          Còn {daysRemaining} ngày
                        </span>
                      );
                    }
                    return null;
                  })()}
                </>
              )}
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <div className="flex-1">
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {relatedCampaign.description}
                </p>
              </div>

              {/* Progress bar */}
              <div className="mt-auto">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-bold text-purple-700">
                    {Math.round((relatedCampaign.current / relatedCampaign.target) * 100)}%
                  </span>
                  <span className="text-gray-500">
                    {new Intl.NumberFormat('vi-VN').format(relatedCampaign.current)} ₫
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${Math.round((relatedCampaign.current / relatedCampaign.target) * 100) >= 75
                        ? 'bg-green-500'
                        : Math.round((relatedCampaign.current / relatedCampaign.target) * 100) >= 50
                          ? 'bg-blue-500'
                          : Math.round((relatedCampaign.current / relatedCampaign.target) * 100) >= 25
                            ? 'bg-yellow-500'
                            : 'bg-pink-500'
                      }`}
                    style={{ width: `${Math.min(Math.round((relatedCampaign.current / relatedCampaign.target) * 100), 100)}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center text-xs text-gray-500">
                  <FaUsers className="mr-1" />
                  {relatedCampaign.supporters} người ủng hộ
                </div>
                <div className="text-purple-600 font-medium text-sm flex items-center">
                  Xem chi tiết
                  <FaChevronRight className="ml-1 text-xs" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Link
          to="/donate"
          className="px-6 py-2.5 bg-white border border-purple-500 text-purple-600 rounded-full hover:bg-purple-50 transition-colors flex items-center font-medium"
        >
          Xem tất cả chiến dịch
          <FaChevronRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default RelatedCampaignsSection; 