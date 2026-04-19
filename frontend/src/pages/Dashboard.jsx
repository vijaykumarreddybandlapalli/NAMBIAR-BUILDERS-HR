// import { useEffect, useMemo, useState } from "react";
// import API from "../api/api";

// export default function Dashboard() {
//   const [employees, setEmployees] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   const loadDashboardData = async () => {
//     try {
//       setLoading(true);

//       const [employeesRes, eventsRes] = await Promise.allSettled([
//         API.get("/api/employees"),
//         API.get("/api/events"),
//       ]);

//       let employeeData = [];
//       let eventData = [];

//       if (employeesRes.status === "fulfilled") {
//         const data = employeesRes.value.data;
//         employeeData = Array.isArray(data)
//           ? data
//           : Array.isArray(data?.data)
//           ? data.data
//           : [];
//       }

//       if (eventsRes.status === "fulfilled") {
//         const data = eventsRes.value.data;
//         eventData = Array.isArray(data)
//           ? data
//           : Array.isArray(data?.data)
//           ? data.data
//           : [];
//       }

//       setEmployees(employeeData);
//       setEvents(eventData);
//     } catch (error) {
//       console.error("DASHBOARD LOAD ERROR:", error);
//       setEmployees([]);
//       setEvents([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const today = new Date();

//   const safeDate = (value) => {
//     if (!value) return null;
//     const date = new Date(value);
//     return Number.isNaN(date.getTime()) ? null : date;
//   };

//   const isSameMonthDay = (value, compareDate = today) => {
//     const date = safeDate(value);
//     if (!date) return false;

//     return (
//       date.getMonth() === compareDate.getMonth() &&
//       date.getDate() === compareDate.getDate()
//     );
//   };

//   const getCurrentYearOccasionDate = (value, compareDate = today) => {
//     const date = safeDate(value);
//     if (!date) return null;

//     return new Date(
//       compareDate.getFullYear(),
//       date.getMonth(),
//       date.getDate(),
//       0,
//       0,
//       0,
//       0
//     );
//   };

//   const isWithinNext7Days = (value, compareDate = today) => {
//     const currentYearDate = getCurrentYearOccasionDate(value, compareDate);
//     if (!currentYearDate) return false;

//     const start = new Date(compareDate);
//     start.setHours(0, 0, 0, 0);

//     const end = new Date(compareDate);
//     end.setDate(end.getDate() + 7);
//     end.setHours(23, 59, 59, 999);

//     return currentYearDate >= start && currentYearDate <= end;
//   };

//   const todaysBirthdays = useMemo(() => {
//     return employees.filter((emp) => isSameMonthDay(emp.dateOfBirth));
//   }, [employees]);

//   const todaysAnniversaries = useMemo(() => {
//     return employees.filter((emp) => isSameMonthDay(emp.joiningDate));
//   }, [employees]);

//   const thisWeekBirthdays = useMemo(() => {
//     return employees.filter((emp) => isWithinNext7Days(emp.dateOfBirth));
//   }, [employees]);

//   const thisWeekAnniversaries = useMemo(() => {
//     return employees.filter((emp) => isWithinNext7Days(emp.joiningDate));
//   }, [employees]);

//   const totalEmployees = Array.isArray(employees) ? employees.length : 0;
//   const totalEvents = Array.isArray(events) ? events.length : 0;
//   const todayWishes = todaysBirthdays.length + todaysAnniversaries.length;

//   const formatDate = (value) => {
//     const date = safeDate(value);
//     if (!date) return "-";

//     return date.toLocaleDateString("en-GB");
//   };

//   const getYearsOfService = (joiningDate) => {
//     const date = safeDate(joiningDate);
//     if (!date) return "-";

//     let years = today.getFullYear() - date.getFullYear();
//     const monthDiff = today.getMonth() - date.getMonth();
//     const dayDiff = today.getDate() - date.getDate();

//     if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
//       years -= 1;
//     }

//     return years < 0 ? 0 : years;
//   };

//   const renderEmployeeList = (title, emoji, list, type) => {
//     return (
//       <div style={styles.sectionCard}>
//         <div style={styles.sectionHeader}>
//           <div style={styles.sectionTitleWrap}>
//             <span style={styles.sectionEmoji}>{emoji}</span>
//             <h2 style={styles.sectionTitle}>{title}</h2>
//           </div>
//           <div style={styles.countBadge}>{list.length}</div>
//         </div>

