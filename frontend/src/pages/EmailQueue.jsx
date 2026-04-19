import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Send,
  Clock3,
  Mail,
  CheckCircle2,
  XCircle,
  RefreshCcw,
} from "lucide-react";
import "./EmailQueue.css";

export default function EmailQueue() {
  const [queue, setQueue] = useState([]);
  const [summary, setSummary] = useState({
    scheduled: 0,
    sent: 0,
    delivered: 0,
    failed: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [sendingScheduled, setSendingScheduled] = useState(false);

  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    refreshQueue();
  }, []);

  const safeJson = async (res) => {
    const text = await res.text();

    try {
      return JSON.parse(text);
    } catch (error) {
      console.error("RAW RESPONSE:", text);
      throw new Error("Server did not return valid JSON");
    }
  };

  const refreshQueue = async () => {
    try {
      setLoading(true);

      const [queueRes, summaryRes] = await Promise.all([
        fetch(`${API_BASE}/api/email-queue`),
        fetch(`${API_BASE}/api/email-queue/summary`),
      ]);

      const queueData = await safeJson(queueRes);
      const summaryData = await safeJson(summaryRes);

      if (!queueRes.ok) {
        throw new Error(queueData.error || "Failed to load queue");
      }

      if (!summaryRes.ok) {
        throw new Error(summaryData.error || "Failed to load queue summary");
      }

      setQueue(Array.isArray(queueData) ? queueData : []);
      setSummary({
        scheduled: Number(summaryData.scheduled || 0),
        sent: Number(summaryData.sent || 0),
        delivered: Number(summaryData.delivered || 0),
        failed: Number(summaryData.failed || 0),
        total: Number(summaryData.total || 0),
      });
    } catch (error) {
      console.error("LOAD QUEUE ERROR:", error);
      toast.error(error.message || "Failed to load email queue");
      setQueue([]);
      setSummary({
        scheduled: 0,
        sent: 0,
        delivered: 0,
        failed: 0,
        total: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendScheduled = async () => {
    try {
      setSendingScheduled(true);

      const res = await fetch(`${API_BASE}/api/email-queue/send-scheduled`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await safeJson(res);

      if (!res.ok) {
        throw new Error(data.error || "Failed to send scheduled emails");
      }

      toast.success(data.message || "Scheduled emails processed");
      await refreshQueue();
    } catch (error) {
      console.error("SEND SCHEDULED ERROR:", error);
      toast.error(error.message || "Failed to send scheduled emails");
    } finally {
      setSendingScheduled(false);
    }
  };

  const formatDateTime = (value) => {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleString();
  };

  return (
    <div className="email-queue-page">
      <div className="email-queue-header">
        <div>
          <h1 className="queue-title">Email Queue</h1>
          <p className="queue-subtext">Track all outgoing emails</p>
        </div>

        <div className="queue-header-actions">
          <button
            type="button"
            className="secondary-btn"
            onClick={refreshQueue}
            disabled={loading}
          >
            <RefreshCcw size={18} />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>

          <button
            type="button"
            className="send-btn"
            onClick={handleSendScheduled}
            disabled={sendingScheduled}
          >
            <Send size={18} />
            <span>
              {sendingScheduled
                ? "Sending..."
                : `Send ${summary.scheduled} Scheduled`}
            </span>
          </button>
        </div>
      </div>

      <div className="queue-stats">
        <div className="stat-card">
          <div className="stat-icon scheduled-bg">
            <Clock3 size={22} />
          </div>
          <p className="stat-label">Scheduled</p>
          <h2 className="stat-value">{loading ? "..." : summary.scheduled}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon sent-bg">
            <Mail size={22} />
          </div>
          <p className="stat-label">Sent</p>
          <h2 className="stat-value">{loading ? "..." : summary.sent}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon delivered-bg">
            <CheckCircle2 size={22} />
          </div>
          <p className="stat-label">Delivered</p>
          <h2 className="stat-value">{loading ? "..." : summary.delivered}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon failed-bg">
            <XCircle size={22} />
          </div>
          <p className="stat-label">Failed</p>
          <h2 className="stat-value">{loading ? "..." : summary.failed}</h2>
        </div>
      </div>

      <div className="queue-table-card">
        <div className="queue-table-top">
          <h2 className="table-title">Email Log List</h2>
          <p className="table-total">
            Total Records: <strong>{loading ? "..." : summary.total}</strong>
          </p>
        </div>

        {loading ? (
          <p className="empty-text">Loading queue...</p>
        ) : queue.length === 0 ? (
          <p className="empty-text">No email logs found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="queue-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee</th>
                  <th>To</th>
                  <th>Subject</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Sent At</th>
                  <th>Error</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.employeeName || "-"}</td>
                    <td>{item.to || "-"}</td>
                    <td>{item.subject || "-"}</td>
                    <td className="capitalize">{item.type || "-"}</td>
                    <td>
                      <span className={`status-badge ${item.status}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>{formatDateTime(item.sentAt)}</td>
                    <td>{item.error || "-"}</td>
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