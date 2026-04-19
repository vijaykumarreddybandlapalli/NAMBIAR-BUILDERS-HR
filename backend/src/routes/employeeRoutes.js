// // import express from "express";
// // import prisma from "../config/db.js";

// // const router = express.Router();

// // // GET COUNT
// // router.get("/count", async (req, res) => {
// //   try {
// //     const count = await prisma.employee.count();
// //     res.json({ count });
// //   } catch (err) {
// //     console.error("COUNT ERROR:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // CREATE
// // router.post("/", async (req, res) => {
// //   try {
// //     const {
// //       employeeId,
// //       name,
// //       email,
// //       department,
// //       dateOfBirth,
// //       joiningDate,
// //     } = req.body;

// //     if (!name || !email || !department || !dateOfBirth || !joiningDate) {
// //       return res.status(400).json({
// //         error: "All fields are required",
// //       });
// //     }

// //     const dob = new Date(dateOfBirth);
// //     const doj = new Date(joiningDate);

// //     if (isNaN(dob.getTime()) || isNaN(doj.getTime())) {
// //       return res.status(400).json({
// //         error: "Invalid date format",
// //       });
// //     }

// //     const data = await prisma.employee.create({
// //       data: {
// //         employeeId: employeeId || null,
// //         name,
// //         email,
// //         department,
// //         dateOfBirth: dob,
// //         joiningDate: doj,
// //       },
// //     });

// //     res.status(201).json(data);
// //   } catch (err) {
// //     console.error("CREATE ERROR:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // GET ALL
// // router.get("/", async (req, res) => {
// //   try {
// //     const data = await prisma.employee.findMany({
// //       orderBy: { id: "desc" },
// //     });
// //     res.json(data);
// //   } catch (err) {
// //     console.error("GET ALL ERROR:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // UPDATE
// // router.put("/:id", async (req, res) => {
// //   try {
// //     const {
// //       employeeId,
// //       name,
// //       email,
// //       department,
// //       dateOfBirth,
// //       joiningDate,
// //     } = req.body;

// //     if (!name || !email || !department || !dateOfBirth || !joiningDate) {
// //       return res.status(400).json({
// //         error: "All fields are required",
// //       });
// //     }

// //     const dob = new Date(dateOfBirth);
// //     const doj = new Date(joiningDate);

// //     if (isNaN(dob.getTime()) || isNaN(doj.getTime())) {
// //       return res.status(400).json({
// //         error: "Invalid date format",
// //       });
// //     }

// //     const data = await prisma.employee.update({
// //       where: { id: Number(req.params.id) },
// //       data: {
// //         employeeId: employeeId || null,
// //         name,
// //         email,
// //         department,
// //         dateOfBirth: dob,
// //         joiningDate: doj,
// //       },
// //     });

// //     res.json(data);
// //   } catch (err) {
// //     console.error("UPDATE ERROR:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // DELETE
// // router.delete("/:id", async (req, res) => {
// //   try {
// //     await prisma.employee.delete({
// //       where: { id: Number(req.params.id) },
// //     });

// //     res.json({ message: "Deleted successfully" });
// //   } catch (err) {
// //     console.error("DELETE ERROR:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // BULK IMPORT
// // router.post("/bulk", async (req, res) => {
// //   try {
// //     const { employees } = req.body;

// //     if (!Array.isArray(employees) || employees.length === 0) {
// //       return res.status(400).json({ error: "Employees array is required" });
// //     }

// //     const preparedEmployees = employees
// //       .filter((emp) => emp.name && emp.email && emp.department && emp.dateOfBirth && emp.joiningDate)
// //       .map((emp) => ({
// //         employeeId: emp.employeeId || null,
// //         name: String(emp.name).trim(),
// //         email: String(emp.email).trim(),
// //         department: String(emp.department).trim(),
// //         dateOfBirth: new Date(emp.dateOfBirth),
// //         joiningDate: new Date(emp.joiningDate),
// //       }));

// //     const result = await prisma.employee.createMany({
// //       data: preparedEmployees,
// //       skipDuplicates: true,
// //     });

// //     res.status(201).json({
// //       success: true,
// //       message: "Employees imported successfully",
// //       insertedCount: result.count,
// //     });
// //   } catch (err) {
// //     console.error("BULK IMPORT ERROR:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // export default router;
// import express from "express";
// import prisma from "../config/db.js";
// import { transporter } from "../config/mailer.js";
// import { fillTemplate, getYearsOfService } from "../utils/templateEngine.js";

