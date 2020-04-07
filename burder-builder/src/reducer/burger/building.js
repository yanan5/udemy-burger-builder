import * as actionTypes from "../../actions";
const error = (state = false, action) => {
  switch (action.type) {
    case actionTypes.DELETE_INGREDIENT:
    case actionTypes.ADD_INGREDIENT:        
      return true;
    default: return state;
  }
};
export default error;
