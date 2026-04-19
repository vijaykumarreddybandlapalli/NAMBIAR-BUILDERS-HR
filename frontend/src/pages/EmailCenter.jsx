import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./EmailCenter.css";

export default function EmailCenter() {
  const [templates, setTemplates] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    to: "",
    employeeId: "",
    templateType: "",
    subject: "",
    message: "",
  });

  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    loadTemplates();
    loadEmployees();
  }, []);

  const loadTemplates = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/templates`);
      const data = await res.json();
      setTemplates(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("LOAD TEMPLATES ERROR:", error);
      toast.error("Failed to load templates");
    }
  };

  const loadEmployees = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/employees`);
      const data = await res.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("LOAD EMPLOYEES ERROR:", error);
      toast.error("Failed to load employees");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const replaceTemplateVariables = (text, employee) => {
    if (!text) return "";

    const currentDate = new Date();
    let years = "";

    if (employee?.joiningDate) {
      const joiningDate = new Date(employee.joiningDate);
      let serviceYears = currentDate.getFullYear() - joiningDate.getFullYear();

      const notCompletedYet =
        currentDate.getMonth() < joiningDate.getMonth() ||
        (currentDate.getMonth() === joiningDate.getMonth() &&
          currentDate.getDate() < joiningDate.getDate());

      if (notCompletedYet) {
        serviceYears--;
      }

      years = serviceYears >= 0 ? serviceYears : "";
    }

    return text
      .replace(/{{\s*name\s*}}/gi, employee?.name || "")
      .replace(/{{\s*company\s*}}/gi, "Nambiar Builders")
      .replace(/{{\s*years\s*}}/gi, String(years));
  };

  const handleEmployeeSelect = (e) => {
    const employeeId = e.target.value;

    const selectedEmployee = employees.find(
      (emp) => String(emp.id) === String(employeeId)
    );

    setForm((prev) => ({
      ...prev,
      employeeId,
      to: selectedEmployee?.email || "",
    }));

    if (selectedEmployee && form.templateType) {
      const selectedTemplate = templates.find(
        (tpl) => tpl.type === form.templateType
      );

      if (selectedTemplate) {
        setForm((prev) => ({
          ...prev,
          employeeId,
          to: selectedEmployee?.email || "",
          subject: replaceTemplateVariables(
            selectedTemplate.subject,
            selectedEmployee
          ),
          message: replaceTemplateVariables(
            selectedTemplate.content,
            selectedEmployee
          ),
        }));
      }
    }
  };

  const handleTemplateSelect = (e) => {
    const templateType = e.target.value;

    const selectedTemplate = templates.find(
      (template) => template.type === templateType
    );

    const selectedEmployee = employees.find(
      (emp) => String(emp.id) === String(form.employeeId)
    );

    setForm((prev) => ({
      ...prev,
      templateType,
      subject: selectedTemplate
        ? replaceTemplateVariables(selectedTemplate.subject, selectedEmployee)
        : "",
      message: selectedTemplate
        ? replaceTemplateVariables(selectedTemplate.content, selectedEmployee)
        : "",
    }));
  };

  const resetForm = () => {
    setForm({
      to: "",
      employeeId: "",
      templateType: "",
      subject: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.to || !form.subject || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/email/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: form.to.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          employeeId: form.employeeId || null,
          templateType: form.templateType || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      toast.success("Email sent successfully");
      resetForm();
    } catch (error) {
      console.error("SEND EMAIL ERROR:", error);
      toast.error(error.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-center-page">
      <div className="email-center-card">
        <div className="email-center-header">
          <div>
            <h1>Email Center</h1>
            <p>Send manual emails using saved templates.</p>
          </div>
        </div>

        <form className="email-form" onSubmit={handleSubmit}>
          <div className="email-row">
            <div className="form-group">
              <label>Select Employee</label>
              <select
                name="employeeId"
                value={form.employeeId}
                onChange={handleEmployeeSelect}
              >
                <option value="">Choose employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} - {employee.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Select Template</label>
              <select
                name="templateType"
                value={form.templateType}
                onChange={handleTemplateSelect}
              >
                <option value="">Choose template</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.type}>
                    {template.name} ({template.type})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>To</label>
            <input
              type="email"
              name="to"
              placeholder="Enter receiver email"
              value={form.to}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Email subject"
              value={form.subject}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Message / HTML Content</label>
            <textarea
              name="message"
              placeholder="Write your email message"
              value={form.message}
              onChange={handleChange}
              rows="10"
            />
          </div>

          <div className="email-action-row">
            <button type="submit" className="send-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Email"}
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={resetForm}
              disabled={loading}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}