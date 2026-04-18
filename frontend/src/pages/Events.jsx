import { useEffect, useState } from "react";
import "./Events.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    eventName: "",
    eventDate: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const loadEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events");
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEvent = async (e) => {
    e.preventDefault();

    if (!form.eventName || !form.eventDate) {
      alert("Event name and date are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.eventName,
          date: form.eventDate,
          description: form.description,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add event");
      }

      setForm({
        eventName: "",
        eventDate: "",
        description: "",
      });

      await loadEvents();
    } catch (err) {
      console.error("ADD EVENT ERROR:", err);
      alert("Failed to add event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="events-page">
      <div className="events-card">
        <h1>Create Event</h1>
        <p>Create a new event for automated greetings and reminders.</p>

        <form onSubmit={addEvent}>
          <div className="events-row">
            <div className="form-group">
              <label>Event Name</label>
              <input
                type="text"
                name="eventName"
                placeholder="Enter event name"
                value={form.eventName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Event Date</label>
              <input
                type="date"
                name="eventDate"
                value={form.eventDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Write event details here..."
              value={form.description}
              onChange={handleChange}
              rows="6"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Event"}
          </button>
        </form>
      </div>

      <div className="events-list-card">
        <h2>Event List</h2>

        {events.length === 0 ? (
          <p className="empty-text">No events found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="events-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.name || event.title || "-"}</td>
                    <td>
                      {event.date
                        ? new Date(event.date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>{event.description || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}