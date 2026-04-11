import { useState, useEffect } from "react";
import { Mail, Clock, CheckCircle, XCircle, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import moment from "moment";

export default function EmailQueue() {
  const [emails, setEmails] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Dummy data (replace later with API)
  useEffect(() => {
    setEmails([]);
  }, []);

  const scheduled = emails.filter((e) => e.status === "scheduled").length;
  const sent = emails.filter((e) => e.status === "sent").length;
  const delivered = emails.filter((e) => e.status === "delivered").length;
  const failed = emails.filter((e) => e.status === "failed").length;

  const filtered =
    filter === "all" ? emails : emails.filter((e) => e.status === filter);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Email Queue</h1>
          <p className="text-gray-500 text-sm">
            Track all outgoing emails
          </p>
        </div>

        <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
          <Send className="w-4 h-4 mr-2" />
          Send {scheduled} Scheduled
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">SCHEDULED</p>
            <h2 className="text-2xl font-bold">{scheduled}</h2>
          </div>
          <Clock className="text-gray-400" />
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">SENT</p>
            <h2 className="text-2xl font-bold">{sent}</h2>
          </div>
          <Mail className="text-green-400" />
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">DELIVERED</p>
            <h2 className="text-2xl font-bold">{delivered}</h2>
          </div>
          <CheckCircle className="text-green-500" />
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">FAILED</p>
            <h2 className="text-2xl font-bold">{failed}</h2>
          </div>
          <XCircle className="text-red-400" />
        </div>

      </div>

      {/* Filter */}
      <div>
        <select
          className="border rounded-lg px-4 py-2 text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="scheduled">Scheduled</option>
          <option value="sent">Sent</option>
          <option value="delivered">Delivered</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">

          <thead>
            <tr className="border-b bg-gray-50 text-gray-500 text-xs uppercase">
              <th className="text-left px-4 py-3">Recipient</th>
              <th className="text-left px-4 py-3">Subject</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  No emails in queue.
                </td>
              </tr>
            ) : (
              filtered.map((email) => (
                <tr key={email.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium">{email.recipient_name}</p>
                    <p className="text-xs text-gray-400">
                      {email.recipient_email}
                    </p>
                  </td>

                  <td className="px-4 py-3">{email.subject}</td>

                  <td className="px-4 py-3 capitalize">
                    {email.email_type}
                  </td>

                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded bg-gray-100">
                      {email.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-400">
                    {email.sent_date
                      ? moment(email.sent_date).format("MMM D, h:mm A")
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}