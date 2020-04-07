import * as actionTypes from "../../actions/action";
const error = (state = false, action) => {
  switch (action.type) {
    case actionTypes.FETCH_INGREDIENTS_PENDING: return false;
    case actionTypes.FETCH_INGREDIENTS_REJECTED: return true;
    default: return state;
  }
};
export default error;
