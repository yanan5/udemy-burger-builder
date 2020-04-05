import axios from "../axios-orders";

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

export const saveOrder = order => (dispatch) => {
  dispatch({ type: SAVE_ORDER_PENDING });
  return axios
    .post("/orders.json", order)
    .then((res) => {
      dispatch({ type: SAVE_ORDER_FULFILLED });
    })
    .catch((err) => dispatch({ type: SAVE_ORDER_REJECTED }));
};
