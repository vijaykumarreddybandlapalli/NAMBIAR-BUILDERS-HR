import { useEffect, useState } from "react";
import API from "../api/api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/api/employees");
      setEmployees(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Employees load error:", err);
      setError("Failed to load employees from backend.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = employees.filter((emp) => {
    const name = (emp.name || emp.full_name || "").toLowerCase();
    const email = (emp.email || "").toLowerCase();
    const query = search.toLowerCase();

    return name.includes(query) || email.includes(query);
  });

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Employees</h1>

      <input
        type="text"
        placeholder="Search employees..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "320px",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid rgba(216,160,61,0.2)",
          background: "#2a1b10",
          color: "#f5e6c8",
          marginBottom: "20px",
          outline: "none",
        }}
      />

      {loading && <p>Loading employees...</p>}
      {error && <p style={{ color: "#ff9b9b" }}>{error}</p>}

      {!loading && !error && (
        <div
          style={{
            background: "#2a1b10",
            border: "1px solid rgba(216,160,61,0.16)",
            borderRadius: "14px",
            padding: "20px",
          }}
        >
          {filtered.length === 0 ? (
            <p style={{ color: "#bfa77c" }}>No employees found.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", color: "#d8a03d" }}>
                  <th style={{ paddingBottom: "12px" }}>Name</th>
                  <th style={{ paddingBottom: "12px" }}>Email</th>
                  <th style={{ paddingBottom: "12px" }}>Department</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp, index) => (
                  <tr key={emp._id || emp.id || index}>
                    <td style={{ padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      {emp.name || emp.full_name || "No name"}
                    </td>
                    <td style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      {emp.email || "No email"}
                    </td>
                    <td style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      {emp.department || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}