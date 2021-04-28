import { takeEvery, put, call } from "redux-saga/effects";
import * as filmAction from "../reducers/film";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";
import { LIMIT_SEARCH_MOVIES_PER_PAGE } from "../constants/limitRecord";

const getPlayingMoviesApi = () =>
  axios.get(apiUrl.BASE_URL + apiUrl.API_MOVIE + "?status=PLAYING");

export function* getPlayingMovies() {
  try {
    const response = yield call(getPlayingMoviesApi);
    if (response.statusText === "OK") {
      yield put(filmAction.getPlayingMoviesSuccess(response.data));
    } else {
      yield put(filmAction.getPlayingMoviesFailed("Đã xảy ra lỗi!"));
    }
  } catch {
    yield put(filmAction.getPlayingMoviesFailed("Đã xảy ra lỗi!"));
  }
}

const getOngoingMoviesApi = () =>
  axios.get(apiUrl.BASE_URL + apiUrl.API_MOVIE + "?status=ONGOING");

export function* getOngoingMovies() {
  try {
    const response = yield call(getOngoingMoviesApi);
    if (response.statusText === "OK") {
      yield put(filmAction.getOngoingMoviesSuccess(response.data));
    } else {
      yield put(filmAction.getOngoingMoviesFailed("Đã xảy ra lỗi!"));
    }
  } catch {
    yield put(filmAction.getOngoingMoviesFailed("Đã xảy ra lỗi!"));
  }
}

const getPlayingHottestMoviesApi = (limit) =>
  axios.get(
    `${
      apiUrl.BASE_URL + apiUrl.API_MOVIE
    }?status=PLAYING&_limit=${limit}&_sort=ratingAverage&_order=desc`
  );

export function* getPlayingHottestMovies(action) {
  try {
    const { limit } = action.payload;
    const response = yield call(getPlayingHottestMoviesApi, limit);
    if (response.statusText === "OK") {
      yield put(filmAction.getPlayingHottestMoviesSuccess(response.data));
    } else {
      yield put(filmAction.getPlayingHottestMoviesFailed("Đã xảy ra lỗi!"));
    }
  } catch {
    yield put(filmAction.getPlayingHottestMoviesFailed("Đã xảy ra lỗi!"));
  }
}

const getDetailMovieApi = (id) =>
  axios.get(apiUrl.BASE_URL + apiUrl.API_MOVIE + "/" + id);

export function* getDetailMovie(action) {
  try {
    const response = yield call(getDetailMovieApi, action.payload);
    if (response.statusText === "OK") {
      yield put(filmAction.getDetailMovieSuccess(response.data));
    } else {
      yield put(filmAction.getDetailMovieFailed("Đã xảy ra lỗi!"));
    }
  } catch {
    yield put(filmAction.getDetailMovieFailed("Đã xảy ra lỗi!"));
  }
}

const getSearchMoviesApi = (keyword, page, limit) =>
  axios.get(
    `${
      apiUrl.BASE_URL + apiUrl.API_MOVIE
    }?q=${keyword}&attr=name&_page=${page}&_limit=${limit}`
  );

export function* getSearchMovies(action) {
  try {
    const { keyword, page, limit } = action.payload;
    const response = yield call(getSearchMoviesApi, keyword, page, limit);
    if (response.statusText === "OK") {
      const totalRecords = response.headers["x-total-count"];
      yield put(
        filmAction.getSearchMoviesSuccess({
          searchMovies: response.data,
          currentPage: page,
          totalPage: limit
            ? Math.ceil(totalRecords / LIMIT_SEARCH_MOVIES_PER_PAGE)
            : 0,
        })
      );
    } else {
      yield put(filmAction.getSearchMoviesFailed("Đã xảy ra lỗi!"));
    }
  } catch {
    yield put(filmAction.getSearchMoviesFailed("Đã xảy ra lỗi!"));
  }
}

export function* watcherFilm() {
  yield takeEvery(filmAction.getPlayingMovies, getPlayingMovies);
  yield takeEvery(filmAction.getOngoingMovies, getOngoingMovies);
  yield takeEvery(filmAction.getPlayingHottestMovies, getPlayingHottestMovies);
  yield takeEvery(filmAction.getDetailMovie, getDetailMovie);
  yield takeEvery(filmAction.getSearchMovies, getSearchMovies);
}
