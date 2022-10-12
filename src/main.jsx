import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GlobalContextComponent } from "./context/GlobalContext";
import { LangContextComponent } from "./context/subFunctions/LangContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContextComponent>
      <LangContextComponent>
        <App />
      </LangContextComponent>
    </GlobalContextComponent>
  </React.StrictMode>
);
