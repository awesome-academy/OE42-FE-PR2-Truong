import { takeEvery, put, call } from "redux-saga/effects";
import * as authAction from "../reducers/auth";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";

const postLoginApi = (username, password) =>
  axios.get(
    `${
      apiUrl.BASE_URL + apiUrl.API_AUTH
    }?username=${username}&password=${password}`
  );

export function* postLogin(action) {
  try {
    const { username, password } = action.payload;
    const response = yield call(postLoginApi, username, password);
    if (response.statusText === "OK") {
      if (response.data.length !== 0) {
        const { token, ...restProps } = response.data[0];
        yield put(
          authAction.postLoginSuccess({ user: { ...restProps }, token })
        );
      } else {
        yield put(
          authAction.postLoginFailed("Tài khoản hoặc mật khẩu không đúng!")
        );
      }
    } else {
      yield put(authAction.postLoginFailed("Đã xảy ra lỗi!"));
    }
  } catch {
    yield put(authAction.postLoginFailed("Đã xảy ra lỗi!"));
  }
}

const getUserInfoApi = (token) =>
  axios.get(`${apiUrl.BASE_URL + apiUrl.API_AUTH}?token=${token}`);

export function* getUserInfo(action) {
  try {
    const response = yield call(getUserInfoApi, action.payload);
    if (response.statusText === "OK") {
      if (response.data.length !== 0) {
        const { token, ...restProps } = response.data[0];
        yield put(authAction.getUserInfoSuccess({ ...restProps }));
      } else {
        yield put(authAction.getUserInfoFailed("Token không hợp lệ!"));
      }
    } else {
      yield put(authAction.getUserInfoFailed("Đã xảy ra lỗi!"));
    }
  } catch {
    yield put(authAction.getUserInfoFailed("Đã xảy ra lỗi!"));
  }
}

export function* watcherAuth() {
  yield takeEvery(authAction.postLogin, postLogin);
  yield takeEvery(authAction.getUserInfo, getUserInfo);
}
