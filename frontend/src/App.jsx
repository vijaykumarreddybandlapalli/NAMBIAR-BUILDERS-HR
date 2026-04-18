// import { useState } from "react";
// import Sidebar from "./components/Sidebar";

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

//   const renderPage = () => {
//     switch (activePage) {
//       case "home":
//         return <Home />;
//       case "dashboard":
//         return <Dashboard />;
//       case "employees":
//         return <Employees />;
//       case "events":
//         return <Events />;
//       case "templates":
//         return <Templates />;
//       case "calendar":
//         return <Calendar />;
//       case "email-center":
//         return <EmailCenter />;
//       case "email-queue":
//         return <EmailQueue />;
//       case "settings":
//         return <Settings />;
//       default:
//         return <Home />;
//     }
//   };

//   return (
//     <div style={styles.app}>
//       <Sidebar activePage={activePage} setActivePage={setActivePage} />
//       <main style={styles.mainContent}>{renderPage()}</main>
//     </div>
//   );
// }

// const styles = {
//   app: {
//     display: "flex",
//     minHeight: "100vh",
//     background: "#1a120b",
//   },
//   mainContent: {
//     flex: 1,
//     padding: "24px",
//     overflowY: "auto",
//     background: "#1a120b",
//   },
// };

import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";

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
    <div style={styles.app}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main style={styles.main}>{renderPage()}</main>
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    background: "#f5f1ea",
  },
  main: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  },
};