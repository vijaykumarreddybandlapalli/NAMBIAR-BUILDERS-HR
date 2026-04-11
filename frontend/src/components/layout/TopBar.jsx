import { useLocation } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { base44 } from "../../api/base44Client";
import { useEffect, useState } from "react";

const pageTitles = {
  "/": "Dashboard",
  "/employees": "Employees",
  "/calendar": "Calendar",
  "/email-queue": "Email Queue",
  "/templates": "Templates",
  "/settings": "Settings",
};

export default function TopBar() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Dashboard";
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-10">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 w-64 h-9 bg-muted/50 border-0"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
        </Button>
        {user && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
              {user.full_name?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}
            </div>
            <span className="text-sm font-medium hidden md:inline">{user.full_name || user.email}</span>
          </div>
        )}
      </div>
    </header>
  );
}