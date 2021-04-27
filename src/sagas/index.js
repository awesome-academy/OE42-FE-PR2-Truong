import { all } from "redux-saga/effects";
import { watcherBanner } from "./banner";
import { watcherPromotion } from "./promotion";

export default function* watcherSaga() {
  yield all([
    watcherBanner(),
    watcherPromotion(),
  ]);
}
