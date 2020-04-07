import axios from "../../axios-orders";

export const FETCH_ORDERS_FULFILLED = "FETCH_ORDERS_FULFILLED";
export const FETCH_ORDERS_PENDING = "FETCH_ORDERS_PENDING";
export const SAVE_ORDER_PENDING = "SAVE_ORDER_PENDING";
export const SAVE_ORDER_FULFILLED = "SAVE_ORDER_FULFILLED";
export const SAVE_ORDER_REJECTED = "SAVE_ORDER_REJECTED";

export const onFetchOrdersFulfilled = (orders) => ({
  type: FETCH_ORDERS_FULFILLED,
  payload: {
    value: orders,
  },
});

export const onFetchOrdersPending = () => ({
  type: FETCH_ORDERS_PENDING,
});

export const fetchOrders = (token) => (dispatch) => {
  dispatch(onFetchOrdersPending());
  return axios.get(`/orders.json?auth=${token}`)
  .then((res) => {
    if (res && res.data) {
      dispatch(onFetchOrdersFulfilled(res.data));
    }
  })
};

export const saveOrder = (order, token) => (dispatch) => {
  dispatch({ type: SAVE_ORDER_PENDING });
  return axios
    .post(`/orders.json?auth=${token}`, order)
    .then((res) => {
      dispatch({ type: SAVE_ORDER_FULFILLED });
    })
    .catch((err) => dispatch({ type: SAVE_ORDER_REJECTED }));
};
