import { all } from "redux-saga/effects";
import { watcherBanner } from "./banner";

export default function* watcherSaga() {
  yield all([watcherBanner()]);
}
