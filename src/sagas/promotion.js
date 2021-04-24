import { takeEvery, put, call } from "redux-saga/effects";
import * as promotionAction from "../reducers/promotion";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";

const getPromotionsApi = () =>
  axios.get(apiUrl.BASE_URL + apiUrl.API_PROMOTION);

export function* getPromotions() {
  try {
    const response = yield call(getPromotionsApi);
    if (response.statusText === "OK") {
      yield put(promotionAction.getPromotionsSuccess(response.data));
    } else {
      yield put(promotionAction.getPromotionsFailed("Đã xảy ra lỗi!"));
    }
  } catch {
    yield put(promotionAction.getPromotionsFailed("Đã xảy ra lỗi!"));
  }
}

export function* watcherPromotion() {
  yield takeEvery(promotionAction.getPromotions, getPromotions);
}
