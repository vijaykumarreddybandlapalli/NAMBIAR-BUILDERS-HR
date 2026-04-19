import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./Events.css";

export default function Events({ refreshAllData }) {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const API_BASE = "http://localhost:5000";

  const safeJson = async (res) => {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (error) {
      console.error("RAW RESPONSE:", text);
      throw new Error("Server did not return valid JSON");
    }
  };

  const loadEvents = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/events`);
      const data = await safeJson(res);

      if (!res.ok) {
        throw new Error(data.error || "Failed to load events");
      }

      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("LOAD EVENTS ERROR:", err);
      setEvents([]);
      toast.error(err.message || "Failed to load events");
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      date: "",
      description: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.date) {
      toast.error("Event name and date are required");
      return;
    }

    try {
      setLoading(true);

      const url = editingId
        ? `${API_BASE}/api/events/${editingId}`
        : `${API_BASE}/api/events`;

      const method = editingId ? "PUT" : "POST";

      const payload = {
        title: form.title.trim(),
        date: form.date,
        description: form.description.trim(),
      };

      console.log("EVENT PAYLOAD:", payload);

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await safeJson(res);

      if (!res.ok) {
        throw new Error(data.error || "Failed to save event");
      }

      resetForm();
      await loadEvents();

      if (refreshAllData) {
        await refreshAllData();
      }

      toast.success(editingId ? "Event updated successfully" : "Event added successfully");
    } catch (err) {
      console.error("SAVE EVENT ERROR:", err);
      toast.error(err.message || "Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setForm({
      title: event.title || "",
      date: event.date ? new Date(event.date).toISOString().split("T")[0] : "",
      description: event.description || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE}/api/events/${id}`, {
        method: "DELETE",
      });

      const data = await safeJson(res);

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete event");
      }

      if (editingId === id) {
        resetForm();
      }

      await loadEvents();

      if (refreshAllData) {
        await refreshAllData();
      }

      toast.success("Event deleted successfully");
    } catch (err) {
      console.error("DELETE EVENT ERROR:", err);
      toast.error(err.message || "Failed to delete event");
    }
  };

  return (
    <div className="events-page">
      <div className="events-card">
        <h1>{editingId ? "Edit Event" : "Create Event"}</h1>
        <p>Create a new event for automated greetings and reminders.</p>

        <form onSubmit={handleSubmit}>
          <div className="events-row">
            <div className="form-group">
              <label>Event Name</label>
              <input
                type="text"
                name="title"
                placeholder="Enter event name"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Event Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
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

          <div className="event-actions">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Saving..." : editingId ? "Update Event" : "Add Event"}
            </button>

            {editingId && (
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
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
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.title || "-"}</td>
                    <td>
                      {event.date
                        ? new Date(event.date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>{event.description || "-"}</td>
                    <td>
                      <div className="event-table-actions">
                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() => handleEdit(event)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => handleDelete(event.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
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