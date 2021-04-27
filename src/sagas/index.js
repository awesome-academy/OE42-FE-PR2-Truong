import { all } from "redux-saga/effects";
import { watcherBanner } from "./banner";
import { watcherPromotion } from "./promotion";
import { watcherReview } from "./review";
import { watcherBlog } from "./blog";

export default function* watcherSaga() {
  yield all([
    watcherBanner(),
    watcherPromotion(),
    watcherReview(),
    watcherBlog(),
  ]);
}
