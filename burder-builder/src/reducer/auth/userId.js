import * as actionTypes from '../../actions/action';

const userId = (state = null, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START:
      return null;
    case actionTypes.AUTH_SUCCESS:
      return action.payload.userId
    case actionTypes.AUTH_FAIL:
    default:
      return state;
  }
}
export default userId;