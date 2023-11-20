import React from "react";
//import ReactDOM from "react-dom";
import "./assets/main.css";
import "./assets/tailwind.css";
import App from "./App";
//import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);

