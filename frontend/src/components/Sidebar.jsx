// export default function Sidebar({ activePage, setActivePage }) {
//   const menu = [
//     { key: "home", label: "Home", section: "top" },
//     { key: "dashboard", label: "Dashboard", section: "main" },
//     { key: "employees", label: "Employees", section: "main" },
//     { key: "events", label: "Events", section: "automation" },
//     { key: "templates", label: "Templates", section: "automation" },
//     { key: "calendar", label: "Calendar", section: "automation" },
//     { key: "email-center", label: "Email Center", section: "automation" },
//     { key: "email-queue", label: "Email Queue", section: "automation" },
//     { key: "settings", label: "Settings", section: "settings" },
//   ];

//   const renderSection = (title, sectionKey) => {
//     const items = menu.filter((item) => item.section === sectionKey);

//     return (
//       <div style={styles.section}>
//         {title ? <p style={styles.sectionTitle}>{title}</p> : null}

//         {items.map((item) => (
//           <button
//             key={item.key}
//             onClick={() => setActivePage(item.key)}
//             style={{
//               ...styles.menuButton,
//               ...(activePage === item.key ? styles.activeButton : {}),
//             }}
//           >
//             {item.label}
//           </button>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <aside style={styles.sidebar}>
//       <div>
//         <h1 style={styles.logo}>Nambiar Builders</h1>
//         <p style={styles.subLogo}>HR FAMILY PORTAL</p>
//       </div>

//       {renderSection("", "top")}
//       {renderSection("MAIN", "main")}
//       {renderSection("AUTOMATION", "automation")}
//       {renderSection("SETTINGS", "settings")}
//     </aside>
//   );
// }

// const styles = {
//   sidebar: {
//     width: "100%",
//     minHeight: "100vh",
//     background: "linear-gradient(to bottom, #0f172a, #065f46)", 
//     // 🔵 dark blue → 🟢 green
//     color: "#facc15",
//     padding: "24px 18px",
//     boxSizing: "border-box",
//   },

//   logo: {
//     margin: 0,
//     fontSize: "28px",
//     fontWeight: "700",
//     color: "#fde047", // bright yellow
//   },

//   subLogo: {
//     marginTop: "6px",
//     fontSize: "14px",
//     color: "#facc15",
//     letterSpacing: "0.5px",
//   },

//   section: {
//     marginTop: "28px",
//   },

//   sectionTitle: {
//     fontSize: "14px",
//     color: "#fbbf24", // softer yellow
//     marginBottom: "12px",
//   },

//   menuButton: {
//     width: "100%",
//     textAlign: "left",
//     background: "transparent",
//     color: "#fde047", // yellow menu text
//     border: "none",
//     padding: "14px 20px",
//     borderRadius: "18px",
//     fontSize: "16px",
//     cursor: "pointer",
//     marginBottom: "10px",
//   },

//   activeButton: {
//     background: "#f59e0b", // orange highlight
//     color: "#ffffff",
//     fontWeight: "700",
//   },
// };
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
      {/* Logo removed */}

      {renderSection("", "top")}
      {renderSection("MAIN", "main")}
      {renderSection("AUTOMATION", "automation")}
      {renderSection("SETTINGS", "settings")}
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "100%",
    minHeight: "100%",
    background: "linear-gradient(180deg, #7f1d1d, #f97316, #ec4899)", 
    // 🔴 red → 🟠 orange → 🌸 pink
    color: "#fff",
    padding: "24px 18px",
    boxSizing: "border-box",
  },

  logo: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "700",
    color: "#ffffff", // ⚪ WHITE
  },

  subLogo: {
    marginTop: "6px",
    fontSize: "14px",
    color: "#e5b04d",
    letterSpacing: "0.5px",
  },

  section: {
    marginTop: "28px",
  },

  sectionTitle: {
    fontSize: "14px",
    color: "#000000", // ⚫ BLACK
    marginBottom: "12px",
    fontWeight: "600",
  },

  // menuButton: {
  //   width: "100%",
  //   textAlign: "left",
  //   background: "transparent",
  //   color: "#ffcf67",
  //   border: "none",
  //   padding: "14px 20px",
  //   borderRadius: "18px",
  //   fontSize: "16px",
  //   cursor: "pointer",
  //   marginBottom: "10px",
  // },
  // menuButton: {
  //   width: "100%",
  //   textAlign: "left",
  //   background: "transparent",
  //   color: "#ffffff", // ⚪ WHITE text
  //   border: "none",
  //   padding: "14px 20px",
  //   borderRadius: "18px",
  //   fontSize: "16px",
  //   cursor: "pointer",
  //   marginBottom: "10px",
  // },
  menuButton: {
    width: "100%",
    textAlign: "left",
    background: "transparent",
    color: "#ffffff",
    border: "none",
    padding: "14px 20px",
    borderRadius: "18px",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "10px",
    transition: "all 0.3s ease",
  },
  activeButton: {
    background: "#2563eb",
    color: "#ffffff",
    fontWeight: "700",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },

  // activeButton: {
  //   background: "#2563eb", // 🔵 BLUE highlight
  //   color: "#ffffff", // ⚪ WHITE text
  //   fontWeight: "700",
  // },
};