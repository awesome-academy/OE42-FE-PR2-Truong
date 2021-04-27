import { takeEvery, put, call } from "redux-saga/effects";
import * as bannerAction from "../reducers/banner";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";

const getBannersApi = () => axios.get(apiUrl.BASE_URL + apiUrl.API_BANNER);

export function* getBanners() {
  try {
    const response = yield call(getBannersApi);
    if (response.statusText === "OK") {
      yield put(bannerAction.getBannersSuccess(response.data));
    } else {
      yield put(bannerAction.getBannersFailed("Đã xảy ra lỗi!"));
    }
  } catch {
    yield put(bannerAction.getBannersFailed("Đã xảy ra lỗi!"));
  }
}

export function* watcherBanner() {
  yield takeEvery(bannerAction.getBanners, getBanners);
}
