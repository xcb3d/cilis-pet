import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, 
  FaFacebook, FaInstagram, FaTwitter 
} from 'react-icons/fa';

const CONTACT_ITEMS = [
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
];

const SOCIAL_LINKS = [
  { icon: <FaFacebook className="text-xl" />, color: "feminine-button-pink", name: "Facebook" },
  { icon: <FaInstagram className="text-xl" />, color: "feminine-button-mint", name: "Instagram" },
  { icon: <FaTwitter className="text-xl" />, color: "feminine-button-coral", name: "Twitter" }
];

const ContactSection = () => {
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
          <span className="inline-block feminine-pill feminine-bg-coral text-red-700 mb-4">
            Liên hệ với chúng tôi
          </span>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 feminine-title">Hãy kết nối với chúng tôi</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto feminine-body">
            Có thắc mắc hoặc muốn hỗ trợ? Đừng ngần ngại liên hệ với chúng tôi qua các kênh dưới đây.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CONTACT_ITEMS.map((contact, index) => (
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
          {SOCIAL_LINKS.map((social, index) => (
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
  );
};

export default ContactSection; 