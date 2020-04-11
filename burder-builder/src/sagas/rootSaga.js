import { logoutSaga, checkAuthTimeoutSaga, authUserSaga } from "./auth/auth";
import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}
