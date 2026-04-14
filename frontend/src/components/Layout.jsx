import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#120905", color: "#f5e6c8" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px 24px" }}>
        <Outlet />
      </div>
    </div>
  );
}