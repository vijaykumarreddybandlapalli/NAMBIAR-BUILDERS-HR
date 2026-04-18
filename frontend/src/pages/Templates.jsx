// import { useState } from "react";
// import { Plus, Pencil, Trash2 } from "lucide-react";

// export default function Templates() {
//   const [templates, setTemplates] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     type: "Birthday",
//     subject: "",
//     body: "",
//     image: null,
//     active: true,
//   });

//   // Open Add
//   const openAdd = () => {
//     setForm({
//       name: "",
//       type: "Birthday",
//       subject: "",
//       body: "",
//       image: null,
//       active: true,
//     });
//     setEditIndex(null);
//     setShowModal(true);
//   };

//   // Open Edit
//   const openEdit = (index) => {
//     setForm(templates[index]);
//     setEditIndex(index);
//     setShowModal(true);
//   };

//   // Save Template
//   const saveTemplate = () => {
//     if (!form.name || !form.subject || !form.body) {
//       alert("Please fill all required fields");
//       return;
//     }

//     if (editIndex !== null) {
//       const updated = [...templates];
//       updated[editIndex] = form;
//       setTemplates(updated);
//     } else {
//       setTemplates([...templates, form]);
//     }

//     setShowModal(false);
//   };

//   // Delete Template
//   const deleteTemplate = (index) => {
//     const updated = templates.filter((_, i) => i !== index);
//     setTemplates(updated);
//   };

//   return (
//     <div className="space-y-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Templates</h1>

//         <button
//           onClick={openAdd}
//           className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-xl flex items-center gap-2"
//         >
//           <Plus size={16} />
//           New Template
//         </button>
//       </div>

//       {/* TEMPLATE CARDS */}
//       <div className="grid grid-cols-3 gap-4">
//         {templates.length === 0 && (
//           <p className="text-gray-500">No templates created.</p>
//         )}

//         {templates.map((t, index) => (
//           <div key={index} className="bg-white p-5 rounded-xl shadow">

//             <h2 className="font-semibold">{t.name}</h2>

//             <p className="text-sm text-gray-500 mt-1">
//               {t.subject}
//             </p>

//             <div className="flex justify-between items-center mt-3">
//               <span className="text-xs bg-gray-200 px-2 py-1 rounded">
//                 {t.type}
//               </span>

//               {t.active && (
//                 <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
//                   Active
//                 </span>
//               )}
//             </div>

//             <div className="flex gap-4 mt-4">
//               <Pencil
//                 className="w-4 h-4 cursor-pointer"
//                 onClick={() => openEdit(index)}
//               />
//               <Trash2
//                 className="w-4 h-4 text-red-500 cursor-pointer"
//                 onClick={() => deleteTemplate(index)}
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

//           <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto p-6 rounded-2xl relative">

//             {/* CLOSE */}
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute right-5 top-5 text-gray-500"
//             >
//               ✕
//             </button>

//             <h2 className="text-2xl font-semibold mb-6">
//               {editIndex !== null ? "Edit Template" : "New Template"}
//             </h2>

//             <div className="space-y-5">

//               {/* ROW 1 */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm font-medium">
//                     Template Name *
//                   </label>
//                   <input
//                     value={form.name}
//                     onChange={(e) =>
//                       setForm({ ...form, name: e.target.value })
//                     }
//                     className="w-full mt-1 border rounded-xl p-3"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium">
//                     Type *
//                   </label>
//                   <select
//                     value={form.type}
//                     onChange={(e) =>
//                       setForm({ ...form, type: e.target.value })
//                     }
//                     className="w-full mt-1 border rounded-xl p-3"
//                   >
//                     <option>Birthday</option>
//                     <option>Anniversary</option>
//                     <option>Welcome</option>
//                     <option>Event</option>
//                   </select>
//                 </div>
//               </div>

//               {/* SUBJECT */}
//               <div>
//                 <label className="text-sm font-medium">
//                   Email Subject *
//                 </label>
//                 <input
//                   value={form.subject}
//                   onChange={(e) =>
//                     setForm({ ...form, subject: e.target.value })
//                   }
//                   placeholder="e.g. Happy Birthday {{name}}!"
//                   className="w-full mt-1 border rounded-xl p-3"
//                 />
//               </div>

//               {/* BODY */}
//               <div>
//                 <label className="text-sm font-medium">
//                   Email Body *
//                 </label>
//                 <textarea
//                   value={form.body}
//                   onChange={(e) =>
//                     setForm({ ...form, body: e.target.value })
//                   }
//                   placeholder="Use {{name}} for employee name..."
//                   className="w-full mt-1 border rounded-xl p-3 h-40"
//                 />
//               </div>

//               {/* IMAGE */}
//               <div>
//                 <label className="text-sm font-medium">
//                   Template Image
//                 </label>

//                 <label className="mt-2 border-2 border-dashed rounded-xl h-32 flex flex-col justify-center items-center text-gray-400 cursor-pointer">
//                   📁 Upload
//                   <input
//                     type="file"
//                     hidden
//                     onChange={(e) =>
//                       setForm({ ...form, image: e.target.files[0] })
//                     }
//                   />
//                 </label>
//               </div>

//               {/* ACTIVE */}
//               <div className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   checked={form.active}
//                   onChange={(e) =>
//                     setForm({ ...form, active: e.target.checked })
//                   }
//                 />
//                 <span>Active Template</span>
//               </div>

//               {/* BUTTONS */}
//               <div className="flex justify-end gap-3 pt-4">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="px-6 py-2 rounded-xl border"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={saveTemplate}
//                   className="px-6 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500"
//                 >
//                   {editIndex !== null ? "Update" : "Create"}
//                 </button>
//               </div>

//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }
// // export default function Settings() {
// //   return <h1>Settings</h1>;
// // }

import { useEffect, useState } from "react";
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

      if (Array.isArray(data)) {
        setTemplates(data);
      } else {
        setTemplates([]);
      }
    } catch (err) {
      console.error("LOAD TEMPLATES ERROR:", err);
      setTemplates([]);
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
      alert("Please fill all fields");
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

      if (!res.ok) {
        throw new Error("Failed to create template");
      }

      setForm({
        name: "",
        type: "Birthday",
        subject: "",
        htmlContent: "",
      });

      setShowForm(false);
      await loadTemplates();
    } catch (err) {
      console.error("ADD TEMPLATE ERROR:", err);
      alert("Failed to create template");
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