import { useEffect, useMemo, useState } from "react";
import "./Calendar.css";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  const API_BASE = "http://localhost:5000";

  // ✅ LOAD EVENTS FROM BACKEND
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/events`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error("LOAD EVENTS ERROR:", err);
        setEvents([]);
      }
    };

    loadEvents();
  }, []);

  const monthYear = useMemo(() => {
    return currentDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  }, [currentDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [year, month]);

  const firstDayOfMonth = useMemo(() => {
    return new Date(year, month, 1).getDay();
  }, [year, month]);

  const calendarDays = useMemo(() => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [firstDayOfMonth, daysInMonth]);

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // ✅ FILTER EVENTS FOR EACH DAY
  const getEventsForDay = (day) => {
    if (!day) return [];

    return events.filter((event) => {
      const d = new Date(event.date);
      return (
        d.getFullYear() === year &&
        d.getMonth() === month &&
        d.getDate() === day
      );
    });
  };

  const handleAddEvent = () => {
    if (!selectedDate) {
      alert("Please select a date first");
      return;
    }

    alert(`Add event for ${selectedDate} ${monthYear}`);
  };

  return (
    <div className="calendar-page">
      <div className="calendar-card">

        <div className="calendar-header">
          <div>
            <h1>Calendar</h1>
            <p>Manage event dates and schedule important greetings.</p>
          </div>

          <button className="add-event-btn" onClick={handleAddEvent}>
            + Add Event
          </button>
        </div>

        <div className="month-bar">
          <button className="nav-btn" onClick={goToPrevMonth}>←</button>
          <h2>{monthYear}</h2>
          <button className="nav-btn" onClick={goToNextMonth}>→</button>
        </div>

        <div className="weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        <div className="calendar-grid">
          {calendarDays.map((day, index) => {
            const dayEvents = getEventsForDay(day);

            return (
              <div
                key={index}
                className={`calendar-cell ${
                  day === selectedDate ? "selected" : ""
                } ${day ? "active-day" : "empty-day"}`}
                onClick={() => day && setSelectedDate(day)}
              >
                {day && (
                  <>
                    <div className="day-number">{day}</div>

                    {/* ✅ SHOW EVENTS */}
                    <div className="calendar-events">
                      {dayEvents.map((event) => (
                        <div key={event.id} className="event-badge">
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}