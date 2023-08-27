import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// if (document.getElementById("my-extension-sidebar")) {
//   const sidebar = ReactDOM.createRoot(
//     document.getElementById("my-extension-sidebar")
//   );
//   sidebar.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// } else if (document.getElementById("root")) {
//   const root = ReactDOM.createRoot(document.getElementById("root"));
//   root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// }
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
