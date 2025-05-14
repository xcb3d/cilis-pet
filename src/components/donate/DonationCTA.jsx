import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const DonationCTA = ({ onExploreClick, onDonateClick }) => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white mt-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Mỗi hành động nhỏ đều tạo nên sự thay đổi lớn
        </motion.h2>
        
        <motion.p 
          className="text-lg opacity-90 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Cùng chúng tôi xây dựng một thế giới tốt đẹp hơn cho thú cưng. Hãy đồng hành cùng sứ mệnh của chúng tôi ngay hôm nay.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.button
            className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExploreClick}
          >
            Khám phá các chiến dịch
          </motion.button>
          
          <motion.button
            className="px-8 py-3 bg-transparent border-2 border-white rounded-full font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDonateClick}
          >
            Quyên góp ngay
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

DonationCTA.propTypes = {
  onExploreClick: PropTypes.func.isRequired,
  onDonateClick: PropTypes.func.isRequired
};

export default DonationCTA; 