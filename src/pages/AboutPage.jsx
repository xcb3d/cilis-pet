import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaPaw, FaHeart, FaHandHoldingHeart, FaUsers, 
  FaHistory, FaAward, FaPhone, FaEnvelope, 
  FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter,
  FaQuoteLeft, FaQuoteRight, FaStar
} from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Pastel Gradient */}
      <section className="bg-gradient-to-r from-pastel-lavender to-pastel-pink text-gray-800 py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-white opacity-20 feminine-bubble"></div>
          <div className="absolute left-1/4 bottom-0 h-40 w-40 rounded-full bg-white opacity-20 feminine-bubble"></div>
          <div className="absolute right-1/3 top-1/3 h-32 w-32 rounded-full bg-white opacity-20 feminine-bubble"></div>
          <div className="absolute left-10 top-20 h-20 w-20 rounded-full bg-white opacity-20 feminine-bubble feminine-float"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 feminine-title text-indigo-900">Về Cilis Pet</h1>
            <p className="text-lg md:text-xl opacity-90 mb-6 max-w-3xl mx-auto feminine-body text-indigo-800">
              Cùng chúng tôi tạo nên một thế giới tốt đẹp hơn cho những người bạn 4 chân
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex justify-center mt-8"
            >
              <div className="bg-white/30 backdrop-filter backdrop-blur-sm px-6 py-3 rounded-full inline-flex items-center">
                <FaStar className="text-yellow-500 mr-2" />
                <span className="font-medium text-indigo-900">Đã giúp đỡ hơn 5,000+ thú cưng từ 2015</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section with Pastel Cards */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block feminine-pill feminine-bg-lavender text-indigo-700 mb-4">
              Sứ mệnh của chúng tôi
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 feminine-title">Tạo nên sự thay đổi tích cực</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto feminine-body">
              Cilis Pet là tổ chức phi lợi nhuận hoạt động với sứ mệnh cứu trợ, chăm sóc và tìm nhà mới cho những thú cưng bị bỏ rơi, bị ngược đãi hoặc vô gia cư.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaPaw className="text-3xl text-purple-500" />,
                title: "Cứu trợ & Chăm sóc",
                description: "Giải cứu thú cưng bị bỏ rơi, cung cấp nơi ở tạm thời và chăm sóc y tế",
                color: "feminine-bg-lavender"
              },
              {
                icon: <FaHeart className="text-3xl text-pink-500" />,
                title: "Kết nối & Nhận nuôi",
                description: "Kết nối thú cưng với những gia đình yêu thương mới thông qua quá trình nhận nuôi trách nhiệm",
                color: "feminine-bg-pink"
              },
              {
                icon: <FaUsers className="text-3xl text-blue-500" />,
                title: "Giáo dục & Vận động",
                description: "Nâng cao nhận thức về quyền lợi động vật và thúc đẩy việc nuôi thú cưng có trách nhiệm",
                color: "feminine-bg-mint"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="feminine-card hover:shadow-lg transition-shadow overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className={`h-2 ${item.color}`}></div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto bg-gray-50">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center feminine-subtitle">{item.title}</h3>
                  <p className="text-gray-600 text-center feminine-body">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section with Feminine Design */}
      <section className="py-16 px-4 feminine-bg-mint relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-white opacity-20"></div>
          <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-white opacity-20"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block feminine-pill feminine-bg-pink text-pink-700 mb-4">
                Câu chuyện của chúng tôi
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mb-4 feminine-title">Từ tình yêu thương đến hành động</h2>
              <div className="text-gray-700 space-y-4 feminine-body">
                <p>
                  Cilis Pet được thành lập vào năm 2015 bởi một nhóm những người yêu động vật, khởi đầu từ một trung tâm cứu trợ nhỏ ở Hà Nội.
                </p>
                <p>
                  Từ những bước đi đầu tiên với vỏn vẹn 5 tình nguyện viên và khả năng chăm sóc 15 thú cưng, chúng tôi đã phát triển thành một tổ chức quy mô toàn quốc với 3 trung tâm cứu trợ tại Hà Nội, Hồ Chí Minh và Đà Nẵng.
                </p>
                <p>
                  Đến nay, Cilis Pet đã giải cứu và tìm nhà mới cho hơn 5000 chú chó, mèo và tiếp tục mở rộng hoạt động để giúp đỡ nhiều thú cưng hơn nữa.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <motion.div 
                  className="flex items-center gap-2 text-gray-700 feminine-bg-lavender p-3 rounded-xl" 
                  whileHover={{ y: -3 }}
                >
                  <div className="p-2 bg-white rounded-full shadow-md">
                    <FaHistory className="text-purple-500" />
                  </div>
                  <div>
                    <p className="font-bold">8+</p>
                    <p className="text-sm">Năm hoạt động</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-2 text-gray-700 feminine-bg-pink p-3 rounded-xl" 
                  whileHover={{ y: -3 }}
                >
                  <div className="p-2 bg-white rounded-full shadow-md">
                    <FaPaw className="text-pink-500" />
                  </div>
                  <div>
                    <p className="font-bold">5000+</p>
                    <p className="text-sm">Thú cưng được giúp đỡ</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-2 text-gray-700 feminine-bg-mint p-3 rounded-xl" 
                  whileHover={{ y: -3 }}
                >
                  <div className="p-2 bg-white rounded-full shadow-md">
                    <FaHandHoldingHeart className="text-green-500" />
                  </div>
                  <div>
                    <p className="font-bold">200+</p>
                    <p className="text-sm">Tình nguyện viên</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="md:w-1/2 rounded-2xl overflow-hidden shadow-xl"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative h-full">
                <img 
                  src="/src/assets/images/about-story.jpg"
                  alt="Cilis Pet team with rescued animals" 
                  className="w-full h-auto rounded-2xl feminine-shadow-soft"
                  onError={(e) => {
                    e.target.src = "/src/assets/images/dog-hero.svg";
                  }}
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-md max-w-[200px]">
                  <div className="flex items-start mb-2">
                    <FaQuoteLeft className="text-pink-400 mr-1 text-sm mt-1" />
                    <p className="text-sm italic text-gray-700">Mỗi chú thú cưng đều có một câu chuyện đáng được lắng nghe</p>
                    <FaQuoteRight className="text-pink-400 ml-1 text-sm mt-1" />
                  </div>
                  <p className="text-right text-xs font-medium text-gray-900">- Minh Anh, Founder</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section with Rounded Cards */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block feminine-pill feminine-bg-blue text-blue-700 mb-4">
              Đội ngũ của chúng tôi
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 feminine-title">Những người yêu thương động vật</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto feminine-body">
              Đội ngũ Cilis Pet bao gồm các chuyên gia, bác sĩ thú y, nhà huấn luyện và những người đam mê chăm sóc động vật.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Nguyễn Minh Anh",
                position: "Nhà sáng lập & Giám đốc",
                bio: "10 năm kinh nghiệm trong lĩnh vực bảo vệ động vật, Thạc sĩ Công tác xã hội",
                image: "/src/assets/images/team-1.jpg",
                color: "feminine-bg-pink"
              },
              {
                name: "Trần Thanh Hà",
                position: "Giám đốc Y tế",
                bio: "Bác sĩ thú y với chuyên môn về phẫu thuật và chăm sóc đặc biệt",
                image: "/src/assets/images/team-2.jpg",
                color: "feminine-bg-lavender"
              },
              {
                name: "Lê Văn Hùng",
                position: "Quản lý Trung tâm Cứu trợ",
                bio: "Chuyên gia về hành vi động vật và phục hồi chức năng cho thú cưng bị ngược đãi",
                image: "/src/assets/images/team-3.jpg",
                color: "feminine-bg-mint"
              },
              {
                name: "Phạm Thu Trang",
                position: "Điều phối viên Tình nguyện",
                bio: "Chuyên gia tổ chức sự kiện và quản lý mạng lưới tình nguyện viên",
                image: "/src/assets/images/team-4.jpg",
                color: "feminine-bg-coral"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="feminine-card overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className={`h-3 ${member.color}`}></div>
                <div className="relative h-56 bg-gray-100">
                  <img 
                    src={member.image}
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = index % 2 === 0 ? 
                        "/src/assets/images/dog-hero.svg" : 
                        "/src/assets/images/cat-hero.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
                </div>
                <div className="p-5 relative">
                  <div className="absolute -top-8 left-4 w-16 h-16 rounded-full border-4 border-white overflow-hidden">
                    <img 
                      src={member.image}
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = index % 2 === 0 ? 
                          "/src/assets/images/dog-hero.svg" : 
                          "/src/assets/images/cat-hero.svg";
                      }}
                    />
                  </div>
                  <div className="pt-6">
                    <h3 className="text-lg font-bold text-gray-800 feminine-subtitle">{member.name}</h3>
                    <p className="text-purple-600 font-medium text-sm mb-2">{member.position}</p>
                    <p className="text-gray-600 text-sm feminine-body">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section with Soft Gradient */}
      <section className="py-16 px-4 bg-gradient-to-r from-pastel-lavender to-pastel-pink relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white opacity-20"></div>
          <div className="absolute left-10 bottom-10 h-40 w-40 rounded-full bg-white opacity-20"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block feminine-pill bg-white text-green-600 mb-4">
              Giá trị cốt lõi
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 feminine-title">Những nguyên tắc hướng dẫn chúng tôi</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto feminine-body">
              Tại Cilis Pet, mọi quyết định và hành động của chúng tôi đều dựa trên những giá trị cốt lõi sau.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <FaHeart className="text-2xl text-pink-500" />,
                title: "Yêu thương không điều kiện",
                description: "Chúng tôi tin rằng mọi thú cưng đều xứng đáng được yêu thương và chăm sóc, bất kể xuất thân, tình trạng sức khỏe hay ngoại hình của chúng."
              },
              {
                icon: <FaAward className="text-2xl text-yellow-500" />,
                title: "Chất lượng chăm sóc",
                description: "Chúng tôi cam kết cung cấp chăm sóc y tế, dinh dưỡng và tình cảm chất lượng cao nhất cho mọi thú cưng trong khả năng của mình."
              },
              {
                icon: <FaUsers className="text-2xl text-blue-500" />,
                title: "Cộng đồng",
                description: "Chúng tôi xây dựng và nuôi dưỡng một cộng đồng những người yêu thương và bảo vệ động vật, cùng nhau tạo nên những thay đổi tích cực."
              },
              {
                icon: <FaHandHoldingHeart className="text-2xl text-green-500" />,
                title: "Trách nhiệm",
                description: "Chúng tôi hoạt động với sự minh bạch, chính trực và trách nhiệm đối với nhà tài trợ, tình nguyện viên và cộng đồng."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md border border-white"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-gray-50 mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center feminine-subtitle">{value.title}</h3>
                <p className="text-gray-600 text-center feminine-body">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Soft Design */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block feminine-pill feminine-bg-coral text-red-700 mb-4">
              Liên hệ với chúng tôi
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 feminine-title">Hãy kết nối với chúng tôi</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto feminine-body">
              Có thắc mắc hoặc muốn hỗ trợ? Đừng ngần ngại liên hệ với chúng tôi qua các kênh dưới đây.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <FaPhone className="text-2xl text-pink-500" />,
                title: "Gọi cho chúng tôi",
                info: "(+84) 123 456 789",
                details: "Thứ Hai - Thứ Sáu, 8:00 - 17:00",
                color: "feminine-bg-pink"
              },
              {
                icon: <FaEnvelope className="text-2xl text-purple-500" />,
                title: "Email",
                info: "info@cilispet.vn",
                details: "Chúng tôi sẽ phản hồi trong vòng 24 giờ",
                color: "feminine-bg-lavender"
              },
              {
                icon: <FaMapMarkerAlt className="text-2xl text-blue-500" />,
                title: "Địa chỉ",
                info: "123 Đường Cứu Trợ, Quận Thanh Xuân, Hà Nội",
                details: "Trung tâm cứu trợ chính",
                color: "feminine-bg-mint"
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                className="feminine-card text-center"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className={`h-2 ${contact.color}`}></div>
                <div className="p-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gray-50">
                    {contact.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 feminine-subtitle">{contact.title}</h3>
                  <p className="text-gray-800 font-medium mb-1">{contact.info}</p>
                  <p className="text-gray-500 text-sm">{contact.details}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: <FaFacebook className="text-xl" />, color: "feminine-button-pink", name: "Facebook" },
              { icon: <FaInstagram className="text-xl" />, color: "feminine-button-mint", name: "Instagram" },
              { icon: <FaTwitter className="text-xl" />, color: "feminine-button-coral", name: "Twitter" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                className={`${social.color} px-6 py-3 rounded-full flex items-center gap-2 font-medium shadow-md feminine-button`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
                <span>Theo dõi trên {social.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Pastel Colors */}
      <section className="py-16 px-4 bg-gradient-to-r from-pastel-mint to-pastel-blue text-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-white opacity-20"></div>
          <div className="absolute left-1/3 top-0 h-60 w-60 rounded-full bg-white opacity-20"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 feminine-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Tham gia cùng chúng tôi trong sứ mệnh mang lại mái ấm cho thú cưng
          </motion.h2>
          
          <motion.p 
            className="text-lg opacity-90 mb-8 max-w-3xl mx-auto feminine-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Có nhiều cách để bạn có thể đóng góp và tạo nên sự thay đổi trong cuộc sống của những thú cưng đang cần sự giúp đỡ.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.a
              href="/donate"
              className="feminine-button feminine-button-pink shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Quyên góp ngay
            </motion.a>
            
            <motion.a
              href="/pets"
              className="feminine-button border-2 border-purple-600 text-purple-600 bg-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Nhận nuôi thú cưng
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 