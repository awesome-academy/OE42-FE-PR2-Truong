import { takeEvery, put, call } from "redux-saga/effects";
import * as cinemaAction from "../reducers/cinema";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";
import { getTranslation } from "../utils/getTranslation";
import { toast } from "react-toastify";

const getAllCitiesApi = () => axios.get(apiUrl.BASE_URL + apiUrl.API_CITY);

export function* getAllCities() {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(getAllCitiesApi);
    if (response.statusText === "OK") {
      yield put(cinemaAction.getAllCitiesSuccess(response.data));
    } else {
      yield put(cinemaAction.getAllCitiesFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(cinemaAction.getAllCitiesFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const getAllCinemasApi = () => axios.get(apiUrl.BASE_URL + apiUrl.API_CINEMA);

export function* getAllCinemas() {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(getAllCinemasApi);
    if (response.statusText === "OK") {
      yield put(cinemaAction.getAllCinemasSuccess(response.data));
    } else {
      yield put(cinemaAction.getAllCinemasFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(cinemaAction.getAllCinemasFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const getAllSchedulesApi = (movieId, currentTime) =>
  axios.get(
    `${
      apiUrl.BASE_URL + apiUrl.API_SCHEDULE
    }?movieId=${movieId}&date_gte=${currentTime}&_expand=cinema`
  );

export function* getAllSchedules(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(getAllSchedulesApi, action.payload, Date.now());
    if (response.statusText === "OK") {
      yield put(cinemaAction.getAllSchedulesSuccess(response.data));
    } else {
      yield put(cinemaAction.getAllSchedulesFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(cinemaAction.getAllSchedulesFailed(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watcherCinema() {
  yield takeEvery(cinemaAction.getAllCities, getAllCities);
  yield takeEvery(cinemaAction.getAllCinemas, getAllCinemas);
  yield takeEvery(cinemaAction.getAllSchedules, getAllSchedules);
}
