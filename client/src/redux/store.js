import { createStore, applyMiddleware, compose } from "redux";
// import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;