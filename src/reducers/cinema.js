import { createSlice } from "@reduxjs/toolkit";

export const cinemaSlice = createSlice({
  name: "cinema",
  initialState: {
    cities: [],
    pendingCity: false,
    errorCity: null,
    cinemas: [],
    pendingCinema: false,
    errorCinema: null,
  },
  reducers: {
    getAllCities: (state) => {
      state.pendingCity = true;
      state.errorCity = null;
    },
    getAllCitiesSuccess: (state, action) => {
      state.cities = action.payload;
      state.pendingCity = false;
      state.errorCity = null;
    },
    getAllCitiesFailed: (state, action) => {
      state.pendingCity = false;
      state.errorCity = action.payload;
    },
    getAllCinemas: (state) => {
      state.pendingCinema = true;
      state.errorCinema = null;
    },
    getAllCinemasSuccess: (state, action) => {
      state.cinemas = action.payload;
      state.pendingCinema = false;
      state.errorCinema = null;
    },
    getAllCinemasFailed: (state, action) => {
      state.pendingCinema = false;
      state.errorCinema = action.payload;
    },
  },
});

export const {
  getAllCities,
  getAllCitiesSuccess,
  getAllCitiesFailed,
  getAllCinemas,
  getAllCinemasSuccess,
  getAllCinemasFailed,
} = cinemaSlice.actions;

export default cinemaSlice.reducer;
