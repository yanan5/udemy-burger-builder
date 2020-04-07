import * as actionTypes from "../../actions";

const error = (state = null, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
    case actionTypes.AUTH_SUCCESS:
    case actionTypes.AUTH_LOGOUT:
      return null;
    case actionTypes.AUTH_FAIL:
      return action.payload.error;
    default:
      return state;
  }
};
export default error;
