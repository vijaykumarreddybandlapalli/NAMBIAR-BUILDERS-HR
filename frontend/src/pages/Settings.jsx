// import { useState } from "react";
// import { Save, UserPlus } from "lucide-react";
// import { Button } from "../components/ui/button";

// export default function Settings() {
//   const [settings, setSettings] = useState({
//     primaryEmail: "hr@nambiarbuilders.com",
//     secondaryEmail: "info@nambiarbuilders.com",
//     bcc: "admin@nambiarbuilders.com, manager@nambiarbuilders.com",
//     sendTime: "09:00",
//     welcomeDay: "Monday",
//     autoBirthday: true,
//     autoAnniversary: true,
//   });

//   const [users] = useState([
//     {
//       name: "Anu",
//       email: "anushanagireddy804@gmail.com",
//       role: "Admin",
//     },
//   ]);

//   return (
//     <div className="space-y-6">

//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold">Settings</h1>
//         <p className="text-gray-500 text-sm">
//           Configure email settings, scheduling, and user permissions
//         </p>
//       </div>

//       {/* EMAIL CONFIG */}
//       <div className="bg-white p-6 rounded-xl shadow space-y-4">
//         <h3 className="font-semibold">EMAIL CONFIGURATION</h3>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm">Primary From Email *</label>
//             <input
//               className="w-full mt-1 border rounded-lg p-2"
//               value={settings.primaryEmail}
//               onChange={(e) =>
//                 setSettings({ ...settings, primaryEmail: e.target.value })
//               }
//             />
//           </div>

//           <div>
//             <label className="text-sm">Secondary From Email</label>
//             <input
//               className="w-full mt-1 border rounded-lg p-2"
//               value={settings.secondaryEmail}
//               onChange={(e) =>
//                 setSettings({ ...settings, secondaryEmail: e.target.value })
//               }
//             />
//           </div>
//         </div>

//         <div>
//           <label className="text-sm">BCC Emails (comma separated)</label>
//           <input
//             className="w-full mt-1 border rounded-lg p-2"
//             value={settings.bcc}
//             onChange={(e) =>
//               setSettings({ ...settings, bcc: e.target.value })
//             }
//           />
//         </div>
//       </div>

//       {/* SCHEDULING */}
//       <div className="bg-white p-6 rounded-xl shadow space-y-4">
//         <h3 className="font-semibold">SCHEDULING</h3>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm">Send Time</label>
//             <input
//               type="time"
//               className="w-full mt-1 border rounded-lg p-2"
//               value={settings.sendTime}
//               onChange={(e) =>
//                 setSettings({ ...settings, sendTime: e.target.value })
//               }
//             />
//           </div>

//           <div>
//             <label className="text-sm">Welcome Mail Day</label>
//             <select
//               className="w-full mt-1 border rounded-lg p-2"
//               value={settings.welcomeDay}
//               onChange={(e) =>
//                 setSettings({ ...settings, welcomeDay: e.target.value })
//               }
//             >
//               <option>Monday</option>
//               <option>Tuesday</option>
//               <option>Wednesday</option>
//               <option>Thursday</option>
//               <option>Friday</option>
//             </select>
//           </div>
//         </div>

//         {/* Toggles */}
//         <div className="flex items-center justify-between">
//           <span>Auto-send Birthday Wishes</span>
//           <input
//             type="checkbox"
//             checked={settings.autoBirthday}
//             onChange={() =>
//               setSettings({
//                 ...settings,
//                 autoBirthday: !settings.autoBirthday,
//               })
//             }
//           />
//         </div>

//         <div className="flex items-center justify-between">
//           <span>Auto-send Anniversary Wishes</span>
//           <input
//             type="checkbox"
//             checked={settings.autoAnniversary}
//             onChange={() =>
//               setSettings({
//                 ...settings,
//                 autoAnniversary: !settings.autoAnniversary,
//               })
//             }
//           />
//         </div>

//         <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
//           <Save className="w-4 h-4 mr-2" />
//           Save Settings
//         </Button>
//       </div>

//       {/* USER MANAGEMENT */}
//       <div className="bg-white p-6 rounded-xl shadow space-y-4">
//         <h3 className="font-semibold">USER MANAGEMENT</h3>

//         <div className="flex gap-3">
//           <input
//             placeholder="user@example.com"
//             className="flex-1 border rounded-lg p-2"
//           />

//           <select className="border rounded-lg p-2">
//             <option>User</option>
//             <option>Admin</option>
//           </select>

//           <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
//             <UserPlus className="w-4 h-4 mr-2" />
//             Invite User
//           </Button>
//         </div>

//         {/* Table */}
//         <div className="mt-4 border rounded-xl overflow-hidden">
//           <div className="grid grid-cols-3 bg-gray-100 p-3 text-sm font-medium">
//             <div>NAME</div>
//             <div>EMAIL</div>
//             <div>ROLE</div>
//           </div>

