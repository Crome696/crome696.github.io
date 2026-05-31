import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/600.css";
import App from "./App";
import "./styles.css";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const pendingRedirect = window.sessionStorage.getItem("crome696:redirect");

if (pendingRedirect) {
  window.sessionStorage.removeItem("crome696:redirect");
  const normalizedPath = pendingRedirect.startsWith("/")
    ? pendingRedirect
    : `/${pendingRedirect}`;
  window.history.replaceState(null, "", `${basePath}${normalizedPath}`);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={basePath}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
