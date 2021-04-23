import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import watcherSaga from "./sagas";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({});

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
