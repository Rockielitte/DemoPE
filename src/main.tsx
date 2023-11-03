import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/inter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssVarsProvider } from "@mui/joy";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssVarsProvider>
      <App />
    </CssVarsProvider>
    <ToastContainer />
  </React.StrictMode>
);
