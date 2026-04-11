import { cn } from "../../lib/utils";

export default function StatsCard({ title, value, icon: Icon, color, subtitle }) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div
          className={cn(
            "h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
            color || "bg-primary/10"
          )}
        >
          {Icon && <Icon className="h-6 w-6 text-primary" />}
        </div>
      </div>
    </div>
  );
}