import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdoptionForm from '../components/forms/AdoptionForm';
import { useSearchParams, Link } from 'react-router-dom';
import { FaPaw, FaClipboardCheck, FaHome, FaCalendarAlt, FaMars, FaVenus, FaMapMarkerAlt, FaCheck, FaArrowLeft, FaHeart, FaLeaf, FaCat, FaDog, FaBone, FaGem } from 'react-icons/fa';

// Dữ liệu thú cưng (trong dự án thực tế sẽ được nạp từ API)
const petsData = [
  {
    id: 1,
    name: "Milo",
    type: "Chó",
    breed: "Corgi",
    age: "2 tuổi",
    gender: "Đực",
    location: "Hà Nội",
    description: "Milo là một chú chó Corgi hoạt bát, thân thiện và rất thích chơi đùa. Milo đã được tiêm phòng đầy đủ và rất thích được ôm.",
    personality: "Hoạt bát, vui vẻ, và luôn muốn được chơi đùa. Milo rất thân thiện với mọi người và các thú cưng khác. Bé thích chạy nhảy và luôn mong muốn được khám phá thế giới xung quanh.",
    health: "Milo đã được tiêm phòng đầy đủ các loại vaccine cần thiết và đã được triệt sản. Bé không có vấn đề gì về sức khỏe và được kiểm tra đều đặn bởi bác sĩ thú y.",
    requirements: "Milo cần một gia đình có thời gian chơi với bé và đưa bé đi dạo hàng ngày. Bé phù hợp với gia đình có trẻ em và thú cưng khác.",
    imageUrl: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    isVaccinated: true,
    isNeutered: true,
    compatibility: ["Thân thiện với trẻ em", "Hòa đồng với thú cưng khác", "Thích không gian rộng rãi"],
    status: "Đang chờ nhận nuôi",
    gallery: [
      "https://images.unsplash.com/photo-1585071550721-fdb362ae2b8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1597633425046-08f5110420b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 2,
    name: "Luna",
    type: "Mèo",
    breed: "Munchkin",
    age: "1 tuổi",
    gender: "Cái",
    location: "Hồ Chí Minh",
    description: "Luna là một cô mèo Munchkin xinh đẹp với đôi chân ngắn dễ thương. Luna rất hiền và thích được vuốt ve.",
    personality: "Luna rất hiền lành và điềm tĩnh. Bé thích ngồi trên lòng chủ và được vuốt ve. Luna cũng rất thông minh và nhanh chóng làm quen với môi trường mới.",
    health: "Luna đã được tiêm phòng đầy đủ và sức khỏe tốt. Bé chưa được triệt sản nên gia đình nhận nuôi cần có kế hoạch triệt sản cho bé trong tương lai.",
    requirements: "Luna phù hợp với môi trường yên tĩnh, ít ồn ào. Bé thích hợp với người sống trong căn hộ và có thời gian ở nhà nhiều.",
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    isVaccinated: true,
    isNeutered: false,
    compatibility: ["Thích yên tĩnh", "Phù hợp với căn hộ", "Thích được vuốt ve"],
    status: "Đang chờ nhận nuôi",
    gallery: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: 3,
    name: "Max",
    type: "Chó",
    breed: "Golden Retriever",
    age: "3 tuổi",
    gender: "Đực",
    location: "Đà Nẵng",
    description: "Max là một chú chó Golden Retriever thông minh và trung thành. Max rất thích chơi đùa ngoài trời và bơi lội.",
    personality: "Max rất trung thành và thông minh. Bé có nhiều năng lượng và thích các hoạt động ngoài trời như chạy nhảy, bơi lội. Max rất thân thiện với trẻ em và luôn bảo vệ gia đình.",
    health: "Max đã được tiêm phòng đầy đủ và triệt sản. Bé có sức khỏe tốt và không có vấn đề gì đáng lo ngại.",
    requirements: "Max cần không gian rộng rãi để vận động và chơi đùa. Bé phù hợp với gia đình có sân vườn hoặc thường xuyên đi dạo, chơi thể thao ngoài trời.",
    imageUrl: "https://images.unsplash.com/photo-1561495376-dc9c7c5b8726?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    isVaccinated: true,
    isNeutered: true,
    compatibility: ["Thân thiện với trẻ em", "Cần không gian rộng", "Thích hoạt động ngoài trời"],
    status: "Đang chờ nhận nuôi",
    gallery: [
      "https://images.unsplash.com/photo-1596525022602-fa64e1bccd8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ]
  }
];

const AdoptionPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedPet, setSelectedPet] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const petId = searchParams.get('pet');
  
  // Lấy thông tin thú cưng từ ID trong URL
  useEffect(() => {
    if (petId) {
      const pet = petsData.find(p => p.id === parseInt(petId));
      if (pet) {
        setSelectedPet(pet);
      }
    }
  }, [petId]);

  // Hàm lấy đường dẫn ảnh dựa vào loại và giống thú cưng
  const getPetImageSrc = (pet) => {
    if (!pet) return '';
    
    // Ưu tiên sử dụng ảnh cụ thể nếu có
    if (pet.imageUrl) {
      return pet.imageUrl;
    }
    
    // Fallback to Unsplash
    const petType = pet.type === 'Chó' ? 'dog' : pet.type === 'Mèo' ? 'cat' : 'pet';
    const breed = pet.breed ? pet.breed.toLowerCase() : '';
    const searchTerm = `${petType},${breed}`;
    
    return `https://source.unsplash.com/featured/?${searchTerm}&sig=${pet.id}`;
  };
  
  // Lấy icon giới tính
  const getGenderIcon = (gender) => {
    if (gender === "Đực") {
      return <FaMars className="text-blue-500" />;
    } else {
      return <FaVenus className="text-pink-500" />;
    }
  };
  
  // Lấy icon loại thú cưng
  const getTypeIcon = (type) => {
    if (type === "Chó") {
      return <FaDog className="text-amber-500" />;
    } else if (type === "Mèo") {
      return <FaCat className="text-purple-500" />;
    }
    return <FaPaw className="text-gray-500" />;
  };
  
  return (
    <div className="py-12 bg-[#FEF2F7]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4 ">Đăng ký nhận nuôi</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {selectedPet 
              ? `Bạn đang đăng ký nhận nuôi ${selectedPet.name}. Hãy điền đầy đủ thông tin để chúng tôi có thể xét duyệt đơn của bạn.`
              : 'Hãy điền đầy đủ thông tin vào đơn đăng ký dưới đây. Chúng tôi sẽ xem xét đơn của bạn và liên hệ trong thời gian sớm nhất.'
            }
          </p>
        </motion.div>
        
        {/* Chi tiết thú cưng (chỉ hiển thị khi có ID trong URL) */}
        {selectedPet && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Phần hình ảnh */}
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-0">
                <div className="relative h-[500px] overflow-hidden rounded-t-lg lg:rounded-t-none lg:rounded-tl-lg">
                  <motion.img 
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={selectedPet.gallery && selectedPet.gallery.length > 0 ? 
                      selectedPet.gallery[activeImage] : getPetImageSrc(selectedPet)}
                    alt={`${selectedPet.name} - ${selectedPet.breed}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-full ${selectedPet.type === 'Chó' ? 'bg-amber-400' : 'bg-purple-400'} shadow-lg`}>
                        {getTypeIcon(selectedPet.type)}
                      </div>
                      <span className="text-base font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        {selectedPet.breed}
                      </span>
                    </div>
                    <h2 className="text-5xl font-bold mb-3 drop-shadow-lg">{selectedPet.name}</h2>
                    <div className="flex items-center gap-4 text-base">
                      <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        {getGenderIcon(selectedPet.gender)}
                        <span>{selectedPet.age}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <FaMapMarkerAlt />
                        <span>{selectedPet.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    to="/pets" 
                    className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg"
                  >
                    <FaArrowLeft className="text-gray-700" />
                  </Link>
                  
                  <div className="absolute top-4 right-4 flex gap-2">
                    {selectedPet.isVaccinated && (
                      <motion.div 
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-md"
                      >
                        <FaCheck className="text-xs" />
                        <span>Đã tiêm phòng</span>
                      </motion.div>
                    )}
                    {selectedPet.isNeutered && (
                      <motion.div 
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-md"
                      >
                        <FaLeaf className="text-xs" />
                        <span>Đã triệt sản</span>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {/* Gallery thumbnails */}
                {selectedPet.gallery && selectedPet.gallery.length > 0 && (
                  <div className="flex justify-center gap-2 p-3 bg-white border-t border-gray-100">
                    {selectedPet.gallery.map((image, index) => (
                      <motion.button
                        key={index}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${activeImage === index ? 'border-pink-500' : 'border-transparent'}`}
                        onClick={() => setActiveImage(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img src={image} alt={`${selectedPet.name} ${index + 1}`} className="w-full h-full object-cover" />
                      </motion.button>
                    ))}
                    <motion.button
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${activeImage === selectedPet.gallery.length ? 'border-pink-500' : 'border-transparent'}`}
                      onClick={() => setActiveImage(selectedPet.gallery.length)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img src={getPetImageSrc(selectedPet)} alt={`${selectedPet.name} main`} className="w-full h-full object-cover" />
                    </motion.button>
                  </div>
                )}
              </div>
              
              {/* Phần thông tin */}
              <div className="p-6 lg:p-8 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-pink-100 opacity-30 z-0"></div>
                <div className="absolute right-20 top-12 w-12 h-12 rounded-full bg-purple-100 opacity-40 z-0"></div>
                
                <div className="relative z-10">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <FaHeart className="text-pink-500" /> 
                      <span>Về <span className="text-pink-600">{selectedPet.name}</span></span>
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{selectedPet.description}</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6 bg-pink-50 p-4 rounded-xl"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <FaGem className="text-yellow-500" /> Tính cách
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{selectedPet.personality}</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6 bg-blue-50 p-4 rounded-xl"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <FaPaw className="text-blue-500" /> Sức khỏe
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{selectedPet.health}</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6 bg-purple-50 p-4 rounded-xl"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <FaHome className="text-purple-500" /> Yêu cầu nhận nuôi
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{selectedPet.requirements}</p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <FaBone className="text-amber-500" /> Đặc điểm
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPet.compatibility && selectedPet.compatibility.map((trait, idx) => (
                        <motion.span 
                          key={idx} 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + idx * 0.1 }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm bg-gradient-to-r from-pink-50 to-purple-50 text-gray-700 border border-pink-100 shadow-sm"
                        >
                          <FaCheck className="text-green-500 text-xs" />
                          {trait}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Adoption Process */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: selectedPet ? 0.2 : 0.1 }}
          className="bg-white rounded-xl p-8 mb-12 shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center  flex items-center justify-center gap-2">
            <FaPaw className="text-pink-500" /> Quy trình nhận nuôi
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center mb-4 relative shadow-md">
                <FaClipboardCheck className="text-pink-500 text-2xl" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full text-white flex items-center justify-center font-bold shadow-md">
                  1
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Điền đơn đăng ký</h3>
              <p className="text-gray-600 leading-relaxed">
                Hoàn thành đơn đăng ký với đầy đủ thông tin cá nhân và môi trường sống của bạn.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 relative shadow-md">
                <FaPaw className="text-blue-500 text-2xl" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full text-white flex items-center justify-center font-bold shadow-md">
                  2
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Xét duyệt</h3>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi sẽ xem xét đơn đăng ký của bạn và kiểm tra thông tin một cách cẩn thận.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-4 relative shadow-md">
                <FaCalendarAlt className="text-green-500 text-2xl" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full text-white flex items-center justify-center font-bold shadow-md">
                  3
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Gặp gỡ thú cưng</h3>
              <p className="text-gray-600 leading-relaxed">
                Sắp xếp thời gian để bạn đến gặp gỡ và tương tác với thú cưng mà bạn muốn nhận nuôi.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-4 relative shadow-md">
                <FaHome className="text-purple-500 text-2xl" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full text-white flex items-center justify-center font-bold shadow-md">
                  4
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Chào mừng về nhà</h3>
              <p className="text-gray-600 leading-relaxed">
                Hoàn tất các thủ tục và đưa người bạn mới về nhà để bắt đầu cuộc sống hạnh phúc.
              </p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Adoption Requirements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: selectedPet ? 0.3 : 0.2 }}
          className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-8 mb-12 shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-2">
            <FaHeart className="text-pink-500" /> Yêu cầu nhận nuôi
          </h2>
          
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-start"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full text-white flex items-center justify-center font-bold mr-4 mt-0.5 shadow-md flex-shrink-0">1</div>
              <div className="bg-white p-4 rounded-xl shadow-sm flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Tuổi tác</h3>
                <p className="text-gray-600 leading-relaxed">Người nhận nuôi phải từ 18 tuổi trở lên và có khả năng tài chính để chăm sóc thú cưng.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-start"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full text-white flex items-center justify-center font-bold mr-4 mt-0.5 shadow-md flex-shrink-0">2</div>
              <div className="bg-white p-4 rounded-xl shadow-sm flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Nơi ở</h3>
                <p className="text-gray-600 leading-relaxed">Có nơi ở ổn định và an toàn cho thú cưng. Nếu bạn thuê nhà, cần có sự đồng ý của chủ nhà.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-start"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full text-white flex items-center justify-center font-bold mr-4 mt-0.5 shadow-md flex-shrink-0">3</div>
              <div className="bg-white p-4 rounded-xl shadow-sm flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Thời gian</h3>
                <p className="text-gray-600 leading-relaxed">Cam kết dành thời gian để chăm sóc, vui chơi và tương tác với thú cưng.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-start"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full text-white flex items-center justify-center font-bold mr-4 mt-0.5 shadow-md flex-shrink-0">4</div>
              <div className="bg-white p-4 rounded-xl shadow-sm flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Cam kết lâu dài</h3>
                <p className="text-gray-600 leading-relaxed">Thú cưng là một cam kết lâu dài, bạn cần sẵn sàng chăm sóc cho thú cưng trong suốt cuộc đời của chúng.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-start"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full text-white flex items-center justify-center font-bold mr-4 mt-0.5 shadow-md flex-shrink-0">5</div>
              <div className="bg-white p-4 rounded-xl shadow-sm flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Tiêm phòng và triệt sản</h3>
                <p className="text-gray-600 leading-relaxed">Cam kết tiêm phòng đầy đủ và triệt sản thú cưng nếu chưa được thực hiện.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Adoption Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: selectedPet ? 0.4 : 0.3 }}
          className="bg-white rounded-xl p-8 shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 !flex items-center justify-center gap-2">
            <FaClipboardCheck className="text-pink-500" /> 
            Đơn đăng ký nhận nuôi
          </h2>
          <AdoptionForm petId={petId ? parseInt(petId) : null} petName={selectedPet ? selectedPet.name : null} />
        </motion.div>
      </div>
    </div>
  );
};

export default AdoptionPage; 