import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaExclamationCircle, FaCheckCircle, FaCreditCard, 
  FaUniversity, FaPaypal, FaMobileAlt, FaCheck, 
  FaHandHoldingHeart, FaRegSmile 
} from 'react-icons/fa';
import PropTypes from 'prop-types';

const DonationForm = ({ 
  donationOptions, 
  handleSubmit, 
  formData, 
  formErrors, 
  handleInputChange, 
  handleOptionSelect, 
  selectedOption,
  customAmount,
  handleCustomAmountChange,
  paymentMethod,
  setPaymentMethod,
  showThankYou,
  isSubmitting,
  formatCurrency
}) => {
  return (
    <motion.section 
      key="onetime"
      id="donateNow"
      className="py-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Quyên góp một lần</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Chọn số tiền quyên góp</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {donationOptions.map((option) => (
                <motion.button
                  key={option.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedOption?.id === option.id 
                      ? 'border-purple-600 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => handleOptionSelect(option)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="font-bold text-xl text-gray-800 mb-1">
                    {formatCurrency(option.amount)}
                  </div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </motion.button>
              ))}
            </div>
            
            {/* Hiển thị lỗi cho phần chọn số tiền */}
            {formErrors.amount && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 text-red-500 flex items-center"
              >
                <FaExclamationCircle className="mr-1" />
                <span>{formErrors.amount}</span>
              </motion.div>
            )}
            
            {selectedOption?.amount === "Tùy chọn" && (
              <motion.div 
                className="mt-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-gray-700 mb-2">Nhập số tiền (VNĐ):</label>
                <div className="relative">
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className={`w-full p-3 pl-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                      formErrors.amount ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ví dụ: 200000"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    VNĐ
                  </div>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  * Số tiền quyên góp tối thiểu là 10,000 VNĐ
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Payment methods */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Phương thức thanh toán</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <motion.button
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  paymentMethod === 'card' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('card')}
                whileHover={{ y: -2 }}
              >
                <FaCreditCard className={`text-2xl mb-1 ${paymentMethod === 'card' ? 'text-purple-600' : 'text-gray-600'}`} />
                <span className="text-sm">Thẻ tín dụng</span>
              </motion.button>
              
              <motion.button
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  paymentMethod === 'bank' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('bank')}
                whileHover={{ y: -2 }}
              >
                <FaUniversity className={`text-2xl mb-1 ${paymentMethod === 'bank' ? 'text-purple-600' : 'text-gray-600'}`} />
                <span className="text-sm">Chuyển khoản</span>
              </motion.button>
              
              <motion.button
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  paymentMethod === 'ewallet' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('ewallet')}
                whileHover={{ y: -2 }}
              >
                <FaMobileAlt className={`text-2xl mb-1 ${paymentMethod === 'ewallet' ? 'text-purple-600' : 'text-gray-600'}`} />
                <span className="text-sm">Ví điện tử</span>
              </motion.button>
              
              <motion.button
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  paymentMethod === 'paypal' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('paypal')}
                whileHover={{ y: -2 }}
              >
                <FaPaypal className={`text-2xl mb-1 ${paymentMethod === 'paypal' ? 'text-purple-600' : 'text-gray-600'}`} />
                <span className="text-sm">PayPal</span>
              </motion.button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Họ tên:</label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                      formErrors.fullName ? 'border-red-500' : formData.fullName ? 'border-green-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập họ tên của bạn"
                  />
                  {formData.fullName && !formErrors.fullName && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                      <FaCheckCircle />
                    </div>
                  )}
                </div>
                {formErrors.fullName && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-red-500 text-sm flex items-center"
                  >
                    <FaExclamationCircle className="mr-1" />
                    <span>{formErrors.fullName}</span>
                  </motion.div>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email:</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                      formErrors.email ? 'border-red-500' : formData.email ? 'border-green-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập địa chỉ email"
                  />
                  {formData.email && !formErrors.email && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                      <FaCheckCircle />
                    </div>
                  )}
                </div>
                {formErrors.email && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-red-500 text-sm flex items-center"
                  >
                    <FaExclamationCircle className="mr-1" />
                    <span>{formErrors.email}</span>
                  </motion.div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Lời nhắn (không bắt buộc):</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                rows="3"
                placeholder="Nhập lời nhắn của bạn"
              ></textarea>
            </div>
            
            <div className="pt-4">
              <AnimatePresence>
                {showThankYou ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                  >
                    <div className="flex items-center justify-center text-green-500 mb-4">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <FaRegSmile className="text-4xl" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">Cảm ơn bạn!</h3>
                    <p className="text-green-600 mb-3">
                      Quyên góp của bạn sẽ giúp chúng tôi chăm sóc tốt hơn cho các bé thú cưng.
                    </p>
                    <div className="inline-flex items-center text-green-600 font-medium">
                      <FaCheck className="mr-2" />
                      Chúng tôi đã gửi email xác nhận đến {formData.email}
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    type="submit"
                    className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <FaHandHoldingHeart className="mr-2" />
                        Hoàn tất quyên góp
                      </>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

DonationForm.propTypes = {
  donationOptions: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleOptionSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.object,
  customAmount: PropTypes.string.isRequired,
  handleCustomAmountChange: PropTypes.func.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  setPaymentMethod: PropTypes.func.isRequired,
  showThankYou: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  formatCurrency: PropTypes.func.isRequired
};

export default DonationForm; 