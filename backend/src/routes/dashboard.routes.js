import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

function isSameMonthDay(dateValue, today) {
  const date = new Date(dateValue);
  return (
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function isInNext7Days(dateValue, today) {
  const date = new Date(dateValue);

  const currentYearDate = new Date(
    today.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const start = new Date(today);
  start.setHours(0, 0, 0, 0);

  const end = new Date(today);
  end.setDate(end.getDate() + 7);
  end.setHours(23, 59, 59, 999);

  return currentYearDate >= start && currentYearDate <= end;
}

router.get("/summary", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { id: "desc" },
    });

    const today = new Date();

    const todayBirthdays = employees.filter(
      (emp) => emp.dateOfBirth && isSameMonthDay(emp.dateOfBirth, today)
    );

    const todayAnniversaries = employees.filter(
      (emp) => emp.joiningDate && isSameMonthDay(emp.joiningDate, today)
    );

    const weekBirthdays = employees.filter(
      (emp) => emp.dateOfBirth && isInNext7Days(emp.dateOfBirth, today)
    );

    const weekAnniversaries = employees.filter(
      (emp) => emp.joiningDate && isInNext7Days(emp.joiningDate, today)
    );

    res.json({
      totalEmployees: employees.length,
      todayBirthdaysCount: todayBirthdays.length,
      todayAnniversariesCount: todayAnniversaries.length,
      weekBirthdaysCount: weekBirthdays.length,
      weekAnniversariesCount: weekAnniversaries.length,
      todayBirthdays,
      todayAnniversaries,
      weekBirthdays,
      weekAnniversaries,
    });
  } catch (error) {
    console.error("DASHBOARD SUMMARY ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;