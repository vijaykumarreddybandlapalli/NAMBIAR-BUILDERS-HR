// import Dashboard from "./Dashboard";
// import Employees from "./Employees";
// import Events from "./Events";
// import Templates from "./Templates";
// import Calendar from "./Calendar";
// import EmailCenter from "./EmailCenter";
// import EmailQueue from "./EmailQueue";
// import Settings from "./Settings";

// export default function Home() {
//   return (
//     <div style={styles.wrapper}>
//       <div style={styles.headerCard}>
//         <h1 style={styles.title}>Home</h1>
//         <p style={styles.subtitle}>
//           All sections are shown below in one page.
//         </p>
//       </div>

//       <div style={styles.section}>
//         <Dashboard />
//       </div>

//       <div style={styles.section}>
//         <Employees />
//       </div>

//       <div style={styles.section}>
//         <Events />
//       </div>

//       <div style={styles.section}>
//         <Templates />
//       </div>

//       <div style={styles.section}>
//         <Calendar />
//       </div>

//       <div style={styles.section}>
//         <EmailCenter />
//       </div>

//       <div style={styles.section}>
//         <EmailQueue />
//       </div>

//       <div style={styles.section}>
//         <Settings />
//       </div>
//     </div>
//   );
// }

// const styles = {
//   wrapper: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "24px",
//   },
//   headerCard: {
//     background: "#ffffff",
//     borderRadius: "20px",
//     padding: "24px",
//     boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
//   },
//   title: {
//     margin: 0,
//     fontSize: "30px",
//     color: "#2d241c",
//   },
//   subtitle: {
//     marginTop: "8px",
//     color: "#8a7f73",
//   },
//   section: {
//     borderRadius: "20px",
//     overflow: "hidden",
//   },
// };
export default function Home({
    employees = [],
    events = [],
    templates = [],
    queue = [],
    settings = null,
  }) {
    const scheduledCount = queue.filter((item) => item.status === "scheduled").length;
    const sentCount = queue.filter((item) => item.status === "sent").length;
    const deliveredCount = queue.filter((item) => item.status === "delivered").length;
    const failedCount = queue.filter((item) => item.status === "failed").length;
  
    return (
      <div style={styles.page}>
        <h1 style={styles.title}>Home</h1>
  
        <div style={styles.grid}>
          <div style={styles.card}>
            <h2>{employees.length}</h2>
            <p>Total Employees</p>
          </div>
  
          <div style={styles.card}>
            <h2>{events.length}</h2>
            <p>Total Events</p>
          </div>
  
          <div style={styles.card}>
            <h2>{templates.length}</h2>
            <p>Active Templates</p>
          </div>
  
          <div style={styles.card}>
            <h2>{queue.length}</h2>
            <p>Email Queue</p>
          </div>
        </div>
  
        <div style={styles.section}>
          <h3>Recent Employees</h3>
          {employees.length === 0 ? (
            <p>No employees found.</p>
          ) : (
            employees.slice(0, 5).map((emp) => (
              <div key={emp.id} style={styles.row}>
                <span>{emp.name}</span>
                <span>{emp.email}</span>
              </div>
            ))
          )}
        </div>
  
        <div style={styles.section}>
          <h3>Upcoming Events</h3>
          {events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            events.slice(0, 5).map((event) => (
              <div key={event.id} style={styles.row}>
                <span>{event.title || event.name}</span>
                <span>
                  {event.date ? new Date(event.date).toLocaleDateString() : "-"}
                </span>
              </div>
            ))
          )}
        </div>
  
        <div style={styles.section}>
          <h3>Templates</h3>
          {templates.length === 0 ? (
            <p>No templates found.</p>
          ) : (
            templates.slice(0, 5).map((template) => (
              <div key={template.id} style={styles.row}>
                <span>{template.name}</span>
                <span>{template.type}</span>
              </div>
            ))
          )}
        </div>
  
        <div style={styles.section}>
          <h3>Email Queue Summary</h3>
          <div style={styles.grid}>
            <div style={styles.smallCard}>
              <strong>{scheduledCount}</strong>
              <p>Scheduled</p>
            </div>
            <div style={styles.smallCard}>
              <strong>{sentCount}</strong>
              <p>Sent</p>
            </div>
            <div style={styles.smallCard}>
              <strong>{deliveredCount}</strong>
              <p>Delivered</p>
            </div>
            <div style={styles.smallCard}>
              <strong>{failedCount}</strong>
              <p>Failed</p>
            </div>
          </div>
        </div>
  
        <div style={styles.section}>
          <h3>Settings Summary</h3>
          {settings ? (
            <div>
              <p>Primary Email: {settings.primaryFromEmail || "-"}</p>
              <p>Send Time: {settings.sendTime || "-"}</p>
              <p>Welcome Mail Day: {settings.welcomeMailDay || "-"}</p>
            </div>
          ) : (
            <p>No settings found.</p>
          )}
        </div>
      </div>
    );
  }
  
  const styles = {
    page: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    title: {
      margin: 0,
      color: "#2d241c",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "16px",
    },
    card: {
      background: "#ffffff",
      borderRadius: "16px",
      padding: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },
    smallCard: {
      background: "#ffffff",
      borderRadius: "12px",
      padding: "16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    },
    section: {
      background: "#ffffff",
      borderRadius: "16px",
      padding: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: "1px solid #eee",
    },
  };