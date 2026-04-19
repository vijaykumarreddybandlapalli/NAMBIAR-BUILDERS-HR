import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import "./Employees.css";

export default function Employees({ refreshAllData }) {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    employeeId: "",
    name: "",
    email: "",
    department: "",
    dateOfBirth: "",
    joiningDate: "",
  });

  const loadEmployees = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/employees");
      const data = await res.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("LOAD EMP ERROR:", err);
      toast.error("Failed to load employees");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      employeeId: "",
      name: "",
      email: "",
      department: "",
      dateOfBirth: "",
      joiningDate: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `http://localhost:5000/api/employees/${editingId}`
        : "http://localhost:5000/api/employees";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      resetForm();
      await loadEmployees();
      if (refreshAllData) await refreshAllData();

      toast.success(editingId ? "Employee updated" : "Employee added");
    } catch (err) {
      console.error("SAVE EMP ERROR:", err);
      toast.error("Failed to save employee");
    }
  };

  const handleEdit = (emp) => {
    setEditingId(emp.id);
    setForm({
      employeeId: emp.employeeId || "",
      name: emp.name || "",
      email: emp.email || "",
      department: emp.department || "",
      dateOfBirth: emp.dateOfBirth
        ? new Date(emp.dateOfBirth).toISOString().split("T")[0]
        : "",
      joiningDate: emp.joiningDate
        ? new Date(emp.joiningDate).toISOString().split("T")[0]
        : "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success("Employee loaded for editing");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Delete failed");
        return;
      }

      if (editingId === id) {
        resetForm();
      }

      await loadEmployees();
      if (refreshAllData) await refreshAllData();

      toast.success("Employee deleted");
    } catch (err) {
      console.error("DELETE EMP ERROR:", err);
      toast.error("Failed to delete employee");
    }
  };

  const normalizeExcelDate = (value) => {
    if (!value) return "";

    if (typeof value === "number") {
      const excelDate = XLSX.SSF.parse_date_code(value);
      if (!excelDate) return "";
      const mm = String(excelDate.m).padStart(2, "0");
      const dd = String(excelDate.d).padStart(2, "0");
      return `${excelDate.y}-${mm}-${dd}`;
    }

    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date.toISOString().split("T")[0];
    }

    return "";
  };

  const handleExcelImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        const mappedEmployees = jsonData.map((row) => ({
          employeeId: row.employeeId || row.EmployeeID || row["Employee ID"] || "",
          name: row.name || row.Name || "",
          email: row.email || row.Email || "",
          department: row.department || row.Department || "",
          dateOfBirth: normalizeExcelDate(
            row.dateOfBirth || row.DateOfBirth || row["Date of Birth"]
          ),
          joiningDate: normalizeExcelDate(
            row.joiningDate ||
              row.DateOfJoining ||
              row["Date of Joining"] ||
              row.joining_date
          ),
        }));

        const validEmployees = mappedEmployees.filter(
          (emp) =>
            emp.name &&
            emp.email &&
            emp.department &&
            emp.dateOfBirth &&
            emp.joiningDate
        );

        if (validEmployees.length === 0) {
          toast.error("No valid employee rows found in Excel file");
          return;
        }

        const res = await fetch("http://localhost:5000/api/employees/bulk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ employees: validEmployees }),
        });

        const result = await res.json();

        if (!res.ok) {
          toast.error(result.error || "Import failed");
          return;
        }

        await loadEmployees();
        if (refreshAllData) await refreshAllData();

        toast.success(`Imported ${result.insertedCount} employees`);
      } catch (error) {
        console.error("IMPORT ERROR:", error);
        toast.error("Failed to import Excel file");
      } finally {
        e.target.value = "";
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="employees-page">
      <div className="employees-header">
        <div>
          <h1>Employees</h1>
          <p>Manage employee records and details.</p>
        </div>
      </div>

      <div className="employees-card">
        <h2>{editingId ? "Edit Employee" : "Add Employee"}</h2>

        <form onSubmit={handleSubmit} className="employee-form">
          <input
            name="employeeId"
            placeholder="Employee ID"
            value={form.employeeId}
            onChange={handleChange}
          />

          <input
            name="name"
            placeholder="Employee Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Employee Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
          />

          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
          />

          <label>Date of Joining</label>
          <input
            type="date"
            name="joiningDate"
            value={form.joiningDate}
            onChange={handleChange}
          />

          <div className="employee-form-actions">
            <button type="submit" className="primary-btn">
              {editingId ? "Update Employee" : "Add Employee"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="employees-card">
        <h2>Import Employees from Excel</h2>
        <p className="empty-text">
          Excel columns supported: Employee ID, Name, Email, Department, Date of
          Birth, Date of Joining
        </p>

        <div className="excel-import-box">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleExcelImport}
          />
        </div>
      </div>

      <div className="employees-card">
        <h2>Employee List</h2>

        {employees.length === 0 ? (
          <p className="empty-text">No employees found.</p>
        ) : (
          <div className="employee-table-wrapper">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Date of Birth</th>
                  <th>Date of Joining</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.employeeId || "-"}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>
                      {emp.dateOfBirth
                        ? new Date(emp.dateOfBirth).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      {emp.joiningDate
                        ? new Date(emp.joiningDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <div className="employee-action-buttons">
                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() => handleEdit(emp)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => handleDelete(emp.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}