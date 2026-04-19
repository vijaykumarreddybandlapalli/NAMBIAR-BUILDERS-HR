import { useEffect, useMemo, useState } from "react";
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

  const notifications = useMemo(() => {
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    const safeEmployees = Array.isArray(employees) ? employees : [];
    const safeEvents = Array.isArray(events) ? events : [];
    const safeQueue = Array.isArray(queue) ? queue : [];

    const birthdayNotifications = safeEmployees
      .filter((emp) => {
        if (!emp?.dateOfBirth) return false;
        const dob = new Date(emp.dateOfBirth);
        return (
          !Number.isNaN(dob.getTime()) &&
          dob.getMonth() === todayMonth &&
          dob.getDate() === todayDate
        );
      })
      .map((emp, index) => ({
        id: `birthday-${emp.id || index}`,
        title: `Birthday reminder: ${emp.name}`,
        time: "Today",
        read: false,
      }));

    const anniversaryNotifications = safeEmployees
      .filter((emp) => {
        if (!emp?.joiningDate) return false;
        const doj = new Date(emp.joiningDate);
        return (
          !Number.isNaN(doj.getTime()) &&
          doj.getMonth() === todayMonth &&
          doj.getDate() === todayDate
        );
      })
      .map((emp, index) => ({
        id: `anniversary-${emp.id || index}`,
        title: `Work anniversary: ${emp.name}`,
        time: "Today",
        read: false,
      }));

    const eventNotifications = safeEvents
      .filter((event) => {
        if (!event?.eventDate) return false;
        const eventDate = new Date(event.eventDate);
        return (
          !Number.isNaN(eventDate.getTime()) &&
          eventDate.getMonth() === todayMonth &&
          eventDate.getDate() === todayDate
        );
      })
      .map((event, index) => ({
        id: `event-${event.id || index}`,
        title: `Event today: ${event.title || event.name || "Scheduled event"}`,
        time: "Today",
        read: false,
      }));

    const queueNotifications = safeQueue
      .filter((item) => item?.status === "FAILED")
      .slice(0, 5)
      .map((item, index) => ({
        id: `queue-failed-${item.id || index}`,
        title: `Email failed: ${item.subject || item.type || "Email task"}`,
        time: "Live",
        read: false,
      }));

    const allNotifications = [
      ...birthdayNotifications,
      ...anniversaryNotifications,
      ...eventNotifications,
      ...queueNotifications,
    ];

    if (allNotifications.length === 0) {
      return [
        {
          id: "empty-birthday",
          title: "No birthdays today",
          time: "Today",
          read: false,
        },
        {
          id: "empty-anniversary",
          title: "No anniversaries today",
          time: "Today",
          read: false,
        },
        {
          id: "empty-events",
          title: "No pending events",
          time: "Live",
          read: false,
        },
      ];
    }

    return allNotifications;
  }, [employees, events, queue]);

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
      <Topbar
        activePage={activePage}
        setActivePage={setActivePage}
        notifications={notifications}
      />

      <div style={styles.body}>
        <div style={styles.sidebar}>
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
        </div>

        <main style={styles.main}>{renderPage()}</main>
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