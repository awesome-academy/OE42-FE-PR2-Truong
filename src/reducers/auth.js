import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    token: localStorage.getItem("token"),
    pending: false,
    error: null,
  },
  reducers: {
    postLogin: (state) => {
      state.pending = true;
      state.error = null;
    },
    postLoginSuccess: (state, action) => {
      const { user, token } = action.payload;
      localStorage.setItem("token", token);
      state.user = user;
      state.token = token;
      state.pending = false;
      state.error = null;
    },
    postLoginFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    getUserInfo: (state) => {
      state.pending = true;
      state.error = null;
    },
    getUserInfoSuccess: (state, action) => {
      state.user = action.payload;
      state.pending = false;
      state.error = null;
    },
    getUserInfoFailed: (state, action) => {
      localStorage.removeItem("token");
      state.user = {};
      state.token = null;
      state.pending = false;
      state.error = action.payload;
    },
    postSignUp: (state) => {
      state.pending = true;
      state.error = null;
    },
    postSignUpSuccess: (state, action) => {
      const { user, token } = action.payload;
      localStorage.setItem("token", token);
      state.user = user;
      state.token = token;
      state.pending = false;
      state.error = null;
    },
    postSignUpFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = {};
      state.token = null;
    },
  },
});

export const {
  postLogin,
  postLoginSuccess,
  postLoginFailed,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFailed,
  postSignUp,
  postSignUpSuccess,
  postSignUpFailed,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
