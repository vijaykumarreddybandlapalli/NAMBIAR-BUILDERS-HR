export default function StatCard({ title, value, subtitle }) {
  return (
    <div
      style={{
        background: "#24170d",
        border: "1px solid rgba(216,160,61,0.35)",
        borderRadius: "16px",
        padding: "18px",
        minWidth: "200px",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "28px", color: "#fff1d6" }}>{value}</h2>
      <p style={{ margin: "8px 0 4px", fontSize: "15px" }}>{title}</p>
      <small style={{ color: "#8fd19e" }}>{subtitle}</small>
    </div>
  );
}