export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const FETCH_INGREDIENTS_REJECTED = "FETCH_INGREDIENTS_REJECTED";
export const FETCH_INGREDIENTS_FULFILLED = "FETCH_INGREDIENTS_FULFILLED";
export const FETCH_INGREDIENTS_PENDING = "FETCH_INGREDIENTS_PENDING";
export const FETCH_INGREDIENTS_START = "FETCH_INGREDIENTS_START";

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

export const onFetchIngredientFulfilled = (ingredients) => ({
  type: FETCH_INGREDIENTS_FULFILLED,
  payload: {
    value: ingredients,
  },
});
export const onFetchIngredientRejected = (error) => ({
  type: FETCH_INGREDIENTS_REJECTED,
  payload: {
    value: error,
  },
});

export const initIngredients = () => ({
  type: FETCH_INGREDIENTS_START
})
