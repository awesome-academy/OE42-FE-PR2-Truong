import { takeEvery, put, call } from "redux-saga/effects";
import * as filmAction from "../reducers/film";
import * as reviewAction from "../reducers/review";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";
import { LIMIT_SEARCH_MOVIES_PER_PAGE } from "../constants/limitRecord";
import { getTranslation } from "../utils/getTranslation";
import { toast } from "react-toastify";
import * as routePath from "../constants/routes";

const getPlayingMoviesApi = () =>
  axios.get(apiUrl.BASE_URL + apiUrl.API_MOVIE + "?status=PLAYING");

export function* getPlayingMovies() {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(getPlayingMoviesApi);
    if (response.statusText === "OK") {
      yield put(filmAction.getPlayingMoviesSuccess(response.data));
    } else {
      yield put(filmAction.getPlayingMoviesFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(filmAction.getPlayingMoviesFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const getOngoingMoviesApi = () =>
  axios.get(apiUrl.BASE_URL + apiUrl.API_MOVIE + "?status=ONGOING");

export function* getOngoingMovies() {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(getOngoingMoviesApi);
    if (response.statusText === "OK") {
      yield put(filmAction.getOngoingMoviesSuccess(response.data));
    } else {
      yield put(filmAction.getOngoingMoviesFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(filmAction.getOngoingMoviesFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const getPlayingHottestMoviesApi = (limit) =>
  axios.get(
    `${
      apiUrl.BASE_URL + apiUrl.API_MOVIE
    }?status=PLAYING&_limit=${limit}&_sort=ratingAverage&_order=desc`
  );

export function* getPlayingHottestMovies(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const { limit } = action.payload;
    const response = yield call(getPlayingHottestMoviesApi, limit);
    if (response.statusText === "OK") {
      yield put(filmAction.getPlayingHottestMoviesSuccess(response.data));
    } else {
      yield put(filmAction.getPlayingHottestMoviesFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(filmAction.getPlayingHottestMoviesFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const getDetailMovieApi = (id) =>
  axios.get(apiUrl.BASE_URL + apiUrl.API_MOVIE + "/" + id);

export function* getDetailMovie(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(getDetailMovieApi, action.payload);
    if (response.statusText === "OK") {
      yield put(filmAction.getDetailMovieSuccess(response.data));
    } else {
      yield put(filmAction.getDetailMovieFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(filmAction.getDetailMovieFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const getSearchMoviesApi = (keyword, page, limit) =>
  axios.get(
    `${
      apiUrl.BASE_URL + apiUrl.API_MOVIE
    }?q=${keyword}&attr=name&_page=${page}&_limit=${limit}`
  );

export function* getSearchMovies(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
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
      yield put(filmAction.getSearchMoviesFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(filmAction.getSearchMoviesFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const putRatingApi = (id, info) =>
  axios.put(apiUrl.BASE_URL + apiUrl.API_MOVIE + "/" + id, info);

export function* putRating(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const { movie, from } = action.payload;
    const { id, ...restMovieProps } = movie;
    const response = yield call(putRatingApi, id, { ...restMovieProps });
    if (response.statusText === "OK") {
      if (from === routePath.FILM_PAGE_PATH) {
        yield put(filmAction.putRatingSuccess(movie));
      } else if (from === routePath.REVIEW_PAGE_PATH) {
        yield put(filmAction.putRatingSuccess());
        yield put(reviewAction.setMovieReview(movie));
      }
      toast.success(translation.notification?.rating_success);
    } else {
      yield put(filmAction.putRatingFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(filmAction.putRatingFailed(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watcherFilm() {
  yield takeEvery(filmAction.getPlayingMovies, getPlayingMovies);
  yield takeEvery(filmAction.getOngoingMovies, getOngoingMovies);
  yield takeEvery(filmAction.getPlayingHottestMovies, getPlayingHottestMovies);
  yield takeEvery(filmAction.getDetailMovie, getDetailMovie);
  yield takeEvery(filmAction.getSearchMovies, getSearchMovies);
  yield takeEvery(filmAction.putRating, putRating);
}
