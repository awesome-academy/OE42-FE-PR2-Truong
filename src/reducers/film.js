import { createSlice } from "@reduxjs/toolkit";

export const filmSlice = createSlice({
  name: "film",
  initialState: {
    searchMovies: [],
    playingMovies: [],
    ongoingMovies: [],
    selectedMovie: {},
    currentPage: 1,
    totalPage: 0,
    pending: false,
    error: null,
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
    getPlayingHottestMovies: (state) => {
      state.pendingPlayingMovies = true;
      state.errorPlayingMovies = null;
    },
    getPlayingHottestMoviesSuccess: (state, action) => {
      state.playingMovies = action.payload;
      state.pendingPlayingMovies = false;
      state.errorPlayingMovies = null;
    },
    getPlayingHottestMoviesFailed: (state, action) => {
      state.pendingPlayingMovies = false;
      state.errorPlayingMovies = action.payload;
    },
    getDetailMovie: (state) => {
      state.pending = true;
      state.error = null;
    },
    getDetailMovieSuccess: (state, action) => {
      state.selectedMovie = action.payload;
      state.pending = false;
      state.error = null;
    },
    getDetailMovieFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    getSearchMovies: (state) => {
      state.pending = true;
      state.error = null;
    },
    getSearchMoviesSuccess: (state, action) => {
      const { searchMovies, currentPage, totalPage } = action.payload;
      state.searchMovies = searchMovies;
      state.currentPage = currentPage;
      state.totalPage = totalPage;
      state.pending = false;
      state.error = null;
    },
    getSearchMoviesFailed: (state, action) => {
      state.pending = false;
      state.error = action.payload;
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
  getPlayingHottestMovies,
  getPlayingHottestMoviesSuccess,
  getPlayingHottestMoviesFailed,
  getDetailMovie,
  getDetailMovieSuccess,
  getDetailMovieFailed,
  getSearchMovies,
  getSearchMoviesSuccess,
  getSearchMoviesFailed,
} = filmSlice.actions;

export default filmSlice.reducer;
