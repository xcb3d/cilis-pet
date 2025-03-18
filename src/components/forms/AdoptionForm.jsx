import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaw, FaCheck, FaHeart, FaInfoCircle } from 'react-icons/fa';

const AdoptionForm = ({ petId = null, petName = null }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    houseType: '',
    hasOtherPets: '',
    hasChildren: '',
    workSchedule: '',
    petExperience: '',
    reasonForAdoption: '',
    additionalInfo: '',
    petId: petId || '',
    petName: petName || ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi form (trong trường hợp thực tế sẽ gửi lên server)
    console.log(formData);
    // Hiển thị thông báo thành công
    setIsSubmitted(true);
    // Reset form sau khi gửi
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      houseType: '',
      hasOtherPets: '',
      hasChildren: '',
      workSchedule: '',
      petExperience: '',
      reasonForAdoption: '',
      additionalInfo: '',
      petId: petId || '',
      petName: petName || ''
    });
  };
  
  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center p-8 bg-green-50 rounded-xl"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheck className="text-green-500 text-4xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Đơn đăng ký thành công!</h2>
        <p className="text-gray-600 mb-6">
          {petName ? 
            `Cảm ơn bạn đã đăng ký nhận nuôi ${petName}. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận thông tin và sắp xếp cuộc gặp mặt với bé.` :
            `Cảm ơn bạn đã đăng ký nhận nuôi. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận thông tin và sắp xếp cuộc gặp mặt với thú cưng.`}
        </p>
        <motion.button 
          onClick={() => setIsSubmitted(false)} 
          className="bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(72, 187, 120, 0.4)" }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPaw className="text-white" />
          Điền đơn mới
        </motion.button>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {petName && (
        <div className="mb-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
          <div className="flex items-center gap-2 text-pink-600 mb-2">
            <FaHeart className="text-lg" />
            <h3 className="font-semibold">Đơn đăng ký nhận nuôi {petName}</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Bạn đang đăng ký nhận nuôi {petName}. Vui lòng cung cấp đầy đủ thông tin để chúng tôi có thể đánh giá sự phù hợp giữa bạn và bé cưng.
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <FaPaw className="text-pink-500 mr-2" /> 
          Thông tin cá nhân
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="fullName">
              Họ và tên *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition duration-300"
              placeholder="Nguyễn Văn A"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition duration-300"
              placeholder="example@email.com"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Số điện thoại *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition duration-300"
              placeholder="0912345678"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="address">
              Địa chỉ *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition duration-300"
              placeholder="123 Đường ABC, Quận/Huyện, Tỉnh/Thành phố"
            />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center pt-4">
          <FaPaw className="text-pink-500 mr-2" /> 
          Thông tin môi trường sống
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="houseType">
              Loại nhà ở *
            </label>
            <select
              id="houseType"
              name="houseType"
              value={formData.houseType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition duration-300"
            >
              <option value="">-- Chọn loại nhà --</option>
              <option value="Chung cư">Chung cư</option>
              <option value="Nhà riêng có sân">Nhà riêng có sân</option>
              <option value="Nhà riêng không có sân">Nhà riêng không có sân</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="hasOtherPets">
              Bạn có nuôi thú cưng khác không? *
            </label>
            <select
              id="hasOtherPets"
              name="hasOtherPets"
              value={formData.hasOtherPets}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition duration-300"
            >
              <option value="">-- Chọn --</option>
              <option value="Có">Có</option>
              <option value="Không">Không</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="hasChildren">
              Trong nhà có trẻ nhỏ không? *
            </label>
            <select
              id="hasChildren"
              name="hasChildren"
              value={formData.hasChildren}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition duration-300"
            >
              <option value="">-- Chọn --</option>
              <option value="Có">Có</option>
              <option value="Không">Không</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="workSchedule">
              Lịch làm việc của bạn *
            </label>
            <select
              id="workSchedule"
              name="workSchedule"
              value={formData.workSchedule}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition duration-300"
            >
              <option value="">-- Chọn --</option>
              <option value="Làm việc tại nhà">Làm việc tại nhà</option>
              <option value="Làm việc 8 tiếng/ngày">Làm việc 8 tiếng/ngày</option>
              <option value="Làm việc trên 8 tiếng/ngày">Làm việc trên 8 tiếng/ngày</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="petExperience">
            Kinh nghiệm nuôi thú cưng *
          </label>
          <select
            id="petExperience"
            name="petExperience"
            value={formData.petExperience}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition duration-300"
          >
            <option value="">-- Chọn --</option>
            <option value="Chưa từng nuôi">Chưa từng nuôi</option>
            <option value="Đã từng nuôi nhưng ít kinh nghiệm">Đã từng nuôi nhưng ít kinh nghiệm</option>
            <option value="Có kinh nghiệm">Có kinh nghiệm</option>
            <option value="Nhiều kinh nghiệm">Nhiều kinh nghiệm</option>
          </select>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center pt-4">
          <FaPaw className="text-pink-500 mr-2" /> 
          Thông tin bổ sung
        </h3>
        
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="reasonForAdoption">
            Lý do bạn muốn nhận nuôi {petName || "thú cưng"} *
          </label>
          <textarea
            id="reasonForAdoption"
            name="reasonForAdoption"
            value={formData.reasonForAdoption}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition duration-300 resize-none"
            placeholder={`Hãy chia sẻ lý do bạn muốn nhận nuôi ${petName || "thú cưng này"} và bạn có thể mang lại điều gì cho bé...`}
          ></textarea>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="additionalInfo">
            Thông tin bổ sung
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 transition duration-300 resize-none"
            placeholder="Bạn có thông tin bổ sung nào muốn chia sẻ không? Ví dụ: kế hoạch chăm sóc thú cưng, thời gian có thể đón thú cưng, ..."
          ></textarea>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-start gap-3">
          <FaInfoCircle className="text-blue-500 mt-1 flex-shrink-0" />
          <div>
            <p className="text-gray-700 text-sm">
              Thông tin bạn cung cấp sẽ được sử dụng để đánh giá đơn đăng ký nhận nuôi của bạn. 
              Chúng tôi sẽ liên hệ với bạn trong vòng 48 giờ để xác nhận thông tin và sắp xếp các bước tiếp theo.
            </p>
          </div>
        </div>
        
        <div className="text-center pt-4">
          <motion.button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 107, 152, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHeart className="text-white" />
            {petName ? `Đăng ký nhận nuôi ${petName}` : 'Gửi đơn đăng ký'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AdoptionForm; 