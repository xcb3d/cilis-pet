import React from 'react';

const CampaignInfoSection = ({ campaign }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 relative inline-block">
        Thông tin chiến dịch
        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></span>
      </h2>
      <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
        <p className="text-gray-700 leading-relaxed mb-6">
          {campaign.description}
        </p>

        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg mb-6">
          <h3 className="font-bold text-xl text-purple-800 mb-3">Về chiến dịch "{campaign.title}"</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Chiến dịch này được khởi động nhằm mục đích hỗ trợ các thú cưng đang gặp khó khăn tại các trại cứu trợ. Mỗi đóng góp của bạn đều góp phần tạo nên sự thay đổi tích cực trong cuộc sống của những người bạn bốn chân đáng yêu.
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-bold text-lg text-gray-800 mb-3">Tại sao chiến dịch này quan trọng?</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Giúp cải thiện điều kiện sống cho các thú cưng tại trại cứu trợ</li>
            <li>Cung cấp thức ăn, dịch vụ y tế và nơi ở an toàn</li>
            <li>Tạo cơ hội để các thú cưng tìm được gia đình mới</li>
          </ul>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <p className="text-blue-800 font-medium">
            Chúng tôi cam kết sử dụng 100% số tiền quyên góp cho mục đích của chiến dịch và sẽ cập nhật tiến độ sử dụng quỹ một cách minh bạch.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignInfoSection; 