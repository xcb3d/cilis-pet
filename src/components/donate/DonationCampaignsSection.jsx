import React from 'react';
import { motion } from 'framer-motion';
import DonationCard from './DonationCard';
import PropTypes from 'prop-types';

const DonationCampaignsSection = ({ campaigns }) => {
  return (
    <motion.section 
      key="campaigns"
      className="py-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Các chiến dịch đang quyên góp</h2>
          <p className="text-gray-600">
            Chọn một chiến dịch mà bạn muốn hỗ trợ. Mỗi đồng góp đều quan trọng và mang lại sự thay đổi.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <DonationCard campaign={campaign} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

DonationCampaignsSection.propTypes = {
  campaigns: PropTypes.array.isRequired
};

export default DonationCampaignsSection; 