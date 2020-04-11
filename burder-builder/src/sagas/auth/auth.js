import { put, delay } from "redux-saga/effects";

import * as actionTypes from "../../actions";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actionTypes.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime)
  yield put(actionTypes.logout())
}
