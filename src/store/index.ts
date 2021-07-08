import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userReducer";

export default store = createStore(
  {
    userReducer,
  },
  applyMiddleware(thunk)
);
