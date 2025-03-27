import React, { useState } from 'react';
import DraggablePetCard from '../components/pets/DraggablePetCard';
import PetGallery from '../components/pets/PetGallery';
import AdoptButton3D from '../components/buttons/AdoptButton3D';
import PetGestureCard from '../components/pets/PetGestureCard';
import { motion } from 'framer-motion';
import { FaPaw, FaHeart } from 'react-icons/fa';

const GestureDemo = () => {
  // Dữ liệu mẫu cho pets
  const samplePets = [
    {
      id: 1,
      name: 'Mèo Miu',
      type: 'Mèo Anh lông ngắn',
      age: '2 tuổi',
      gender: 'Cái',
      color: 'Xám',
      location: 'Quận 1, TP.HCM',
      description: 'Mèo Miu rất thân thiện và thích được vuốt ve. Bé thích ngủ trên đùi chủ và chơi với đồ chơi chuột.',
      imageUrl: 'https://placekitten.com/500/500'
    },
    {
      id: 2,
      name: 'Cún Bo',
      type: 'Chó Corgi',
      age: '1 tuổi',
      gender: 'Đực',
      color: 'Vàng',
      location: 'Quận 2, TP.HCM',
      description: 'Cún Bo rất hoạt bát và thích chơi đùa. Bé rất thân thiện với trẻ em và thú cưng khác.',
      imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=500&h=500&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Thỏ Lu',
      type: 'Thỏ Angora',
      age: '8 tháng',
      gender: 'Cái',
      color: 'Trắng',
      location: 'Quận 3, TP.HCM',
      description: 'Thỏ Lu rất dễ thương và sạch sẽ. Bé thích ăn cà rốt và lá xà lách.',
      imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=500&h=500&auto=format&fit=crop'
    }
  ];
  
  // Dữ liệu mẫu cho gallery
  const sampleImages = [
    'https://placekitten.com/600/400',
    'https://placekitten.com/601/400',
    'https://placekitten.com/602/400',
    'https://placekitten.com/603/400',
    'https://placekitten.com/604/400',
    'https://placekitten.com/605/400',
  ];
  
  // State cho dragabble cards
  const [draggablePets, setDraggablePets] = useState(samplePets);
  
  // Handlers cho draggable cards
  const handleLike = (pet) => {
    console.log('Liked:', pet.name);
  };
  
  const handleDislike = (pet) => {
    console.log('Disliked:', pet.name);
  };
  
  const handleRemove = (petId) => {
    setDraggablePets(prev => prev.filter(pet => pet.id !== petId));
  };
  
  // Handler cho gallery
  const handleImageClick = (image, index) => {
    console.log(`Clicked image ${index + 1}:`, image);
  };
  
  // Handler cho AdoptButton
  const handleAdoptClick = () => {
    console.log('Adopt button clicked!');
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Gesture và Motion Demo</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Các thành phần UI tương tác sử dụng use-gesture và framer-motion để tạo trải nghiệm người dùng tuyệt vời.
        </p>
      </motion.div>
      
      {/* Draggable Pet Cards */}
      <section className="mb-16">
        <div className="flex items-center justify-center gap-2 mb-8">
          <FaPaw className="text-pink-500 text-xl" />
          <h2 className="text-2xl font-bold text-gray-800">Draggable Pet Cards</h2>
        </div>
        
        <p className="text-center text-gray-600 mb-8">
          Vuốt sang trái hoặc phải để thích hoặc bỏ qua thú cưng, giống như ứng dụng hẹn hò.
        </p>
        
        <div className="flex justify-center">
          {draggablePets.length > 0 ? (
            <div className="relative h-[500px] w-full max-w-xs">
              {draggablePets.map((pet) => (
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
          ) : (
            <div className="text-center text-gray-500 p-10 border border-dashed border-gray-300 rounded-xl">
              <FaHeart className="text-pink-300 text-4xl mx-auto mb-4" />
              <p>Không còn thú cưng nào. Hãy làm mới trang để xem lại!</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Pet Gallery */}
      <section className="mb-16">
        <div className="flex items-center justify-center gap-2 mb-8">
          <FaPaw className="text-pink-500 text-xl" />
          <h2 className="text-2xl font-bold text-gray-800">Pet Gallery</h2>
        </div>
        
        <p className="text-center text-gray-600 mb-8">
          Kéo ngang để xem thêm ảnh. Click vào ảnh để phóng to.
        </p>
        
        <PetGallery
          images={sampleImages}
          title="Những bé cưng đáng yêu"
          onImageClick={handleImageClick}
        />
      </section>
      
      {/* 3D Adopt Button */}
      <section className="mb-16">
        <div className="flex items-center justify-center gap-2 mb-8">
          <FaPaw className="text-pink-500 text-xl" />
          <h2 className="text-2xl font-bold text-gray-800">3D Adopt Button</h2>
        </div>
        
        <p className="text-center text-gray-600 mb-8">
          Di chuyển chuột qua nút để thấy hiệu ứng 3D. Nhấn để xem hiệu ứng sparkle.
        </p>
        
        <div className="flex flex-wrap gap-8 justify-center">
          <div>
            <h3 className="text-center mb-4 text-gray-700 font-medium">Primary</h3>
            <AdoptButton3D onClick={handleAdoptClick} variant="primary" />
          </div>
          
          <div>
            <h3 className="text-center mb-4 text-gray-700 font-medium">Secondary</h3>
            <AdoptButton3D onClick={handleAdoptClick} variant="secondary" text="Tìm hiểu thêm" />
          </div>
          
          <div>
            <h3 className="text-center mb-4 text-gray-700 font-medium">Gradient</h3>
            <AdoptButton3D onClick={handleAdoptClick} variant="gradient" text="Xem thêm thú cưng" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-8 justify-center mt-8">
          <div>
            <h3 className="text-center mb-4 text-gray-700 font-medium">Small</h3>
            <AdoptButton3D onClick={handleAdoptClick} size="sm" />
          </div>
          
          <div>
            <h3 className="text-center mb-4 text-gray-700 font-medium">Medium</h3>
            <AdoptButton3D onClick={handleAdoptClick} size="md" />
          </div>
          
          <div>
            <h3 className="text-center mb-4 text-gray-700 font-medium">Large</h3>
            <AdoptButton3D onClick={handleAdoptClick} size="lg" />
          </div>
        </div>
      </section>
      
      {/* Pet Gesture Cards */}
      <section className="mb-16">
        <div className="flex items-center justify-center gap-2 mb-8">
          <FaPaw className="text-pink-500 text-xl" />
          <h2 className="text-2xl font-bold text-gray-800">Gesture Pet Cards</h2>
        </div>
        
        <p className="text-center text-gray-600 mb-8">
          Di chuyển chuột qua thẻ để thấy hiệu ứng parallax 3D. Nhấn vào biểu tượng trái tim để thích.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {samplePets.map(pet => (
            <PetGestureCard
              key={pet.id}
              pet={pet}
              onClick={() => console.log(`Clicked on ${pet.name}`)}
              onLike={(pet, liked) => console.log(`${liked ? 'Liked' : 'Unliked'} ${pet.name}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default GestureDemo; 