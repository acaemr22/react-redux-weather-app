import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./features/store.js";
import { Provider } from "react-redux";
import Theme from "./components/Theme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Theme>
      <App />
    </Theme>
  </Provider>
);
