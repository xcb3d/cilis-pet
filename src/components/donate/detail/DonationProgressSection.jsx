import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, FaCalendarAlt, FaChevronRight, 
  FaHandHoldingHeart 
} from 'react-icons/fa';

const DonationProgressSection = ({
  campaign,
  formatCurrency,
  getProgressPercentage,
  getProgressColor,
  getDaysRemaining,
  countdown,
  recentDonations,
  getMilestones
}) => {
  const [showRecentDonations, setShowRecentDonations] = useState(false);

  return (
    <div className="mb-8 bg-purple-50/50 p-5 rounded-xl">
      <div className="flex justify-between mb-2">
        <span className="font-bold text-xl text-purple-700">{formatCurrency(campaign.current)}</span>
        <span className="text-gray-500 font-medium">mục tiêu: {formatCurrency(campaign.target)}</span>
      </div>

      {/* Progress bar with milestones */}
      <div className="relative">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${getProgressColor()}`}
            initial={{ width: 0 }}
            animate={{ width: `${getProgressPercentage()}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>

        {/* Milestone markers */}
        <div className="w-full h-3 absolute top-0 left-0">
          {getMilestones().map((milestone, index) => (
            <div
              key={index}
              className="absolute top-0 transform -translate-x-1/2 group hover:z-toast"
              style={{ left: `${milestone.percentage}%` }}
            >
              <div
                className={`w-3 h-3 rounded-full border-2 border-white ${milestone.reached ? 'bg-green-500' : 'bg-gray-400'
                  }`}
              ></div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                <span
                  className={`text-xs font-medium px-1.5 py-0.5 rounded whitespace-nowrap ${milestone.reached
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                    }`}
                >
                  {milestone.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center mt-8">
        <span className="text-gray-700 font-medium text-lg mb-2 md:mb-0">
          <span className="text-purple-600 font-bold">{getProgressPercentage()}%</span> hoàn thành
        </span>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <FaUsers className="mr-2 text-blue-500" />
            <span className="font-medium">{campaign.supporters} người ủng hộ</span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-orange-500" />
            {getDaysRemaining() === "∞" ? (
              <span className="font-medium">Không thời hạn</span>
            ) : (
              <span className="font-medium">Còn <span className="text-red-500 font-bold">{getDaysRemaining()}</span> ngày</span>
            )}
          </div>
        </div>
      </div>

      {/* Recent Donations Section */}
      <div className="mt-4">
        <button
          onClick={() => setShowRecentDonations(!showRecentDonations)}
          className="text-sm text-purple-600 font-medium flex items-center"
        >
          {showRecentDonations ? (
            <>
              <FaChevronRight className="mr-1 transform rotate-90" />
              Ẩn danh sách quyên góp gần đây
            </>
          ) : (
            <>
              <FaChevronRight className="mr-1" />
              Xem quyên góp gần đây
            </>
          )}
        </button>

        {showRecentDonations && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden"
          >
            <ul className="divide-y divide-gray-100">
              {recentDonations.map(donation => (
                <li key={donation.id} className="p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <FaHandHoldingHeart className="text-purple-500" />
                    </div>
                    <div>
                      <span className="font-medium block">
                        {donation.isAnonymous ? 'Ẩn danh' : donation.name}
                      </span>
                      <span className="text-xs text-gray-500">{donation.time}</span>
                    </div>
                  </div>
                  <span className="font-bold text-purple-700">
                    {formatCurrency(donation.amount)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Countdown timer for urgent campaigns */}
      {campaign.endDate !== 'Không thời hạn' && getDaysRemaining() <= 7 && getDaysRemaining() > 0 && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
          <h4 className="text-sm font-bold text-red-700 mb-2 flex items-center">
            <FaCalendarAlt className="mr-2" />
            Thời gian còn lại:
          </h4>
          <div className="flex justify-center gap-3">
            <div className="text-center">
              <div className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                {countdown.days}
              </div>
              <div className="text-xs mt-1 text-red-700">Ngày</div>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                {countdown.hours}
              </div>
              <div className="text-xs mt-1 text-red-700">Giờ</div>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                {countdown.minutes}
              </div>
              <div className="text-xs mt-1 text-red-700">Phút</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationProgressSection; 