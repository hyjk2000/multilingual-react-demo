import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import * as reducers from "../reducers";

const middleware = [];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const configureStore = preloadedState =>
  createStore(
    combineReducers(reducers),
    preloadedState,
    applyMiddleware(...middleware)
  );

export default configureStore;
