import { useState, useEffect } from "react";
import { base44 } from "../../api/base44Client";
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
import { Badge } from "../ui/badge";
import { UserPlus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("user");
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await base44.entities.User.list();
    setUsers(data);
    setLoading(false);
  };

  const handleInvite = async () => {
    if (!inviteEmail) {
      toast.error("Please enter an email address.");
      return;
    }
    setInviting(true);
    await base44.users.inviteUser(inviteEmail, inviteRole);
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
    setInviting(false);
    loadUsers();
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
        User Management
      </h3>

      {/* Invite User */}
      <div className="flex items-end gap-3 flex-wrap">
        <div className="space-y-1.5 flex-1 min-w-[200px]">
          <Label>Email Address</Label>
          <Input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="user@example.com"
          />
        </div>
        <div className="space-y-1.5 w-32">
          <Label>Role</Label>
          <Select value={inviteRole} onValueChange={setInviteRole}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleInvite} disabled={inviting} className="bg-accent text-accent-foreground hover:bg-accent/90">
          <UserPlus className="h-4 w-4 mr-2" />
          {inviting ? "Inviting..." : "Invite User"}
        </Button>
      </div>

      {/* Users List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-muted border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">Name</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">Email</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border/50">
                  <td className="px-3 py-2.5 font-medium">{user.full_name || "-"}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{user.email}</td>
                  <td className="px-3 py-2.5">
                    <Badge variant={user.role === "admin" ? "default" : "secondary"} className="capitalize text-xs">
                      {user.role || "user"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}