import * as actionTypes from "../../actions/action";
import INGREDIENT_PRICES from "../../constants/constants";
const defaultPrice = Object.values(INGREDIENT_PRICES).reduce(
  (accVal, currVal) => accVal + currVal,
  0
);
const getTotalPrice = (ingredients) =>
  Object.keys(ingredients).reduce(
    (accVal, currVal) =>
      ingredients[currVal] !== 0 ? accVal + INGREDIENT_PRICES[currVal] : accVal,
    0
  );

const totalPrice = (state = defaultPrice, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: {
      const ingredientType = action.payload.value;
      const priceAddition = INGREDIENT_PRICES[ingredientType];
      return state + priceAddition;
    }
    case actionTypes.DELETE_INGREDIENT: {
      const ingredientType = action.payload.value;
      const priceAddition = INGREDIENT_PRICES[ingredientType];
      return state - priceAddition;
    }
    case actionTypes.FETCH_INGREDIENTS_FULFILLED: {
      return getTotalPrice(action.payload.value);
    }
    default:
      return state;
  }
};
export default totalPrice;
