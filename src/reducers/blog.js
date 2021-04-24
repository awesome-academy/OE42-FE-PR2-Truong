import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "review",
  initialState: {
    blogNewses: [],
    pending: false,
    error: null,
  },
  reducers: {
    getBlogNewses: (state) => {
      state.pending = true;
      state.error = null;
    },
    getBlogNewsesSuccess: (state, action) => {
      state.blogNewses = action.payload;
      state.pending = false;
      state.error = null;
    },
    getBlogNewsesFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
  },
});

export const {
  getBlogNewses,
  getBlogNewsesSuccess,
  getBlogNewsesFailed,
} = blogSlice.actions;

export default blogSlice.reducer;
