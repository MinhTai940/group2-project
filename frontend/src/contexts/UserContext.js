import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../api';

// Initial state
const initialState = {
  users: [],
  loading: false,
  error: null,
  editUser: null
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_USERS: 'SET_USERS',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  SET_EDIT_USER: 'SET_EDIT_USER',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ActionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    
    case ActionTypes.SET_USERS:
      return { ...state, users: action.payload, loading: false };
    
    case ActionTypes.ADD_USER:
      return { ...state, users: [...state.users, action.payload], loading: false };
    
    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        ),
        loading: false
      };
    
    case ActionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        loading: false
      };
    
    case ActionTypes.SET_EDIT_USER:
      return { ...state, editUser: action.payload };
    
    default:
      return state;
  }
};

// Create context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      dispatch({ type: ActionTypes.CLEAR_ERROR });
      
      const response = await api.get('/users');
      dispatch({ type: ActionTypes.SET_USERS, payload: response.data });
    } catch (error) {
      console.error('Fetch users failed:', error);
      dispatch({ 
        type: ActionTypes.SET_ERROR, 
        payload: 'Không thể lấy danh sách user' 
      });
    }
  };

  // Create new user
  const createUser = async (userData) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      dispatch({ type: ActionTypes.CLEAR_ERROR });
      
      const response = await api.post('/users', userData);
      dispatch({ type: ActionTypes.ADD_USER, payload: response.data });
      return response.data;
    } catch (error) {
      console.error('Create user failed:', error);
      dispatch({ 
        type: ActionTypes.SET_ERROR, 
        payload: 'Lỗi khi tạo user' 
      });
      throw error;
    }
  };

  // Update existing user
  const updateUser = async (userId, userData) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      dispatch({ type: ActionTypes.CLEAR_ERROR });
      
      const response = await api.put(`/users/${userId}`, userData);
      dispatch({ type: ActionTypes.UPDATE_USER, payload: response.data });
      dispatch({ type: ActionTypes.SET_EDIT_USER, payload: null });
      return response.data;
    } catch (error) {
      console.error('Update user failed:', error);
      dispatch({ 
        type: ActionTypes.SET_ERROR, 
        payload: 'Lỗi khi cập nhật user' 
      });
      throw error;
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      dispatch({ type: ActionTypes.CLEAR_ERROR });
      
      await api.delete(`/users/${userId}`);
      dispatch({ type: ActionTypes.DELETE_USER, payload: userId });
    } catch (error) {
      console.error('Delete user failed:', error);
      dispatch({ 
        type: ActionTypes.SET_ERROR, 
        payload: 'Lỗi khi xóa user' 
      });
      throw error;
    }
  };

  // Set user for editing
  const setEditUser = (user) => {
    dispatch({ type: ActionTypes.SET_EDIT_USER, payload: user });
  };

  // Clear edit user
  const clearEditUser = () => {
    dispatch({ type: ActionTypes.SET_EDIT_USER, payload: null });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  };

  // Load users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const value = {
    ...state,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    setEditUser,
    clearEditUser,
    clearError
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
