# Hướng dẫn sử dụng các thành phần UI mới

## Các thành phần mới được thêm vào

### Hiệu ứng UI Cơ bản
1. **Cursor Trail Effect**: Hiệu ứng đuôi theo con trỏ chuột với biểu tượng động vật dễ thương
2. **Scroll-to-Top Button**: Nút dễ thương để cuộn lên đầu trang
3. **Pet Loading Indicator**: Thành phần hiển thị khi tải dữ liệu với các emoji động vật
4. **Pet Toast Notifications**: Thông báo tùy chỉnh với chủ đề thú cưng
5. **Card Hover Effects**: Hiệu ứng nâng cao khi di chuột qua thẻ

### Thành phần use-gesture mới
6. **DraggablePetCard**: Thẻ thú cưng có thể kéo thả giống ứng dụng hẹn hò
7. **PetGallery**: Thư viện ảnh thú cưng với hiệu ứng cuộn ngang mượt mà
8. **AdoptButton3D**: Nút nhận nuôi với hiệu ứng 3D và sparkle khi hover
9. **PetGestureCard**: Thẻ thú cưng với hiệu ứng parallax khi di chuột

## Trang Demo
Truy cập `/gesture-demo` để xem tất cả các thành phần use-gesture và các hiệu ứng tương tác.

## Cách sử dụng Hiệu ứng UI Cơ bản

### Cursor Trail Effect

Đã được cài đặt mặc định toàn trang web. Không cần thêm code.

### Scroll-to-Top Button

Đã được tích hợp tự động vào cấu trúc ứng dụng. Khi người dùng cuộn xuống dưới 300px, nút sẽ xuất hiện ở góc dưới bên phải của trang.

### Pet Loading Indicator

```jsx
import PetLoading from '../components/utils/PetLoading';

// Trong component của bạn
const [isLoading, setIsLoading] = useState(false);

// Trong phần render
return (
  <>
    {/* Nội dung khác của trang */}
    
    <PetLoading show={isLoading} message="Đang tìm kiếm thú cưng..." />
  </>
);
```

### Pet Toast Notifications

```jsx
import { useRef } from 'react';
import PetToast from '../components/utils/PetToast';

// Trong component của bạn
const toastRef = useRef(null);

const showSuccessToast = () => {
  toastRef.current.show({
    message: 'Đã lưu thông tin thành công!',
    type: 'success', // 'success', 'error', 'warning', 'info'
    duration: 3000 // thời gian hiển thị tính bằng milliseconds
  });
};

// Trong phần render
return (
  <>
    {/* Nội dung khác của trang */}
    
    <button onClick={showSuccessToast}>
      Lưu thông tin
    </button>
    
    <PetToast ref={toastRef} position="bottom-right" />
  </>
);
```

### Card Hover Effects

Thêm các class CSS mới vào các thẻ để có hiệu ứng hover đẹp mắt:

```jsx
// Thêm hiệu ứng hover cho thẻ
<div className="card-hover-effect">
  {/* Nội dung thẻ */}
</div>

// Thêm hiệu ứng sparkle khi hover
<button className="sparkle-on-hover">
  Nhấn vào đây
</button>

// Thêm hiệu ứng tilt 3D cho ảnh
<div className="tilt-effect">
  <img src="/path/to/image.jpg" alt="Pet" />
</div>

// Thêm hiệu ứng paw (dấu chân) khi hover button
<button className="paw-effect">
  <span className="paw-text">Nhận nuôi ngay</span>
</button>
```

## Cách sử dụng thành phần use-gesture

### DraggablePetCard

Thẻ thú cưng có thể kéo thả giống ứng dụng hẹn hò:

