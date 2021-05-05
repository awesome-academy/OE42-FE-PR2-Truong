import { createSlice } from "@reduxjs/toolkit";

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    selectedSchedule: {},
    schedules: [],
    pendingSchedule: false,
    errorSchedule: null,
    pendingSeat: false,
    errorSeat: null,
  },
  reducers: {
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
    getDetailSchedule: (state) => {
      state.pendingSchedule = true;
      state.errorSchedule = null;
    },
    getDetailScheduleSuccess: (state, action) => {
      state.selectedSchedule = action.payload;
      state.pendingSchedule = false;
      state.errorSchedule = null;
    },
    getDetailScheduleFailed: (state, action) => {
      state.pendingSchedule = false;
      state.errorSchedule = action.payload;
    },
    putSelectingSeats: (state) => {
      state.pendingSeat = true;
      state.errorSeat = null;
    },
    putSelectingSeatsSuccess: (state, action) => {
      state.selectedSchedule = action.payload;
      state.pendingSeat = false;
      state.errorSeat = null;
    },
    putSelectingSeatsFailed: (state, action) => {
      state.pendingSeat = false;
      state.errorSeat = action.payload;
    },
    deleteSelectingSeats: (state) => {
      state.pendingSeat = true;
      state.errorSeat = null;
    },
    deleteSelectingSeatsSuccess: (state, action) => {
      state.selectedSchedule = action.payload;
      state.pendingSeat = false;
      state.errorSeat = null;
    },
    deleteSelectingSeatsFailed: (state, action) => {
      state.pendingSeat = false;
      state.errorSeat = action.payload;
    },
    postSoldSeats: (state) => {
      state.pendingSeat = true;
      state.errorSeat = null;
    },
    postSoldSeatsSuccess: (state) => {
      state.pendingSeat = false;
      state.errorSeat = null;
    },
    postSoldSeatsFailed: (state, action) => {
      state.pendingSeat = false;
      state.errorSeat = action.payload;
    },
  },
});

export const {
  getAllSchedules,
  getAllSchedulesSuccess,
  getAllSchedulesFailed,
  getDetailSchedule,
  getDetailScheduleSuccess,
  getDetailScheduleFailed,
  putSelectingSeats,
  putSelectingSeatsSuccess,
  putSelectingSeatsFailed,
  deleteSelectingSeats,
  deleteSelectingSeatsSuccess,
  deleteSelectingSeatsFailed,
  postSoldSeats,
  postSoldSeatsSuccess,
  postSoldSeatsFailed,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
