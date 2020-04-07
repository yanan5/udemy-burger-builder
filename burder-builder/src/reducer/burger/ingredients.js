import * as actionTypes from '../../actions';

const ingredients = (state = null, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT:{
      const ingredientType = action.payload.value;
      const oldCount = state[ingredientType];
      return {
        ...state,
        [ingredientType]: oldCount + 1
      };
    }
    case actionTypes.DELETE_INGREDIENT:{
      const ingredientType = action.payload.value;
      const oldCount = state[ingredientType];
      return {
        ...state,
        [ingredientType]: oldCount - 1
      };
    }
    case actionTypes.FETCH_INGREDIENTS_FULFILLED:
      return {
        ...state,
        ...action.payload.value
      };
    case actionTypes.SAVE_ORDER_FULFILLED:
      return null;
    default:
      return state;
  }
}
export default ingredients;