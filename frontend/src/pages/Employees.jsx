import { useEffect, useState } from "react";
import API from "@/api/api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await API.get("/api/employees");
        setEmployees(res.data || []);
      } catch (error) {
        console.error("Employees load error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Employees</h1>
      {employees.length === 0 ? (
        <p>No employees found</p>
      ) : (
        employees.map((emp) => (
          <div key={emp.id}>
            <p>{emp.name}</p>
            <p>{emp.email}</p>
          </div>
        ))
      )}
    </div>
  );
}