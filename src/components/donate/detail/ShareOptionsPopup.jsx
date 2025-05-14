import React from 'react';
import { 
  FaFacebookF, FaTwitter, FaWhatsapp, FaLink, 
  FaCheck, FaQrcode, FaDownload 
} from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';

const ShareOptionsPopup = ({ 
  showShareOptions,
  shareMessage, 
  setShareMessage, 
  handleShare,
  handleCopyLink,
  copySuccess,
  showQRCode,
  setShowQRCode,
  getQRCodeUrl,
  downloadQRCode
}) => {
  return (
    <>
      {showShareOptions && (
        <div
          className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-64 z-10"
        >
          <h3 className="text-sm font-bold text-gray-700 mb-2">Chia sẻ chiến dịch</h3>

          {/* Social media share buttons */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            <button
              onClick={() => handleShare('facebook')}
              className="flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg hover:bg-blue-100"
              title="Chia sẻ lên Facebook"
            >
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mb-1">
                <FaFacebookF />
              </div>
              <span className="text-xs text-gray-600">Facebook</span>
            </button>

            <button
              onClick={() => handleShare('twitter')}
              className="flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg hover:bg-blue-100"
              title="Chia sẻ lên Twitter"
            >
              <div className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center mb-1">
                <FaTwitter />
              </div>
              <span className="text-xs text-gray-600">Twitter</span>
            </button>

            <button
              onClick={() => handleShare('whatsapp')}
              className="flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg hover:bg-blue-100"
              title="Chia sẻ qua WhatsApp"
            >
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mb-1">
                <FaWhatsapp />
              </div>
              <span className="text-xs text-gray-600">WhatsApp</span>
            </button>

            <button
              onClick={() => handleShare('zalo')}
              className="flex flex-col items-center justify-center p-2 bg-blue-50 rounded-lg hover:bg-blue-100"
              title="Chia sẻ qua Zalo"
            >
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mb-1">
                <SiZalo />
              </div>
              <span className="text-xs text-gray-600">Zalo</span>
            </button>
          </div>

          {/* Share message */}
          <div className="mb-3">
            <label className="text-xs text-gray-600 block mb-1">Nội dung chia sẻ:</label>
            <textarea
              value={shareMessage}
              onChange={(e) => setShareMessage(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              rows="2"
            ></textarea>
          </div>

          {/* Copy link button */}
          <button
            className="flex items-center w-full p-2 hover:bg-gray-100 rounded-md text-left mb-2"
            onClick={handleCopyLink}
          >
            {copySuccess ? <FaCheck className="mr-2 text-green-500" /> : <FaLink className="mr-2 text-gray-500" />}
            {copySuccess ? 'Đã sao chép' : 'Sao chép liên kết'}
          </button>

          {/* QR Code */}
          <div>
            <button
              className="flex items-center w-full p-2 hover:bg-gray-100 rounded-md text-left"
              onClick={() => setShowQRCode(!showQRCode)}
            >
              <FaQrcode className="mr-2 text-gray-500" />
              {showQRCode ? 'Ẩn mã QR' : 'Hiện mã QR'}
            </button>

            {showQRCode && (
              <div
                className="mt-2 flex flex-col items-center"
              >
                <img
                  src={getQRCodeUrl()}
                  alt="QR Code"
                  className="w-32 h-32 mb-2"
                />
                <button
                  onClick={downloadQRCode}
                  className="text-xs flex items-center text-purple-600"
                >
                  <FaDownload className="mr-1" /> Tải về
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ShareOptionsPopup; 