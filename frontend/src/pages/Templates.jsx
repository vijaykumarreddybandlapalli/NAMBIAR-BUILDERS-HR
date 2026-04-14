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
export default function Settings() {
  return <h1>Settings</h1>;
}