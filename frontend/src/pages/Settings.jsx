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
export default function Settings() {
  return <h1>Settings</h1>;
}