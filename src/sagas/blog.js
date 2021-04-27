import { takeEvery, put, call } from "redux-saga/effects";
import * as blogAction from "../reducers/blog";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";
import { LIMIT_NEWS_PER_PAGE } from "../constants/limitRecord";

const getBlogNewsesApi = (page, limit) =>
  axios.get(
    `${apiUrl.BASE_URL + apiUrl.API_BLOG_NEWS}?_page=${page}&_limit=${limit}`
  );

export function* getBlogNewses(action) {
  try {
    const { page, limit } = action.payload;
    const response = yield call(getBlogNewsesApi, page, limit);
    if (response.statusText === "OK") {
      const totalRecords = response.headers["x-total-count"];
      yield put(
        blogAction.getBlogNewsesSuccess({
          blogNewses: response.data,
          currentPage: page ? page : 1,
          totalPage: limit ? Math.ceil(totalRecords / LIMIT_NEWS_PER_PAGE) : 0,
        })
      );
    } else {
      yield put(blogAction.getBlogNewsesFailed("Đã xảy ra lỗi!"));
    }
  } catch {
    yield put(blogAction.getBlogNewsesFailed("Đã xảy ra lỗi!"));
  }
}

const getDetailBlogApi = (id) =>
  axios.get(apiUrl.BASE_URL + apiUrl.API_BLOG_NEWS + "/" + id);

export function* getDetailBlog(action) {
  try {
    const response = yield call(getDetailBlogApi, action.payload);
    if (response.statusText === "OK") {
      yield put(blogAction.getDetailBlogSuccess(response.data));
    } else {
      yield put(blogAction.getDetailBlogFailed("Đã xảy ra lỗi!"));
    }
  } catch {
    yield put(blogAction.getDetailBlogFailed("Đã xảy ra lỗi!"));
  }
}

export function* watcherBlog() {
  yield takeEvery(blogAction.getBlogNewses, getBlogNewses);
  yield takeEvery(blogAction.getDetailBlog, getDetailBlog);
}
