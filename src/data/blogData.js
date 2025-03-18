import imagePaths from '../utils/imageImports';

const blogPosts = [
  {
    id: 1,
    title: 'Những lưu ý khi mới đón thú cưng về nhà',
    category: 'Chăm sóc',
    date: '15/06/2023',
    author: 'Bs. Nguyễn Minh',
    authorAvatar: imagePaths.authorNM,
    image: imagePaths.newPetHome,
    summary: 'Những điều cần lưu ý để giúp thú cưng mới nhanh chóng thích nghi với môi trường sống mới.',
    content: `
      <p>Đón một thú cưng mới về nhà là một khoảnh khắc đáng nhớ, nhưng cũng đi kèm với nhiều thách thức. Dưới đây là một số lưu ý giúp quá trình chuyển đổi diễn ra suôn sẻ hơn cho cả bạn và thú cưng:</p>
      
      <h3>1. Chuẩn bị không gian an toàn</h3>
      <p>Trước khi đón thú cưng về, hãy đảm bảo nhà của bạn đã được chuẩn bị an toàn. Cất giữ các vật dụng nguy hiểm, dây điện, và các đồ vật nhỏ có thể nuốt được. Đối với chó mèo mới, nên có một không gian riêng nhỏ cho chúng nghỉ ngơi và cảm thấy an toàn.</p>
      
      <h3>2. Kiên nhẫn trong quá trình làm quen</h3>
      <p>Thú cưng cần thời gian để thích nghi với môi trường mới. Trong những ngày đầu, chúng có thể cảm thấy lo lắng, sợ hãi hoặc thậm chí là hung hăng. Hãy kiên nhẫn và cho chúng không gian riêng khi cần thiết.</p>
      
      <h3>3. Thiết lập thói quen</h3>
      <p>Thú cưng thích nghi tốt với các thói quen và lịch trình. Thiết lập thời gian cố định cho bữa ăn, đi vệ sinh và tập luyện sẽ giúp chúng cảm thấy an tâm hơn.</p>
      
      <h3>4. Từ từ giới thiệu với các thành viên khác</h3>
      <p>Nếu bạn đã có thú cưng khác, hãy giới thiệu chúng với nhau một cách từ từ và trong môi trường có kiểm soát. Đối với trẻ em, dạy chúng cách tiếp xúc đúng cách với thú cưng mới.</p>
      
      <h3>5. Chăm sóc sức khỏe ban đầu</h3>
      <p>Đặt lịch kiểm tra sức khỏe với bác sĩ thú y trong tuần đầu tiên. Đảm bảo thú cưng của bạn được tiêm phòng, tẩy giun và kiểm tra các vấn đề sức khỏe.</p>
    `,
    tags: ['thú cưng mới', 'chăm sóc', 'làm quen']
  },
  {
    id: 2,
    title: 'Dinh dưỡng cần thiết cho chó con dưới 6 tháng tuổi',
    category: 'Dinh dưỡng',
    date: '07/07/2023',
    author: 'Ts. Trần Anh',
    authorAvatar: imagePaths.authorTA,
    image: imagePaths.puppyNutrition,
    summary: 'Hướng dẫn về chế độ dinh dưỡng phù hợp cho chó con để đảm bảo sự phát triển khỏe mạnh.',
    content: `
      <p>Chó con dưới 6 tháng tuổi đang trong giai đoạn phát triển quan trọng và cần được cung cấp đầy đủ dưỡng chất. Dưới đây là những thông tin về dinh dưỡng cần thiết cho chó con:</p>
      
      <h3>1. Protein chất lượng cao</h3>
      <p>Protein là nền tảng cho sự phát triển cơ bắp và mô của chó con. Thức ăn cho chó con nên chứa ít nhất 22-32% protein, với nguồn chính từ thịt gà, thịt bò, cá hoặc trứng.</p>
      
      <h3>2. Chất béo lành mạnh</h3>
      <p>Chất béo cung cấp năng lượng cần thiết và hỗ trợ phát triển não bộ. Chó con nên nhận khoảng 8-17% chất béo trong khẩu phần ăn, bao gồm các axit béo omega-3 và omega-6.</p>
      
      <h3>3. Canxi và Phospho</h3>
      <p>Những khoáng chất này rất quan trọng cho sự phát triển xương và răng. Tỷ lệ canxi:phospho nên là 1.2:1. Quá nhiều hoặc quá ít canxi đều có thể gây ra vấn đề về xương.</p>
      
      <h3>4. Vitamin và khoáng chất</h3>
      <p>Vitamin A, D, E, và các vitamin nhóm B đều quan trọng. Ngoài ra, các khoáng chất như kẽm, sắt và magiê cũng cần thiết cho sự phát triển toàn diện.</p>
      
      <h3>5. Tần suất và lượng thức ăn</h3>
      <p>Chó con 8-12 tuần tuổi nên được cho ăn 4 lần/ngày. Từ 3-6 tháng, giảm xuống 3 lần/ngày. Lượng thức ăn phụ thuộc vào giống chó và mức độ hoạt động, nhưng nên tuân theo hướng dẫn trên bao bì thức ăn và điều chỉnh theo tình trạng cơ thể của chó.</p>
    `,
    tags: ['chó con', 'dinh dưỡng', 'sức khỏe']
  },
  {
    id: 3,
    title: 'Cách huấn luyện mèo đi vệ sinh đúng chỗ',
    category: 'Huấn luyện',
    date: '25/07/2023',
    author: 'Chu Hương',
    authorAvatar: imagePaths.authorCH,
    image: imagePaths.catLitterTraining,
    summary: 'Những bước đơn giản để huấn luyện mèo sử dụng khay vệ sinh một cách hiệu quả.',
    content: `
      <p>Huấn luyện mèo đi vệ sinh đúng chỗ thường dễ dàng hơn nhiều so với huấn luyện chó, nhưng vẫn có một số bí quyết để quá trình này diễn ra suôn sẻ:</p>
      
      <h3>1. Chọn khay vệ sinh phù hợp</h3>
      <p>Có nhiều loại khay vệ sinh cho mèo, từ khay hở đơn giản đến khay kín có nắp đậy. Đối với mèo con hoặc mèo mới, nên bắt đầu với khay hở để chúng dễ tiếp cận. Kích thước khay nên đủ lớn để mèo có thể xoay người thoải mái.</p>
      
      <h3>2. Vị trí đặt khay</h3>
      <p>Đặt khay vệ sinh ở nơi yên tĩnh, dễ tiếp cận nhưng vẫn đảm bảo sự riêng tư cho mèo. Tránh đặt gần khu vực ăn uống hoặc nơi có nhiều người qua lại.</p>
      
      <h3>3. Loại cát vệ sinh</h3>
      <p>Hầu hết mèo thích cát mịn, không mùi. Nếu mèo từ chối sử dụng khay, thử đổi loại cát khác. Một số mèo thích cát vón cục, trong khi số khác lại thích cát tinh thể.</p>
      
      <h3>4. Giới thiệu mèo với khay vệ sinh</h3>
      <p>Khi mới đón mèo về, đặt mèo vào khay vệ sinh để chúng làm quen. Cào nhẹ chân mèo trong cát để khơi gợi bản năng đào của chúng.</p>
      
      <h3>5. Vệ sinh thường xuyên</h3>
      <p>Mèo rất sạch sẽ và có thể từ chối sử dụng khay bẩn. Dọn bỏ phân và nước tiểu hàng ngày, thay cát hoàn toàn mỗi tuần.</p>
      
      <h3>6. Xử lý khi mèo đi sai chỗ</h3>
      <p>Nếu mèo đi vệ sinh sai chỗ, không phạt mà hãy lau sạch kỹ với chất tẩy trung hòa mùi. Quan sát để hiểu lý do và điều chỉnh (có thể do khay bẩn, vị trí không phù hợp hoặc mèo bị stress).</p>
    `,
    tags: ['mèo', 'huấn luyện', 'vệ sinh']
  },
  {
    id: 4,
    title: 'Những dấu hiệu sức khỏe cần chú ý ở thú cưng',
    category: 'Sức khỏe',
    date: '10/08/2023',
    author: 'Bs. Lê Hoàng',
    authorAvatar: imagePaths.authorLH,
    image: imagePaths.petHealthSigns,
    summary: 'Cách nhận biết các dấu hiệu bất thường về sức khỏe ở thú cưng để kịp thời xử lý.',
    content: `
      <p>Theo dõi sức khỏe của thú cưng là một phần quan trọng trong việc chăm sóc chúng. Dưới đây là những dấu hiệu bất thường mà bạn nên chú ý:</p>
      
      <h3>1. Thay đổi trong việc ăn uống</h3>
      <p>Việc thú cưng đột ngột biếng ăn hoặc uống quá nhiều nước có thể là dấu hiệu của nhiều vấn đề sức khỏe khác nhau, từ vấn đề răng miệng đến bệnh tiểu đường hoặc bệnh thận.</p>
      
      <h3>2. Thay đổi về hành vi</h3>
      <p>Thú cưng trở nên thu mình, hung hăng hoặc bồn chồn bất thường có thể đang gặp vấn đề. Chú ý đặc biệt nếu thú cưng của bạn thường hoạt bát nhưng đột nhiên trở nên uể oải.</p>
      
      <h3>3. Vấn đề về đường tiêu hóa</h3>
      <p>Tiêu chảy, nôn mửa hoặc táo bón kéo dài là dấu hiệu của các vấn đề tiêu hóa. Nếu tình trạng này kéo dài hơn 24 giờ, hãy đưa thú cưng đến bác sĩ thú y.</p>
      
      <h3>4. Thay đổi về hơi thở và ho</h3>
      <p>Hơi thở hôi bất thường, thở khó khăn hoặc ho liên tục có thể là dấu hiệu của vấn đề răng miệng, đường hô hấp hoặc tim mạch.</p>
      
      <h3>5. Thay đổi về da và lông</h3>
      <p>Da đỏ, ngứa, rụng lông bất thường hoặc xuất hiện các khối u có thể do dị ứng, ký sinh trùng hoặc các bệnh nghiêm trọng hơn.</p>
      
      <h3>6. Vấn đề về di chuyển</h3>
      <p>Đi khập khiễng, khó đứng dậy hoặc không muốn leo cầu thang có thể là dấu hiệu của đau khớp, chấn thương hoặc các vấn đề thần kinh.</p>
      
      <h3>Khi nào cần đưa thú cưng đến bác sĩ khẩn cấp:</h3>
      <ul>
        <li>Khó thở hoặc thở nhanh</li>
        <li>Tiêu chảy hoặc nôn mửa liên tục</li>
        <li>Không thể đứng hoặc đi lại</li>
        <li>Bụng cứng hoặc sưng to</li>
        <li>Cơn động kinh</li>
        <li>Nuốt phải vật lạ hoặc chất độc</li>
      </ul>
    `,
    tags: ['sức khỏe', 'dấu hiệu', 'bệnh']
  },
  {
    id: 5,
    title: 'Các trò chơi giúp phát triển trí thông minh cho chó',
    category: 'Huấn luyện',
    date: '22/08/2023',
    author: 'Minh Tuấn',
    authorAvatar: imagePaths.authorMT,
    image: imagePaths.dogIntelligenceGames,
    summary: 'Những trò chơi thú vị giúp kích thích trí thông minh và phát triển kỹ năng cho chó cưng.',
    content: `
      <p>Chó không chỉ cần vận động thể chất mà còn cần được kích thích tinh thần. Các trò chơi phát triển trí tuệ không chỉ giúp chó thông minh hơn mà còn tăng cường mối quan hệ giữa bạn và thú cưng:</p>
      
      <h3>1. Trò chơi tìm đồ vật</h3>
      <p>Bắt đầu bằng cách để chó xem bạn giấu đồ chơi hoặc thức ăn, sau đó yêu cầu chúng tìm kiếm. Khi chó đã quen, bạn có thể giấu kỹ hơn hoặc giấu nhiều vật cùng lúc.</p>
      
      <h3>2. Đồ chơi giải đố</h3>
      <p>Có nhiều loại đồ chơi giải đố cho chó, từ đơn giản đến phức tạp. Chúng thường chứa thức ăn thưởng và đòi hỏi chó phải tìm cách để lấy được phần thưởng.</p>
      
      <h3>3. Trò chơi bình cũ rượu mới</h3>
      <p>Dạy chó nhận biết tên của các đồ vật khác nhau, sau đó yêu cầu chúng lấy đồ vật cụ thể. Bắt đầu với 2-3 đồ vật và tăng dần.</p>
      
      <h3>4. Trò chơi cốc úp</h3>
      <p>Đặt thức ăn dưới một trong ba cái cốc, cho chó xem, sau đó di chuyển các cốc và yêu cầu chó tìm thức ăn.</p>
      
      <h3>5. Học tên đồ vật</h3>
      <p>Một số chó có thể học được tên của hàng chục hoặc thậm chí hàng trăm đồ vật khác nhau. Bắt đầu bằng cách dạy chó nhận biết một món đồ chơi cụ thể bằng tên, sau đó mở rộng danh sách.</p>
      
      <h3>6. Trò chơi bấm nút</h3>
      <p>Dạy chó bấm các nút hoặc chuông khác nhau để nhận phần thưởng. Bạn có thể bắt đầu với một nút đơn giản, sau đó tiến tới các chuỗi hành động phức tạp hơn.</p>
      
      <h3>Lời khuyên:</h3>
      <p>Luôn giữ cho các trò chơi vui vẻ và tích cực. Nếu chó trở nên thất vọng, hãy đơn giản hóa trò chơi. Thường xuyên thay đổi trò chơi để giữ sự hứng thú cho chó. Và luôn khen thưởng khi chó thành công, dù là thành công nhỏ.</p>
    `,
    tags: ['chó', 'trò chơi', 'trí tuệ', 'huấn luyện']
  },
  {
    id: 6,
    title: 'Chăm sóc lông mèo dài - những lưu ý quan trọng',
    category: 'Chăm sóc',
    date: '05/09/2023',
    author: 'Thu Hà',
    authorAvatar: imagePaths.authorTH,
    image: imagePaths.longHairCatCare,
    summary: 'Hướng dẫn chi tiết về cách chăm sóc lông cho các giống mèo lông dài.',
    content: `
      <p>Những giống mèo lông dài như Persian, Maine Coon hay Ragdoll đều có bộ lông đẹp mắt nhưng đòi hỏi sự chăm sóc đặc biệt. Dưới đây là những lưu ý quan trọng để giữ cho bộ lông mèo luôn khỏe đẹp:</p>
      
      <h3>1. Chải lông thường xuyên</h3>
      <p>Mèo lông dài cần được chải lông ít nhất 2-3 lần/tuần, hoặc hàng ngày trong mùa thay lông. Sử dụng lược phù hợp: lược thưa để gỡ rối, sau đó dùng lược chải mịn hơn.</p>
      
      <h3>2. Phòng ngừa búi lông</h3>
      <p>Búi lông không chỉ làm xấu bộ lông mà còn có thể gây khó chịu và đau đớn cho mèo. Chú ý chải kỹ những vùng dễ bị rối như sau tai, dưới cổ, bụng và đuôi.</p>
      
      <h3>3. Tắm định kỳ</h3>
      <p>Mèo lông dài nên được tắm mỗi 4-6 tuần tùy thuộc vào môi trường sống và mức độ bẩn. Sử dụng dầu gội dành riêng cho mèo lông dài và xả sạch hoàn toàn. Sau khi tắm, sấy khô lông để tránh mèo bị lạnh và tránh hình thành các búi lông.</p>
      
      <h3>4. Dinh dưỡng hỗ trợ lông khỏe mạnh</h3>
      <p>Chế độ ăn giàu protein chất lượng cao, axit béo omega-3 và omega-6 sẽ giúp lông mèo chắc khỏe và bóng mượt. Có thể bổ sung dầu cá hoặc dầu hạt lanh vào thức ăn để cải thiện chất lượng lông.</p>
      
      <h3>5. Kiểm soát lông rụng</h3>
      <p>Mèo lông dài rụng nhiều lông hơn, đặc biệt là vào mùa thay lông. Việc thường xuyên chải lông sẽ giúp giảm lượng lông rụng trong nhà. Bạn cũng có thể sử dụng các loại găng tay cao su hoặc bàn chải loại bỏ lông trên quần áo và đồ nội thất.</p>
      
      <h3>6. Lưu ý về sức khỏe liên quan đến lông</h3>
      <p>Mèo lông dài dễ bị các vấn đề về búi lông trong dạ dày do chúng nuốt nhiều lông khi vệ sinh. Có thể cho mèo sử dụng sản phẩm hỗ trợ tiêu búi lông hoặc trồng cỏ mèo để giúp chúng nôn búi lông ra ngoài.</p>
      
      <h3>7. Cắt tỉa khi cần thiết</h3>
      <p>Một số vùng như quanh hậu môn, giữa các miếng đệm chân có thể cần được cắt tỉa ngắn hơn để đảm bảo vệ sinh. Nếu bạn không tự tin, hãy nhờ đến dịch vụ chuyên nghiệp.</p>
    `,
    tags: ['mèo', 'lông dài', 'chăm sóc', 'làm đẹp']
  }
];

export default blogPosts;
