import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducer/rootReducer";
import thunk from "redux-thunk";
import { watchAuth, watchBurgerBuilder, watchOrders } from "../sagas";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({
  trace: true,
  // Specify here name, actionsBlacklist, actionsCreators and other options
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrders)

export default store;
