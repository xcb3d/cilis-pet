import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, FaTag, FaChevronLeft, FaPaw, FaShare, 
  FaFacebook, FaTwitter, FaPinterest, FaArrowUp, FaList,
  FaUser, FaBriefcase, FaEnvelope, FaGlobe
} from 'react-icons/fa';
import blogPosts from '../data/blogData';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const contentRef = useRef(null);
  const [headings, setHeadings] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    // Tìm bài viết theo ID
    const foundPost = blogPosts.find(post => post.id === parseInt(id) || post.id === id);

    if (foundPost) {
      setPost(foundPost);

      // Tìm các bài viết liên quan (cùng category hoặc có chung tags)
      const related = blogPosts
        .filter(p => p.id !== foundPost.id) // Loại bỏ bài viết hiện tại
        .filter(p =>
          p.category === foundPost.category ||
          p.tags.some(tag => foundPost.tags.includes(tag))
        )
        .slice(0, 3); // Lấy tối đa 3 bài viết liên quan

      setRelatedPosts(related);
    } else {
      // Chuyển về trang blog nếu không tìm thấy bài viết
      navigate('/blog');
    }
  }, [id, navigate]);

  useEffect(() => {
    if (post && contentRef.current) {
      // Trích xuất các tiêu đề để tạo mục lục
      const headingElements = contentRef.current.querySelectorAll('h3');
      const extractedHeadings = Array.from(headingElements).map((heading, index) => ({
        id: `heading-${index}`,
        text: heading.textContent,
        element: heading
      }));
      
      // Thêm id cho mỗi heading để làm điểm nhảy
      extractedHeadings.forEach(heading => {
        heading.element.id = heading.id;
      });
      
      setHeadings(extractedHeadings);

      // Áp dụng animation cho các tiêu đề và đoạn văn
      const titles = contentRef.current.querySelectorAll('h3');
      const paragraphs = contentRef.current.querySelectorAll('p');
      const lists = contentRef.current.querySelectorAll('ul');

      // Animation cho tiêu đề
      titles.forEach((title, index) => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        setTimeout(() => {
          title.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          title.style.opacity = '1';
          title.style.transform = 'translateY(0)';
        }, 300 + (index * 150));
      });

      // Animation cho đoạn văn
      paragraphs.forEach((paragraph, index) => {
        paragraph.style.opacity = '0';
        paragraph.style.transform = 'translateY(20px)';
        setTimeout(() => {
          paragraph.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          paragraph.style.opacity = '1';
          paragraph.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
      });

      // Animation cho danh sách
      lists.forEach((list, index) => {
        list.style.opacity = '0';
        list.style.transform = 'translateY(20px)';
        setTimeout(() => {
          list.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          list.style.opacity = '1';
          list.style.transform = 'translateY(0)';
        }, 600 + (index * 150));
      });
    }
  }, [post]);

  // Xử lý theo dõi vị trí cuộn và tiến trình đọc
  useEffect(() => {
    const handleScroll = () => {
      // Hiện nút scroll to top khi cuộn xuống 300px
      setShowScrollTop(window.scrollY > 300);
      
      // Tính toán tiến trình đọc
      if (contentRef.current) {
        const totalHeight = contentRef.current.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.scrollY;
        
        const scrollPosition = Math.min(
          100,
          Math.ceil((scrolled / (totalHeight - windowHeight)) * 100)
        );
        
        setReadingProgress(scrollPosition);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Hàm cuộn đến một tiêu đề
  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  // Tính toán thời gian đọc (ước tính)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // Giả sử tốc độ đọc trung bình là 200 từ/phút

  return (
    <div className="py-12 bg-pink-50">
      {/* Thanh tiến trình đọc */}
      <div className="fixed top-0 left-0 h-1 bg-pink-500 z-50" style={{ width: `${readingProgress}%` }}></div>
      
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-pink-500">Trang chủ</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/blog" className="text-gray-500 hover:text-pink-500">Blog</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-pink-500">{post.title}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content */}
          <div className="lg:col-span-8">
            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Featured image */}
              <div className="h-80 overflow-hidden rounded-b-lg relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-200/10 to-pink-200/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              </div>

              {/* Header with meta information */}
              <div className="p-8 text-left max-w-4xl mx-auto">
                <div className="flex flex-wrap gap-4 mb-6 text-sm justify-start items-center">
                  <motion.div
                    className="flex items-center text-gray-600 bg-[#FFF5F8] px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaCalendarAlt className="mr-2 text-pink-500" />
                    <span>{post.date}</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center text-gray-600 bg-[#FFF5F8] px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-pink-100 mr-2">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <span>{post.author}</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center text-gray-600 bg-[#FFF5F8] px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <FaTag className="mr-2 text-pink-500" />
                    <span>{post.category}</span>
                  </motion.div>
                  {/* Thời gian đọc */}
                  <motion.div
                    className="flex items-center text-gray-600 bg-[#FFF5F8] px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <FaList className="mr-2 text-pink-500" />
                    <span>{readingTime} phút đọc</span>
                  </motion.div>
                </div>

                <motion.h1
                  className="text-3xl font-extrabold text-gray-800 mb-6 text-left font-['Playfair_Display'] relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-pink-400 after:via-pink-300 after:to-pink-400 after:rounded-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >{post.title}</motion.h1>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6 justify-start">
                  {post.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="bg-pink-100 text-pink-600 text-xs px-3 py-1 rounded-full shadow-sm hover:shadow-md hover:bg-pink-500 hover:text-white transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                      whileHover={{ scale: 1.05 }}
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>

                {/* Content */}
                <div
                  ref={contentRef}
                  className="prose prose-pink lg:prose-lg max-w-none mb-8 font-['Quicksand'] leading-7 text-left [&>h3]:font-['Playfair_Display'] [&>h3]:font-bold [&>h3]:text-[#FF6B98] [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:relative [&>h3]:pl-6 [&>h3]:block [&>h3]:w-full [&>h3]:text-left [&>h3]:before:content-['🐾'] [&>h3]:before:absolute [&>h3]:before:left-0 [&>h3]:before:text-[#FF6B98] [&>h3]:before:text-xl [&>h3:first-child]:bg-gradient-to-br [&>h3:first-child]:from-pink-200/20 [&>h3:first-child]:to-pink-200/10 [&>h3:first-child]:rounded-lg [&>h3:first-child]:py-3 [&>h3:first-child]:px-6 [&>h3:first-child]:pl-12 [&>h3:first-child]:text-2xl [&>h3:first-child]:before:left-4 [&>h3:first-child]:before:text-2xl [&>h3:not(:first-child)]:border-l-4 [&>h3:not(:first-child)]:border-[#FF6B98] [&>h3:not(:first-child)]:pl-6 [&>h3:not(:first-child)]:ml-2 [&>h3:not(:first-child)]:text-xl [&>h3:hover]:-translate-y-0.5 [&>h3]:transition-transform [&>h3]:duration-300 [&>p]:mb-6 [&>p]:text-[#4A4A4A] [&>p]:text-justify [&>p]:pl-6 [&>ul]:bg-[#FFF5F8] [&>ul]:py-6 [&>ul]:px-6 [&>ul]:pl-14 [&>ul]:rounded-xl [&>ul]:my-6 [&>ul]:shadow-md [&>ul]:shadow-pink-200/30 [&>ul>li]:mb-3 [&>ul>li]:relative [&>ul>li]:marker:text-pink-500 [&>ul>li:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: post.content.replace(/^\s+/gm, '') }}
                />

                {/* Tác giả - Phần được cải thiện 6 */}
                <div className="bg-[#FFF5F8] rounded-xl p-6 mb-8 shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FaUser className="mr-2 text-pink-500" />
                    Về tác giả
                  </h3>
                  <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-pink-200">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-pink-600">{post.author}</h4>
                      <p className="text-gray-600 mt-2">
                        Chuyên gia về chăm sóc thú cưng với nhiều năm kinh nghiệm. Tác giả của nhiều bài viết và sách về chăm sóc sức khỏe động vật.
                      </p>
                      <div className="mt-3 flex gap-2">
                        <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                          <FaBriefcase className="text-lg" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                          <FaEnvelope className="text-lg" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                          <FaGlobe className="text-lg" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tương tác - Phần được cải thiện 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Share buttons */}
                  <div className="border-t border-gray-100 pt-6 text-left relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-gradient-to-r before:from-pink-500/0 before:via-pink-500/30 before:to-pink-500/0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FaShare className="mr-2 text-pink-500" />
                      Chia sẻ bài viết
                    </h3>
                    <div className="flex gap-3 justify-start">
                      <motion.a 
                        href="#" 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-[#4267B2] shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaFacebook />
                      </motion.a>
                      <motion.a 
                        href="#" 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-[#1DA1F2] shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaTwitter />
                      </motion.a>
                      <motion.a 
                        href="#" 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-[#E60023] shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaPinterest />
                      </motion.a>
                    </div>
                  </div>

                  {/* Đánh giá bài viết */}
                  <div className="border-t border-gray-100 pt-6 text-left relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-gradient-to-r before:from-pink-500/0 before:via-pink-500/30 before:to-pink-500/0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Bài viết có hữu ích?</h3>
                    <div className="flex gap-2">
                      <motion.button
                        className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>👍</span> Có
                      </motion.button>
                      <motion.button
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>👎</span> Không
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Back button */}
            <div className="mt-8">
              <Link
                to="/blog"
                className="inline-flex items-center px-5 py-3 bg-white border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors"
              >
                <FaChevronLeft className="mr-2" />
                Quay lại danh sách bài viết
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Mục lục - Phần được cải thiện 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaList className="mr-2 text-pink-500" />
                Mục lục
              </h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {headings.length > 0 ? (
                  headings.map((heading) => (
                    <div 
                      key={heading.id}
                      className="cursor-pointer group"
                      onClick={() => scrollToHeading(heading.id)}
                    >
                      <p className="text-gray-700 group-hover:text-pink-500 transition-colors flex items-center">
                        <span className="inline-block w-2 h-2 bg-pink-300 rounded-full mr-2 group-hover:scale-125 transition-transform"></span>
                        {heading.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">Không tìm thấy mục lục</p>
                )}
              </div>
            </div>

            {/* Related posts - Phần được cải thiện 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaPaw className="mr-2 text-pink-500" />
                Bài viết liên quan
              </h3>
              <div className="space-y-6">
                {relatedPosts.length > 0 ? (
                  relatedPosts.map(relatedPost => (
                    <motion.div
                      key={relatedPost.id}
                      className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        to={`/blog/${relatedPost.id}`}
                        className="block"
                      >
                        <div className="h-40 overflow-hidden">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4 bg-white">
                          <h4 className="font-medium text-gray-800 hover:text-pink-500 transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-gray-500">{relatedPost.date}</p>
                            <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                              {relatedPost.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{relatedPost.summary}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">Không có bài viết liên quan</p>
                )}
              </div>
            </div>

            {/* Popular categories */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaTag className="mr-2 text-pink-500" />
                Danh mục phổ biến
              </h3>
              <div className="flex flex-wrap gap-2">
                {[...new Set(blogPosts.map(p => p.category))].map((category, index) => (
                  <Link
                    key={index}
                    to={`/blog?category=${category}`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-pink-100 hover:text-pink-600 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Nút back to top - Phần được cải thiện 1 & 10 */}
      <motion.button
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg hover:bg-pink-600 transition-colors z-50 ${showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <FaArrowUp />
      </motion.button>
    </div>
  );
};

export default BlogDetailPage; 