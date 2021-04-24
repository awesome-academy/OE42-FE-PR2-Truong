import { createSlice } from "@reduxjs/toolkit";

export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviewNewses: [],
    pending: false,
    error: null,
  },
  reducers: {
    getReviewNewses: (state) => {
      state.pending = true;
      state.error = null;
    },
    getReviewNewsesSuccess: (state, action) => {
      state.reviewNewses = action.payload;
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