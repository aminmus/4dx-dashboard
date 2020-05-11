/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isAdmin: false
  },
  reducers: {
    setLoginStatus: state => {
      state.isLoggedIn = true;
    },
    setLogoutStatus: state => {
      state.isLoggedIn = false;
    }
  }
});

export const { setLoginStatus, setLogoutStatus } = authSlice.actions;
export default authSlice.reducer;
