export const FETCH_ORDERS = "FETCH_ORDERS";
export const FETCH_ORDERS_FULFILLED = "FETCH_ORDERS_FULFILLED";
export const FETCH_ORDERS_PENDING = "FETCH_ORDERS_PENDING";
export const SAVE_ORDER_PENDING = "SAVE_ORDER_PENDING";
export const SAVE_ORDER_START = "SAVE_ORDER_START";
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

export const fetchOrders = (token, userId) => ({
  type: FETCH_ORDERS,
  token,
  userId
})

export const saveOrder = (order, token) =>({
  type: SAVE_ORDER_START,
  order,
  token
})
