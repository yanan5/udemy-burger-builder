const initialState = {
  counter: 0
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INC":
      return {
        ...state,
        counter: state.counter + 1
      };
    case "DEC":
      return {
        ...state,
        counter: state.counter - 1
      };
    case "INC5":
      return {
        ...state,
        counter: state.counter + action.payload.value
      };
    case "DEC5":
      return {
        ...state,
        counter: state.counter - action.payload.value
      };
    default:
      return state;
  }
  return state;
};

export default reducer;
