import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  display: "block",
  padding: "12px 14px",
  borderRadius: "10px",
  textDecoration: "none",
  color: isActive ? "#f8e7bf" : "#bfa77c",
  background: isActive ? "rgba(216,160,61,0.16)" : "transparent",
  marginBottom: "8px",
});

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        background: "#1a1109",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        padding: "18px 14px",
      }}
    >
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ margin: 0, color: "#d8a03d", fontSize: "20px" }}>Nambiar Builders</h2>
        <p style={{ margin: "4px 0 0", color: "#8f7750", fontSize: "12px", letterSpacing: "1px" }}>
          HR FAMILY PORTAL
        </p>
      </div>

      <div style={{ marginBottom: "10px", color: "#705d3f", fontSize: "11px" }}>MAIN</div>

      <NavLink to="/dashboard" style={linkStyle}>
        Dashboard
      </NavLink>

      <NavLink to="/employees" style={linkStyle}>
        Employees
      </NavLink>

      <div style={{ marginTop: "24px", marginBottom: "10px", color: "#705d3f", fontSize: "11px" }}>
        AUTOMATION
      </div>

      <div style={{ padding: "12px 14px", color: "#bfa77c" }}>Events</div>
      <div style={{ padding: "12px 14px", color: "#bfa77c" }}>Templates</div>
      <div style={{ padding: "12px 14px", color: "#bfa77c" }}>Calendar</div>

      <div style={{ marginTop: "24px", marginBottom: "10px", color: "#705d3f", fontSize: "11px" }}>
        SETTINGS
      </div>

      <div style={{ padding: "12px 14px", color: "#bfa77c" }}>Settings</div>
    </aside>
  );
}