import {
  takeEvery,
  put,
  call,
  delay,
  cancel,
  fork,
  cancelled,
} from "redux-saga/effects";
import * as orderAction from "../reducers/order";
import * as schedule from "../reducers/schedule";
import * as apiUrl from "../constants/apiUrl";
import axios from "axios";
import { getTranslation } from "../utils/getTranslation";
import { toast } from "react-toastify";
import { ORDER_PAGE_STATES } from "../constants/orderTicket";

const getTicketTypesApi = () =>
  axios.get(apiUrl.BASE_URL + apiUrl.API_TICKET_TYPE);

export function* getTicketTypes() {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(getTicketTypesApi);
    if (response.statusText === "OK") {
      yield put(orderAction.getTicketTypesSuccess(response.data));
    } else {
      yield put(orderAction.getTicketTypesFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(orderAction.getTicketTypesFailed(errorMessage));
    toast.error(errorMessage);
  }
}

const getServicesApi = () => axios.get(apiUrl.BASE_URL + apiUrl.API_SERVICE);

export function* getServices() {
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const response = yield call(getServicesApi);
    if (response.statusText === "OK") {
      yield put(orderAction.getServicesSuccess(response.data));
    } else {
      yield put(orderAction.getServicesFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(orderAction.getServicesFailed(errorMessage));
    toast.error(errorMessage);
  }
}

export function* runCountdownSync(action) {
  try {
    const { timeLeft } = action.payload;
    let count = timeLeft;
    while (true) {
      yield put(orderAction.setCountdown(count));
      yield delay(1000);
      count--;
    }
  } finally {
    if (yield cancelled()) {
      const { scheduleId, selectedSeats } = action.payload;
      yield put(
        schedule.deleteSelectingSeats({ scheduleId, selectedSeats })
      );
    }
  }
}

let countdownTask;

function* runCountdown(action) {
  const { timeLeft } = action.payload;
  countdownTask = yield fork(runCountdownSync, action);
  yield delay((timeLeft + 1) * 1000);
  yield cancel(countdownTask);
}

const postOrderApi = (data) =>
  axios.post(apiUrl.BASE_URL + apiUrl.API_ORDER, data);

function* postOrder(action) {
  yield cancel(countdownTask);
  const translation = getTranslation();
  const errorMessage = translation.notification?.error_occur;
  try {
    const { scheduleId, data } = action.payload;
    const response = yield call(postOrderApi, data);
    if (response.statusText === "Created") {
      yield put(orderAction.postOrderSuccess(response.data));
      yield put(
        schedule.postSoldSeats({ scheduleId, selectedSeats: data.seats })
      );
      yield put(orderAction.setPageState(ORDER_PAGE_STATES.CONGRATULATION));
      toast.success(translation.notification?.congratulation);
    } else {
      yield put(orderAction.postOrderFailed(errorMessage));
      toast.error(errorMessage);
    }
  } catch {
    yield put(orderAction.postOrderFailed(errorMessage));
    toast.error(errorMessage);
  }
}

function* cancelOrder() {
  yield cancel(countdownTask);
}

export function* watcherOrder() {
  yield takeEvery(orderAction.getTicketTypes, getTicketTypes);
  yield takeEvery(orderAction.getServices, getServices);
  yield takeEvery(orderAction.runCountdown, runCountdown);
  yield takeEvery(orderAction.postOrder, postOrder);
  yield takeEvery(orderAction.cancelOrder, cancelOrder);
}
