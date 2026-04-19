// import { useEffect, useState } from "react";

// export default function Home({
//   employees = [],
//   events = [],
//   templates = [],
//   queue = [],
//   settings = null,
// }) {
//   const [dashboardData, setDashboardData] = useState({
//     todayBirthdaysCount: 0,
//     todayAnniversariesCount: 0,
//     weekBirthdaysCount: 0,
//     weekAnniversariesCount: 0,
//     todayBirthdays: [],
//     todayAnniversaries: [],
//     weekBirthdays: [],
//     weekAnniversaries: [],
//   });

//   const loadDashboardSummary = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/dashboard/summary");
//       const data = await res.json();

//       if (res.ok) {
//         setDashboardData(data);
//       }
//     } catch (error) {
//       console.error("HOME DASHBOARD ERROR:", error);
//     }
//   };

//   useEffect(() => {
//     loadDashboardSummary();
//   }, [employees]);

//   const scheduledCount = queue.filter(
//     (item) => item.status === "scheduled"
//   ).length;
//   const sentCount = queue.filter((item) => item.status === "sent").length;
//   const deliveredCount = queue.filter(
//     (item) => item.status === "delivered"
//   ).length;
//   const failedCount = queue.filter((item) => item.status === "failed").length;

//   return (
//     <div style={styles.page}>
//       <h1 style={styles.title}>Dashboard</h1>

//       <div style={styles.grid}>
//         <div style={styles.card}>
//           <h2>{employees.length}</h2>
//           <p>Total Employees</p>
//         </div>

//         <div style={styles.card}>
//           <h2>{dashboardData.todayBirthdaysCount}</h2>
//           <p>Today Birthdays</p>
//         </div>

//         <div style={styles.card}>
//           <h2>{dashboardData.todayAnniversariesCount}</h2>
//           <p>Today Anniversaries</p>
//         </div>

//         <div style={styles.card}>
//           <h2>{events.length}</h2>
//           <p>Total Events</p>
//         </div>
//       </div>

//       <div style={styles.section}>
//         <h3>Today's Birthdays</h3>
//         {dashboardData.todayBirthdays.length === 0 ? (
//           <p>No birthdays today</p>
//         ) : (
//           dashboardData.todayBirthdays.map((emp) => (
//             <div key={emp.id} style={styles.row}>
//               <span>{emp.name}</span>
//               <span>{emp.department}</span>
//             </div>
//           ))
//         )}
//       </div>

//       <div style={styles.section}>
//         <h3>Today's Anniversaries</h3>
//         {dashboardData.todayAnniversaries.length === 0 ? (
//           <p>No anniversaries today</p>
//         ) : (
//           dashboardData.todayAnniversaries.map((emp) => (
//             <div key={emp.id} style={styles.row}>
//               <span>{emp.name}</span>
//               <span>{emp.department}</span>
//             </div>
//           ))
//         )}
//       </div>

//       <div style={styles.section}>
//         <h3>This Week Birthdays</h3>
//         {dashboardData.weekBirthdays.length === 0 ? (
//           <p>No birthdays this week</p>
//         ) : (
//           dashboardData.weekBirthdays.map((emp) => (
//             <div key={emp.id} style={styles.row}>
//               <span>{emp.name}</span>
//               <span>
//                 {emp.dateOfBirth
//                   ? new Date(emp.dateOfBirth).toLocaleDateString()
//                   : "-"}
//               </span>
//             </div>
//           ))
//         )}
//       </div>

//       <div style={styles.section}>
//         <h3>This Week Anniversaries</h3>
//         {dashboardData.weekAnniversaries.length === 0 ? (
//           <p>No anniversaries this week</p>
//         ) : (
//           dashboardData.weekAnniversaries.map((emp) => (
//             <div key={emp.id} style={styles.row}>
//               <span>{emp.name}</span>
//               <span>
//                 {emp.joiningDate
//                   ? new Date(emp.joiningDate).toLocaleDateString()
//                   : "-"}
//               </span>
//             </div>
//           ))
//         )}
//       </div>

//       <div style={styles.section}>
//         <h3>Upcoming Events</h3>
//         {events.length === 0 ? (
//           <p>No events</p>
//         ) : (
//           events.slice(0, 5).map((e) => (
//             <div key={e.id} style={styles.row}>
//               <span>{e.title}</span>
//               <span>
//                 {e.date ? new Date(e.date).toLocaleDateString() : "-"}
//               </span>
//             </div>
//           ))
//         )}
//       </div>

