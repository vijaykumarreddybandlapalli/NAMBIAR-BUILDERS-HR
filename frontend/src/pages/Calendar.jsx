import { useState } from "react";
import { Plus, X, Pencil, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    type: "Company Event",
    sendMail: false,
  });

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // ADD / UPDATE EVENT
  const saveEvent = () => {
    if (!form.title || !form.date) {
      return alert("Title & Date required");
    }

    if (editIndex !== null) {
      const updated = [...events];
      updated[editIndex] = form;
      setEvents(updated);
    } else {
      setEvents([...events, form]);
    }

    resetForm();
  };

  // EDIT
  const handleEdit = (index) => {
    setForm(events[index]);
    setEditIndex(index);
    setOpen(true);
  };

  // DELETE
  const handleDelete = (index) => {
    if (!confirm("Delete this event?")) return;
    setEvents(events.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      date: "",
      type: "Company Event",
      sendMail: false,
    });
    setEditIndex(null);
    setOpen(false);
  };

  // FILTER EVENTS BY DAY
  const getEventsByDay = (day) => {
    return events.filter(
      (e) => new Date(e.date).getDate() === day
    );
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calendar</h1>

        <Button
          className="bg-yellow-400 text-black hover:bg-yellow-500"
          onClick={() => setOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* CALENDAR GRID */}
      <div className="bg-white p-4 rounded-xl shadow grid grid-cols-7 gap-2">

        {days.map((day) => (
          <div key={day} className="border rounded-lg p-2 h-24 relative">

            <div className="text-sm font-semibold">{day}</div>

            {/* EVENTS */}
            <div className="mt-1 space-y-1">
              {getEventsByDay(day).map((event, i) => (
                <div
                  key={i}
                  className="bg-yellow-100 text-xs p-1 rounded flex justify-between items-center"
                >
                  <span>{event.title}</span>

                  <div className="flex gap-1">
                    <Pencil
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => handleEdit(i)}
                    />
                    <Trash2
                      className="w-3 h-3 cursor-pointer text-red-500"
                      onClick={() => handleDelete(i)}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[600px] rounded-xl p-6 relative">

            {/* CLOSE */}
            <button
              onClick={resetForm}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {editIndex !== null ? "Edit Event" : "Add Event"}
            </h2>

            {/* FORM */}
            <div className="space-y-4">

              <div>
                <label className="text-sm">Event Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-sm">Event Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm">Type</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 mt-1"
                  >
                    <option>Festival</option>
                    <option>Company Event</option>
                    <option>Holiday</option>
                    <option>Celebration</option>
                    <option>Other</option>
                  </select>
                </div>

              </div>

              {/* TOGGLE */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="sendMail"
                  checked={form.sendMail}
                  onChange={handleChange}
                />
                <span>Send email to all employees</span>
              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>

              <Button
                className="bg-yellow-400 text-black hover:bg-yellow-500"
                onClick={saveEvent}
              >
                {editIndex !== null ? "Update Event" : "Create Event"}
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}