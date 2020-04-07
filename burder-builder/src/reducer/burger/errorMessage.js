import * as actionTypes from "../../actions/action";
const errorMessage = (state = '', action) => {
  switch (action.type) {
    case actionTypes.FETCH_INGREDIENTS_PENDING: return '';
    case actionTypes.FETCH_INGREDIENTS_REJECTED: return action.payload.value;
    default: return state;
  }
};
export default errorMessage;
