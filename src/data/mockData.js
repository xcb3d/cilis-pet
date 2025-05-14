// Dữ liệu thú cưng mẫu
export const petsData = [
  {
    id: 1,
    name: "Mèo Munchkin",
    type: "cat",
    breed: "Munchkin",
    age: "1 tuổi",
    gender: "Cái",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1686&q=80",
    description: "Mèo Munchkin rất thân thiện và ngọt ngào. Bé thích chơi đùa và ôm ấp mỗi khi bạn ở nhà.",
    isFeatured: true,
    traits: ["Thân thiện", "Tình cảm", "Vui vẻ"],
    healthStatus: "Đã tiêm phòng, triệt sản",
    adoptionStatus: "Sẵn sàng"
  },
  {
    id: 2,
    name: "Husky Siberian",
    type: "dog",
    breed: "Husky",
    age: "2 tuổi",
    gender: "Đực",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
    description: "Husky Siberian rất năng động và thông minh. Bé thích chạy nhảy và tham gia các hoạt động ngoài trời.",
    isFeatured: true,
    traits: ["Năng động", "Thông minh", "Trung thành"],
    healthStatus: "Đã tiêm phòng",
    adoptionStatus: "Sẵn sàng"
  },
  {
    id: 3,
    name: "Mèo Bengal",
    type: "cat",
    breed: "Bengal",
    age: "1.5 tuổi",
    gender: "Đực",
    image: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1736&q=80",
    description: "Mèo Bengal có bộ lông đốm rất đẹp và tính cách hiếu động. Bé thích khám phá và tương tác với chủ.",
    isFeatured: true,
    traits: ["Hiếu động", "Thông minh", "Tò mò"],
    healthStatus: "Đã tiêm phòng, triệt sản",
    adoptionStatus: "Sẵn sàng"
  },
  {
    id: 4,
    name: "Golden Retriever",
    type: "dog",
    breed: "Golden Retriever",
    age: "3 tuổi",
    gender: "Đực",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    description: "Golden Retriever rất thân thiện và tình cảm. Bé thích ở bên cạnh gia đình và rất hiền lành với trẻ nhỏ.",
    isFeatured: true,
    traits: ["Thân thiện", "Trung thành", "Hiền lành"],
    healthStatus: "Đã tiêm phòng",
    adoptionStatus: "Sẵn sàng"
  },
  {
    id: 5,
    name: "Corgi",
    type: "dog",
    breed: "Pembroke Welsh Corgi",
    age: "1 tuổi",
    gender: "Đực",
    image: "https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    description: "Corgi là giống chó nhỏ với đôi chân ngắn đáng yêu. Bé rất vui vẻ, thông minh và yêu thích người.",
    isFeatured: false,
    traits: ["Vui vẻ", "Thông minh", "Năng động"],
    healthStatus: "Đã tiêm phòng",
    adoptionStatus: "Sẵn sàng"
  }
];

// Dữ liệu sự kiện mẫu
export const eventsData = [
  {
    id: 1,
    title: "Ngày hội nhận nuôi thú cưng",
    date: "2023-12-15",
    time: "09:00 - 17:00",
    location: "Công viên Thống Nhất, Hà Nội",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
    description: "Ngày hội nhận nuôi lớn nhất năm với hơn 50 thú cưng đang chờ ngôi nhà mới. Tham gia để gặp gỡ và kết nối với người bạn đồng hành tiềm năng của bạn.",
    isFeatured: true
  },
  {
    id: 2,
    title: "Workshop chăm sóc thú cưng",
    date: "2023-11-20",
    time: "14:00 - 16:30",
    location: "Quận 1, TP. Hồ Chí Minh",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    description: "Tham gia workshop để học cách chăm sóc thú cưng đúng cách từ các chuyên gia hàng đầu. Đặc biệt phù hợp cho những người mới nuôi thú cưng.",
    isFeatured: true
  },
  {
    id: 3,
    title: "Tiệc Giáng sinh cho thú cưng",
    date: "2023-12-24",
    time: "15:00 - 18:00",
    location: "Vinhomes Central Park, TP. Hồ Chí Minh",
    image: "https://images.unsplash.com/photo-1608096299210-db7e38487075?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
    description: "Mang thú cưng của bạn đến dự tiệc Giáng sinh đặc biệt! Có khu vực chụp ảnh, quà tặng và nhiều hoạt động thú vị cho cả bạn và thú cưng.",
    isFeatured: false
  }
];

