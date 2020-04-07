import * as actionTypes from "../../actions";

const loading = (state = false, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return true;
    case actionTypes.AUTH_SUCCESS:
    case actionTypes.AUTH_FAIL:
    case actionTypes.AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
};
export default loading;
