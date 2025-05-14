import React from 'react';
import { 
  FaCreditCard, FaUniversity, FaQrcode, 
  FaHandHoldingHeart, FaChevronRight, 
  FaInfoCircle, FaCheck, FaRedoAlt, FaPaw 
} from 'react-icons/fa';

const donationOptions = [
  { value: 50000, label: '50.000 ₫', impact: 'Thức ăn cho 1 chú chó trong 3 ngày' },
  { value: 100000, label: '100.000 ₫', impact: 'Vắc-xin cơ bản cho 1 bé mèo' },
  { value: 200000, label: '200.000 ₫', impact: 'Thuốc trị ký sinh trùng cho 5 bé thú' },
  { value: 500000, label: '500.000 ₫', impact: 'Chi phí phẫu thuật nhỏ cho 1 bé thú' }
];

const paymentMethods = [
  { id: 'credit_card', name: 'Thẻ tín dụng/ghi nợ', icon: <FaCreditCard className="text-blue-500" /> },
  { id: 'bank_transfer', name: 'Chuyển khoản ngân hàng', icon: <FaUniversity className="text-green-500" /> },
  { id: 'e_wallet', name: 'Ví điện tử (MoMo, ZaloPay)', icon: <FaQrcode className="text-pink-500" /> }
];

const DonationDetailForm = ({
  donationAmount,
  setDonationAmount,
  customAmount,
  setCustomAmount,
  isRecurring,
  setIsRecurring,
  recurringPeriod,
  setRecurringPeriod,
  paymentMethod,
  setPaymentMethod,
  isAnonymous,
  setIsAnonymous,
  name,
  setName,
  email,
  setEmail,
  message,
  setMessage,
  handleDonationSubmit,
  donationImpact
}) => {
  return (
    <div className="w-full lg:w-96 lg:ml-auto">
      <div className="bg-white rounded-xl p-6 sticky top-24 shadow-lg border border-purple-100">
        <h2 className="text-xl font-bold mb-5 text-center text-purple-800">Quyên góp ngay</h2>

        <form onSubmit={handleDonationSubmit}>
          {/* Donation amounts */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-3">Số tiền quyên góp</label>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {donationOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  className={`py-3 px-3 rounded-lg border text-center transition-all ${donationAmount === option.value
                    ? 'bg-purple-600 border-purple-600 text-white font-bold'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                    }`}
                  onClick={() => {
                    setDonationAmount(option.value);
                    setCustomAmount('');
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                id="customAmount"
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                checked={donationAmount === 'custom'}
                onChange={() => setDonationAmount('custom')}
              />
              <label htmlFor="customAmount" className="text-gray-700">Số tiền khác</label>
            </div>

            {donationAmount === 'custom' && (
              <div className="mt-2">
                <input
                  type="number"
                  placeholder="Nhập số tiền (VNĐ)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  min="1000"
                  step="1000"
                />
              </div>
            )}

            {/* Donation Impact */}
            {donationImpact && (
              <div className="mt-3 p-2 bg-purple-50 rounded-lg text-sm text-purple-700 flex items-start">
                <FaPaw className="mr-2 mt-0.5 flex-shrink-0" />
                <span>{donationImpact}</span>
              </div>
            )}
          </div>

          {/* Recurring donation options */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="recurringDonation"
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                checked={isRecurring}
                onChange={() => setIsRecurring(!isRecurring)}
              />
              <label htmlFor="recurringDonation" className="text-gray-700 font-medium">
                Quyên góp định kỳ
                <span className="text-xs ml-2 bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Tiết kiệm 5%</span>
              </label>
            </div>

            {isRecurring && (
              <div className="ml-6">
                <p className="text-sm text-gray-600 mb-2">Chọn tần suất:</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${recurringPeriod === 'monthly'
                        ? 'bg-purple-600 border-purple-600 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-purple-50'
                      }`}
                    onClick={() => setRecurringPeriod('monthly')}
                  >
                    <FaRedoAlt className="inline mr-1 text-xs" /> Hàng tháng
                  </button>
                  <button
                    type="button"
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${recurringPeriod === 'quarterly'
                        ? 'bg-purple-600 border-purple-600 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-purple-50'
                      }`}
                    onClick={() => setRecurringPeriod('quarterly')}
                  >
                    <FaRedoAlt className="inline mr-1 text-xs" /> Hàng quý
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Payment methods */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-3">Phương thức thanh toán</label>
            <div className="space-y-2">
              {paymentMethods.map(method => (
                <div
                  key={method.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all flex items-center ${paymentMethod === method.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-300 hover:border-purple-300'
                    }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <div className="mr-3">{method.icon}</div>
                  <div>{method.name}</div>
                  {paymentMethod === method.id && <FaCheck className="ml-auto text-green-500" />}
                </div>
              ))}
            </div>
          </div>

          {/* Personal info */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-3">Thông tin cá nhân</label>

            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="anonymousDonation"
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(!isAnonymous)}
              />
              <label htmlFor="anonymousDonation" className="text-gray-700">Quyên góp ẩn danh</label>
            </div>

            {!isAnonymous && (
              <>
                <input
                  type="text"
                  placeholder="Họ tên"
                  className="mb-3 w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            )}
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-3">Lời nhắn (không bắt buộc)</label>
            <textarea
              placeholder="Nhập lời nhắn của bạn"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg 
                    font-medium flex items-center justify-center group shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all"
            disabled={!donationAmount || (donationAmount === 'custom' && !customAmount) || !paymentMethod}
          >
            <FaHandHoldingHeart className="mr-2 text-lg" />
            Quyên góp ngay
            <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="mt-4 text-xs text-gray-500 flex items-start bg-gray-50 p-3 rounded-lg">
            <FaInfoCircle className="mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
            <span>Đây chỉ là demo, không có khoản thanh toán thực tế nào được thực hiện.</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationDetailForm; 