import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, Bell, CheckCheck } from "lucide-react";

export default function Topbar({
  activePage,
  setActivePage,
  notifications = [],
  setNotifications = () => {},
}) {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const searchRef = useRef(null);
  const notificationRef = useRef(null);

  const menu = [
    { key: "dashboard", label: "Dashboard" },
    { key: "employees", label: "Employees" },
    { key: "email-center", label: "Email Center" },
    { key: "calendar", label: "Events & Calendar" },
    { key: "templates", label: "Templates" },
  ];

  const searchItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      keywords: ["dashboard", "home", "main", "overview"],
    },
    {
      key: "employees",
      label: "Employees",
      keywords: ["employees", "employee", "staff", "team", "people"],
    },
    {
      key: "email-center",
      label: "Email Center",
      keywords: ["email", "emails", "mail", "message"],
    },
    {
      key: "calendar",
      label: "Events & Calendar",
      keywords: ["event", "events", "calendar", "schedule", "dates"],
    },
    {
      key: "templates",
      label: "Templates",
      keywords: ["template", "templates", "design", "format"],
    },
  ];

  const filteredResults = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return [];

    return searchItems.filter((item) => {
      return (
        item.label.toLowerCase().includes(value) ||
        item.keywords.some((word) => word.includes(value))
      );
    });
  }, [search]);

  const unreadCount = useMemo(() => {
    return notifications.filter((item) => !item.read).length;
  }, [notifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const goToPage = (pageKey, pageLabel = "") => {
    setActivePage(pageKey);
    setSearch(pageLabel);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredResults.length > 0) {
      goToPage(filteredResults[0].key, filteredResults[0].label);
    }

    if (e.key === "Escape") {
      setShowSuggestions(false);
      setShowNotifications(false);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setShowSuggestions(false);
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, read: true }))
    );
  };

  return (
    <div style={styles.topbar}>
      <div>
        <h1 style={styles.logo}>Nambiar Builders</h1>
        <p style={styles.sub}>HR FAMILY PORTAL</p>
      </div>

      <div style={styles.menu}>
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActivePage(item.key)}
            style={{
              ...styles.menuItem,
              ...(activePage === item.key ? styles.active : {}),
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div style={styles.right}>
        <div style={styles.searchWrapper} ref={searchRef}>
          <div style={styles.searchBox}>
            <Search size={18} color="#6b7280" />
            <input
              type="text"
              placeholder="Search pages..."
              value={search}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              style={styles.searchInput}
            />
            {search && (
              <button onClick={clearSearch} style={styles.clearBtn}>
                <X size={16} color="#6b7280" />
              </button>
            )}
          </div>

          {showSuggestions && search.trim() !== "" && (
            <div style={styles.dropdown}>
              {filteredResults.length > 0 ? (
                filteredResults.map((item) => (
                  <div
                    key={item.key}
                    style={styles.dropdownItem}
                    onMouseDown={() => goToPage(item.key, item.label)}
                  >
                    <span style={styles.dropdownTitle}>{item.label}</span>
                    <span style={styles.dropdownSub}>
                      Open {item.label} page
                    </span>
                  </div>
                ))
              ) : (
                <div style={styles.noResult}>No matching page found</div>
              )}
            </div>
          )}
        </div>

        <div style={styles.notificationWrapper} ref={notificationRef}>
          <button style={styles.bellButton} onClick={toggleNotifications}>
            <Bell size={20} color="#facc15" />
            {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div style={styles.notificationPanel}>
              <div style={styles.notificationHeader}>
                <span style={styles.notificationTitle}>Notifications</span>

                {notifications.length > 0 && unreadCount > 0 && (
                  <button style={styles.markAllBtn} onClick={markAllAsRead}>
                    <CheckCheck size={15} />
                    Mark all read
                  </button>
                )}
              </div>

              {notifications.length > 0 ? (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      ...styles.notificationItem,
                      ...(item.read
                        ? styles.notificationRead
                        : styles.notificationUnread),
                    }}
                    onClick={() => markAsRead(item.id)}
                  >
                    <div style={styles.notificationRow}>
                      <div>
                        <div style={styles.notificationItemTitle}>
                          {item.title}
                        </div>
                        <div style={styles.notificationItemTime}>
                          {item.time}
                        </div>
                      </div>

                      {!item.read && <span style={styles.unreadDot}></span>}
                    </div>
                  </div>
                ))
              ) : (
                <div style={styles.emptyNotification}>No notifications</div>
              )}
            </div>
          )}
        </div>

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
    background: "linear-gradient(90deg, #0f172a, #1e3a8a, #065f46)",
    color: "#facc15",
    flexShrink: 0,
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
    position: "relative",
    zIndex: 30,
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
    gap: "14px",
    position: "relative",
  },

  searchWrapper: {
    position: "relative",
    width: "260px",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#ffffff",
    borderRadius: "999px",
    padding: "8px 14px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },

  searchInput: {
    border: "none",
    outline: "none",
    fontSize: "14px",
    width: "100%",
    background: "transparent",
    color: "#111827",
  },

  clearBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  dropdown: {
    position: "absolute",
    top: "48px",
    left: 0,
    width: "100%",
    background: "#ffffff",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.16)",
    overflow: "hidden",
    zIndex: 50,
  },

  dropdownItem: {
    padding: "12px 14px",
    cursor: "pointer",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    background: "#ffffff",
  },

  dropdownTitle: {
    color: "#111827",
    fontSize: "14px",
    fontWeight: "600",
  },

  dropdownSub: {
    color: "#6b7280",
    fontSize: "12px",
  },

  noResult: {
    padding: "14px",
    color: "#6b7280",
    fontSize: "14px",
  },

  notificationWrapper: {
    position: "relative",
  },

  bellButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  badge: {
    position: "absolute",
    top: "-2px",
    right: "-2px",
    minWidth: "18px",
    height: "18px",
    borderRadius: "999px",
    background: "#ef4444",
    color: "#ffffff",
    fontSize: "11px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 5px",
  },

  notificationPanel: {
    position: "absolute",
    top: "50px",
    right: 0,
    width: "320px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
    overflow: "hidden",
    zIndex: 60,
  },

  notificationHeader: {
    padding: "14px 16px",
    borderBottom: "1px solid #e5e7eb",
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  notificationTitle: {
    color: "#111827",
    fontSize: "15px",
    fontWeight: "700",
  },

  markAllBtn: {
    border: "none",
    background: "#e0f2fe",
    color: "#0369a1",
    borderRadius: "8px",
    padding: "6px 10px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  notificationItem: {
    padding: "14px 16px",
    borderBottom: "1px solid #f1f5f9",
    cursor: "pointer",
    background: "#ffffff",
  },

  notificationUnread: {
    background: "#fffbea",
  },

  notificationRead: {
    background: "#ffffff",
    opacity: 0.9,
  },

  notificationRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
  },

  notificationItemTitle: {
    color: "#111827",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "4px",
  },

  notificationItemTime: {
    color: "#6b7280",
    fontSize: "12px",
  },

  unreadDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#ef4444",
    flexShrink: 0,
  },

  emptyNotification: {
    padding: "18px 16px",
    color: "#6b7280",
    fontSize: "14px",
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