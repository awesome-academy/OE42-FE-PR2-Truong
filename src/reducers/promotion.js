import { createSlice } from "@reduxjs/toolkit";

export const promotionSlice = createSlice({
  name: "promotion",
  initialState: {
    promotions: [],
    currentPage: 1,
    totalPage: 0,
    pending: false,
    error: null,
  },
  reducers: {
    getPromotions: (state) => {
      state.pending = true;
      state.error = null;
    },
    getPromotionsSuccess: (state, action) => {
      const { promotions, currentPage, totalPage } = action.payload;
      state.promotions = promotions;
      state.currentPage = currentPage;
      state.totalPage = totalPage;
      state.pending = false;
      state.error = null;
    },
    getPromotionsFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
  },
});

export const {
  getPromotions,
  getPromotionsSuccess,
  getPromotionsFailed,
} = promotionSlice.actions;

export default promotionSlice.reducer;
