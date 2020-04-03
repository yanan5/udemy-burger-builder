import * as actionTypes from '../../actions/action';

const keys = (state = [], action) => {
  switch(action.type) {
    case actionTypes.FETCH_ORDERS_FULFILLED:
      return [
        ...state,
        ...Object.keys(action.payload.value)
      ]
    case actionTypes.FETCH_ORDERS_PENDING:
      return [];
    default:
      return state;
  }
}
export default keys;