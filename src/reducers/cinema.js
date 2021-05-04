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
    schedules: [],
    pendingSchedule: false,
    errorSchedule: null,
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
    getAllSchedules: (state) => {
      state.pendingSchedule = true;
      state.errorSchedule = null;
    },
    getAllSchedulesSuccess: (state, action) => {
      state.schedules = action.payload;
      state.pendingSchedule = false;
      state.errorSchedule = null;
    },
    getAllSchedulesFailed: (state, action) => {
      state.pendingSchedule = false;
      state.errorSchedule = action.payload;
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
  getAllSchedules,
  getAllSchedulesSuccess,
  getAllSchedulesFailed,
} = cinemaSlice.actions;

export default cinemaSlice.reducer;
