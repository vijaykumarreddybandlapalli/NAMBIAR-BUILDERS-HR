export default function TopBar() {
  return (
    <header
      style={{
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div>Dashboard</div>
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          background: "#d8a03d",
          color: "#1b120b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        NK
      </div>
    </header>
  );
}