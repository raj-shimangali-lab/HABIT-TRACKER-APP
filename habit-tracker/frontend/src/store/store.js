// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import habitReducer from './habitSlice';
import authReducer from './authSlice'; // Import auth slice

export const store = configureStore({
  reducer: {
    habits: habitReducer,
    auth: authReducer,  // Add auth reducer to store
  },
});
