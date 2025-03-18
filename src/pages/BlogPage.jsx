import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaTag, FaSearch, FaUserAlt, FaPaw } from 'react-icons/fa';
import blogPosts from '../data/blogData';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  // Danh sách các danh mục
  const categories = [...new Set(blogPosts.map(post => post.category))];

  // Lọc bài viết khi search term hoặc category thay đổi
  useEffect(() => {
    const filtered = blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        {/* Hero section */}
        <div className="text-center mb-12">
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
        </div>

        {/* Search and filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search field */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Category filter */}
            <div>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Tất cả danh mục</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Reset filters */}
            <div className="flex items-center">
              <button
                className="px-4 py-3 text-pink-500 hover:text-pink-700 transition duration-300 flex items-center gap-2"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
              >
                <FaPaw />
                <span>Xóa bộ lọc</span>
              </button>
            </div>
          </div>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <FaPaw className="mx-auto text-4xl text-pink-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy bài viết</h2>
              <p className="text-gray-600">Vui lòng thử lại với từ khóa khác</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BlogCard = ({ post }) => {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/blog/${post.id}`} className="block h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </Link>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-2 flex items-center text-sm text-pink-500">
          <span className="bg-pink-100 px-3 py-1 rounded-full font-medium">
            {post.category}
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
                />
              ) : (
                <img 
                  src={post.authorAvatar} 
                  alt={post.author} 
                  className="w-5 h-5"
                />
              )}
            </div>
            <span className="text-sm text-gray-700">{post.author}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FaCalendarAlt className="mr-1" />
            <span>{post.date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPage; 