// Dữ liệu dự án quyên góp mẫu
export const donationsData = [
  {
    id: 1,
    title: "Hỗ trợ trung tâm cứu hộ động vật",
    goal: 50000000,
    current: 35000000,
    image: "https://images.unsplash.com/photo-1650372505770-c01c84c92e29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    description: "Quyên góp để hỗ trợ trung tâm cứu hộ động vật. Kinh phí sẽ được dùng để mua thức ăn, thuốc men và cải thiện cơ sở vật chất.",
    dueDate: "2023-12-31",
    isFeatured: true
  },
  {
    id: 2,
    title: "Giúp đỡ thú cưng bị bỏ rơi",
    goal: 30000000,
    current: 22000000,
    image: "https://images.unsplash.com/photo-1604916287784-c324202b3205?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    description: "Chiến dịch giúp đỡ những thú cưng bị bỏ rơi trên đường phố. Tiền quyên góp sẽ được dùng để cứu hộ, chữa trị và tìm nhà mới cho các bé.",
    dueDate: "2024-01-15",
    isFeatured: true
  },
  {
    id: 3,
    title: "Chương trình tiêm phòng miễn phí",
    goal: 20000000,
    current: 5000000,
    image: "https://images.unsplash.com/photo-1589042356574-84994969b1f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1767&q=80",
    description: "Quyên góp để tổ chức chương trình tiêm phòng miễn phí cho thú cưng của các gia đình có hoàn cảnh khó khăn.",
    dueDate: "2024-02-28",
    isFeatured: false
  }
];

// Dữ liệu bài blog mẫu
export const blogData = [
  {
    id: 1,
    title: "5 bí quyết chăm sóc chó con khỏe mạnh",
    author: "Bác sĩ Minh Anh",
    date: "2023-10-15",
    image: "https://images.unsplash.com/photo-1602979677071-1781b7f40023?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    summary: "Khám phá những bí quyết chăm sóc chó con đúng cách giúp bé phát triển khỏe mạnh và hạnh phúc.",
    content: "Nội dung chi tiết về cách chăm sóc chó con...",
    tags: ["chó", "thú cưng", "sức khỏe"],
    isFeatured: true
  },
  {
    id: 2,
    title: "Hướng dẫn huấn luyện mèo đi vệ sinh đúng chỗ",
    author: "Huấn luyện viên Thanh Hà",
    date: "2023-11-05",
    image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    summary: "Hướng dẫn chi tiết giúp bạn huấn luyện mèo đi vệ sinh đúng chỗ một cách hiệu quả và không căng thẳng.",
    content: "Nội dung chi tiết về cách huấn luyện mèo...",
    tags: ["mèo", "huấn luyện", "vệ sinh"],
    isFeatured: true
  },
  {
    id: 3,
    title: "Những điều cần biết khi nuôi thú cưng trong căn hộ",
    author: "Chuyên gia Hoàng Nam",
    date: "2023-09-20",
    image: "https://images.unsplash.com/photo-1593143722887-e6c5cab71d9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    summary: "Khám phá những lưu ý và giải pháp giúp bạn và thú cưng sống hạnh phúc trong không gian căn hộ.",
    content: "Nội dung chi tiết về nuôi thú cưng trong căn hộ...",
    tags: ["căn hộ", "mẹo nuôi", "không gian"],
    isFeatured: false
  }
];

// Danh sách người dùng mẫu (cho phần admin)
export const usersData = [
  {
    id: 1,
    name: "Nguyễn Minh Anh",
    email: "minhanh@example.com",
    role: "admin",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Trần Thanh Hà",
    email: "thanhha@example.com",
    role: "user",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 3,
    name: "Lê Hoàng Nam",
    email: "hoangnam@example.com",
    role: "user",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  }
]; 