```jsx
import DraggablePetCard from '../components/pets/DraggablePetCard';

// Trong component của bạn
const [pets, setPets] = useState([
  { id: 1, name: 'Mèo Miu', imageUrl: '/path/to/image.jpg', /* các thuộc tính khác */ },
  // ... các thú cưng khác
]);

const handleLike = (pet) => {
  console.log('Liked:', pet.name);
  // Xử lý thêm khi người dùng thích
};

const handleDislike = (pet) => {
  console.log('Disliked:', pet.name);
  // Xử lý thêm khi người dùng không thích
};

const handleRemove = (petId) => {
  setPets(prev => prev.filter(pet => pet.id !== petId));
  // Loại bỏ thú cưng khỏi danh sách sau khi đã đưa ra quyết định
};

// Trong phần render
return (
  <div className="relative h-[500px] w-full max-w-xs">
    {pets.map((pet) => (
      <div className="absolute inset-0" key={pet.id}>
        <DraggablePetCard
          pet={pet}
          onLike={handleLike}
          onDislike={handleDislike}
          onRemove={handleRemove}
        />
      </div>
    ))}
  </div>
);
```

### PetGallery

Thư viện ảnh thú cưng với hiệu ứng cuộn ngang mượt mà:

```jsx
import PetGallery from '../components/pets/PetGallery';

// Trong component của bạn
const images = [
  '/path/to/image1.jpg',
  '/path/to/image2.jpg',
  // ... thêm ảnh
];

const handleImageClick = (image, index) => {
  console.log(`Clicked image ${index + 1}:`, image);
  // Xử lý khi người dùng click vào ảnh
};

// Trong phần render
return (
  <PetGallery
    images={images}
    title="Những bé cưng đáng yêu"
    onImageClick={handleImageClick}
  />
);
```

### PetButton

Nút 3D với hiệu ứng hover và sparkle khi nhấp đã được nâng cấp thành `PetButton` - một component rất linh hoạt có thể thay thế cho tất cả các nút trên website:

```jsx
import PetButton from '../components/buttons/PetButton';

// Trong component của bạn
return (
  <>
    {/* Nút cơ bản */}
    <PetButton 
      text="Nhận nuôi ngay" 
      onClick={handleClick} 
    />
    
    {/* Nút với icon */}
    <PetButton 
      text="Thích" 
      icon="heart"
      variant="primary" 
      onClick={handleLike} 
    />
    
    {/* Nút kích thước nhỏ */}
    <PetButton 
      text="Xem chi tiết" 
      size="sm"
      variant="secondary" 
    />
    
    {/* Nút gradient đầy đủ chiều rộng */}
    <PetButton 
      text="Đăng ký nhận nuôi" 
      variant="gradient"
      size="lg"
      full={true}
      icon="paw"
    />
    
    {/* Nút outline */}
    <PetButton 
      text="Hủy" 
      variant="outline"
    />
    
    {/* Nút icon */}
    <PetButton 
      icon="heart"
      size="icon"
      variant="primary"
      onClick={handleLike}
    />
    
    {/* Nút link */}
    <PetButton 
      text="Quay lại danh sách" 
      to="/pets"
      variant="light"
    />
    
    {/* Nút cho form */}
    <PetButton 
      text="Đăng ký" 
      type="submit"
      variant="success"
    />
  </>
);
```

#### Các tùy chọn của PetButton:

| Props | Loại | Mặc định | Mô tả |
|-------|------|----------|-------|
| `text` | string | - | Văn bản hiển thị trên nút |
| `icon` | string | "" | Icon: 'paw', 'heart', 'search', 'plus', 'trash', 'edit', 'save', 'check' |
| `variant` | string | "primary" | Kiểu: 'primary', 'secondary', 'gradient', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'outline' |
| `size` | string | "md" | Kích thước: 'xs', 'sm', 'md', 'lg', 'xl', 'icon' |
| `onClick` | function | - | Hàm xử lý khi click |
| `to` | string | null | Đường dẫn để render thành Link |
| `type` | string | "button" | Loại nút: 'button', 'submit', 'reset' |
| `full` | boolean | false | Chiều rộng 100% |
| `rounded` | boolean | true | Bo tròn, nếu là icon sẽ thành hình tròn |
| `disabled` | boolean | false | Vô hiệu hóa nút |
| `noEffects` | boolean | false | Tắt hiệu ứng 3D và sparkle |
| `className` | string | "" | Class CSS tùy chỉnh |

### AdoptButton3D