//         {loading ? (
//           <div style={styles.emptyBox}>Loading...</div>
//         ) : list.length === 0 ? (
//           <div style={styles.emptyBox}>
//             {type === "birthday"
//               ? "No birthdays today"
//               : type === "anniversary"
//               ? "No anniversaries today"
//               : type === "week-birthday"
//               ? "No birthdays in this week"
//               : "No anniversaries in this week"}
//           </div>
//         ) : (
//           <div style={styles.listWrap}>
//             {list.map((employee, index) => (
//               <div key={employee.id || `${employee.email}-${index}`} style={styles.personRow}>
//                 <div>
//                   <h4 style={styles.personName}>{employee.name || "-"}</h4>
//                   <p style={styles.personEmail}>{employee.email || "-"}</p>
//                   <p style={styles.personMeta}>
//                     {type === "birthday"
//                       ? `Date of Birth: ${formatDate(employee.dateOfBirth)}`
//                       : type === "anniversary"
//                       ? `Work Anniversary: ${formatDate(employee.joiningDate)} • ${getYearsOfService(
//                           employee.joiningDate
//                         )} years`
//                       : type === "week-birthday"
//                       ? `Birthday: ${formatDate(employee.dateOfBirth)}`
//                       : `Anniversary: ${formatDate(employee.joiningDate)} • ${getYearsOfService(
//                           employee.joiningDate
//                         )} years`}
//                   </p>
//                 </div>

//                 <div style={styles.typeBadge}>
//                   {type === "birthday" || type === "week-birthday"
//                     ? "Birthday"
//                     : "Anniversary"}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderEventList = () => {
//     return (
//       <div style={styles.sectionCard}>
//         <div style={styles.sectionHeader}>
//           <div style={styles.sectionTitleWrap}>
//             <span style={styles.sectionEmoji}>📅</span>
//             <h2 style={styles.sectionTitle}>Upcoming Events</h2>
//           </div>
//           <div style={styles.countBadge}>{events.length}</div>
//         </div>

//         {loading ? (
//           <div style={styles.emptyBox}>Loading...</div>
//         ) : events.length === 0 ? (
//           <div style={styles.emptyBox}>No events available</div>
//         ) : (
//           <div style={styles.listWrap}>
//             {events.map((event, index) => (
//               <div key={event.id || `${event.title}-${index}`} style={styles.personRow}>
//                 <div>
//                   <h4 style={styles.personName}>{event.title || event.name || "-"}</h4>
//                   <p style={styles.personEmail}>{formatDate(event.date)}</p>
//                   <p style={styles.personMeta}>{event.description || "No description"}</p>
//                 </div>

//                 <div style={styles.typeBadge}>Event</div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>Dashboard</h1>
//       <p style={styles.subText}>Welcome back! Here’s what’s happening today.</p>

//       <div style={styles.topCards}>
//         <div style={{ ...styles.summaryCard, background: "linear-gradient(135deg, #2563eb, #60a5fa)" }}>
//           <div style={styles.cardTopRow}>
//             <span style={styles.cardIcon}>👥</span>
//             <span style={styles.liveBadge}>Live</span>
//           </div>
//           <h2 style={styles.summaryNumber}>{loading ? "..." : totalEmployees}</h2>
//           <p style={styles.summaryLabel}>Total Employees</p>
//         </div>

//         <div style={{ ...styles.summaryCard, background: "linear-gradient(135deg, #16a34a, #4ade80)" }}>
//           <div style={styles.cardTopRow}>
//             <span style={styles.cardIcon}>🎂</span>
//             <span style={styles.liveBadge}>Today</span>
//           </div>
//           <h2 style={styles.summaryNumber}>{loading ? "..." : todaysBirthdays.length}</h2>
//           <p style={styles.summaryLabel}>Today Birthdays</p>
//         </div>

