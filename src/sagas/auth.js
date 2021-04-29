import { takeEvery, put, call } from "redux-saga/effects";
import * as authAction from "../reducers/auth";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";
import { getRandomString } from "../utils/getRandomString";
import { getTranslation } from "../utils/getTranslation";
import { toast } from "react-toastify";

const postLoginApi = (username, password) =>
  axios.get(
    `${
      apiUrl.BASE_URL + apiUrl.API_AUTH
    }?username=${username}&password=${password}`
  );

export function* postLogin(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
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
          authAction.postLoginFailed(translation.notification?.invalid_account)
        );
        toast.error(translation.notification?.invalid_account);
      }
    } else {
      yield put(authAction.postLoginFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(authAction.postLoginFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const getUserInfoApi = (token) =>
  axios.get(`${apiUrl.BASE_URL + apiUrl.API_AUTH}?token=${token}`);

export function* getUserInfo(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(getUserInfoApi, action.payload);
    if (response.statusText === "OK") {
      if (response.data.length !== 0) {
        const { token, ...restProps } = response.data[0];
        yield put(authAction.getUserInfoSuccess({ ...restProps }));
      } else {
        yield put(
          authAction.getUserInfoFailed(translation.notification?.invalid_token)
        );
      }
    } else {
      yield put(authAction.getUserInfoFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(authAction.getUserInfoFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const getUserApi = (username) =>
  axios.get(`${apiUrl.BASE_URL + apiUrl.API_AUTH}?username=${username}`);

const postUserApi = (user) =>
  axios.post(apiUrl.BASE_URL + apiUrl.API_AUTH, user);

export function* postSignUp(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(getUserApi, action.payload.username);
    if (response.statusText === "OK") {
      if (response.data.length !== 0) {
        yield put(
          authAction.postSignUpFailed(translation.notification?.account_exists)
        );
        toast.error(translation.notification?.account_exists);
      } else {
        const user = action.payload;
        user.token = getRandomString(15);
        user.role = "user";
        const responsePost = yield call(postUserApi, user);
        if (responsePost.statusText === "Created") {
          const { token, password, ...restProps } = responsePost.data;
          yield put(
            authAction.postSignUpSuccess({ token, user: { ...restProps } })
          );
        } else {
          yield put(authAction.postSignUpFailed(errorMessage));
          toast.error(errorMessage);
        }
      }
    } else {
      yield put(authAction.postSignUpFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(authAction.postSignUpFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const putPersonalInfoApi = (id, info) =>
  axios.put(apiUrl.BASE_URL + apiUrl.API_AUTH + "/" + id, info);

export function* putPersonalInfo(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const { id, info } = action.payload;
    const response = yield call(putPersonalInfoApi, id, info);
    if (response.statusText === "OK") {
      const { token, ...restProps } = response.data;
      yield put(authAction.putPersonalInfoSuccess({ ...restProps }));
      toast.success(translation.notification?.update_personal_info_success);
    } else {
      yield put(authAction.putPersonalInfoFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(authAction.putPersonalInfoFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const getUserByPasswordApi = (password) =>
  axios.get(apiUrl.BASE_URL + apiUrl.API_AUTH + "?password=" + password);

const putPasswordApi = (id, info) =>
  axios.put(apiUrl.BASE_URL + apiUrl.API_AUTH + "/" + id, info);

export function* putPassword(action) {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const {
      oldPassword,
      info: { id, password, ...restInfoProps },
    } = action.payload;
    const responseCheckPass = yield call(getUserByPasswordApi, oldPassword);
    if (responseCheckPass.statusText === "OK") {
      if (responseCheckPass.data.length !== 0) {
        const response = yield call(putPasswordApi, id, {
          password,
          ...restInfoProps,
        });
        if (response.statusText === "OK") {
          yield put(authAction.putPasswordSuccess(password));
        } else {
          yield put(authAction.putPasswordFailed(errorMessage));
          toast.error(errorMessage);
        }
        toast.success(translation.notification?.update_password_success);
      } else {
        yield put(
          authAction.putPasswordFailed(translation.error?.incorrect_old_password)
        );
        toast.error(translation.error?.incorrect_old_password);
      }
    } else {
      yield put(authAction.putPasswordFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(authAction.putPasswordFailed(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watcherAuth() {
  yield takeEvery(authAction.postLogin, postLogin);
  yield takeEvery(authAction.getUserInfo, getUserInfo);
  yield takeEvery(authAction.postSignUp, postSignUp);
  yield takeEvery(authAction.putPersonalInfo, putPersonalInfo);
  yield takeEvery(authAction.putPassword, putPassword);
}
