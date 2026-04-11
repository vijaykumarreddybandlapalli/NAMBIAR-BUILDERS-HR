import { useState, useEffect, useRef } from "react";
import API from "@/api/api";
import { Upload, Plus, Search, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmployeeDialog from "../components/employees/EmployeeDialog";
import EmployeeTable from "../components/employees/EmployeeTable";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const fileInputRef = useRef(null);

  // ✅ LOAD EMPLOYEES FROM BACKEND
  const loadEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error loading employees", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await API.delete(`/employees/${id}`);
      loadEmployees();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  // ✅ EDIT OPEN
  const handleEdit = (emp) => {
    setEditEmployee(emp);
    setDialogOpen(true);
  };

  // ✅ SAVE (ADD + UPDATE)
  const handleSave = async (data) => {
    try {
      if (editEmployee) {
        // UPDATE
        await API.put(`/employees/${editEmployee.id}`, data);
      } else {
        // CREATE
        await API.post("/employees", data);
      }

      setDialogOpen(false);
      setEditEmployee(null);
      loadEmployees();
    } catch (err) {
      console.error("Save error", err);
    }
  };

  // ✅ SEARCH FILTER
  const filtered = employees.filter(
    (e) =>
      e.name?.toLowerCase().includes(search.toLowerCase()) ||
      e.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Employees</h1>
          <p className="text-sm text-gray-500">
            Manage your team — {employees.length} employees
          </p>
        </div>

        <Button
          onClick={() => {
            setEditEmployee(null);
            setDialogOpen(true);
          }}
          className="bg-yellow-400 text-black hover:bg-yellow-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* TABLE */}
      <EmployeeTable
        employees={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* DIALOG */}
      <EmployeeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        employee={editEmployee}
        onSave={handleSave}
      />
    </div>
  );
}