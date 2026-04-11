import moment from "moment";
import { cn } from "../../lib/utils";
import { Cake, Heart, CalendarDays, Trash2, Edit2 } from "lucide-react";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarGrid({ currentMonth, events, employees, onDayClick, onEditEvent, onDeleteEvent }) {
  const startOfMonth = moment(currentMonth).startOf("month");
  const endOfMonth = moment(currentMonth).endOf("month");
  const startDay = moment(startOfMonth).startOf("isoWeek");
  const endDay = moment(endOfMonth).endOf("isoWeek");

  const days = [];
  let day = moment(startDay);
  while (day.isSameOrBefore(endDay)) {
    days.push(moment(day));
    day.add(1, "day");
  }

  const getEventsForDay = (d) => {
    const dateStr = d.format("YYYY-MM-DD");
    const mmdd = d.format("MM-DD");

    const dayEvents = events.filter((e) => e.event_date === dateStr);
    const birthdays = employees.filter(
      (e) => e.date_of_birth && moment(e.date_of_birth).format("MM-DD") === mmdd
    );
    const anniversaries = employees.filter(
      (e) => e.anniversary_date && moment(e.anniversary_date).format("MM-DD") === mmdd
    );

    return { dayEvents, birthdays, anniversaries };
  };

  const isToday = (d) => d.isSame(moment(), "day");
  const isCurrentMonth = (d) => d.isSame(currentMonth, "month");

  return (
    <div>
      <div className="grid grid-cols-7 gap-px bg-border rounded-t-lg overflow-hidden">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="bg-muted/50 py-2 text-center text-xs font-semibold text-muted-foreground uppercase">
            {wd}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-border rounded-b-lg overflow-hidden">
        {days.map((d, i) => {
          const { dayEvents, birthdays, anniversaries } = getEventsForDay(d);
          const hasContent = dayEvents.length > 0 || birthdays.length > 0 || anniversaries.length > 0;

          return (
            <div
              key={i}
              onClick={() => onDayClick(d.format("YYYY-MM-DD"))}
              className={cn(
                "bg-card min-h-[90px] p-1.5 cursor-pointer hover:bg-muted/30 transition-colors",
                !isCurrentMonth(d) && "opacity-40"
              )}
            >
              <div className={cn(
                "text-xs font-medium mb-1 w-6 h-6 flex items-center justify-center rounded-full",
                isToday(d) && "bg-accent text-accent-foreground"
              )}>
                {d.format("D")}
              </div>
              <div className="space-y-0.5">
                {birthdays.slice(0, 2).map((b) => (
                  <div key={b.id} className="text-[10px] bg-pink-50 text-pink-700 px-1 py-0.5 rounded truncate flex items-center gap-1">
                    <Cake className="h-2.5 w-2.5 flex-shrink-0" />
                    {b.full_name}
                  </div>
                ))}
                {anniversaries.slice(0, 2).map((a) => (
                  <div key={a.id} className="text-[10px] bg-red-50 text-red-700 px-1 py-0.5 rounded truncate flex items-center gap-1">
                    <Heart className="h-2.5 w-2.5 flex-shrink-0" />
                    {a.full_name}
                  </div>
                ))}
                {dayEvents.slice(0, 2).map((ev) => (
                  <div key={ev.id} className="text-[10px] bg-blue-50 text-blue-700 px-1 py-0.5 rounded truncate flex items-center gap-1"
                    onClick={(e) => { e.stopPropagation(); onEditEvent(ev); }}>
                    <CalendarDays className="h-2.5 w-2.5 flex-shrink-0" />
                    {ev.title}
                  </div>
                ))}
                {(birthdays.length + anniversaries.length + dayEvents.length > 4) && (
                  <div className="text-[10px] text-muted-foreground">
                    +{birthdays.length + anniversaries.length + dayEvents.length - 4} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}