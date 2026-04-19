import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./Templates.css";

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    type: "Birthday",
    subject: "",
    htmlContent: "",
  });

  const loadTemplates = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/templates");
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.type || !form.subject || !form.htmlContent) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          type: form.type,
          subject: form.subject,
          htmlContent: form.htmlContent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create template");
      }

      setForm({
        name: "",
        type: "Birthday",
        subject: "",
        htmlContent: "",
      });

      setShowForm(false);
      await loadTemplates();

      toast.success("Template created successfully");
    } catch (err) {
      console.error("ADD TEMPLATE ERROR:", err);
      toast.error(err.message || "Failed to create template");
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
            className="new-template-btn"
            onClick={() => setShowForm(!showForm)}
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
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Welcome">Welcome</option>
                  <option value="Festival">Festival</option>
                  <option value="Event">Event</option>
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

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Saving..." : "Create Template"}
            </button>
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
                </tr>
              </thead>
              <tbody>
                {templates.map((template) => (
                  <tr key={template.id}>
                    <td>{template.id}</td>
                    <td>{template.name || "-"}</td>
                    <td>{template.type || "-"}</td>
                    <td>{template.subject || "-"}</td>
                    <td>{template.htmlContent || template.body || "-"}</td>
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