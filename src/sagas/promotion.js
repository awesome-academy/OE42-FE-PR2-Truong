import { takeEvery, put, call } from "redux-saga/effects";
import * as promotionAction from "../reducers/promotion";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";
import { LIMIT_PROMOTION_PER_PAGE } from "../constants/limitRecord";

const getPromotionsApi = (page, limit) =>
  page && limit
    ? axios.get(
        `${
          apiUrl.BASE_URL + apiUrl.API_PROMOTION
        }?_page=${page}&_limit=${limit}`
      )
    : axios.get(apiUrl.BASE_URL + apiUrl.API_PROMOTION);

export function* getPromotions(action) {
  try {
    const { page, limit } = action.payload || {};
    const response = yield call(getPromotionsApi, page, limit);
    if (response.statusText === "OK") {
      const totalRecords = response.headers["x-total-count"];
      yield put(
        promotionAction.getPromotionsSuccess({
          promotions: response.data,
          currentPage: page ? page : 1,
          totalPage: limit
            ? Math.ceil(totalRecords / LIMIT_PROMOTION_PER_PAGE)
            : 0,
        })
      );
    } else {
      yield put(promotionAction.getPromotionsFailed("Đã xảy ra lỗi!"));
    }
  } catch {
    yield put(promotionAction.getPromotionsFailed("Đã xảy ra lỗi!"));
  }
}

const getDetailPromotionApi = (id) =>
  axios.get(apiUrl.BASE_URL + apiUrl.API_PROMOTION + "/" + id);

export function* getDetailPromotion(action) {
  try {
    const response = yield call(getDetailPromotionApi, action.payload);
    if (response.statusText === "OK") {
      yield put(promotionAction.getDetailPromotionSuccess(response.data));
    } else {
      yield put(promotionAction.getDetailPromotionFailed("Đã xảy ra lỗi!"));
    }
  } catch {
    yield put(promotionAction.getDetailPromotionFailed("Đã xảy ra lỗi!"));
  }
}

export function* watcherPromotion() {
  yield takeEvery(promotionAction.getPromotions, getPromotions);
  yield takeEvery(promotionAction.getDetailPromotion, getDetailPromotion);
}
