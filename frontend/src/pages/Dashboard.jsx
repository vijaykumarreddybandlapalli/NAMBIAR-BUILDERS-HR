import { useEffect, useState } from "react";

const card = {
  background: "#2a1b10",
  border: "1px solid rgba(216,160,61,0.16)",
  borderRadius: "14px",
  padding: "18px",
};

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function loadEmployees() {
      const res = await fetch("http://localhost:5000/api/employees");
      const data = await res.json();
      console.log("dashboard data:", data);
      setEmployees(data);
    }

    loadEmployees();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "14px",
          marginBottom: "14px",
        }}
      >
        <div style={{ ...card, borderTop: "2px solid #3ecf8e" }}>
          <h2 style={{ margin: 0, color: "#fff0cf" }}>{employees.length}</h2>
          <p style={{ margin: "8px 0 0", color: "#bfa77c" }}>Total Employees</p>
        </div>

        <div style={{ ...card, borderTop: "2px solid #60a5fa" }}>
          <h2 style={{ margin: 0, color: "#fff0cf" }}>0</h2>
          <p style={{ margin: "8px 0 0", color: "#bfa77c" }}>Emails Sent Today</p>
        </div>

        <div style={{ ...card, borderTop: "2px solid #f2c94c" }}>
          <h2 style={{ margin: 0, color: "#fff0cf" }}>0</h2>
          <p style={{ margin: "8px 0 0", color: "#bfa77c" }}>Upcoming Events</p>
        </div>

        <div style={{ ...card, borderTop: "2px solid #c084fc" }}>
          <h2 style={{ margin: 0, color: "#fff0cf" }}>0</h2>
          <p style={{ margin: "8px 0 0", color: "#bfa77c" }}>Active Templates</p>
        </div>
      </div>

      <div style={card}>
        <h3 style={{ marginTop: 0 }}>Recent Employees</h3>

        {employees.length === 0 ? (
          <p style={{ color: "#bfa77c" }}>No employees found.</p>
        ) : (
          employees.map((emp, index) => (
            <div
              key={emp.id || index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <span>{emp.name}</span>
              <span style={{ color: "#9a845e", fontSize: "13px" }}>{emp.email}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}