import { useEffect, useState } from "react";
import API from "@/api/api";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await API.get("/api/employees");
        setEmployees(res.data || []);
      } catch (error) {
        console.error("Dashboard load error:", error);
      }
    };

    loadEmployees();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Employees: {employees.length}</p>
    </div>
  );
}