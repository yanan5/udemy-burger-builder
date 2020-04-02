import * as actionTypes from "../../actions/action.js";

const results = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SAVE_RESULT:
      return [...state, action.payload.value];
    case actionTypes.REMOVE_RESULT: {
      const updatedResult = [...state];
      updatedResult.splice(action.payload.value, 1);
      return updatedResult;
    }
    default:
      return state;
  }
};

export default results;