//           {users.map((user, index) => (
//             <div
//               key={index}
//               className="grid grid-cols-3 p-3 border-t text-sm"
//             >
//               <div>{user.name}</div>
//               <div>{user.email}</div>
//               <div>
//                 <span className="bg-black text-white px-2 py-1 rounded-full text-xs">
//                   {user.role}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }
import { useState } from "react";
import "./Settings.css";

export default function Settings() {
  const [openSection, setOpenSection] = useState("email");

  const [settings, setSettings] = useState({
    primaryFromEmail: "hr@nambiarbuilders.com",
    secondaryFromEmail: "info@nambiarbuilders.com",
    bccEmails: "admin@nambiarbuilders.com",
    sendTime: "09:00",
    welcomeMailDay: "Monday",
    autoSendBirthday: true,
    autoSendAnniversary: true,
  });

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("User");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Anu",
      email: "anushanagireddy804@gmail.com",
      role: "Admin",
    },
  ]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveSettings = () => {
    console.log("Saved Settings:", settings);
    alert("Settings saved successfully");
  };

  const handleInviteUser = () => {
    if (!inviteEmail.trim()) {
      alert("Enter user email");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: "New User",
      email: inviteEmail,
      role: inviteRole,
    };

    setUsers((prev) => [...prev, newUser]);
    setInviteEmail("");
    setInviteRole("User");
    alert("User invited successfully");
  };

  return (
    <div className="settings-page">
      <div className="settings-header-card">
        <h1>Settings</h1>
        <p>Configure email settings, scheduling, and user permissions.</p>
      </div>

      <div className="settings-list">
        <div className="settings-item">
          <button
            className="settings-item-header"
            onClick={() => toggleSection("email")}
          >
            <div>
              <h2>Email Configuration</h2>
              <span>Sender emails and BCC setup</span>
            </div>
            <span className="arrow">{openSection === "email" ? "−" : "+"}</span>
          </button>

          {openSection === "email" && (
            <div className="settings-item-body">
              <div className="form-group">
                <label>Primary From Email</label>
                <input
                  type="email"
                  name="primaryFromEmail"
                  value={settings.primaryFromEmail}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Secondary From Email</label>
                <input
                  type="email"
                  name="secondaryFromEmail"
                  value={settings.secondaryFromEmail}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>BCC Emails</label>
                <input
                  type="text"
                  name="bccEmails"
                  value={settings.bccEmails}
                  onChange={handleChange}
                  placeholder="Comma separated emails"
                />
              </div>
            </div>
          )}
        </div>

        <div className="settings-item">
          <button
            className="settings-item-header"
            onClick={() => toggleSection("schedule")}
          >
            <div>
              <h2>Scheduling</h2>
              <span>Send time and auto-send controls</span>
            </div>
            <span className="arrow">
              {openSection === "schedule" ? "−" : "+"}
            </span>
          </button>

          {openSection === "schedule" && (
            <div className="settings-item-body">
              <div className="form-group">
                <label>Send Time</label>
                <input
                  type="time"
                  name="sendTime"
                  value={settings.sendTime}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Welcome Mail Day</label>
                <select
                  name="welcomeMailDay"
                  value={settings.welcomeMailDay}
                  onChange={handleChange}
                >
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </div>

              <div className="switch-row">
                <div>
                  <h3>Auto-send Birthday Wishes</h3>
                  <p>Send birthday emails automatically.</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="autoSendBirthday"
                    checked={settings.autoSendBirthday}
                    onChange={handleChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="switch-row">
                <div>
                  <h3>Auto-send Anniversary Wishes</h3>
                  <p>Send anniversary emails automatically.</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="autoSendAnniversary"
                    checked={settings.autoSendAnniversary}
                    onChange={handleChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="settings-item">
          <button
            className="settings-item-header"
            onClick={() => toggleSection("users")}
          >
            <div>
              <h2>User Management</h2>
              <span>Invite and manage users</span>
            </div>
            <span className="arrow">{openSection === "users" ? "−" : "+"}</span>
          </button>

          {openSection === "users" && (
            <div className="settings-item-body">
              <div className="invite-row">
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />

                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                >
                  <option>User</option>
                  <option>Admin</option>
                  <option>Staff</option>
                </select>

                <button className="invite-btn" onClick={handleInviteUser}>
                  Invite User
                </button>
              </div>

              <div className="users-list">
                {users.length === 0 ? (
                  <p className="empty-text">No users found.</p>
                ) : (
                  users.map((user) => (
                    <div className="user-card" key={user.id}>
                      <div>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                      </div>
                      <span className="role-badge">{user.role}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <button className="save-btn" onClick={handleSaveSettings}>
        Save Settings
      </button>
    </div>
  );
}