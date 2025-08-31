import { createSlice } from '@reduxjs/toolkit';

// Load registered users from localStorage if available
const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
const storedUser = JSON.parse(localStorage.getItem('currentUser')) || null;

const initialState = {
  registeredUsers: storedUsers,  // Persisted registered users
  isAuthenticated: storedUser !== null,
  currentUser: storedUser,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      const { username, password } = action.payload;

      // Check if username already exists
      const existingUser = state.registeredUsers.find(
        (user) => user.username === username
      );

      if (existingUser) {
        state.error = 'Username already exists! Please log in.';
      } else {
        // Add new user
        const newUser = { username, password };
        state.registeredUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(state.registeredUsers));
        state.error = null;
      }
    },

    login: (state, action) => {
      const { username, password } = action.payload;

      // Check if user exists and password matches
      const existingUser = state.registeredUsers.find(
        (user) => user.username === username && user.password === password
      );

      if (existingUser) {
        state.isAuthenticated = true;
        state.currentUser = username;
        localStorage.setItem('currentUser', JSON.stringify(username));
        state.error = null;
      } else {
        state.isAuthenticated = false;
        state.currentUser = null;
        state.error = 'Invalid username or password!';
      }
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { register, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
