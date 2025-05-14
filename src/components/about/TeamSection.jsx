import React from 'react';
import { motion } from 'framer-motion';

const TEAM_MEMBERS = [
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
];

const TeamSection = () => {
  return (
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
          {TEAM_MEMBERS.map((member, index) => (
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
  );
};

export default TeamSection; 