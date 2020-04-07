import * as actionTypes from "../../actions";

const error = (state = "/", action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return action.payload.path
    default:
      return state;
  }
};
export default error;
