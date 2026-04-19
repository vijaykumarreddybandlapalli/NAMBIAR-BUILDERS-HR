// import { useEffect, useState } from "react";
// import Sidebar from "./components/Sidebar";
// import Topbar from "./components/Topbar";

// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import Employees from "./pages/Employees";
// import Events from "./pages/Events";
// import Templates from "./pages/Templates";
// import Calendar from "./pages/Calendar";
// import EmailCenter from "./pages/EmailCenter";
// import EmailQueue from "./pages/EmailQueue";
// import Settings from "./pages/Settings";


// export default function App() {
//   const [activePage, setActivePage] = useState("home");

//   const [employees, setEmployees] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [templates, setTemplates] = useState([]);
//   const [queue, setQueue] = useState([]);
//   const [settings, setSettings] = useState(null);

//   const loadEmployees = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/employees");
//       const data = await res.json();
//       setEmployees(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("LOAD EMPLOYEES ERROR:", error);
//       setEmployees([]);
//     }
//   };

//   const loadEvents = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/events");
//       const data = await res.json();
//       setEvents(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("LOAD EVENTS ERROR:", error);
//       setEvents([]);
//     }
//   };

//   const loadTemplates = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/templates");
//       const data = await res.json();
//       setTemplates(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("LOAD TEMPLATES ERROR:", error);
//       setTemplates([]);
//     }
//   };

//   const loadQueue = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/email-queue");
//       const data = await res.json();
//       setQueue(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("LOAD QUEUE ERROR:", error);
//       setQueue([]);
//     }
//   };

//   const loadSettings = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/settings");
//       const data = await res.json();
//       setSettings(data || null);
//     } catch (error) {
//       console.error("LOAD SETTINGS ERROR:", error);
//       setSettings(null);
//     }
//   };

//   const refreshAllData = async () => {
//     await Promise.all([
//       loadEmployees(),
//       loadEvents(),
//       loadTemplates(),
//       loadQueue(),
//       loadSettings(),
//     ]);
//   };

//   useEffect(() => {
//     refreshAllData();
//   }, []);

//   const renderPage = () => {
//     switch (activePage) {
//       case "home":
//         return (
//           <Home
//             employees={employees}
//             events={events}
//             templates={templates}
//             queue={queue}
//             settings={settings}
//           />
//         );
//       case "dashboard":
//         return (
//           <Dashboard
//             employees={employees}
//             events={events}
//             templates={templates}
//             queue={queue}
//           />
//         );
//       case "employees":
//         return (
//           <Employees
//             employees={employees}
//             refreshEmployees={loadEmployees}
//             refreshAllData={refreshAllData}
//           />
//         );
//       case "events":
//         return (
//           <Events
//             events={events}
//             refreshEvents={loadEvents}
//             refreshAllData={refreshAllData}
//           />
//         );
//       case "templates":
//         return (
//           <Templates
//             templates={templates}
//             refreshTemplates={loadTemplates}
//             refreshAllData={refreshAllData}
//           />
//         );
//       case "calendar":
//         return (
//           <Calendar
//             events={events}
//             refreshEvents={loadEvents}
//             refreshAllData={refreshAllData}
//           />
//         );
//       case "email-center":
//         return (
//           <EmailCenter
//             refreshQueue={loadQueue}
//             refreshAllData={refreshAllData}
//           />
//         );
//       case "email-queue":
//         return (
//           <EmailQueue
//             queue={queue}
//             refreshQueue={loadQueue}
//             refreshAllData={refreshAllData}
//           />
//         );
//       case "settings":
//         return (
//           <Settings
//             settings={settings}
//             refreshSettings={loadSettings}
//             refreshAllData={refreshAllData}
//           />
//         );
//       default:
//         return (
//           <Home
//             employees={employees}
//             events={events}
//             templates={templates}
//             queue={queue}
//             settings={settings}
//           />
//         );
//     }
//   };

//   return (
//     <div style={styles.app}>
//       <div style={styles.sidebarWrap}>
//         <Sidebar activePage={activePage} setActivePage={setActivePage} />
//       </div>

//       <main style={styles.main}>{renderPage()}</main>
//     </div>
//   );
//   return (
//     <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       <Topbar activePage={activePage} setActivePage={setActivePage} />
  
