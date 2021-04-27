import { takeEvery, put, call } from "redux-saga/effects";
import * as reviewAction from "../reducers/review";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";
import { LIMIT_NEWS_PER_PAGE } from "../constants/limitRecord";

const getReviewNewsesApi = (page, limit) =>
  axios.get(
    `${
      apiUrl.BASE_URL + apiUrl.API_REVIEW_NEWS
    }?_page=${page}&_limit=${limit}&_expand=movie`
  );

export function* getReviewNewses(action) {
  try {
    const { page, limit } = action.payload;
    const response = yield call(getReviewNewsesApi, page, limit);
    if (response.statusText === "OK") {
      const totalRecords = response.headers["x-total-count"];
      yield put(
        reviewAction.getReviewNewsesSuccess({
          reviewNewses: response.data,
          currentPage: page ? page : 1,
          totalPage: limit ? Math.ceil(totalRecords / LIMIT_NEWS_PER_PAGE) : 0,
        })
      );
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