Thành phần `PetButton` là phiên bản nâng cấp của `AdoptButton3D`, nhưng bạn vẫn có thể sử dụng `AdoptButton3D` nếu thích kiểu hiệu ứng 3D mạnh hơn:

```jsx
import AdoptButton3D from '../components/buttons/AdoptButton3D';

// Trong component của bạn
const handleAdoptClick = () => {
  console.log('Adopt button clicked!');
  // Xử lý khi người dùng nhấn nút
};

// Trong phần render
return (
  <AdoptButton3D 
    onClick={handleAdoptClick} 
    variant="primary" // "primary", "secondary", "gradient"
    size="md" // "sm", "md", "lg"
    text="Nhận nuôi ngay" // Tùy chỉnh văn bản
  />
);
```

### PetGestureCard

Thẻ thú cưng với hiệu ứng parallax khi di chuột:

```jsx
import PetGestureCard from '../components/pets/PetGestureCard';

// Trong component của bạn
const pet = {
  id: 1,
  name: 'Mèo Miu',
  type: 'Mèo Anh lông ngắn',
  age: '2 tuổi',
  gender: 'Cái',
  color: 'Xám',
  location: 'Quận 1, TP.HCM',
  description: 'Mèo Miu rất thân thiện và thích được vuốt ve.',
  imageUrl: '/path/to/image.jpg'
};

const handleCardClick = (pet) => {
  console.log('Clicked on:', pet.name);
  // Xử lý khi người dùng click vào thẻ
};

const handleLike = (pet, liked) => {
  console.log(`${liked ? 'Liked' : 'Unliked'} ${pet.name}`);
  // Xử lý khi người dùng like/unlike
};

// Trong phần render
return (
  <PetGestureCard
    pet={pet}
    onClick={handleCardClick}
    onLike={handleLike}
  />
);
```

## Cách tùy chỉnh

### Thay đổi emoji trong Cursor Trail

Mở file `src/utils/animationUtils.js` và chỉnh sửa mảng `emojis` trong hàm `createCursorTrailEffect`:

```javascript
const emojis = ['🐱', '🐶', '🐰', '🐹', '🦊', '🐻']; // Thay đổi emoji tại đây
```

### Thay đổi kiểu loading indicator

Mở file `src/components/utils/PetLoading.jsx` và chỉnh sửa mảng `pets`:

```javascript
const pets = ['🐱', '🐶', '🐰', '🐹', '🦊', '🐻']; // Thay đổi emoji tại đây
```

### Tùy chỉnh màu sắc của Toast

Mở file `src/App.css` và chỉnh sửa các class CSS liên quan đến `.toast-cute`:

```css
.toast-cute.success {
  border-left-color: #8ED1AF; /* Màu cho success toast */
}

.toast-cute.error {
  border-left-color: #FF8087; /* Màu cho error toast */
}
```

### Tùy chỉnh màu sắc của AdoptButton3D

Mở file `src/components/buttons/AdoptButton3D.jsx` và chỉnh sửa object `variantClasses`:

```javascript
const variantClasses = {
  primary: "bg-pink-500 text-white hover:bg-pink-600", // Thay đổi màu cho nút primary
  secondary: "bg-purple-500 text-white hover:bg-purple-600", // Thay đổi màu cho nút secondary
  gradient: "bg-gradient-to-r from-pink-500 to-purple-600 text-white" // Thay đổi gradient
};
```

## Lưu ý về hiệu suất

- Hiệu ứng cursor trail và parallax có thể ảnh hưởng đến hiệu suất trên các thiết bị cấu hình thấp. Các thành phần đã được tối ưu để tự động vô hiệu hóa trên thiết bị di động.

- Nếu gặp vấn đề hiệu suất với cursor trail, có thể giảm số lượng phần tử theo dõi bằng cách thay đổi tham số trong `createCursorTrailEffect(3)` (thay vì mặc định là 5).

- Các hiệu ứng hover được thiết kế để hoạt động tốt trên cả desktop và mobile, nhưng một số có thể không hoạt động đúng trên các trình duyệt cũ.

Nếu có bất kỳ vấn đề gì, vui lòng báo cáo để cải thiện hơn! 