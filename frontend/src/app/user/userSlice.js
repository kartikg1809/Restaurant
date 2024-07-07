// src/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutSuccess(state) {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },
    logOutFailure(state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutSuccess,logOutFailure } = userSlice.actions;
export default userSlice.reducer;
