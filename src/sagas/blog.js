import { takeEvery, put, call } from "redux-saga/effects";
import * as blogAction from "../reducers/blog";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";

const getBlogNewsesApi = (page, limit) =>
  axios.get(
    `${apiUrl.BASE_URL + apiUrl.API_BLOG_NEWS}?_page=${page}&_limit=${limit}`
  );

export function* getBlogNewses(action) {
  try {
    const { page, limit } = action.payload;
    const response = yield call(getBlogNewsesApi, page, limit);
    if (response.statusText === "OK") {
      yield put(blogAction.getBlogNewsesSuccess(response.data));
    } else {
      yield put(blogAction.getBlogNewsesFailed("Đã xảy ra lỗi!"));
    }
  } catch {
    yield put(blogAction.getBlogNewsesFailed("Đã xảy ra lỗi!"));
  }
}

export function* watcherBlog() {
  yield takeEvery(blogAction.getBlogNewses, getBlogNewses);
}