//       <div style={{ display: "flex", flex: 1 }}>
//         <Sidebar activePage={activePage} setActivePage={setActivePage} />
//         <main style={{ flex: 1, overflowY: "auto" }}>
//           {renderPage()}
//         </main>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   app: {
//     display: "flex",
//     height: "100vh",
//     overflow: "hidden",
//     background: "#f5f1ea",
//   },
//   sidebarWrap: {
//     width: "370px",
//     height: "100vh",
//     overflowY: "auto",
//     flexShrink: 0,
//   },
//   main: {
//     flex: 1,
//     height: "100vh",
//     overflowY: "auto",
//     padding: "12px 20px 20px 20px",
//     boxSizing: "border-box",
//   },
// };

import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Events from "./pages/Events";
import Templates from "./pages/Templates";
import Calendar from "./pages/Calendar";
import EmailCenter from "./pages/EmailCenter";
import EmailQueue from "./pages/EmailQueue";
import Settings from "./pages/Settings";

export default function App() {
  const [activePage, setActivePage] = useState("home");

  const [employees, setEmployees] = useState([]);
  const [events, setEvents] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [queue, setQueue] = useState([]);
  const [settings, setSettings] = useState(null);

  const loadEmployees = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/employees");
      const data = await res.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("LOAD EMPLOYEES ERROR:", error);
      setEmployees([]);
    }
  };

  const loadEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events");
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("LOAD EVENTS ERROR:", error);
      setEvents([]);
    }
  };

  const loadTemplates = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/templates");
      const data = await res.json();
      setTemplates(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("LOAD TEMPLATES ERROR:", error);
      setTemplates([]);
    }
  };

  const loadQueue = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/email-queue");
      const data = await res.json();
      setQueue(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("LOAD QUEUE ERROR:", error);
      setQueue([]);
    }
  };

  const loadSettings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/settings");
      const data = await res.json();
      setSettings(data || null);
    } catch (error) {
      console.error("LOAD SETTINGS ERROR:", error);
      setSettings(null);
    }
  };

  const refreshAllData = async () => {
    await Promise.all([
      loadEmployees(),
      loadEvents(),
      loadTemplates(),
      loadQueue(),
      loadSettings(),
    ]);
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return (
          <Home
            employees={employees}
            events={events}
            templates={templates}
            queue={queue}
            settings={settings}
          />
        );

      case "dashboard":
        return (
          <Dashboard
            employees={employees}
            events={events}
            templates={templates}
            queue={queue}
          />
        );

      case "employees":
        return (
          <Employees
            employees={employees}
            refreshEmployees={loadEmployees}
            refreshAllData={refreshAllData}
          />
        );

      case "events":
        return (
          <Events
            events={events}
            refreshEvents={loadEvents}
            refreshAllData={refreshAllData}
          />
        );

      case "templates":
        return (
          <Templates
            templates={templates}
            refreshTemplates={loadTemplates}
            refreshAllData={refreshAllData}
          />
        );

      case "calendar":
        return (
          <Calendar
            events={events}
            refreshEvents={loadEvents}
            refreshAllData={refreshAllData}
          />
        );

      case "email-center":
        return (
          <EmailCenter
            refreshQueue={loadQueue}
            refreshAllData={refreshAllData}
          />
        );

      case "email-queue":
        return (
          <EmailQueue
            queue={queue}
            refreshQueue={loadQueue}
            refreshAllData={refreshAllData}
          />
        );

      case "settings":
        return (
          <Settings
            settings={settings}
            refreshSettings={loadSettings}
            refreshAllData={refreshAllData}
          />
        );

      default:
        return (
          <Home
            employees={employees}
            events={events}
            templates={templates}
            queue={queue}
            settings={settings}
          />
        );
    }
  };

  return (
    <div style={styles.container}>
      <Topbar activePage={activePage} setActivePage={setActivePage} />

      <div style={styles.body}>
        <div style={styles.sidebar}>
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
        </div>

        <main style={styles.main}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    background: "#f5f1ea",
  },

  body: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },

  sidebar: {
    width: "280px",
    height: "100%",
    overflowY: "auto",
    flexShrink: 0,
  },

  main: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    background: "#f1f5f9",
    boxSizing: "border-box",
  },
};