//       <div style={styles.section}>
//         <h3>Templates</h3>
//         {templates.length === 0 ? (
//           <p>No templates</p>
//         ) : (
//           templates.slice(0, 5).map((t) => (
//             <div key={t.id} style={styles.row}>
//               <span>{t.name}</span>
//               <span>{t.type}</span>
//             </div>
//           ))
//         )}
//       </div>

//       <div style={styles.section}>
//         <h3>Email Queue Summary</h3>
//         <div style={styles.queueGrid}>
//           <div style={styles.smallCard}>
//             <strong>{scheduledCount}</strong>
//             <p>Scheduled</p>
//           </div>
//           <div style={styles.smallCard}>
//             <strong>{sentCount}</strong>
//             <p>Sent</p>
//           </div>
//           <div style={styles.smallCard}>
//             <strong>{deliveredCount}</strong>
//             <p>Delivered</p>
//           </div>
//           <div style={styles.smallCard}>
//             <strong>{failedCount}</strong>
//             <p>Failed</p>
//           </div>
//         </div>
//       </div>

//       <div style={styles.section}>
//         <h3>Settings Summary</h3>
//         {settings ? (
//           <>
//             <p>Primary Email: {settings.primaryFromEmail || "-"}</p>
//             <p>Send Time: {settings.sendTime || "-"}</p>
//             <p>Welcome Mail Day: {settings.welcomeMailDay || "-"}</p>
//           </>
//         ) : (
//           <p>No settings found</p>
//         )}
//       </div>
//     </div>
//   );
// }


// // const styles = {
// //   page: {
// //     padding: "20px",
// //   },

// //   title: {
// //     marginBottom: "20px",
// //     color: "#1d3557",
// //   },

// //   grid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(4, 1fr)",
// //     gap: "15px",
// //     marginBottom: "20px",
// //   },

// //   card: {
// //     background: "#dbeafe",
// //     padding: "20px",
// //     borderRadius: "15px",
// //     textAlign: "center",
// //   },

// //   section: {
// //     background: "#ffffff",
// //     padding: "20px",
// //     borderRadius: "15px",
// //     marginBottom: "15px",
// //   },

// //   row: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     padding: "10px 0",
// //     borderBottom: "1px solid #eee",
// //   },

// //   queueGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(4, 1fr)",
// //     gap: "12px",
// //     marginTop: "10px",
// //   },

// //   smallCard: {
// //     background: "#f8fbff",
// //     padding: "16px",
// //     borderRadius: "12px",
// //     textAlign: "center",
// //   },
  
  
// // };
// // const styles = {
// //   page: {
// //     padding: "24px",
// //     background: "#eaf3ff",
// //     minHeight: "100vh",
// //   },

// //   title: {
// //     marginBottom: "20px",
// //     color: "#1d3557",
// //     fontSize: "28px",
// //     fontWeight: "700",
// //   },

// //   grid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(4, 1fr)",
// //     gap: "18px",
// //     marginBottom: "24px",
// //   },

// //   card: {
// //     padding: "22px",
// //     borderRadius: "18px",
// //     textAlign: "center",
// //     color: "#1e293b",
// //     fontWeight: "700",
// //   },

// //   section: {
// //     background: "#ffffff",
// //     padding: "20px",
// //     borderRadius: "18px",
// //     marginBottom: "16px",
// //     boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
// //   },

// //   row: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     padding: "10px 0",
// //     borderBottom: "1px solid #eee",
// //   },

// //   queueGrid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(4, 1fr)",
// //     gap: "12px",
// //     marginTop: "10px",
// //   },

// //   smallCard: {
// //     background: "#f1f5f9",
// //     padding: "16px",
// //     borderRadius: "12px",
// //     textAlign: "center",
// //   },
// // };
// const styles = {
//   page: {
//     padding: "24px",
//     background: "#eaf3ff",
//     minHeight: "100vh",
//   },

//   title: {
//     marginBottom: "20px",
//     color: "#1d3557",
//     fontSize: "28px",
//     fontWeight: "700",
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(4, 1fr)",
//     gap: "18px",
//     marginBottom: "24px",
//   },

//   // card: {
//   //   padding: "22px",
//   //   borderRadius: "18px",
//   //   textAlign: "center",
//   //   color: "#ffffff",
//   //   fontWeight: "700",
//   //   boxShadow: "0 10px 24px rgba(0,0,0,0.1)",
//   //   transition: "0.3s",
//   // },
//   card: {
//     padding: "22px",
//     borderRadius: "18px",
//     textAlign: "center",
//     color: "#1e293b", // ✅ DARK TEXT
//     fontWeight: "700",
//     background: "#dbeafe",
//   },

