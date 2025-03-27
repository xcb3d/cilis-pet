import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaSearch, FaPaw, FaList, FaTh, FaEye, FaShare, FaRegClock, FaChevronLeft, FaChevronRight, FaSortAmountDown, FaFilter, FaChevronDown } from 'react-icons/fa';
import blogPosts from '../data/blogData';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'title'
  const [layout, setLayout] = useState('grid'); // 'grid', 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  
  // Danh sách các danh mục
  const categories = [...new Set(blogPosts.map(post => post.category))];

  // Sắp xếp và lọc bài viết
  const filteredPosts = useMemo(() => {
    // Lọc bài viết theo search và category
    let filtered = blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    // Sắp xếp bài viết theo tiêu chí đã chọn
    switch(sortBy) {
      case 'newest':
        return filtered.sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - 
                                      new Date(a.date.split('/').reverse().join('-')));
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.date.split('/').reverse().join('-')) - 
                                      new Date(b.date.split('/').reverse().join('-')));
      case 'title':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [searchTerm, selectedCategory, sortBy]);

  // Logic phân trang
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Xử lý scroll để làm sticky filter bar
  useEffect(() => {
    const handleScroll = () => {
      const filterSection = document.getElementById('filter-section');
      if (filterSection) {
        const filterPosition = filterSection.getBoundingClientRect().top;
        setIsFilterSticky(filterPosition <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Xử lý khi thay đổi bộ lọc, reset về trang đầu tiên
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy, postsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll lên đầu danh sách bài viết
    const blogList = document.getElementById('blog-list');
    if (blogList) {
      blogList.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        {/* Hero section */}
        <div className="text-center mb-12">
          <motion.div 
            className="inline-block mb-4 px-3 py-1 bg-pink-100 text-pink-600 text-sm font-medium rounded-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Blog thú cưng
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Chăm sóc và mẹo nuôi thú cưng
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Khám phá các bài viết hữu ích về chăm sóc thú cưng, mẹo huấn luyện, dinh dưỡng và sức khỏe
          </motion.p>
          
          {/* Breadcrumbs */}
          <nav className="mt-6">
            <ol className="flex justify-center items-center space-x-2 text-sm text-gray-500">
              <li><Link to="/" className="hover:text-pink-500 transition-colors">Trang chủ</Link></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-pink-500 font-medium">Blog</li>
            </ol>
          </nav>
        </div>

        {/* Search and filter section */}
        <div 
          id="filter-section"
          className={`bg-white rounded-xl shadow-md p-6 mb-12 transition-all duration-300 ${
            isFilterSticky ? 'sticky top-0 z-10 shadow-lg rounded-none mx-[-1rem] px-8' : ''
          }`}
        >
          {/* Result count and view switcher */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-700">
              <span className="font-medium">{filteredPosts.length}</span> bài viết được tìm thấy
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 mr-1">Hiển thị:</span>
              <button 
                className={`p-2 rounded-md transition-colors ${layout === 'grid' ? 'bg-pink-100 text-pink-500' : 'text-gray-500 hover:bg-gray-100'}`}
                onClick={() => setLayout('grid')}
                aria-label="Hiển thị dạng lưới"
                title="Hiển thị dạng lưới"
              >
                <FaTh />
              </button>
              <button 
                className={`p-2 rounded-md transition-colors ${layout === 'list' ? 'bg-pink-100 text-pink-500' : 'text-gray-500 hover:bg-gray-100'}`}
                onClick={() => setLayout('list')}
                aria-label="Hiển thị dạng danh sách"
                title="Hiển thị dạng danh sách"
              >
                <FaList />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search field */}
            <div className="relative md:col-span-3">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Tìm kiếm bài viết"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Category filter */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Lọc theo danh mục"
                >
                  <option value="">Tất cả danh mục</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
                <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Sort by filter */}
            <div className="md:col-span-2">
              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sắp xếp bài viết"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                  <option value="title">Theo tên A-Z</option>
                </select>
                <FaSortAmountDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            {/* Posts per page selector */}
            <div className="md:col-span-2">
              <div className="relative">
                <select
                  value={postsPerPage}
                  onChange={(e) => setPostsPerPage(Number(e.target.value))}
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none"
                  aria-label="Số bài viết mỗi trang"
                >
                  <option value={3}>3 bài mỗi trang</option>
                  <option value={6}>6 bài mỗi trang</option>
                  <option value={9}>9 bài mỗi trang</option>
                  <option value={12}>12 bài mỗi trang</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Reset filters */}
            <div className="md:col-span-2 flex items-center">
              <button
                className="w-full px-4 py-3 text-pink-500 hover:text-pink-700 transition duration-300 flex items-center gap-2 justify-center bg-pink-50 rounded-lg hover:bg-pink-100"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSortBy('newest');
                  setPostsPerPage(6);
                }}
                aria-label="Xóa bộ lọc"
              >
                <FaPaw />
                <span>Xóa bộ lọc</span>
              </button>
            </div>
          </div>
        </div>

        {/* Blog posts section */}
        <div id="blog-list" className="mb-10">
          {/* Blog posts grid/list */}
          {filteredPosts.length > 0 ? (
            <>
              <div className={layout === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
                : "flex flex-col space-y-6"
              }>
                <AnimatePresence mode="wait">
                  {currentPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {layout === 'grid' ? (
                        <BlogCard post={post} />
                      ) : (
                        <BlogListItem post={post} />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center">
                  <nav className="flex items-center space-x-2" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md border ${
                        currentPage === 1 
                          ? 'text-gray-300 border-gray-200 cursor-not-allowed' 
                          : 'text-gray-600 border-gray-300 hover:bg-pink-50 hover:text-pink-500'
                      }`}
                      aria-label="Previous page"
                    >
                      <FaChevronLeft className="w-4 h-4" />
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 border rounded-md ${
                          currentPage === index + 1
                            ? 'bg-pink-500 text-white border-pink-500'
                            : 'text-gray-600 border-gray-300 hover:bg-pink-50 hover:text-pink-500'
                        }`}
                        aria-label={`Page ${index + 1}`}
                        aria-current={currentPage === index + 1 ? 'page' : undefined}
                      >
                        {index + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md border ${
                        currentPage === totalPages 
                          ? 'text-gray-300 border-gray-200 cursor-not-allowed' 
                          : 'text-gray-600 border-gray-300 hover:bg-pink-50 hover:text-pink-500'
                      }`}
                      aria-label="Next page"
                    >
                      <FaChevronRight className="w-4 h-4" />
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <FaPaw className="mx-auto text-4xl text-pink-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy bài viết</h2>
              <p className="text-gray-600 mb-6">Vui lòng thử lại với từ khóa hoặc bộ lọc khác</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSortBy('newest');
                }}
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
              >
                Xem tất cả bài viết
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BlogCard = ({ post }) => {
  // Ước tính thời gian đọc (tính bằng phút)
  const readingTime = Math.max(1, Math.ceil(post.content.length / 1500));

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <Link to={`/blog/${post.id}`} className="block h-48 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
          />
        </Link>
        <div className="absolute top-3 right-3 flex space-x-2">
          <span className="bg-pink-500 text-white px-2 py-1 rounded-md text-xs shadow-md flex items-center">
            <FaEye className="mr-1" /> 354
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-2 flex justify-between items-center">
          <span className="bg-pink-100 px-3 py-1 rounded-full text-sm font-medium text-pink-500">
            {post.category}
          </span>
          <span className="text-xs text-gray-500 flex items-center">
            <FaRegClock className="mr-1" /> {readingTime} phút đọc
          </span>
        </div>
        
        <Link to={`/blog/${post.id}`} className="block mb-3">
          <h3 className="text-xl font-bold text-gray-800 hover:text-pink-500 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {post.summary}
        </p>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center bg-pink-100 overflow-hidden mr-2"
            >
              {typeof post.authorAvatar === 'string' && post.authorAvatar.startsWith('http') ? (
                <img 
                  src={post.authorAvatar} 
                  alt={post.author} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <img 
                  src={post.authorAvatar} 
                  alt={post.author} 
                  className="w-5 h-5"
                  loading="lazy"
                />
              )}
            </div>
            <span className="text-sm text-gray-700">{post.author}</span>
          </div>
          <div className="flex items-center">
            <div className="text-sm text-gray-500 flex items-center mr-3">
              <FaCalendarAlt className="mr-1" />
              <span>{post.date}</span>
            </div>
            <button
              aria-label="Chia sẻ bài viết"
              className="text-gray-400 hover:text-pink-500 transition-colors"
            >
              <FaShare />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BlogListItem = ({ post }) => {
  // Ước tính thời gian đọc (tính bằng phút)
  const readingTime = Math.max(1, Math.ceil(post.content.length / 1500));

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 flex flex-col md:flex-row">
      <div className="md:w-1/4 flex-shrink-0">
        <Link to={`/blog/${post.id}`} className="block h-48 md:h-full overflow-hidden rounded-lg">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </Link>
      </div>
      
      <div className="md:w-3/4 flex flex-col p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="bg-pink-100 px-3 py-1 rounded-full text-sm font-medium text-pink-500">
            {post.category}
          </span>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-gray-500 flex items-center">
              <FaRegClock className="mr-1" /> {readingTime} phút đọc
            </span>
            <span className="text-xs text-gray-500 flex items-center">
              <FaEye className="mr-1" /> 354
            </span>
          </div>
        </div>
        
        <Link to={`/blog/${post.id}`} className="block mb-2">
          <h3 className="text-xl font-bold text-gray-800 hover:text-pink-500 transition-colors">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {post.summary}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-pink-100 overflow-hidden mr-2">
              <img 
                src={post.authorAvatar} 
                alt={post.author} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="text-sm text-gray-700">{post.author}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 flex items-center">
              <FaCalendarAlt className="mr-1" />
              <span>{post.date}</span>
            </span>
            <Link 
              to={`/blog/${post.id}`}
              className="px-4 py-2 text-sm bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors"
            >
              Đọc thêm
            </Link>
            <button
              aria-label="Chia sẻ bài viết"
              className="text-gray-400 hover:text-pink-500 transition-colors"
            >
              <FaShare />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage; 