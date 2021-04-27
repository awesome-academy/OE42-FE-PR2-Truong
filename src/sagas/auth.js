import { takeEvery, put, call } from "redux-saga/effects";
import * as authAction from "../reducers/auth";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";
import { getRandomString } from "../utils/getRandomString";

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
        const { token, password, ...restProps } = response.data[0];
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

const getUserApi = (username) =>
  axios.get(`${apiUrl.BASE_URL + apiUrl.API_AUTH}?username=${username}`);

const postUserApi = (user) =>
  axios.post(apiUrl.BASE_URL + apiUrl.API_AUTH, user);

export function* postSignUp(action) {
  try {
    const response = yield call(getUserApi, action.payload.username);
    if (response.statusText === "OK") {
      if (response.data.length !== 0) {
        yield put(authAction.postSignUpFailed("Tài khoản đã tồn tại!"));
      } else {
        const user = action.payload;
        user.token = getRandomString(15);
        user.role = "user";
        const responsePost = yield call(postUserApi, user);
        console.log(responsePost);
        if (responsePost.statusText === "Created") {
          const { token, password, ...restProps } = responsePost.data;
          yield put(
            authAction.postSignUpSuccess({ token, user: { ...restProps } })
          );
        } else {
          yield put(authAction.postSignUpFailed("Đã xảy ra lỗi!"));
        }
      }
    } else {
      yield put(authAction.postSignUpFailed("Đã xảy ra lỗi!"));
    }
  } catch {
    yield put(authAction.postSignUpFailed("Đã xảy ra lỗi!"));
  }
}

export function* watcherAuth() {
  yield takeEvery(authAction.postLogin, postLogin);
  yield takeEvery(authAction.getUserInfo, getUserInfo);
  yield takeEvery(authAction.postSignUp, postSignUp);
}
