import * as actionTypes from "../../actions";
const loading = (state = false, action) => {
  switch (action.type) {
    case actionTypes.SAVE_ORDER_PENDING: return true;
    case actionTypes.SAVE_ORDER_FULFILLED:
    case actionTypes.SAVE_ORDER_REJECTED:
      return false;
    default: return state;
  }
};
export default loading;
