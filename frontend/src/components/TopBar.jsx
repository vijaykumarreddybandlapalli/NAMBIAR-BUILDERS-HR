export default function Topbar({ activePage, setActivePage }) {
  const menu = [
    { key: "dashboard", label: "Dashboard" },
    { key: "employees", label: "Employees" },
    { key: "email-center", label: "Email Center" },
    { key: "calendar", label: "Events & Calendar" },
    { key: "templates", label: "Templates" },
  ];

  return (
    <div style={styles.topbar}>
      {/* LEFT */}
      <div>
        <h1 style={styles.logo}>Nambiar Builders</h1>
        <p style={styles.sub}>HR FAMILY PORTAL</p>
      </div>

      {/* CENTER */}
      <div style={styles.menu}>
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActivePage(item.key)}
            style={{
              ...styles.menuItem,
              ...(activePage === item.key ? styles.active : {}),
            }}
            onMouseEnter={(e) => {
              if (activePage !== item.key) {
                e.target.style.background = "rgba(255,255,255,0.12)";
              }
            }}
            onMouseLeave={(e) => {
              if (activePage !== item.key) {
                e.target.style.background = "transparent";
              }
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        <div style={styles.bell}>🔔</div>
        <div style={styles.profile}>NK</div>
      </div>
    </div>
  );
}

const styles = {
  topbar: {
    width: "100%",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    boxSizing: "border-box",

    // 🔥 PREMIUM GRADIENT
    background: "linear-gradient(90deg, #0f172a, #1e3a8a, #065f46)",

    color: "#facc15",
    flexShrink: 0,

    // 🔥 SHADOW
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  },

  logo: {
    margin: 0,
    fontSize: "22px",
    color: "#fbbf24",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },

  sub: {
    margin: 0,
    fontSize: "12px",
    color: "#fde68a",
    letterSpacing: "1px",
  },

  menu: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
  },

  menuItem: {
    background: "transparent",
    border: "none",
    color: "#facc15",
    fontSize: "14px",
    padding: "10px 16px",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  active: {
    background: "rgba(255,255,255,0.18)",
    color: "#ffffff",
    fontWeight: "700",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  bell: {
    fontSize: "20px",
    cursor: "pointer",
    transition: "0.3s",
  },

  profile: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "#facc15",
    color: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "14px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
};