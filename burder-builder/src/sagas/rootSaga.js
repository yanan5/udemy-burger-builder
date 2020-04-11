import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from "./auth/auth";
import { initIngredientsSaga } from './burger/burger';
import { fetchOrdersSaga, saveOrderSaga } from './orders/orders';
import { takeEvery, all, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga)
  ])
  
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.FETCH_INGREDIENTS_START, initIngredientsSaga);
}

export function* watchOrders() {
  yield all([
    takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga),
    takeLatest(actionTypes.SAVE_ORDER_START, saveOrderSaga)
  ])  
}
