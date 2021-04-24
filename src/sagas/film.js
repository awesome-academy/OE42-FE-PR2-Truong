import { takeEvery, put, call } from "redux-saga/effects";
import * as filmAction from "../reducers/film";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";

const getPlayingMoviesApi = () =>
  axios.get(apiUrl.BASE_URL + apiUrl.API_PLAYING_MOVIES);

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
  axios.get(apiUrl.BASE_URL + apiUrl.API_ONGOING_MOVIES);

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

export function* watcherFilm() {
  yield takeEvery(filmAction.getPlayingMovies, getPlayingMovies);
  yield takeEvery(filmAction.getOngoingMovies, getOngoingMovies);
}
