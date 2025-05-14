import React from 'react';
import { motion } from 'framer-motion';
import { FaPaw, FaHandHoldingHeart, FaHome, FaSyringe, FaHeart } from 'react-icons/fa';
import DonationDistributionChart from './DonationDistributionChart';
import SuccessStories from './SuccessStories';
import PropTypes from 'prop-types';

const DonationImpactSection = ({ donationDistribution, successStories }) => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Tác động của quyên góp</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Mỗi đồng quyên góp đều được sử dụng hiệu quả để cải thiện cuộc sống của các bé thú cưng. 
            Xem cách chúng tôi phân bổ nguồn lực và những câu chuyện thành công từ sự giúp đỡ của bạn.
          </p>
        </motion.div>
        
        {/* Donation Distribution Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <DonationDistributionChart donationDistribution={donationDistribution} />
          
          {/* Annual Impact Stats */}
          <motion.div 
            className="p-6 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-6">Tác động năm 2023</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-3 mx-auto">
                  <FaPaw className="text-xl text-white" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">624</div>
                  <div className="text-sm opacity-80">Thú cưng được cứu trợ</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-3 mx-auto">
                  <FaHome className="text-xl text-white" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">453</div>
                  <div className="text-sm opacity-80">Thú cưng tìm được nhà mới</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-3 mx-auto">
                  <FaSyringe className="text-xl text-white" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">872</div>
                  <div className="text-sm opacity-80">Ca tiêm phòng & triệt sản</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-3 mx-auto">
                  <FaHandHoldingHeart className="text-xl text-white" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">1,206</div>
                  <div className="text-sm opacity-80">Nhà hảo tâm đã đóng góp</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white/10 p-4 rounded-lg">
              <div className="flex items-center">
                <FaHeart className="text-red-300 mr-2" />
                <span className="font-semibold">Tổng số tiền quyên góp:</span>
                <span className="ml-auto font-bold text-xl">2,367,500,000 ₫</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Success Stories Section */}
        <SuccessStories stories={successStories} />
      </div>
    </section>
  );
};

DonationImpactSection.propTypes = {
  donationDistribution: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired,
      icon: PropTypes.node.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired,
  successStories: PropTypes.array.isRequired
};

export default DonationImpactSection; 