//         <div style={{ ...styles.summaryCard, background: "linear-gradient(135deg, #d97706, #fbbf24)" }}>
//           <div style={styles.cardTopRow}>
//             <span style={styles.cardIcon}>🏆</span>
//             <span style={styles.liveBadge}>Today</span>
//           </div>
//           <h2 style={styles.summaryNumber}>{loading ? "..." : todaysAnniversaries.length}</h2>
//           <p style={styles.summaryLabel}>Today Anniversaries</p>
//         </div>

//         <div style={{ ...styles.summaryCard, background: "linear-gradient(135deg, #ef4444, #f87171)" }}>
//           <div style={styles.cardTopRow}>
//             <span style={styles.cardIcon}>🗓️</span>
//             <span style={styles.liveBadge}>Live</span>
//           </div>
//           <h2 style={styles.summaryNumber}>{loading ? "..." : totalEvents}</h2>
//           <p style={styles.summaryLabel}>Total Events</p>
//         </div>
//       </div>

//       <div style={styles.smallCards}>
//         <div style={styles.smallCard}>
//           <div style={{ ...styles.smallIconCircle, background: "#dbeafe" }}>🎁</div>
//           <h3 style={{ ...styles.smallCardTitle, color: "#2563eb" }}>Today Wishes</h3>
//           <p style={{ ...styles.smallNumber, color: "#2563eb" }}>{loading ? "..." : todayWishes}</p>
//         </div>

//         <div style={styles.smallCard}>
//           <div style={{ ...styles.smallIconCircle, background: "#dcfce7" }}>📅</div>
//           <h3 style={{ ...styles.smallCardTitle, color: "#16a34a" }}>This Week Wishes</h3>
//           <p style={{ ...styles.smallNumber, color: "#16a34a" }}>
//             {loading ? "..." : thisWeekBirthdays.length + thisWeekAnniversaries.length}
//           </p>
//         </div>
//       </div>

//       <div style={styles.sections}>
//         {renderEmployeeList("Today's Birthdays", "🎉", todaysBirthdays, "birthday")}
//         {renderEmployeeList("Today's Anniversaries", "🏅", todaysAnniversaries, "anniversary")}
//         {renderEmployeeList("This Week Birthdays", "🗓️", thisWeekBirthdays, "week-birthday")}
//         {renderEmployeeList("This Week Anniversaries", "💼", thisWeekAnniversaries, "week-anniversary")}
//         {renderEventList()}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: "30px",
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #f5e6d3 0%, #dbeafe 50%, #dcfce7 100%)",
//     fontFamily: "Inter, sans-serif",
//   },

//   heading: {
//     fontSize: "32px",
//     fontWeight: "800",
//     color: "#7c2d12",
//     marginBottom: "8px",
//   },

//   subText: {
//     color: "#6b7280",
//     marginBottom: "28px",
//     fontSize: "16px",
//   },

//   topCards: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//     gap: "20px",
//     marginBottom: "26px",
//   },

//   summaryCard: {
//     borderRadius: "22px",
//     padding: "26px 22px",
//     color: "#ffffff",
//     boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
//   },

//   cardTopRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "24px",
//   },

//   cardIcon: {
//     fontSize: "24px",
//   },

//   liveBadge: {
//     background: "rgba(255,255,255,0.22)",
//     padding: "6px 12px",
//     borderRadius: "999px",
//     fontSize: "13px",
//     fontWeight: "700",
//   },

//   summaryNumber: {
//     fontSize: "42px",
//     fontWeight: "800",
//     margin: "0 0 8px 0",
//   },

//   summaryLabel: {
//     margin: 0,
//     fontSize: "17px",
//     fontWeight: "700",
//   },

//   smallCards: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//     gap: "20px",
//     marginBottom: "26px",
//   },

//   smallCard: {
//     background: "#ffffff",
//     padding: "26px 22px",
//     borderRadius: "18px",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
//     textAlign: "center",
//   },

//   smallIconCircle: {
//     width: "64px",
//     height: "64px",
//     borderRadius: "50%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "28px",
//     margin: "0 auto 18px",
//   },

//   smallCardTitle: {
//     fontSize: "20px",
//     fontWeight: "700",
//     margin: "0 0 10px 0",
//   },

//   smallNumber: {
//     fontSize: "34px",
//     fontWeight: "800",
//     margin: 0,
//   },

