const redux = require("redux");
const { createStore, applyMiddleware } = redux;
const INC = "INC";
const DEC = "DEC";
const ADD_COUNTER = "ADD_COUNTER";
const DELETE_COUNTER = "DELETE_COUNTER";
// Reducer
const initialState = {
  count: 0
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INC":
      return {
        ...state,
        count: state.count + 1
      };
    case "DEC":
      return {
        ...state,
        count: state.count - 1
      };
    case "ADD_COUNTER":
      return {
        ...state,
        count: state.count + action.payload.value
      };
    case "DELETE_COUNTER":
      return {
        ...state,
        count: state.count - action.payload.value
      };
    default:
      return state;
  }
  return state;
};

// middleware
const logger = ({ dispatch, getState }) => next => action => {
  let result = [getState(), action];
  const returnValue = next(action);
  result.push(getState());
  console.log("from logger middleware", JSON.stringify(result));
  return returnValue;
};
// Store
const store = createStore(rootReducer, applyMiddleware(logger));

// Subscription
const unsubscribe = store.subscribe(() => {
  console.log("from subscription", store.getState());
});

// Dispatching Action
store.dispatch({ type: INC });
store.dispatch({ type: INC });
store.dispatch({ type: INC });
store.dispatch({ type: ADD_COUNTER, payload: { value: 5 } });
store.dispatch({ type: DEC });
store.dispatch({ type: DEC });
store.dispatch({ type: DELETE_COUNTER, payload: { value: 5 } });
//console.log(store.getState());
