import { useState, useEffect } from "react";
import { base44 } from "../../api/base44Client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

const emptyForm = {
  full_name: "",
  email: "",
  department: "",
  designation: "",
  date_of_birth: "",
  anniversary_date: "",
  joining_date: "",
  phone: "",
  status: "active",
};

export default function EmployeeDialog({ open, onOpenChange, employee, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (employee) {
      setForm({
        full_name: employee.full_name || "",
        email: employee.email || "",
        department: employee.department || "",
        designation: employee.designation || "",
        date_of_birth: employee.date_of_birth || "",
        anniversary_date: employee.anniversary_date || "",
        joining_date: employee.joining_date || "",
        phone: employee.phone || "",
        status: employee.status || "active",
      });
    } else {
      setForm(emptyForm);
    }
  }, [employee, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (employee) {
      await base44.entities.Employee.update(employee.id, form);
      toast.success("Employee updated.");
    } else {
      await base44.entities.Employee.create({ ...form, welcome_mail_sent: false });
      toast.success("Employee added.");
    }
    setSaving(false);
    onSave();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">
            {employee ? "Edit Employee" : "Add Employee"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Full Name *</Label>
              <Input
                required
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Email *</Label>
              <Input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Department</Label>
              <Input
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Designation</Label>
              <Input
                value={form.designation}
                onChange={(e) => setForm({ ...form, designation: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Date of Birth</Label>
              <Input
                type="date"
                value={form.date_of_birth}
                onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Anniversary Date</Label>
              <Input
                type="date"
                value={form.anniversary_date}
                onChange={(e) => setForm({ ...form, anniversary_date: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Joining Date</Label>
              <Input
                type="date"
                value={form.joining_date}
                onChange={(e) => setForm({ ...form, joining_date: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="bg-accent text-accent-foreground hover:bg-accent/90">
              {saving ? "Saving..." : employee ? "Update" : "Add Employee"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}