//   sections: {
//     display: "grid",
//     gap: "22px",
//   },

//   sectionCard: {
//     background: "#ffffff",
//     borderRadius: "20px",
//     padding: "22px",
//     boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
//   },

//   sectionHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: "12px",
//     marginBottom: "18px",
//     flexWrap: "wrap",
//   },

//   sectionTitleWrap: {
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//   },

//   sectionEmoji: {
//     fontSize: "24px",
//   },

//   sectionTitle: {
//     margin: 0,
//     fontSize: "22px",
//     fontWeight: "800",
//     color: "#0f172a",
//   },

//   countBadge: {
//     minWidth: "32px",
//     height: "32px",
//     borderRadius: "999px",
//     background: "#dbeafe",
//     color: "#1d4ed8",
//     fontWeight: "800",
//     fontSize: "14px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "0 10px",
//   },

//   emptyBox: {
//     border: "1.5px dashed #93c5fd",
//     color: "#3b82f6",
//     borderRadius: "16px",
//     padding: "24px",
//     textAlign: "center",
//     fontSize: "16px",
//     fontWeight: "600",
//     background: "#f8fbff",
//   },

//   listWrap: {
//     display: "grid",
//     gap: "14px",
//   },

//   personRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: "16px",
//     paddingBottom: "14px",
//     borderBottom: "1px solid #e5e7eb",
//     flexWrap: "wrap",
//   },

//   personName: {
//     margin: "0 0 6px 0",
//     fontSize: "18px",
//     color: "#111827",
//     fontWeight: "700",
//   },

//   personEmail: {
//     margin: "0 0 4px 0",
//     color: "#64748b",
//     fontSize: "16px",
//   },

//   personMeta: {
//     margin: 0,
//     color: "#6b7280",
//     fontSize: "14px",
//   },

