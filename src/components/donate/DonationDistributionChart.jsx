import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const DonationDistributionChart = ({ donationDistribution }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-md"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6">Phân bổ quyên góp</h3>
      
      <div className="space-y-6">
        {donationDistribution.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                {item.icon}
                <span className="ml-2 font-medium">{item.category}</span>
              </div>
              <span className="font-bold">{item.percentage}%</span>
            </div>
            
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${item.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${item.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-100">
        <h4 className="font-semibold text-gray-700 mb-2">Hiệu quả quyên góp</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">95%</div>
            <div className="text-xs text-gray-500">trực tiếp đến thú cưng</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">3%</div>
            <div className="text-xs text-gray-500">vận hành</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">2%</div>
            <div className="text-xs text-gray-500">marketing</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

DonationDistributionChart.propTypes = {
  donationDistribution: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired,
      icon: PropTypes.node.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired
};

export default DonationDistributionChart; 