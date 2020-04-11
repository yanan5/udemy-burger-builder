import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import * as actionTypes from "../../actions";

export function* fetchOrdersSaga({token, userId}) {
  yield put(actionTypes.onFetchOrdersPending());
  const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
  try {
    const res = yield axios.get(`/orders.json${queryParams}`);
    if (res && res.data) {
      yield put(actionTypes.onFetchOrdersFulfilled(res.data));
    }
  } catch(e) {
  
  }
};

export function* saveOrderSaga({order, token}) {
  yield put({ type: actionTypes.SAVE_ORDER_PENDING });
  try {
    yield axios
    .post(`/orders.json?auth=${token}`, order);
    yield put({type: actionTypes.SAVE_ORDER_FULFILLED})
  } catch(err) {
    put({ type: actionTypes.SAVE_ORDER_REJECTED });
  }
}