//   typeBadge: {
//     background: "#f1f5f9",
//     color: "#334155",
//     borderRadius: "999px",
//     padding: "8px 14px",
//     fontSize: "14px",
//     fontWeight: "700",
//   },
// };
import { useEffect, useMemo, useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [employeesRes, eventsRes] = await Promise.allSettled([
        API.get("/api/employees"),
        API.get("/api/events"),
      ]);

      let employeeData = [];
      let eventData = [];

      if (employeesRes.status === "fulfilled") {
        const data = employeesRes.value.data;
        employeeData = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];
      }

      if (eventsRes.status === "fulfilled") {
        const data = eventsRes.value.data;
        eventData = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];
      }

      setEmployees(employeeData);
      setEvents(eventData);
    } catch (error) {
      console.error("DASHBOARD LOAD ERROR:", error);
      setEmployees([]);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date();

  const safeDate = (value) => {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const isSameMonthDay = (value, compareDate = today) => {
    const date = safeDate(value);
    if (!date) return false;

    return (
      date.getMonth() === compareDate.getMonth() &&
      date.getDate() === compareDate.getDate()
    );
  };

  const getCurrentYearOccasionDate = (value, compareDate = today) => {
    const date = safeDate(value);
    if (!date) return null;

    return new Date(
      compareDate.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0,
      0
    );
  };

  const isWithinNext7Days = (value, compareDate = today) => {
    const currentYearDate = getCurrentYearOccasionDate(value, compareDate);
    if (!currentYearDate) return false;

    const start = new Date(compareDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(compareDate);
    end.setDate(end.getDate() + 7);
    end.setHours(23, 59, 59, 999);

    return currentYearDate >= start && currentYearDate <= end;
  };

  const todaysBirthdays = useMemo(() => {
    return employees.filter((emp) => isSameMonthDay(emp.dateOfBirth));
  }, [employees]);

  const todaysAnniversaries = useMemo(() => {
    return employees.filter((emp) => isSameMonthDay(emp.joiningDate));
  }, [employees]);

  const thisWeekBirthdays = useMemo(() => {
    return employees.filter((emp) => isWithinNext7Days(emp.dateOfBirth));
  }, [employees]);

  const thisWeekAnniversaries = useMemo(() => {
    return employees.filter((emp) => isWithinNext7Days(emp.joiningDate));
  }, [employees]);

  const totalEmployees = Array.isArray(employees) ? employees.length : 0;
  const totalEvents = Array.isArray(events) ? events.length : 0;

  const formatDate = (value) => {
    const date = safeDate(value);
    if (!date) return "-";

    return date.toLocaleDateString("en-GB");
  };

  const getYearsOfService = (joiningDate) => {
    const date = safeDate(joiningDate);
    if (!date) return "-";

    let years = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      years -= 1;
    }

    return years < 0 ? 0 : years;
  };

  const renderEmployeeList = (title, emoji, list, type) => {
    return (
      <div style={styles.sectionCard}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleWrap}>
            <span style={styles.sectionEmoji}>{emoji}</span>
            <h2 style={styles.sectionTitle}>{title}</h2>
          </div>
          <div style={styles.countBadge}>{list.length}</div>
        </div>

        {loading ? (
          <div style={styles.emptyBox}>Loading...</div>
        ) : list.length === 0 ? (
          <div style={styles.emptyBox}>
            {type === "birthday"
              ? "No birthdays today"
              : type === "anniversary"
              ? "No anniversaries today"
              : type === "week-birthday"
              ? "No birthdays in this week"
              : "No anniversaries in this week"}
          </div>
        ) : (
          <div style={styles.listWrap}>
            {list.map((employee, index) => (
              <div
                key={employee.id || `${employee.email}-${index}`}
                style={styles.personRow}
              >
                <div>
                  <h4 style={styles.personName}>{employee.name || "-"}</h4>
                  <p style={styles.personEmail}>{employee.email || "-"}</p>
                  <p style={styles.personMeta}>
                    {type === "birthday"
                      ? `Date of Birth: ${formatDate(employee.dateOfBirth)}`
                      : type === "anniversary"
                      ? `Work Anniversary: ${formatDate(
                          employee.joiningDate
                        )} • ${getYearsOfService(employee.joiningDate)} years`
                      : type === "week-birthday"
                      ? `Birthday: ${formatDate(employee.dateOfBirth)}`
                      : `Anniversary: ${formatDate(
                          employee.joiningDate
                        )} • ${getYearsOfService(employee.joiningDate)} years`}
                  </p>
                </div>

                <div style={styles.typeBadge}>
                  {type === "birthday" || type === "week-birthday"
                    ? "Birthday"
                    : "Anniversary"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderEventList = () => {
    return (
      <div style={styles.sectionCard}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleWrap}>
            <span style={styles.sectionEmoji}>📅</span>
            <h2 style={styles.sectionTitle}>Upcoming Events</h2>
          </div>
          <div style={styles.countBadge}>{events.length}</div>
        </div>

        {loading ? (
          <div style={styles.emptyBox}>Loading...</div>
        ) : events.length === 0 ? (
          <div style={styles.emptyBox}>No events available</div>
        ) : (
          <div style={styles.listWrap}>
            {events.map((event, index) => (
              <div
                key={event.id || `${event.title}-${index}`}
                style={styles.personRow}
              >
                <div>
                  <h4 style={styles.personName}>
                    {event.title || event.name || "-"}
                  </h4>
                  <p style={styles.personEmail}>{formatDate(event.date)}</p>
                  <p style={styles.personMeta}>
                    {event.description || "No description"}
                  </p>
                </div>

                <div style={styles.typeBadge}>Event</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Dashboard</h1>
      <p style={styles.subText}>Welcome back! Here’s what’s happening today.</p>

      <div style={styles.topCards}>
        <div
          style={{
            ...styles.summaryCard,
            background: "linear-gradient(135deg, #2563eb, #60a5fa)",
          }}
        >
          <div style={styles.cardTopRow}>
            <span style={styles.cardIcon}>👥</span>
            <span style={styles.liveBadge}>Live</span>
          </div>
          <h2 style={styles.summaryNumber}>
            {loading ? "..." : totalEmployees}
          </h2>
          <p style={styles.summaryLabel}>Total Employees</p>
        </div>

        <div
          style={{
            ...styles.summaryCard,
            background: "linear-gradient(135deg, #16a34a, #4ade80)",
          }}
        >
          <div style={styles.cardTopRow}>
            <span style={styles.cardIcon}>🎂</span>
            <span style={styles.liveBadge}>Today</span>
          </div>
          <h2 style={styles.summaryNumber}>
            {loading ? "..." : todaysBirthdays.length}
          </h2>
          <p style={styles.summaryLabel}>Today Birthdays</p>
        </div>

        <div
          style={{
            ...styles.summaryCard,
            background: "linear-gradient(135deg, #d97706, #fbbf24)",
          }}
        >
          <div style={styles.cardTopRow}>
            <span style={styles.cardIcon}>🏆</span>
            <span style={styles.liveBadge}>Today</span>
          </div>
          <h2 style={styles.summaryNumber}>
            {loading ? "..." : todaysAnniversaries.length}
          </h2>
          <p style={styles.summaryLabel}>Today Anniversaries</p>
        </div>

        <div
          style={{
            ...styles.summaryCard,
            background: "linear-gradient(135deg, #ef4444, #f87171)",
          }}
        >
          <div style={styles.cardTopRow}>
            <span style={styles.cardIcon}>🗓️</span>
            <span style={styles.liveBadge}>Live</span>
          </div>
          <h2 style={styles.summaryNumber}>{loading ? "..." : totalEvents}</h2>
          <p style={styles.summaryLabel}>Total Events</p>
        </div>
      </div>

      <div style={styles.sections}>
        {renderEmployeeList(
          "Today's Birthdays",
          "🎉",
          todaysBirthdays,
          "birthday"
        )}
        {renderEmployeeList(
          "Today's Anniversaries",
          "🏅",
          todaysAnniversaries,
          "anniversary"
        )}
        {renderEmployeeList(
          "This Week Birthdays",
          "🗓️",
          thisWeekBirthdays,
          "week-birthday"
        )}
        {renderEmployeeList(
          "This Week Anniversaries",
          "💼",
          thisWeekAnniversaries,
          "week-anniversary"
        )}
        {renderEventList()}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5e6d3 0%, #dbeafe 50%, #dcfce7 100%)",
    fontFamily: "Inter, sans-serif",
  },

  heading: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#7c2d12",
    marginBottom: "8px",
  },

  subText: {
    color: "#6b7280",
    marginBottom: "28px",
    fontSize: "16px",
  },

  topCards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "26px",
  },

  summaryCard: {
    borderRadius: "22px",
    padding: "26px 22px",
    color: "#ffffff",
    boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
  },

  cardTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  cardIcon: {
    fontSize: "24px",
  },

  liveBadge: {
    background: "rgba(255,255,255,0.22)",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "700",
  },

  summaryNumber: {
    fontSize: "42px",
    fontWeight: "800",
    margin: "0 0 8px 0",
  },

  summaryLabel: {
    margin: 0,
    fontSize: "17px",
    fontWeight: "700",
  },

  sections: {
    display: "grid",
    gap: "22px",
  },

  sectionCard: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "22px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "18px",
    flexWrap: "wrap",
  },

  sectionTitleWrap: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  sectionEmoji: {
    fontSize: "24px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "800",
    color: "#0f172a",
  },

  countBadge: {
    minWidth: "32px",
    height: "32px",
    borderRadius: "999px",
    background: "#dbeafe",
    color: "#1d4ed8",
    fontWeight: "800",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 10px",
  },

  emptyBox: {
    border: "1.5px dashed #93c5fd",
    color: "#3b82f6",
    borderRadius: "16px",
    padding: "24px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "600",
    background: "#f8fbff",
  },

  listWrap: {
    display: "grid",
    gap: "14px",
  },

  personRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    paddingBottom: "14px",
    borderBottom: "1px solid #e5e7eb",
    flexWrap: "wrap",
  },

  personName: {
    margin: "0 0 6px 0",
    fontSize: "18px",
    color: "#111827",
    fontWeight: "700",
  },

  personEmail: {
    margin: "0 0 4px 0",
    color: "#64748b",
    fontSize: "16px",
  },

  personMeta: {
    margin: 0,
    color: "#6b7280",
    fontSize: "14px",
  },

  typeBadge: {
    background: "#f1f5f9",
    color: "#334155",
    borderRadius: "999px",
    padding: "8px 14px",
    fontSize: "14px",
    fontWeight: "700",
  },
};