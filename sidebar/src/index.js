import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SidebarApp from "./SidebarApp";

console.log(
  "Trying to mount React app to: ",
  document.getElementById("sidebar-root")
);
const root = ReactDOM.createRoot(document.getElementById("sidebar-root"));
root.render(
  <React.StrictMode>
    <SidebarApp />
  </React.StrictMode>
);
