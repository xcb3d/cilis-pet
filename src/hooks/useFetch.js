import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import * as mockData from '../data/mockData';

/**
 * Custom hook để mô phỏng việc fetch dữ liệu từ mock data
 * @param {string} dataType - Loại dữ liệu cần lấy (pets, events, donations, blog, users)
 * @param {Object} options - Các tùy chọn cho việc lấy dữ liệu
 * @param {number} options.id - ID của item cần lấy (nếu lấy chi tiết)
 * @param {Object} options.filters - Các bộ lọc cho dữ liệu (ví dụ: { type: 'cat' })
 * @param {boolean} options.featured - Chỉ lấy các mục nổi bật
 * @returns {Object} - { data, loading, error, refetch }
 */
export function useFetch(dataType, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { actions } = useApp();

  // Hàm để mô phỏng việc lấy dữ liệu từ "API"
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Mô phỏng độ trễ của mạng
      await new Promise(resolve => setTimeout(resolve, 300));

      let result;
      const { id, filters, featured } = options;

      // Xác định nguồn dữ liệu dựa trên dataType
      switch (dataType) {
        case 'pets':
          result = mockData.petsData;
          break;
        case 'events':
          result = mockData.eventsData;
          break;
        case 'donations':
          result = mockData.donationsData;
          break;
        case 'blog':
          result = mockData.blogData;
          break;
        case 'users':
          result = mockData.usersData;
          break;
        default:
          throw new Error(`Không tìm thấy dữ liệu cho loại: ${dataType}`);
      }

      // Nếu có ID, chỉ trả về item có ID tương ứng
      if (id) {
        result = result.find(item => item.id === id);
        if (!result) {
          throw new Error(`Không tìm thấy ${dataType} với id ${id}`);
        }
      } else {
        // Áp dụng các bộ lọc nếu có
        if (filters) {
          result = result.filter(item => {
            return Object.keys(filters).every(key => {
              if (key === 'search' && filters.search) {
                // Tìm kiếm theo tên/tiêu đề
                const searchField = item.name || item.title || '';
                return searchField.toLowerCase().includes(filters.search.toLowerCase());
              }
              return item[key] === filters[key];
            });
          });
        }

        // Lọc theo featured nếu có yêu cầu
        if (featured) {
          result = result.filter(item => item.isFeatured);
        }
      }

      setData(result);
    } catch (err) {
      setError(err.message);
      actions?.addNotification({
        type: 'error',
        title: 'Lỗi',
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch dữ liệu khi component mount hoặc khi dependencies thay đổi
  useEffect(() => {
    fetchData();
  }, [dataType, JSON.stringify(options)]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetch; 