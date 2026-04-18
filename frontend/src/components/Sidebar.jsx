export default function Sidebar({ activePage, setActivePage }) {
  const menu = [
    { key: "home", label: "Home", section: "top" },
    { key: "dashboard", label: "Dashboard", section: "main" },
    { key: "employees", label: "Employees", section: "main" },
    { key: "events", label: "Events", section: "automation" },
    { key: "templates", label: "Templates", section: "automation" },
    { key: "calendar", label: "Calendar", section: "automation" },
    { key: "email-center", label: "Email Center", section: "automation" },
    { key: "email-queue", label: "Email Queue", section: "automation" },
    { key: "settings", label: "Settings", section: "settings" },
  ];

  const renderSection = (title, sectionKey) => {
    const items = menu.filter((item) => item.section === sectionKey);

    return (
      <div style={styles.section}>
        {title ? <p style={styles.sectionTitle}>{title}</p> : null}

        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => setActivePage(item.key)}
            style={{
              ...styles.menuButton,
              ...(activePage === item.key ? styles.activeButton : {}),
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <aside style={styles.sidebar}>
      <div>
        <h1 style={styles.logo}>Nambiar Builders</h1>
        <p style={styles.subLogo}>HR FAMILY PORTAL</p>
      </div>

      {renderSection("", "top")}
      {renderSection("MAIN", "main")}
      {renderSection("AUTOMATION", "automation")}
      {renderSection("SETTINGS", "settings")}
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "330px",
    background: "#24160d",
    color: "#f3c56b",
    padding: "22px 16px",
    minHeight: "100vh",
    borderRight: "1px solid rgba(255,255,255,0.04)",
  },
  logo: {
    margin: 0,
    color: "#f3b54a",
    fontSize: "28px",
    fontWeight: "700",
  },
  subLogo: {
    marginTop: "4px",
    color: "#d8a94d",
    fontSize: "13px",
    letterSpacing: "0.4px",
  },
  section: {
    marginTop: "26px",
  },
  sectionTitle: {
    color: "#a97a2b",
    fontSize: "13px",
    marginBottom: "12px",
  },
  menuButton: {
    width: "100%",
    textAlign: "left",
    background: "transparent",
    color: "#f8c85c",
    border: "none",
    borderRadius: "18px",
    padding: "14px 20px",
    fontSize: "15px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  activeButton: {
    background: "#8b5a1f",
    color: "#ffffff",
    fontWeight: "700",
  },
};