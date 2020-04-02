import * as actionTypes from "../actions/action.js";

const initialState = {
  counter: 0,
  result: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INC:
      return {
        ...state,
        counter: state.counter + 1
      };
    case actionTypes.DEC:
      return {
        ...state,
        counter: state.counter - 1
      };
    case actionTypes.INC_BY_VAL:
      return {
        ...state,
        counter: state.counter + action.payload.value
      };
    case actionTypes.DEC_BY_VAL:
      return {
        ...state,
        counter: state.counter - action.payload.value
      };
    case actionTypes.SAVE_RESULT:
      return {
        ...state,
        result: [...state.result, state.counter]
      };
    case actionTypes.REMOVE_RESULT: {
      const updatedResult = [...state.result];
      updatedResult.splice(action.payload.value, 1);
      return {
        ...state,
        result: updatedResult
      };
    }

    default:
      return state;
  }
  return state;
};

export default reducer;
