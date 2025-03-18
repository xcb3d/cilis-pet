const pets = [
  {
    id: 1,
    name: "Milo",
    type: "Chó",
    breed: "Corgi",
    age: "2 tuổi",
    gender: "Đực",
    location: "Hà Nội",
    description: "Milo là một chú chó Corgi hoạt bát, thân thiện và rất thích chơi đùa. Milo đã được tiêm phòng đầy đủ và rất thích được ôm.",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2643&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isVaccinated: true,
    isNeutered: true,
    compatibility: ["Thân thiện với trẻ em", "Hòa đồng với thú cưng khác"],
    status: "Đang chờ nhận nuôi",
    timeline: [
      {
        id: 1,
        date: "10/01/2022",
        title: "Được tìm thấy",
        description: "Milo được tìm thấy bị bỏ rơi tại một công viên ở Hà Nội, trong tình trạng gầy yếu và sợ hãi.",
        imageUrl: "https://i.imgur.com/8HFzkKP.jpg",
        type: "rescue"
      },
      {
        id: 2,
        date: "15/01/2022",
        title: "Khám sức khỏe",
        description: "Milo được đưa đến bác sĩ thú y để khám sức khỏe. Được chẩn đoán thiếu dinh dưỡng nhẹ và bắt đầu quá trình phục hồi.",
        imageUrl: "https://i.imgur.com/2sCJ4hH.jpg",
        type: "medical"
      },
      {
        id: 3,
        date: "01/02/2022",
        title: "Tiêm phòng",
        description: "Milo đã hoàn thành các mũi tiêm phòng cơ bản và đang khỏe mạnh hơn nhiều.",
        imageUrl: "https://i.imgur.com/FgQAqbk.jpg",
        type: "medical"
      },
      {
        id: 4,
        date: "15/03/2022",
        title: "Tập luyện cơ bản",
        description: "Milo bắt đầu học các lệnh cơ bản như ngồi, nằm, đợi. Milo rất thông minh và học rất nhanh!",
        imageUrl: "https://i.imgur.com/YOKHx9L.jpg",
        type: "training"
      },
      {
        id: 5,
        date: "10/05/2022",
        title: "Sẵn sàng cho gia đình mới",
        description: "Sau thời gian phục hồi và huấn luyện, Milo đã sẵn sàng tìm một gia đình mới yêu thương.",
        imageUrl: "https://i.imgur.com/3KbTywt.jpg",
        type: "milestone"
      }
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
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2643&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isVaccinated: true,
    isNeutered: false,
    compatibility: ["Thích yên tĩnh", "Phù hợp với căn hộ"],
    status: "Đang chờ nhận nuôi",
    timeline: [
      {
        id: 1,
        date: "05/05/2023",
        title: "Được sinh ra",
        description: "Luna được sinh ra trong một lứa 4 mèo con. Là mèo nhỏ nhất trong đàn nhưng rất khỏe mạnh.",
        imageUrl: "https://i.imgur.com/JGgDWCA.jpg",
        type: "birth"
      },
      {
        id: 2,
        date: "25/06/2023",
        title: "Đến với trung tâm",
        description: "Chủ nhân cũ của Luna không thể nuôi cả gia đình mèo và đã gửi Luna đến trung tâm cứu hộ của chúng tôi.",
        imageUrl: "https://i.imgur.com/pS1LBdR.jpg",
        type: "rescue"
      },
      {
        id: 3,
        date: "10/07/2023",
        title: "Sức khỏe tốt",
        description: "Luna đã được khám sức khỏe tổng quát và đạt kết quả xuất sắc. Bắt đầu lịch tiêm phòng.",
        imageUrl: "https://i.imgur.com/Efkyk4h.jpg",
        type: "medical"
      },
      {
        id: 4,
        date: "15/08/2023",
        title: "Tập làm quen với khay cát",
        description: "Luna nhanh chóng học cách sử dụng khay cát và rất sạch sẽ.",
        imageUrl: "https://i.imgur.com/k3M19uu.jpg",
        type: "training"
      }
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
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2643&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isVaccinated: true,
    isNeutered: true,
    compatibility: ["Thân thiện với trẻ em", "Cần không gian rộng"],
    status: "Đang chờ nhận nuôi",
    timeline: [
      {
        id: 1,
        date: "12/08/2021",
        title: "Được cứu hộ",
        description: "Max được cứu từ một trại chó không đạt chuẩn. Khi đến với chúng tôi, Max rất sợ hãi con người.",
        imageUrl: "https://i.imgur.com/DGDQZvi.jpg",
        type: "rescue"
      },
      {
        id: 2,
        date: "20/08/2021",
        title: "Bắt đầu điều trị",
        description: "Max có một số vấn đề về da và được điều trị kháng sinh. Bắt đầu chế độ ăn đặc biệt.",
        imageUrl: "https://i.imgur.com/tF2MK8h.jpg",
        type: "medical"
      },
      {
        id: 3,
        date: "15/09/2021",
        title: "Tăng cân",
        description: "Max đã tăng 3kg và lông bắt đầu óng mượt. Trở nên tự tin hơn với con người.",
        imageUrl: "https://i.imgur.com/KWrbxXu.jpg",
        type: "milestone"
      },
      {
        id: 4,
        date: "10/11/2021",
        title: "Phẫu thuật tiệt sản",
        description: "Max đã trải qua phẫu thuật tiệt sản thành công và phục hồi rất nhanh.",
        imageUrl: "https://i.imgur.com/YhLTLR3.jpg",
        type: "medical"
      },
      {
        id: 5,
        date: "25/12/2021",
        title: "Bơi lần đầu",
        description: "Max được đưa đến bơi lần đầu tiên và cực kỳ thích thú! Đây giờ là hoạt động yêu thích của Max.",
        imageUrl: "https://i.imgur.com/UCrGZGv.jpg",
        type: "activity"
      },
      {
        id: 6,
        date: "03/02/2022",
        title: "Tham gia khóa huấn luyện",
        description: "Max đã tham gia khóa huấn luyện cơ bản và thể hiện xuất sắc. Rất thông minh và ngoan ngoãn.",
        imageUrl: "https://i.imgur.com/6YkAkBl.jpg",
        type: "training"
      }
    ]
  },
  {
    id: 4,
    name: "Bella",
    type: "Mèo",
    breed: "Anh lông ngắn",
    age: "2 tuổi",
    gender: "Cái",
    location: "Hà Nội",
    description: "Bella là một cô mèo Anh lông ngắn điềm tĩnh và quý phái. Bella thích được chải lông và nằm phơi nắng.",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2643&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isVaccinated: true,
    isNeutered: true,
    compatibility: ["Thích yên tĩnh", "Phù hợp với mọi gia đình"],
    status: "Đang chờ nhận nuôi",
    timeline: []
  },
  {
    id: 5,
    name: "Charlie",
    type: "Chó",
    breed: "Poodle",
    age: "1 tuổi",
    gender: "Đực",
    location: "Hồ Chí Minh",
    description: "Charlie là một chú chó Poodle nhỏ nhắn và thông minh. Charlie rất thích học các trò mới và được khen ngợi.",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2643&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isVaccinated: true,
    isNeutered: false,
    compatibility: ["Phù hợp với căn hộ", "Ít rụng lông"],
    status: "Đang chờ nhận nuôi",
    timeline: []
  },
  {
    id: 6,
    name: "Coco",
    type: "Mèo",
    breed: "Ragdoll",
    age: "4 tuổi",
    gender: "Cái",
    location: "Đà Nẵng",
    description: "Coco là một cô mèo Ragdoll với bộ lông dài mềm mượt. Coco rất điềm tĩnh và thích được ôm ấp.",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2643&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isVaccinated: true,
    isNeutered: true,
    compatibility: ["Thân thiện với trẻ em", "Phù hợp với mọi gia đình"],
    status: "Đang chờ nhận nuôi",
    timeline: []
  },
  {
    id: 7,
    name: "Rocky",
    type: "Chó",
    breed: "Husky",
    age: "2 tuổi",
    gender: "Đực",
    location: "Hà Nội",
    description: "Rocky là một chú chó Husky đầy năng lượng và thích phiêu lưu. Rocky cần được vận động nhiều và không gian rộng rãi.",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2643&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isVaccinated: true,
    isNeutered: true,
    compatibility: ["Cần không gian rộng", "Thích hoạt động ngoài trời"],
    status: "Đang chờ nhận nuôi",
    timeline: []
  },
  {
    id: 8,
    name: "Lily",
    type: "Mèo",
    breed: "Maine Coon",
    age: "3 tuổi",
    gender: "Cái",
    location: "Hồ Chí Minh",
    description: "Lily là một cô mèo Maine Coon to lớn và đáng yêu. Lily rất thông minh và quấn chủ.",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2643&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isVaccinated: true,
    isNeutered: true,
    compatibility: ["Thân thiện với chó", "Thích được vuốt ve"],
    status: "Đang chờ nhận nuôi",
    timeline: []
  },
  {
    id: 9,
    name: "Buddy",
    type: "Chó",
    breed: "Chihuahua",
    age: "5 tuổi",
    gender: "Đực",
    location: "Đà Nẵng",
    description: "Buddy là một chú chó Chihuahua nhỏ nhắn nhưng đầy cá tính. Buddy rất quấn chủ và thích được bế.",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2643&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isVaccinated: true,
    isNeutered: true,
    compatibility: ["Phù hợp với căn hộ", "Thích được ôm ấp"],
    status: "Đang chờ nhận nuôi",
    timeline: []
  },
  {
    id: 10,
    name: "Nala",
    type: "Mèo",
    breed: "Xiêm",
    age: "1 tuổi",
    gender: "Cái",
    location: "Hà Nội",
    description: "Nala là một cô mèo Xiêm xinh đẹp và thông minh. Nala rất tinh nghịch và thích khám phá.",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2643&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isVaccinated: true,
    isNeutered: false,
    compatibility: ["Thích không gian riêng", "Rất thông minh"],
    status: "Đang chờ nhận nuôi",
    timeline: []
  }
];

export default pets; 