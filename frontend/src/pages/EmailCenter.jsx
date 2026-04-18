// export default function EmailCenter() {
//     return <h1>Email Center</h1>;
//   }

import { useState } from "react";
import "./EmailCenter.css";

export default function EmailCenter() {
  const [customEmail, setCustomEmail] = useState({
    recipient: "",
    subject: "",
    message: "",
  });

  const [employeeEmail, setEmployeeEmail] = useState({
    employeeId: "",
  });

  const [loadingCustom, setLoadingCustom] = useState(false);
  const [loadingEmployee, setLoadingEmployee] = useState(false);

  const handleCustomChange = (e) => {
    setCustomEmail({ ...customEmail, [e.target.name]: e.target.value });
  };

  const handleEmployeeChange = (e) => {
    setEmployeeEmail({ ...employeeEmail, [e.target.name]: e.target.value });
  };

  const sendCustomEmail = async (e) => {
    e.preventDefault();

    if (
      !customEmail.recipient.trim() ||
      !customEmail.subject.trim() ||
      !customEmail.message.trim()
    ) {
      alert("Please fill all custom email fields");
      return;
    }

    try {
      setLoadingCustom(true);

      const res = await fetch("http://localhost:5000/api/email/send-custom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: customEmail.recipient,
          subject: customEmail.subject,
          message: customEmail.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send custom email");
      }

      alert("Custom email sent successfully");

      setCustomEmail({
        recipient: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("SEND CUSTOM EMAIL ERROR:", err);
      alert(err.message || "Failed to send custom email");
    } finally {
      setLoadingCustom(false);
    }
  };

  const sendEmployeeEmail = async (type) => {
    if (!employeeEmail.employeeId.trim()) {
      alert("Please enter Employee DB ID");
      return;
    }

    try {
      setLoadingEmployee(true);

      const res = await fetch("http://localhost:5000/api/email/send-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: employeeEmail.employeeId,
          type,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || `Failed to send ${type} email`);
      }

      alert(`${type} email sent successfully`);
      setEmployeeEmail({ employeeId: "" });
    } catch (err) {
      console.error("SEND EMPLOYEE EMAIL ERROR:", err);
      alert(err.message || "Failed to send employee email");
    } finally {
      setLoadingEmployee(false);
    }
  };

  return (
    <div className="email-center-page">
      <div className="email-card">
        <h1>Email Center</h1>
        <p>Send custom emails and employee greeting emails from one place.</p>

        <form onSubmit={sendCustomEmail}>
          <div className="form-group">
            <label>Recipient Email</label>
            <input
              type="email"
              name="recipient"
              placeholder="Recipient email"
              value={customEmail.recipient}
              onChange={handleCustomChange}
            />
          </div>

          <div className="form-group">
            <label>Email Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Email subject"
              value={customEmail.subject}
              onChange={handleCustomChange}
            />
          </div>

          <div className="form-group">
            <label>Email Message</label>
            <textarea
              name="message"
              placeholder="Write your email message here"
              value={customEmail.message}
              onChange={handleCustomChange}
              rows="8"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loadingCustom}>
            {loadingCustom ? "Sending..." : "Send Custom Email"}
          </button>
        </form>
      </div>

      <div className="email-card">
        <h2>Send Employee Emails</h2>
        <p>Send birthday or anniversary email using employee database ID.</p>

        <div className="form-group">
          <label>Employee DB ID</label>
          <input
            type="text"
            name="employeeId"
            placeholder="Employee DB ID (example: 1)"
            value={employeeEmail.employeeId}
            onChange={handleEmployeeChange}
          />
        </div>

        <div className="button-row">
          <button
            type="button"
            className="action-btn"
            disabled={loadingEmployee}
            onClick={() => sendEmployeeEmail("birthday")}
          >
            {loadingEmployee ? "Sending..." : "Birthday Email"}
          </button>

          <button
            type="button"
            className="action-btn"
            disabled={loadingEmployee}
            onClick={() => sendEmployeeEmail("anniversary")}
          >
            {loadingEmployee ? "Sending..." : "Anniversary Email"}
          </button>
        </div>
      </div>
    </div>
  );
}