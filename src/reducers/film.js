import { createSlice } from "@reduxjs/toolkit";

export const filmSlice = createSlice({
  name: "film",
  initialState: {
    playingMovies: [],
    ongoingMovies: [],
    currentPage: 1,
    totalPage: 0,
    pendingOngoingMovies: false,
    errorOngoingMovies: null,
    pendingPlayingMovies: false,
    errorPlayingMovies: null,
  },
  reducers: {
    getPlayingMovies: (state) => {
      state.pendingPlayingMovies = true;
      state.errorPlayingMovies = null;
    },
    getPlayingMoviesSuccess: (state, action) => {
      state.playingMovies = action.payload;
      state.pendingPlayingMovies = false;
      state.errorPlayingMovies = null;
    },
    getPlayingMoviesFailed: (state, action) => {
      state.pendingPlayingMovies = false;
      state.errorPlayingMovies = action.payload;
    },
    getOngoingMovies: (state) => {
      state.pendingOngoingMovies = true;
      state.errorOngoingMovies = null;
    },
    getOngoingMoviesSuccess: (state, action) => {
      state.ongoingMovies = action.payload;
      state.pendingOngoingMovies = false;
      state.errorOngoingMovies = null;
    },
    getOngoingMoviesFailed: (state, action) => {
      state.pendingOngoingMovies = false;
      state.errorOngoingMovies = action.payload;
    },
  },
});

export const {
  getPlayingMovies,
  getPlayingMoviesSuccess,
  getPlayingMoviesFailed,
  getOngoingMovies,
  getOngoingMoviesSuccess,
  getOngoingMoviesFailed,
} = filmSlice.actions;

export default filmSlice.reducer;
