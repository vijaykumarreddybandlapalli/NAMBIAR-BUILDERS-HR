import { Cake, Heart, PartyPopper } from "lucide-react";

export default function WishesBreakdown({ birthdayCount, anniversaryCount, eventCount }) {
  const items = [
    {
      label: "Birthday Wishes",
      count: birthdayCount,
      icon: Cake,
      color: "bg-pink-50 text-pink-600",
      iconBg: "bg-pink-100",
    },
    {
      label: "Anniversary Wishes",
      count: anniversaryCount,
      icon: Heart,
      color: "bg-red-50 text-red-600",
      iconBg: "bg-red-100",
    },
    {
      label: "Event Wishes",
      count: eventCount,
      icon: PartyPopper,
      color: "bg-amber-50 text-amber-600",
      iconBg: "bg-amber-100",
    },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
        Total Wishes Sent
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className={`rounded-xl p-4 ${item.color} flex items-center gap-4`}
          >
            <div className={`h-12 w-12 rounded-xl ${item.iconBg} flex items-center justify-center`}>
              <item.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{item.count}</p>
              <p className="text-xs font-medium opacity-80">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}