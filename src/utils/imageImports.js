// Import các hình ảnh từ thư viện mẫu
import dogHero from '../assets/images/dog-hero.svg';
import catHero from '../assets/images/cat-hero.svg';
import pawPrint from '../assets/images/paw-print.svg';
import heartPaw from '../assets/images/heart-paw.svg';
import petHouse from '../assets/images/pet-house.svg';

// Import hình ảnh blog
import newPetHome from '../assets/images/blog/new-pet-home.svg';
import puppyNutrition from '../assets/images/blog/puppy-nutrition.svg';
import catLitterTraining from '../assets/images/blog/cat-litter-training.svg';
import petHealthSigns from '../assets/images/blog/pet-health-signs.svg';
import dogIntelligenceGames from '../assets/images/blog/dog-intelligence-games.svg';
import longHairCatCare from '../assets/images/blog/long-hair-cat-care.svg';

// Import avatar tác giả
import authorNM from '../assets/images/author-nm.svg';
import authorTA from '../assets/images/author-ta.svg';
import authorCH from '../assets/images/author-ch.svg';
import authorLH from '../assets/images/author-lh.svg';
import authorMT from '../assets/images/author-mt.svg';
import authorTH from '../assets/images/author-th.svg';

// Import hình ảnh timeline
import timelinePlaceholder from '../assets/images/timeline-placeholder.svg';
import timelineMedical from '../assets/images/timeline-medical.svg';
import timelineTraining from '../assets/images/timeline-training.svg';
import timelineRescue from '../assets/images/timeline-rescue.svg';

// Tạo đường dẫn ảo cho mock data
const imagePaths = {
  // Ảnh thú cưng
  corgi: pawPrint,
  munchkin: pawPrint,
  golden: pawPrint,
  britishShorthair: pawPrint,
  poodle: pawPrint,
  ragdoll: pawPrint,
  husky: pawPrint,
  maineCoon: pawPrint,
  chihuahua: pawPrint,
  siamese: pawPrint,
  
  // Ảnh sự kiện
  adoptionEvent: heartPaw,
  petCareWorkshop: heartPaw,
  donationCampaign: heartPaw,
  freeCheckup: heartPaw,
  charityRun: heartPaw,
  photoExhibition: heartPaw,
  
  // Ảnh donate
  foodDonation: petHouse,
  medicalFund: petHouse,
  playground: petHouse,
  vaccination: petHouse,
  
  // Ảnh hero section
  dogHero: dogHero,
  catHero: catHero,
  
  // Ảnh blog
  newPetHome: newPetHome,
  puppyNutrition: puppyNutrition,
  catLitterTraining: catLitterTraining,
  petHealthSigns: petHealthSigns,
  dogIntelligenceGames: dogIntelligenceGames,
  longHairCatCare: longHairCatCare,
  
  // Avatar tác giả
  authorNM: authorNM, // Bs. Nguyễn Minh
  authorTA: authorTA, // Ts. Trần Anh
  authorCH: authorCH, // Chu Hương
  authorLH: authorLH, // Bs. Lê Hoàng
  authorMT: authorMT, // Minh Tuấn
  authorTH: authorTH, // Thu Hà
  
  // Icon chung
  pawPrint: pawPrint,
  
  // Timeline images
  timelinePlaceholder: timelinePlaceholder,
  timelineMedical: timelineMedical,
  timelineTraining: timelineTraining,
  timelineRescue: timelineRescue
};

// Cấu trúc sắp xếp các hình ảnh theo mục đích sử dụng
const images = {
  pets: {
    dog: dogHero,
    cat: catHero,
    icons: {
      pawPrint,
      heartPaw,
      petHouse
    }
  },
  
  blog: {
    newPetHome,
    puppyNutrition,
    catLitterTraining,
    petHealthSigns,
    dogIntelligenceGames,
    longHairCatCare
  },
  
  authors: {
    'Bs. Nguyễn Minh': authorNM,
    'Ts. Trần Anh': authorTA,
    'Chu Hương': authorCH,
    'Bs. Lê Hoàng': authorLH,
    'Minh Tuấn': authorMT,
    'Thu Hà': authorTH
  },
  
  timeline: {
    placeholder: timelinePlaceholder,
    medical: timelineMedical,
    training: timelineTraining,
    rescue: timelineRescue,
    // Map các placeholder theo loại sự kiện
    byType: {
      'medical': timelineMedical,
      'training': timelineTraining,
      'rescue': timelineRescue,
      'default': timelinePlaceholder
    }
  }
};

export default imagePaths;
export { images }; 