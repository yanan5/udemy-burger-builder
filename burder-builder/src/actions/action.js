import axios from "../axios-orders";
import ax from "axios";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const FETCH_INGREDIENTS_REJECTED = "FETCH_INGREDIENTS_REJECTED";
export const FETCH_INGREDIENTS_FULFILLED = "FETCH_INGREDIENTS_FULFILLED";
export const FETCH_INGREDIENTS_PENDING = "FETCH_INGREDIENTS_PENDING";
export const FETCH_ORDERS_FULFILLED = "FETCH_ORDERS_FULFILLED";
export const FETCH_ORDERS_PENDING = "FETCH_ORDERS_PENDING";
export const SAVE_ORDER_PENDING = "SAVE_ORDER_PENDING";
export const SAVE_ORDER_FULFILLED = "SAVE_ORDER_FULFILLED";
export const SAVE_ORDER_REJECTED = "SAVE_ORDER_REJECTED";
export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";

export const onAddIngredient = (type) => ({
  type: ADD_INGREDIENT,
  payload: {
    value: type,
  },
});

export const onDeleteIngredient = (type) => ({
  type: DELETE_INGREDIENT,
  payload: {
    value: type,
  },
});

const onFetchIngredientFulfilled = (ingredients) => ({
  type: FETCH_INGREDIENTS_FULFILLED,
  payload: {
    value: ingredients,
  },
});
const onFetchIngredientRejected = (error) => ({
  type: FETCH_INGREDIENTS_REJECTED,
  payload: {
    value: error,
  },
});

export const initIngredients = () => (dispatch) => {
  dispatch({ type: FETCH_INGREDIENTS_PENDING });
  return axios
    .get("/ingredients.json")
    .then((res) => dispatch(onFetchIngredientFulfilled(res.data)))
    .catch((error) => dispatch(onFetchIngredientRejected(error)));
};

export const onFetchOrdersFulfilled = (orders) => ({
  type: FETCH_ORDERS_FULFILLED,
  payload: {
    value: orders,
  },
});

export const onFetchOrdersPending = () => ({
  type: FETCH_ORDERS_PENDING,
});

export const initOrders = () => (dispatch) => {
  dispatch(onFetchOrdersPending());
  return axios.get("/orders.json").then((res) => {
    if (res.data) {
      dispatch(onFetchOrdersFulfilled(res.data));
    }
  });
};

export const saveOrder = (order) => (dispatch) => {
  dispatch({ type: SAVE_ORDER_PENDING });
  return axios
    .post("/orders.json", order)
    .then((res) => {
      dispatch({ type: SAVE_ORDER_FULFILLED });
    })
    .catch((err) => dispatch({ type: SAVE_ORDER_REJECTED }));
};

export const authStart = () => ({
  type: AUTH_START,
});

export const authSuccess = (authData) => ({
  type: AUTH_SUCCESS,
  payload: {
    value: authData,
  },
});

export const authFail = (err) => ({
  type: AUTH_FAIL,
  payload: {
    value: err,
  },
});

export const auth = (email, password, isSignUp) => (dispatch) => {
  dispatch(authStart());
  console.log("Action", email, password, isSignUp)
  let signUp = "signInWithPassword";
  if (isSignUp) {
    signUp = "signUp";
  }
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${signUp}?key=AIzaSyDOjFVwYcCEv1k1FumTipxjmxXqNKZzljE
  `;
  ax.post(url, { email, password, returnSecureToken: true })
    .then((res) => {
      console.log("AUTH SUCCESS", res);
      dispatch(authSuccess(res));
    })
    .catch((err) => {
      console.log("AUTH FAILED", err);
      dispatch(authFail(err));
    });
};
