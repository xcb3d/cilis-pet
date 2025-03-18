import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaTag, FaUser, FaChevronLeft, FaPaw, FaShare, FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';
import blogPosts from '../data/blogData';
import './BlogDetailPage.css';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const contentRef = useRef(null);
  
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
  
  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-pink-50">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Featured image */}
              <div className="h-80 overflow-hidden blog-featured-image">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Header with meta information */}
              <div className="p-8 text-left">
                <div className="flex flex-wrap gap-4 mb-4 text-sm blog-meta-info justify-start">
                  <motion.div 
                    className="flex items-center text-gray-600 meta-item"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaCalendarAlt className="mr-2 text-pink-500" />
                    <span>{post.date}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center text-gray-600 meta-item"
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
                    className="flex items-center text-gray-600 meta-item"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <FaTag className="mr-2 text-pink-500" />
                    <span>{post.category}</span>
                  </motion.div>
                </div>
                
                <motion.h1 
                  className="text-3xl font-bold text-gray-800 mb-6 blog-title text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >{post.title}</motion.h1>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6 justify-start">
                  {post.tags.map((tag, index) => (
                    <motion.span 
                      key={index} 
                      className="bg-pink-100 text-pink-600 text-xs px-3 py-1 rounded-full blog-tag"
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
                  className="prose prose-pink lg:prose-lg max-w-none mb-8 blog-content"
                  dangerouslySetInnerHTML={{ __html: post.content.replace(/^\s+/gm, '') }}
                />
                
                {/* Share buttons */}
                <div className="border-t border-gray-100 pt-6 mt-8 blog-share-section text-left">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FaShare className="mr-2 text-pink-500" />
                    Chia sẻ bài viết
                  </h3>
                  <div className="flex gap-3 justify-start">
                    <a href="#" className="social-share-btn facebook-btn">
                      <FaFacebook />
                    </a>
                    <a href="#" className="social-share-btn twitter-btn">
                      <FaTwitter />
                    </a>
                    <a href="#" className="social-share-btn pinterest-btn">
                      <FaPinterest />
                    </a>
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
          <div className="lg:col-span-1">
            {/* Related posts */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaPaw className="mr-2 text-pink-500" />
                Bài viết liên quan
              </h3>
              <div className="space-y-4">
                {relatedPosts.length > 0 ? (
                  relatedPosts.map(relatedPost => (
                    <Link 
                      key={relatedPost.id} 
                      to={`/blog/${relatedPost.id}`} 
                      className="flex gap-3 group"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 group-hover:text-pink-500 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">{relatedPost.date}</p>
                      </div>
                    </Link>
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
    </div>
  );
};

export default BlogDetailPage; 