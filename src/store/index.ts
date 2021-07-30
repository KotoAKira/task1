import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers";
import rootWatcher from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootWatcher);

export default store;
