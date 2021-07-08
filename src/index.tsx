import firebase from "firebase";
import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

const firebaseConfig = {
  apiKey: "AIzaSyDnCKtRX4x8hGs9rq37Cj2HhKihZwCCF0Y",
  authDomain: "tasksboar.firebaseapp.com",
  projectId: "tasksboar",
  storageBucket: "tasksboar.appspot.com",
  messagingSenderId: "456598166439",
  appId: "1:456598166439:web:9078151d97fb7a58b93482",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

const Context = createContext({});

ReactDOM.render(
  <Provider store={store}>
    <Context.Provider
      value={{
        firebase,
        auth,
        firestore,
      }}
    >
      <App />
    </Context.Provider>
  </Provider>,
  document.getElementById("root")
);
