import * as actionTypes from '../../actions/action';

const token = (state = null, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START:
      return null;
    case actionTypes.AUTH_SUCCESS:
      return action.payload.idToken;
    case actionTypes.AUTH_FAIL:
    default:
      return state;
  }
}
export default token;