import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="main-content">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
  </StrictMode>
);
