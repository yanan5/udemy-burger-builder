import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import * as actionTypes from "../../actions";

export function* initIngredientsSaga() {
  yield put({ type: actionTypes.FETCH_INGREDIENTS_PENDING });
  try {
    const res = yield axios.get("/ingredients.json")
    yield put(actionTypes.onFetchIngredientFulfilled(res.data));
  } catch(err) {
    yield put(actionTypes.onFetchIngredientRejected(err))
  }
}
