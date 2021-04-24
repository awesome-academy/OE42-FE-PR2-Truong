import { takeEvery, put, call } from "redux-saga/effects";
import * as reviewAction from "../reducers/review";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";

const getReviewNewsesApi = (page, limit) =>
  axios.get(
    `${apiUrl.BASE_URL + apiUrl.API_REVIEW_NEWS}?_page=${page}&_limit=${limit}`
  );

export function* getReviewNewses(action) {
  try {
    const { page, limit } = action.payload;
    const response = yield call(getReviewNewsesApi, page, limit);
    if (response.statusText === "OK") {
      yield put(reviewAction.getReviewNewsesSuccess(response.data));
    } else {
      yield put(reviewAction.getReviewNewsesFailed("Đã xảy ra lỗi!"));
    }
  } catch {
    yield put(reviewAction.getReviewNewsesFailed("Đã xảy ra lỗi!"));
  }
}

export function* watcherReview() {
  yield takeEvery(reviewAction.getReviewNewses, getReviewNewses);
}
