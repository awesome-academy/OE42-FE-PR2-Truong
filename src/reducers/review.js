import { createSlice } from "@reduxjs/toolkit";

export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviewNewses: [],
    currentPage: 1,
    totalPage: 0,
    pending: false,
    error: null,
  },
  reducers: {
    getReviewNewses: (state) => {
      state.pending = true;
      state.error = null;
    },
    getReviewNewsesSuccess: (state, action) => {
      const { reviewNewses, currentPage, totalPage } = action.payload;
      state.reviewNewses = reviewNewses;
      state.currentPage = currentPage;
      state.totalPage = totalPage;
      state.pending = false;
      state.error = null;
    },
    getReviewNewsesFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
  },
});

export const {
  getReviewNewses,
  getReviewNewsesSuccess,
  getReviewNewsesFailed,
} = reviewSlice.actions;

export default reviewSlice.reducer;
