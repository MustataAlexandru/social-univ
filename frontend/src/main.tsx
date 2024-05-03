import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./Components/firstpage.css";
import { BrowserRouter } from "react-router-dom";
// @ts-expect-error
import {UserProvider} from './Components/ContextProviders/UserProvider';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <UserProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
      </UserProvider>
  </React.StrictMode>,
);
