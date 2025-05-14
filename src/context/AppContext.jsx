import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

// Khởi tạo state ban đầu
const initialState = {
  favorites: [], // Danh sách thú cưng yêu thích
  notifications: [], // Thông báo trong ứng dụng
  user: null, // Thông tin người dùng (nếu đã đăng nhập)
  cart: [], // Giỏ hàng cho quyên góp
  loading: false, // Trạng thái loading toàn cục
};

// Action types
export const APP_ACTIONS = {
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  SET_LOADING: 'SET_LOADING',
};

// Reducer cho app context
function appReducer(state, action) {
  switch (action.type) {
    case APP_ACTIONS.ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
      
    case APP_ACTIONS.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          item => item.id !== action.payload
        ),
      };
      
    case APP_ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, {
          id: Date.now(),
          ...action.payload,
        }],
      };
      
    case APP_ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        ),
      };
      
    case APP_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
      
    case APP_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
      };
      
    case APP_ACTIONS.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
      
    case APP_ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          item => item.id !== action.payload
        ),
      };
      
    case APP_ACTIONS.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
      
    case APP_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
      
    default:
      return state;
  }
}

// Tạo context
const AppContext = createContext();

/**
 * Provider cho AppContext
 */
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Tạo các actions để dễ sử dụng hơn
  const actions = {
    addFavorite: (pet) => {
      dispatch({ type: APP_ACTIONS.ADD_FAVORITE, payload: pet });
    },
    removeFavorite: (petId) => {
      dispatch({ type: APP_ACTIONS.REMOVE_FAVORITE, payload: petId });
    },
    addNotification: (notification) => {
      dispatch({ type: APP_ACTIONS.ADD_NOTIFICATION, payload: notification });
      // Tự động xóa thông báo sau một khoảng thời gian
      setTimeout(() => {
        dispatch({ 
          type: APP_ACTIONS.REMOVE_NOTIFICATION, 
          payload: notification.id || Date.now() 
        });
      }, notification.duration || 5000);
    },
    removeNotification: (notificationId) => {
      dispatch({ type: APP_ACTIONS.REMOVE_NOTIFICATION, payload: notificationId });
    },
    setUser: (userData) => {
      dispatch({ type: APP_ACTIONS.SET_USER, payload: userData });
    },
    logout: () => {
      dispatch({ type: APP_ACTIONS.LOGOUT });
    },
    addToCart: (item) => {
      dispatch({ type: APP_ACTIONS.ADD_TO_CART, payload: item });
    },
    removeFromCart: (itemId) => {
      dispatch({ type: APP_ACTIONS.REMOVE_FROM_CART, payload: itemId });
    },
    clearCart: () => {
      dispatch({ type: APP_ACTIONS.CLEAR_CART });
    },
    setLoading: (isLoading) => {
      dispatch({ type: APP_ACTIONS.SET_LOADING, payload: isLoading });
    },
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Hook để sử dụng AppContext
 */
export function useApp() {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  
  return context;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
}; 