import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from "./reducer";
import thunk from 'redux-thunk';

const logger = store => next => action => {
  console.log("-------------------------------")
  console.log("Prev [State]", store.getState());
  console.log("[Action]", action);
  const result = next(action);
  console.log("Next [State]", store.getState());  
  console.log("-------------------------------")
  return result
}
const composeEnhancers = composeWithDevTools({});
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(logger, thunk),
  // other store enhancers if any
));

export default store;