import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import firebase from "firebase";
import App from "./App";
import store from "./store";

const firebaseConfig = {
  apiKey: "AIzaSyDnCKtRX4x8hGs9rq37Cj2HhKihZwCCF0Y",
  authDomain: "tasksboar.firebaseapp.com",
  databaseURL:
    "https://tasksboar-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tasksboar",
  storageBucket: "tasksboar.appspot.com",
  messagingSenderId: "456598166439",
  appId: "1:456598166439:web:9078151d97fb7a58b93482",
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
