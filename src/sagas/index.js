import { all } from "redux-saga/effects";
import { watcherFilm } from "./film";
import { watcherBanner } from "./banner";
import { watcherPromotion } from "./promotion";
import { watcherReview } from "./review";
import { watcherBlog } from "./blog";

export default function* watcherSaga() {
  yield all([
    watcherFilm(),
    watcherBanner(),
    watcherPromotion(),
    watcherReview(),
    watcherBlog(),
  ]);
}
