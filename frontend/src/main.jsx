import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "react-hot-toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#1e293b",
            color: "#fff",
            padding: "14px 16px",
            fontSize: "14px",
          },
          success: {
            style: {
              background: "#166534",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#b91c1c",
              color: "#fff",
            },
          },
        }}
      />
    </>
  </React.StrictMode>
);