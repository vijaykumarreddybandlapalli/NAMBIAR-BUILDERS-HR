export default function StatCard({ title, value, subtitle }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #fffaf2 0%, #fdf2e2 45%, #eef7ff 100%)",
        border: "1px solid rgba(180, 131, 49, 0.22)",
        borderRadius: "18px",
        padding: "18px",
        minWidth: "200px",
        boxShadow: "0 10px 24px rgba(91, 55, 24, 0.08)",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "28px", color: "#3b2617" }}>{value}</h2>
      <p style={{ margin: "8px 0 4px", fontSize: "15px", color: "#5b3a1d" }}>
        {title}
      </p>
      <small style={{ color: "#2f855a" }}>{subtitle}</small>
    </div>
  );
}