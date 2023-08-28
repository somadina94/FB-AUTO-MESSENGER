import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SidebarApp from "./SidebarApp";

const root = ReactDOM.createRoot(document.getElementById("sidebar-root"));
root.render(
  <React.StrictMode>
    <SidebarApp />
  </React.StrictMode>
);
