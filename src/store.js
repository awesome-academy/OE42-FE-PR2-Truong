import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import watcherSaga from "./sagas";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import filmReducer from "./reducers/film";
import bannerReducer from "./reducers/banner";
import promotionReducer from "./reducers/promotion";
import reviewReducer from "./reducers/review";
import blogReducer from "./reducers/blog";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  banner: bannerReducer,
  film: filmReducer,
  promotion: promotionReducer,
  review: reviewReducer,
  blog: blogReducer,
});

const store = configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
    logger,
  ],
});

sagaMiddleware.run(watcherSaga);

export default store;
