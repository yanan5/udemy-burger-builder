export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const FETCH_INGREDIENTS_FULFILLED = "FETCH_INGREDIENTS_FULFILLED";
export const FETCH_ORDERS_FULFILLED = "FETCH_ORDERS_FULFILLED";
export const FETCH_ORDERS_PENDING = "FETCH_ORDERS_PENDING";

export const onAddIngredient = type => ({
  type: ADD_INGREDIENT,
  payload: {
    value: type
  }
});

export const onDeleteIngredient = type => ({
  type: DELETE_INGREDIENT,
  payload: {
    value: type
  }
});

export const onFetchIngredientFulfilled = ingredients => ({
  type: FETCH_INGREDIENTS_FULFILLED,
  payload: {
    value: ingredients
  }
})

export const onFetchOrdersFulfilled = orders => ({
  type: FETCH_ORDERS_FULFILLED,
  payload: {
    value: orders
  }
})

export const onFetchOrdersPending = () => ({
  type: FETCH_ORDERS_PENDING
})
