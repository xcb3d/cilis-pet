const donationCampaigns = [
  {
    id: 1,
    title: "Hỗ trợ thức ăn cho trại cứu trợ",
    description: "Giúp chúng tôi cung cấp thức ăn chất lượng cho hơn 200 chú chó và mèo tại trại cứu trợ. Mỗi đóng góp đều giúp chúng tôi duy trì hoạt động và chăm sóc các bé thú tốt hơn.",
    target: 50000000,
    current: 32500000,
    imageUrl: "/src/assets/images/food-donation.jpg",
    endDate: "31/08/2023",
    supporters: 145
  },
  {
    id: 2,
    title: "Quỹ y tế khẩn cấp",
    description: "Quỹ này dùng để chi trả chi phí phẫu thuật và điều trị y tế khẩn cấp cho các thú cưng bị bỏ rơi, ngược đãi hoặc bị thương. Giúp chúng tôi cứu sống nhiều sinh mạng hơn!",
    target: 100000000,
    current: 45800000,
    imageUrl: "/src/assets/images/medical-fund.jpg",
    endDate: "Không thời hạn",
    supporters: 230
  },
  {
    id: 3,
    title: "Xây dựng khu vui chơi cho thú cưng",
    description: "Chúng tôi đang xây dựng một khu vui chơi ngoài trời cho các thú cưng tại trại cứu trợ. Khu vực này sẽ giúp các bé phát triển kỹ năng xã hội và tăng cường sức khỏe thể chất.",
    target: 35000000,
    current: 12700000,
    imageUrl: "/src/assets/images/playground.jpg",
    endDate: "15/09/2023",
    supporters: 78
  },
  {
    id: 4,
    title: "Chương trình tiêm phòng và triệt sản",
    description: "Hỗ trợ chương trình tiêm phòng và triệt sản miễn phí cho thú cưng của các gia đình có hoàn cảnh khó khăn và cho thú hoang. Đây là cách hiệu quả để giảm số lượng thú cưng bị bỏ rơi.",
    target: 70000000,
    current: 25300000,
    imageUrl: "/src/assets/images/vaccination.jpg",
    endDate: "30/10/2023",
    supporters: 112
  }
];

const donationOptions = [
  {
    id: 1,
    amount: 50000,
    description: "Cung cấp thức ăn cho một chú chó/mèo trong 1 tuần"
  },
  {
    id: 2,
    amount: 100000,
    description: "Hỗ trợ chi phí tiêm phòng cơ bản cho một bé thú"
  },
  {
    id: 3,
    amount: 200000,
    description: "Hỗ trợ chăm sóc y tế cho các bé ốm đau"
  },
  {
    id: 4,
    amount: 500000,
    description: "Tài trợ chi phí triệt sản cho một bé thú"
  },
  {
    id: 5,
    amount: 1000000,
    description: "Giúp chi trả chi phí phẫu thuật cứu sống một bé thú"
  },
  {
    id: 6,
    amount: "Tùy chọn",
    description: "Đóng góp số tiền tùy ý của bạn"
  }
];

export { donationCampaigns, donationOptions }; 