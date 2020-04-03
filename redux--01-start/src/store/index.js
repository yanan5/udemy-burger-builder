import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";

const logger = store => next => action => {
  console.log("-------------------------------")
  console.log("Prev [State]", store.getState());
  console.log("[Action]", action);
  const result = next(action);
  console.log("Next [State]", store.getState());  
  console.log("-------------------------------")
  return result
}
const store = createStore(reducer, applyMiddleware(logger));

export default store;