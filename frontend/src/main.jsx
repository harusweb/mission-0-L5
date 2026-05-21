import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// this is the tiny handoff where React grabs the empty div in index.html and starts the app
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
