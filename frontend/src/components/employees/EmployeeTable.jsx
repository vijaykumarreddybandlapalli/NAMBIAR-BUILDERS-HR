import { Trash2, Edit2 } from "lucide-react";
import { Button } from "../ui/button";
import moment from "moment";
import { Badge } from "../ui/badge";

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-12 text-center">
        <p className="text-muted-foreground">No employees found. Import or add employees to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Department</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Birthday</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Anniversary</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                      {emp.full_name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{emp.full_name}</p>
                      <p className="text-xs text-muted-foreground">{emp.designation || "-"}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{emp.email}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{emp.department || "-"}</td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                  {emp.date_of_birth ? moment(emp.date_of_birth).format("MMM D") : "-"}
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                  {emp.anniversary_date ? moment(emp.anniversary_date).format("MMM D") : "-"}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={emp.status === "active" ? "default" : "secondary"}>
                    {emp.status || "active"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(emp)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(emp.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}