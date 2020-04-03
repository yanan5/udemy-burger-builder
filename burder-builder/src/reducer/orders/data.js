import * as actionTypes from '../../actions/action';

const data = (state = null, action) => {
  switch(action.type) {
    case actionTypes.FETCH_ORDERS_FULFILLED:
      return {
        ...state,
        ...action.payload.value
      }
    case actionTypes.FETCH_ORDERS_PENDING:
      return null;
    default:
      return state;
  }
}
export default data;