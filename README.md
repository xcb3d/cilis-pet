# Cilis Pet - Nền tảng nhận nuôi thú cưng

Cilis Pet là một nền tảng trực tuyến giúp kết nối những thú cưng đang cần mái ấm mới với những người yêu thích động vật. Với giao diện thân thiện và nhiều tính năng tương tác, Cilis Pet mang đến trải nghiệm mượt mà, vui nhộn và dễ sử dụng.

## Tính năng chính

- **Quản lý thú cưng**: Duyệt và tìm kiếm các thú cưng theo nhiều tiêu chí (loại, tuổi, giới tính, kích thước, v.v.).
- **Trang thông tin chi tiết**: Xem thông tin đầy đủ về từng thú cưng, bao gồm hình ảnh, mô tả, tính cách và nhu cầu chăm sóc.
- **Quy trình nhận nuôi**: Hướng dẫn từng bước để đăng ký nhận nuôi thú cưng.
- **Blog**: Bài viết hữu ích về chăm sóc thú cưng, huấn luyện và dinh dưỡng.
- **Quản lý tài khoản**: Đăng ký, đăng nhập và quản lý hồ sơ cá nhân.

## Các tính năng tương tác nâng cao

### Hiệu ứng con trỏ & UI
- **Cursor Trail Effect**: Hiệu ứng đuôi theo con trỏ chuột với biểu tượng động vật dễ thương
- **Cursor Theme**: Con trỏ chuột tùy chỉnh với hình dạng động vật phù hợp với nội dung
- **Scroll-to-Top Button**: Nút dễ thương để cuộn lên đầu trang
- **Pet Loading Indicator**: Thành phần hiển thị khi tải dữ liệu với các emoji động vật
- **Pet Toast Notifications**: Thông báo tùy chỉnh với chủ đề thú cưng
- **Card Hover Effects**: Hiệu ứng nâng cao khi di chuột qua thẻ

### Thành phần use-gesture & framer-motion
- **DraggablePetCard**: Thẻ thú cưng có thể kéo thả giống ứng dụng hẹn hò
- **PetGallery**: Thư viện ảnh thú cưng với hiệu ứng cuộn ngang mượt mà
- **AdoptButton3D**: Nút nhận nuôi với hiệu ứng 3D và sparkle khi hover
- **PetGestureCard**: Thẻ thú cưng với hiệu ứng parallax khi di chuột

## Công nghệ sử dụng

- **React**: Thư viện JavaScript cho UI
- **Vite**: Build tool hiện đại
- **Framer Motion**: Thư viện animation
- **use-gesture**: Thư viện quản lý cử chỉ người dùng (drag, swipe, pinch...)
- **Tailwind CSS**: Framework CSS utility-first
- **React Router**: Thư viện định tuyến
- **React Icons**: Bộ icon

## Cài đặt và chạy

1. Clone repository:
```bash
git clone https://github.com/yourusername/cilis-pet.git
cd cilis-pet
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy ứng dụng trong môi trường development:
```bash
npm run dev
```

4. Truy cập ứng dụng tại `http://localhost:5173`

## Tài liệu

Để biết thêm chi tiết về các thành phần UI và cách sử dụng, vui lòng tham khảo file `src/docs/UIGuide.md`.

## Trang Demo Gesture

Truy cập `/gesture-demo` để xem tất cả các thành phần use-gesture và các hiệu ứng tương tác.
