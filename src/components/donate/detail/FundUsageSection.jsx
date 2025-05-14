import React from 'react';
import { FaDonate } from 'react-icons/fa';

const FundUsageSection = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 relative inline-block">
        Cách sử dụng quỹ
        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5 border-t-4 border-purple-500 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div className="bg-purple-100 p-3 rounded-full mr-3 flex items-center justify-center">
              <FaDonate className="text-purple-600 text-xl" />
            </div>
            <h3 className="font-bold text-xl text-purple-800">60%</h3>
          </div>
          <h4 className="font-bold text-gray-700 mb-2">Chi phí trực tiếp</h4>
          <p className="text-gray-600">Thức ăn, vật dụng và dịch vụ y tế cho thú cưng</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border-t-4 border-blue-500 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div className="bg-blue-100 p-3 rounded-full mr-3 flex items-center justify-center">
              <FaDonate className="text-blue-600 text-xl" />
            </div>
            <h3 className="font-bold text-xl text-blue-800">30%</h3>
          </div>
          <h4 className="font-bold text-gray-700 mb-2">Cải thiện cơ sở vật chất</h4>
          <p className="text-gray-600">Nâng cấp không gian sống và khu vui chơi</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border-t-4 border-pink-500 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div className="bg-pink-100 p-3 rounded-full mr-3 flex items-center justify-center">
              <FaDonate className="text-pink-600 text-xl" />
            </div>
            <h3 className="font-bold text-xl text-pink-800">10%</h3>
          </div>
          <h4 className="font-bold text-gray-700 mb-2">Chi phí vận hành</h4>
          <p className="text-gray-600">Quản lý chiến dịch và hoạt động hậu cần</p>
        </div>
      </div>
    </div>
  );
};

export default FundUsageSection; 