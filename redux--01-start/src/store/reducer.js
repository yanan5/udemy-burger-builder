import counter from "./reducers/counter";
import results from "./reducers/results";
import { combineReducers } from "redux";

export default combineReducers({
  counter,
  results
});
