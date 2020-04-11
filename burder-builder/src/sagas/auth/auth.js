import { put, delay } from "redux-saga/effects";
import ax from "axios";
import * as actionTypes from "../../actions";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actionTypes.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actionTypes.logout());
}

export function* authUserSaga(action) {
  yield put(actionTypes.authStart());
  let signUp = "signInWithPassword";
  if (action.isSignUp) {
    signUp = "signUp";
  }
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${signUp}?key=AIzaSyDOjFVwYcCEv1k1FumTipxjmxXqNKZzljE
  `;
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  try {
    const res = yield ax.post(url, authData);
    const expirationDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", res.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", res.data.localId);
    yield put(actionTypes.authSuccess(res.data.idToken, res.data.localId));
    yield put(actionTypes.checkAuthTimeout(res.data.expiresIn));
  } catch (error) {
    put(actionTypes.authFail(error.response.data.error));
  }
}
