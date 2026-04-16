import { useEffect, useState } from "react";
import API from "@/api/api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    dateOfBirth: "",
    dateOfJoining: "",
  });

  const [editId, setEditId] = useState(null);

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

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      department: "",
      dateOfBirth: "",
      dateOfJoining: "",
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending form data:", form);

      if (editId) {
        await API.put(`/api/employees/${editId}`, form);
        alert("Employee updated successfully");
      } else {
        await API.post("/api/employees", form);
        alert("Employee added successfully");
      }

      resetForm();
      loadEmployees();
    } catch (error) {
      console.error("Save employee error:", error);
      alert(error.response?.data?.error || error.message || "Operation failed");
    }
  };

  const handleEdit = (emp) => {
    setEditId(emp.id);
    setForm({
      name: emp.name || "",
      email: emp.email || "",
      department: emp.department || "",
      dateOfBirth: emp.dateOfBirth ? emp.dateOfBirth.slice(0, 10) : "",
      dateOfJoining: emp.dateOfJoining ? emp.dateOfJoining.slice(0, 10) : "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/employees/${id}`);
      alert("Employee deleted successfully");
      loadEmployees();
    } catch (error) {
      console.error("Delete employee error:", error);
      alert(error.response?.data?.error || error.message || "Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", color: "#f5e6c8" }}>
      <h1 style={{ marginBottom: "20px" }}>Employees</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "450px",
          background: "#1e140d",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Employee Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Date of Joining</label>
        <input
          type="date"
          name="dateOfJoining"
          value={form.dateOfJoining}
          onChange={handleChange}
          style={inputStyle}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" style={buttonStyle}>
            {editId ? "Update Employee" : "Add Employee"}
          </button>

          {editId && (
            <button type="button" onClick={resetForm} style={cancelButtonStyle}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {employees.length === 0 ? (
        <p>No employees found</p>
      ) : (
        employees.map((emp) => (
          <div
            key={emp.id}
            style={{
              border: "1px solid #3a2a1c",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              background: "#1e140d",
            }}
          >
            <p><strong>ID:</strong> {emp.id}</p>
            <p><strong>Name:</strong> {emp.name}</p>
            <p><strong>Email:</strong> {emp.email}</p>
            <p><strong>Department:</strong> {emp.department}</p>
            <p><strong>DOB:</strong> {emp.dateOfBirth ? emp.dateOfBirth.slice(0, 10) : "-"}</p>
            <p><strong>DOJ:</strong> {emp.dateOfJoining ? emp.dateOfJoining.slice(0, 10) : "-"}</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => handleEdit(emp)} style={editButtonStyle}>
                Edit
              </button>

              <button onClick={() => handleDelete(emp.id)} style={deleteButtonStyle}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const labelStyle = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#f5e6c8",
  marginTop: "4px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #6b4a1e",
  outline: "none",
  background: "#2a1d14",
  color: "#f5e6c8",
};

const buttonStyle = {
  padding: "12px",
  background: "#8b5e34",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const cancelButtonStyle = {
  padding: "12px",
  background: "#555",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const editButtonStyle = {
  padding: "8px 14px",
  background: "#a06a2c",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  padding: "8px 14px",
  background: "#b23b3b",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};