import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaDownload, FaShare, FaBell } from 'react-icons/fa';

const ThankYouModal = ({
  showThankYouModal,
  handleCloseThankYouModal,
  donationDetails,
  formatCurrency,
  getDonationImpact,
  donationCertificateUrl,
  setShowShareOptions,
  setShowThankYouModal,
  setNotificationEmail,
  email
}) => {
  if (!showThankYouModal || !donationDetails) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-md w-full shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white relative">
          <button
            className="absolute top-3 right-3 text-white/80 hover:text-white"
            onClick={handleCloseThankYouModal}
          >
            <FaTimes />
          </button>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
              <FaCheck className="text-purple-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-center">Cảm ơn bạn đã quyên góp!</h2>
            <p className="text-white/90 text-center mt-2">
              Đóng góp của bạn sẽ tạo nên sự thay đổi lớn
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3">Chi tiết quyên góp</h3>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex justify-between py-2 border-b border-purple-100">
                <span className="text-gray-600">Số tiền:</span>
                <span className="font-bold text-purple-700">{formatCurrency(donationDetails.amount)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-purple-100">
                <span className="text-gray-600">Người quyên góp:</span>
                <span className="font-bold">{donationDetails.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-purple-100">
                <span className="text-gray-600">Ngày:</span>
                <span className="font-bold">{donationDetails.date}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Chiến dịch:</span>
                <span className="font-bold">{donationDetails.campaignTitle}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-2">Tác động của bạn</h3>
            <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r-md">
              <p className="text-green-800">
                Với {formatCurrency(donationDetails.amount)}, bạn đã giúp {getDonationImpact(donationDetails.amount)}!
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3">Chứng nhận quyên góp</h3>
            <div className="flex justify-center">
              <img
                src={donationCertificateUrl}
                alt="Chứng nhận quyên góp"
                className="w-36 h-36 border border-gray-200 rounded-md"
              />
            </div>
            <div className="flex justify-center mt-2">
              <button
                className="text-purple-600 flex items-center text-sm"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = donationCertificateUrl;
                  link.download = 'chung-nhan-quyen-gop.png';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <FaDownload className="mr-1" /> Tải về chứng nhận
              </button>
            </div>
          </div>

          <h3 className="font-bold text-gray-800 mb-3">Bạn có thể</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 hover:bg-purple-50 transition-colors"
              onClick={() => {
                setShowThankYouModal(false);
                setShowShareOptions(true);
              }}
            >
              <FaShare className="text-purple-600 mb-2" />
              <span className="text-sm text-gray-800">Chia sẻ chiến dịch</span>
            </button>

            <button
              className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 hover:bg-purple-50 transition-colors"
              onClick={() => {
                setShowThankYouModal(false);
                setNotificationEmail(email);
              }}
            >
              <FaBell className="text-purple-600 mb-2" />
              <span className="text-sm text-gray-800">Theo dõi cập nhật</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYouModal; 