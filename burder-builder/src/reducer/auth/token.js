import * as actionTypes from "../../actions/action";

const token = (state = null, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
    case actionTypes.AUTH_FAIL:
    case actionTypes.AUTH_LOGOUT:
      return null;
    case actionTypes.AUTH_SUCCESS:
      return action.payload.idToken;
    default:
      return state;
  }
};
export default token;
