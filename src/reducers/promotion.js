import { createSlice } from "@reduxjs/toolkit";

export const promotionSlice = createSlice({
  name: "promotion",
  initialState: {
    promotions: [],
    pending: false,
    error: null,
  },
  reducers: {
    getPromotions: (state) => {
      state.pending = true;
      state.error = null;
    },
    getPromotionsSuccess: (state, action) => {
      state.promotions = action.payload;
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