// const router = express.Router();

// router.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Email route is working. Use POST to send email."
//   });
// });

// router.post("/send", async (req, res) => {
//   try {
//     const { to, subject, message, templateType, employeeId } = req.body;

//     let finalSubject = subject || "";
//     let finalMessage = message || "";

//     if (templateType && employeeId) {
//       const employee = await prisma.employee.findUnique({
//         where: { id: Number(employeeId) }
//       });

//       const template = await prisma.template.findUnique({
//         where: { type: templateType }
//       });

//       if (!employee || !template) {
//         return res.status(404).json({
//           success: false,
//           error: "Employee or template not found"
//         });
//       }

//       const data = {
//         name: employee.name,
//         company: process.env.COMPANY_NAME || "Nambiar Builders",
//         years: getYearsOfService(employee.joiningDate)
//       };

//       finalSubject = fillTemplate(template.subject, data);
//       finalMessage = fillTemplate(template.content, data);
//     }

//     if (!to || !finalSubject || !finalMessage) {
//       return res.status(400).json({
//         success: false,
//         error: "to, subject and message are required"
//       });
//     }

//     await transporter.sendMail({
//       from: `"${process.env.COMPANY_NAME || "Nambiar Builders"}" <${process.env.EMAIL_USER}>`,
//       to,
//       subject: finalSubject,
//       html: finalMessage
//     });

//     res.json({
//       success: true,
//       message: "Email sent successfully"
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });

// router.get("/logs", async (req, res) => {
//   try {
//     const logs = await prisma.emailLog.findMany({
//       orderBy: { sentAt: "desc" }
//     });

//     res.json(logs);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });

// export default router;
import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

// GET COUNT
router.get("/count", async (req, res) => {
  try {
    const count = await prisma.employee.count();
    res.json({ count });
  } catch (err) {
    console.error("COUNT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const {
      employeeId,
      name,
      email,
      department,
      designation,
      dateOfBirth,
      joiningDate,
    } = req.body;

    if (!name || !email || !department || !dateOfBirth || !joiningDate) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const dob = new Date(dateOfBirth);
    const doj = new Date(joiningDate);

    if (isNaN(dob.getTime()) || isNaN(doj.getTime())) {
      return res.status(400).json({
        error: "Invalid date format",
      });
    }

    const data = await prisma.employee.create({
      data: {
        employeeId: employeeId || null,
        name,
        email,
        department,
        designation: designation || null,
        dateOfBirth: dob,
        joiningDate: doj,
      },
    });

    res.status(201).json(data);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const data = await prisma.employee.findMany({
      orderBy: { id: "desc" },
    });
    res.json(data);
  } catch (err) {
    console.error("GET ALL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const {
      employeeId,
      name,
      email,
      department,
      designation,
      dateOfBirth,
      joiningDate,
    } = req.body;

    if (!name || !email || !department || !dateOfBirth || !joiningDate) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const dob = new Date(dateOfBirth);
    const doj = new Date(joiningDate);

    if (isNaN(dob.getTime()) || isNaN(doj.getTime())) {
      return res.status(400).json({
        error: "Invalid date format",
      });
    }

    const data = await prisma.employee.update({
      where: { id: Number(req.params.id) },
      data: {
        employeeId: employeeId || null,
        name,
        email,
        department,
        designation: designation || null,
        dateOfBirth: dob,
        joiningDate: doj,
      },
    });

    res.json(data);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await prisma.employee.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// BULK IMPORT
router.post("/bulk", async (req, res) => {
  try {
    const { employees } = req.body;

    if (!Array.isArray(employees) || employees.length === 0) {
      return res.status(400).json({ error: "Employees array is required" });
    }

    const preparedEmployees = employees
      .filter(
        (emp) =>
          emp.name &&
          emp.email &&
          emp.department &&
          emp.dateOfBirth &&
          emp.joiningDate
      )
      .map((emp) => ({
        employeeId: emp.employeeId || null,
        name: String(emp.name).trim(),
        email: String(emp.email).trim(),
        department: String(emp.department).trim(),
        designation: emp.designation ? String(emp.designation).trim() : null,
        dateOfBirth: new Date(emp.dateOfBirth),
        joiningDate: new Date(emp.joiningDate),
      }));

    const result = await prisma.employee.createMany({
      data: preparedEmployees,
      skipDuplicates: true,
    });

    res.status(201).json({
      success: true,
      message: "Employees imported successfully",
      insertedCount: result.count,
    });
  } catch (err) {
    console.error("BULK IMPORT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;