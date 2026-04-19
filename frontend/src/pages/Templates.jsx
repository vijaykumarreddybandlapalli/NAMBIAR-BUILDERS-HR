import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./Templates.css";

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "birthday",
    subject: "",
    htmlContent: "",
  });

  const API_BASE = "http://localhost:5000";

  const loadTemplates = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/templates`);
      const data = await res.json();
      setTemplates(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("LOAD TEMPLATES ERROR:", err);
      setTemplates([]);
      toast.error("Failed to load templates");
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "type" ? value.toLowerCase() : value,
    }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      type: "birthday",
      subject: "",
      htmlContent: "",
    });
    setEditingId(null);
  };

  const handleToggleForm = () => {
    if (showForm) {
      resetForm();
    }
    setShowForm(!showForm);
  };

  const handleEdit = (template) => {
    setEditingId(template.id);
    setForm({
      name: template.name || "",
      type: (template.type || "birthday").toLowerCase(),
      subject: template.subject || "",
      htmlContent: template.content || "",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success("Template loaded for editing");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this template?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE}/api/templates/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete template");
      }

      if (editingId === id) {
        resetForm();
        setShowForm(false);
      }

      await loadTemplates();
      toast.success("Template deleted successfully");
    } catch (err) {
      console.error("DELETE TEMPLATE ERROR:", err);
      toast.error(err.message || "Failed to delete template");
    }
  };

  const handleCancelEdit = () => {
    resetForm();
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.type || !form.subject || !form.htmlContent) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const url = editingId
        ? `${API_BASE}/api/templates/${editingId}`
        : `${API_BASE}/api/templates`;

      const method = editingId ? "PUT" : "POST";

      const payload = {
        name: form.name.trim(),
        type: form.type.toLowerCase().trim(),
        subject: form.subject.trim(),
        content: form.htmlContent.trim(),
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save template");
      }

      resetForm();
      setShowForm(false);
      await loadTemplates();

      toast.success(
        editingId ? "Template updated successfully" : "Template created successfully"
      );
    } catch (err) {
      console.error("SAVE TEMPLATE ERROR:", err);
      toast.error(err.message || "Failed to save template");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="templates-page">
      <div className="templates-card">
        <div className="templates-header">
          <div>
            <h1>Templates</h1>
            <p>Manage email templates for automated greetings and messages.</p>
          </div>

          <button
            type="button"
            className="new-template-btn"
            onClick={handleToggleForm}
          >
            {showForm ? "Close Form" : "+ New Template"}
          </button>
        </div>

        {showForm && (
          <form className="template-form" onSubmit={handleSubmit}>
            <div className="template-row">
              <div className="form-group">
                <label>Template Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter template name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Template Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="welcome">Welcome</option>
                  <option value="festival">Festival</option>
                  <option value="event">Event</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label>Email Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Enter email subject"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>HTML Content</label>
              <textarea
                name="htmlContent"
                placeholder="Write your email template content here..."
                value={form.htmlContent}
                onChange={handleChange}
                rows="8"
              />
            </div>

            <div className="template-action-row">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Template"
                  : "Create Template"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      <div className="templates-list-card">
        <h2>Saved Templates</h2>

        {templates.length === 0 ? (
          <p className="empty-text">No templates created.</p>
        ) : (
          <div className="table-wrapper">
            <table className="templates-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Template Name</th>
                  <th>Type</th>
                  <th>Subject</th>
                  <th>Content</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((template) => (
                  <tr key={template.id}>
                    <td>{template.id}</td>
                    <td>{template.name || "-"}</td>
                    <td>{template.type || "-"}</td>
                    <td>{template.subject || "-"}</td>
                    <td>{template.content || "-"}</td>
                    <td>
                      <div className="template-table-actions">
                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() => handleEdit(template)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => handleDelete(template.id)}
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