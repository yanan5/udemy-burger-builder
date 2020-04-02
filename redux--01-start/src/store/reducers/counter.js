import * as actionTypes from "../../actions/action.js";

const counter = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.INC:
      return state + 1;
    case actionTypes.DEC:
      return state - 1;
    case actionTypes.INC_BY_VAL:
      return state + action.payload.value;
    case actionTypes.DEC_BY_VAL:
      return state - action.payload.value;
    default:
      return state;
  }
};

export default counter;