//   section: {
//     background: "#ffffff",
//     padding: "20px",
//     borderRadius: "18px",
//     marginBottom: "16px",
//     boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
//     border: "1px solid #e2e8f0",
//   },

//   row: {
//     display: "flex",
//     justifyContent: "space-between",
//     padding: "10px 0",
//     borderBottom: "1px solid #eee",
//   },

//   queueGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(4, 1fr)",
//     gap: "12px",
//     marginTop: "10px",
//   },

//   smallCard: {
//     background: "#f1f5f9",
//     padding: "16px",
//     borderRadius: "12px",
//     textAlign: "center",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
//   },
// };
import { useEffect, useState } from "react";

export default function Home({
  employees = [],
  events = [],
  templates = [],
  queue = [],
  settings = null,
}) {
  const [dashboardData, setDashboardData] = useState({
    todayBirthdaysCount: 0,
    todayAnniversariesCount: 0,
    weekBirthdaysCount: 0,
    weekAnniversariesCount: 0,
    todayBirthdays: [],
    todayAnniversaries: [],
    weekBirthdays: [],
    weekAnniversaries: [],
  });

  const loadDashboardSummary = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/dashboard/summary");
      const data = await res.json();

      if (res.ok) {
        setDashboardData(data);
      }
    } catch (error) {
      console.error("HOME DASHBOARD ERROR:", error);
    }
  };

  useEffect(() => {
    loadDashboardSummary();
  }, [employees]);

  const scheduledCount = queue.filter((item) => item.status === "scheduled").length;
  const sentCount = queue.filter((item) => item.status === "sent").length;
  const deliveredCount = queue.filter((item) => item.status === "delivered").length;
  const failedCount = queue.filter((item) => item.status === "failed").length;

  const renderEmpty = (text) => (
    <div style={styles.emptyBox}>{text}</div>
  );

  const renderSectionHeader = (icon, title, badge) => (
    <div style={styles.sectionHeader}>
      <div style={styles.sectionTitleWrap}>
        <span style={styles.sectionIcon}>{icon}</span>
        <h3 style={styles.sectionTitle}>{title}</h3>
      </div>
      {badge ? <span style={styles.sectionBadge}>{badge}</span> : null}
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.title}>Dashboard</h1>
        </div>
      </div>

      <div style={styles.grid}>
        <div
          style={{
            ...styles.card,
            background: "linear-gradient(135deg, #2563eb, #60a5fa)",
          }}
        >
          <div style={styles.cardTop}>
            <span style={styles.cardIcon}>👥</span>
            <span style={styles.cardBadge}>Live</span>
          </div>
          <h2 style={styles.cardValue}>{employees.length}</h2>
          <p style={styles.cardLabel}>Total Employees</p>
        </div>

        <div
          style={{
            ...styles.card,
            background: "linear-gradient(135deg, #16a34a, #4ade80)",
          }}
        >
          <div style={styles.cardTop}>
            <span style={styles.cardIcon}>🎂</span>
            <span style={styles.cardBadge}>Today</span>
          </div>
          <h2 style={styles.cardValue}>{dashboardData.todayBirthdaysCount}</h2>
          <p style={styles.cardLabel}>Today Birthdays</p>
        </div>

        <div
          style={{
            ...styles.card,
            background: "linear-gradient(135deg, #d97706, #fbbf24)",
          }}
        >
          <div style={styles.cardTop}>
            <span style={styles.cardIcon}>🏆</span>
            <span style={styles.cardBadge}>Today</span>
          </div>
          <h2 style={styles.cardValue}>{dashboardData.todayAnniversariesCount}</h2>
          <p style={styles.cardLabel}>Today Anniversaries</p>
        </div>

        <div
          style={{
            ...styles.card,
            background: "linear-gradient(135deg, #dc2626, #f87171)",
          }}
        >
          <div style={styles.cardTop}>
            <span style={styles.cardIcon}>📅</span>
            <span style={styles.cardBadge}>Live</span>
          </div>
          <h2 style={styles.cardValue}>{events.length}</h2>
          <p style={styles.cardLabel}>Total Events</p>
        </div>
      </div>

      <div style={styles.section}>
        {renderSectionHeader("🎉", "Today's Birthdays", `${dashboardData.todayBirthdaysCount}`)}
        {dashboardData.todayBirthdays.length === 0 ? (
          renderEmpty("No birthdays today")
        ) : (
          dashboardData.todayBirthdays.map((emp) => (
            <div key={emp.id} style={styles.row}>
              <div>
                <div style={styles.primaryText}>{emp.name}</div>
                <div style={styles.secondaryText}>{emp.email || emp.department || "-"}</div>
              </div>
              <span style={styles.rowPill}>{emp.department || "Employee"}</span>
            </div>
          ))
        )}
      </div>

      <div style={styles.section}>
        {renderSectionHeader("🏅", "Today's Anniversaries", `${dashboardData.todayAnniversariesCount}`)}
        {dashboardData.todayAnniversaries.length === 0 ? (
          renderEmpty("No anniversaries today")
        ) : (
          dashboardData.todayAnniversaries.map((emp) => (
            <div key={emp.id} style={styles.row}>
              <div>
                <div style={styles.primaryText}>{emp.name}</div>
                <div style={styles.secondaryText}>{emp.email || emp.department || "-"}</div>
              </div>
              <span style={styles.rowPill}>{emp.department || "Employee"}</span>
            </div>
          ))
        )}
      </div>

      <div style={styles.section}>
        {renderSectionHeader("📆", "This Week Birthdays", `${dashboardData.weekBirthdaysCount}`)}
        {dashboardData.weekBirthdays.length === 0 ? (
          renderEmpty("No birthdays this week")
        ) : (
          dashboardData.weekBirthdays.map((emp) => (
            <div key={emp.id} style={styles.row}>
              <div>
                <div style={styles.primaryText}>{emp.name}</div>
                <div style={styles.secondaryText}>{emp.department || "-"}</div>
              </div>
              <span style={styles.rowDate}>
                {emp.dateOfBirth
                  ? new Date(emp.dateOfBirth).toLocaleDateString()
                  : "-"}
              </span>
            </div>
          ))
        )}
      </div>

      <div style={styles.section}>
        {renderSectionHeader("🗓️", "This Week Anniversaries", `${dashboardData.weekAnniversariesCount}`)}
        {dashboardData.weekAnniversaries.length === 0 ? (
          renderEmpty("No anniversaries this week")
        ) : (
          dashboardData.weekAnniversaries.map((emp) => (
            <div key={emp.id} style={styles.row}>
              <div>
                <div style={styles.primaryText}>{emp.name}</div>
                <div style={styles.secondaryText}>{emp.department || "-"}</div>
              </div>
              <span style={styles.rowDate}>
                {emp.joiningDate
                  ? new Date(emp.joiningDate).toLocaleDateString()
                  : "-"}
              </span>
            </div>
          ))
        )}
      </div>

      <div style={styles.twoColumnGrid}>
        <div style={styles.section}>
          {renderSectionHeader("📌", "Upcoming Events", `${events.length}`)}
          {events.length === 0 ? (
            renderEmpty("No events")
          ) : (
            events.slice(0, 5).map((e) => (
              <div key={e.id} style={styles.row}>
                <div>
                  <div style={styles.primaryText}>{e.title}</div>
                  <div style={styles.secondaryText}>{e.description || "Event reminder"}</div>
                </div>
                <span style={styles.rowDate}>
                  {e.date ? new Date(e.date).toLocaleDateString() : "-"}
                </span>
              </div>
            ))
          )}
        </div>

        <div style={styles.section}>
          {renderSectionHeader("🧩", "Templates", `${templates.length}`)}
          {templates.length === 0 ? (
            renderEmpty("No templates")
          ) : (
            templates.slice(0, 5).map((t) => (
              <div key={t.id} style={styles.row}>
                <div>
                  <div style={styles.primaryText}>{t.name}</div>
                  <div style={styles.secondaryText}>{t.subject || "Template subject"}</div>
                </div>
                <span style={styles.rowPill}>{t.type}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={styles.twoColumnGrid}>
        <div style={styles.section}>
          {renderSectionHeader("📨", "Email Queue Summary", `${queue.length}`)}
          <div style={styles.queueGrid}>
            <div style={styles.smallCard}>
              <div style={styles.smallCardIcon}>🕒</div>
              <strong style={styles.smallCardValue}>{scheduledCount}</strong>
              <p style={styles.smallCardLabel}>Scheduled</p>
            </div>
            <div style={styles.smallCard}>
              <div style={styles.smallCardIcon}>📤</div>
              <strong style={styles.smallCardValue}>{sentCount}</strong>
              <p style={styles.smallCardLabel}>Sent</p>
            </div>
            <div style={styles.smallCard}>
              <div style={styles.smallCardIcon}>✅</div>
              <strong style={styles.smallCardValue}>{deliveredCount}</strong>
              <p style={styles.smallCardLabel}>Delivered</p>
            </div>
            <div style={styles.smallCard}>
              <div style={styles.smallCardIcon}>⚠️</div>
              <strong style={styles.smallCardValue}>{failedCount}</strong>
              <p style={styles.smallCardLabel}>Failed</p>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          {renderSectionHeader("⚙️", "Settings Summary", settings ? "Active" : "Missing")}
          {settings ? (
            <div style={styles.settingsWrap}>
              <div style={styles.settingsItem}>
                <span style={styles.settingsLabel}>Primary Email</span>
                <span style={styles.settingsValue}>{settings.primaryFromEmail || "-"}</span>
              </div>
              <div style={styles.settingsItem}>
                <span style={styles.settingsLabel}>Send Time</span>
                <span style={styles.settingsValue}>{settings.sendTime || "-"}</span>
              </div>
              <div style={styles.settingsItem}>
                <span style={styles.settingsLabel}>Welcome Mail Day</span>
                <span style={styles.settingsValue}>{settings.welcomeMailDay || "-"}</span>
              </div>
            </div>
          ) : (
            renderEmpty("No settings found")
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "24px",
    background: "#eaf3ff",
    minHeight: "100vh",
  },

  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "22px",
  },

  title: {
    margin: 0,
    color: "#1d3557",
    fontSize: "30px",
    fontWeight: "800",
    letterSpacing: "0.3px",
  },

  subtitle: {
    marginTop: "8px",
    color: "#5b6b84",
    fontSize: "15px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "18px",
    marginBottom: "24px",
  },

  card: {
    padding: "22px",
    borderRadius: "20px",
    color: "#ffffff",
    fontWeight: "700",
    boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
    transition: "0.3s",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },

  cardIcon: {
    fontSize: "24px",
  },

  cardBadge: {
    background: "rgba(255,255,255,0.18)",
    padding: "5px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
  },

  cardValue: {
    margin: "0 0 6px 0",
    fontSize: "34px",
    fontWeight: "800",
  },

  cardLabel: {
    margin: 0,
    fontSize: "15px",
    opacity: 0.95,
  },

  section: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "18px",
    marginBottom: "18px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
  },

  sectionTitleWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  sectionIcon: {
    fontSize: "20px",
  },

  sectionTitle: {
    margin: 0,
    color: "#1e293b",
    fontSize: "22px",
    fontWeight: "800",
  },

  sectionBadge: {
    background: "#dbeafe",
    color: "#1d4ed8",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #edf2f7",
  },

  primaryText: {
    color: "#1e293b",
    fontWeight: "700",
    fontSize: "15px",
  },

  secondaryText: {
    marginTop: "4px",
    color: "#64748b",
    fontSize: "13px",
  },

  rowPill: {
    background: "#f1f5f9",
    color: "#334155",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
  },

  rowDate: {
    color: "#334155",
    fontSize: "13px",
    fontWeight: "700",
    background: "#f8fafc",
    padding: "6px 10px",
    borderRadius: "10px",
  },

  emptyBox: {
    padding: "22px",
    textAlign: "center",
    borderRadius: "16px",
    background: "#f8fbff",
    border: "1px dashed #93c5fd",
    color: "#4a6fa5",
    fontWeight: "600",
  },

  twoColumnGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
    marginBottom: "18px",
  },

  queueGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
    marginTop: "10px",
  },

  smallCard: {
    background: "#f1f5f9",
    padding: "16px",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },

  smallCardIcon: {
    fontSize: "20px",
    marginBottom: "8px",
  },

  smallCardValue: {
    display: "block",
    fontSize: "22px",
    color: "#0f172a",
    marginBottom: "4px",
  },

  smallCardLabel: {
    margin: 0,
    color: "#64748b",
    fontSize: "13px",
    fontWeight: "600",
  },

  settingsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  settingsItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
    background: "#f8fafc",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },

  settingsLabel: {
    color: "#475569",
    fontWeight: "600",
  },

  settingsValue: {
    color: "#0f172a",
    fontWeight: "700",
  },
};