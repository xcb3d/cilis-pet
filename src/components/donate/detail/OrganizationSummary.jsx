import React from 'react';
import { Link } from 'react-router-dom';
import { FaHandHoldingHeart, FaChevronRight } from 'react-icons/fa';

const OrganizationSummary = () => {
  return (
    <div className="bg-purple-50 rounded-xl p-6 mb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center flex-shrink-0 border-2 border-purple-200">
          <FaHandHoldingHeart className="text-4xl text-purple-600" />
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Về Cilis Pet</h3>
          <p className="text-gray-600 mb-4">
            Cilis Pet là tổ chức phi lợi nhuận hoạt động vì quyền lợi và phúc lợi của động vật, đặc biệt là những thú cưng bị bỏ rơi hoặc ngược đãi. Chúng tôi đã cứu trợ hơn 1,000+ thú cưng và tìm mái ấm mới cho 700+ bé từ năm 2020.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-2xl font-bold text-purple-700 mb-1">1,000+</div>
              <div className="text-sm text-gray-600">Thú cưng được cứu trợ</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-2xl font-bold text-purple-700 mb-1">700+</div>
              <div className="text-sm text-gray-600">Thú cưng tìm được mái ấm</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-2xl font-bold text-purple-700 mb-1">300M+</div>
              <div className="text-sm text-gray-600">Đã quyên góp (VNĐ)</div>
            </div>
          </div>

          <Link
            to="/about"
            className="text-purple-600 font-medium hover:underline inline-flex items-center"
          >
            Tìm hiểu thêm về tổ chức
            <FaChevronRight className="ml-1 text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSummary; 