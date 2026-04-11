import { useState, useEffect } from "react";
import { Users, Cake, CalendarDays, CalendarRange, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import moment from "moment";

// ⚠️ If using base44, uncomment this
// import { base44 } from "@/api/base44Client";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      // ✅ If backend exists
      // const data = await base44.entities.Employee.list();

      // ✅ TEMP MOCK DATA (remove later)
      const data = [
        {
          id: 1,
          full_name: "Anu",
          date_of_birth: "1998-04-10",
        },
        {
          id: 2,
          full_name: "Rahul",
          anniversary_date: "2020-04-10",
        },
      ];

      setEmployees(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const today = moment().format("MM-DD");

  const todaysCelebrations = employees.filter((e) => {
    const bday = e.date_of_birth
      ? moment(e.date_of_birth).format("MM-DD")
      : null;

    const anniv = e.anniversary_date
      ? moment(e.anniversary_date).format("MM-DD")
      : null;

    return bday === today || anniv === today;
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-500 text-sm">
            Here's what's happening at Nambiar Builders today.
          </p>
        </div>

        <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
          <Send className="w-4 h-4 mr-2" />
          Send Welcome Mails
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">TOTAL EMPLOYEES</p>
          <h2 className="text-2xl font-bold">{employees.length}</h2>
          <p className="text-xs text-gray-400">{employees.length} total records</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">TODAY'S WISHES</p>
          <h2 className="text-2xl font-bold">{todaysCelebrations.length}</h2>
          <p className="text-xs text-gray-400">
            {moment().format("MMMM D, YYYY")}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">THIS WEEK</p>
          <h2 className="text-2xl font-bold">0</h2>
          <p className="text-xs text-gray-400">--</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">THIS MONTH</p>
          <h2 className="text-2xl font-bold">0</h2>
          <p className="text-xs text-gray-400">{moment().format("MMMM YYYY")}</p>
        </div>
      </div>

      {/* Wishes Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">TOTAL WISHES SENT</h3>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-pink-100 p-4 rounded-lg">
            <p className="text-xl font-bold">0</p>
            <p className="text-sm">Birthday Wishes</p>
          </div>

          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-xl font-bold">0</p>
            <p className="text-sm">Anniversary Wishes</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-xl font-bold">0</p>
            <p className="text-sm">Event Wishes</p>
          </div>
        </div>
      </div>

      {/* ✅ NEW: Today's Celebrations */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">
          Today's Celebrations
        </h3>

        {todaysCelebrations.length === 0 ? (
          <p className="text-gray-500 text-sm">No celebrations today.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {todaysCelebrations.map((emp) => {
              const isBirthday =
                emp.date_of_birth &&
                moment(emp.date_of_birth).format("MM-DD") === today;

              return (
                <div
                  key={emp.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-100"
                >
                  <div className="h-10 w-10 rounded-full bg-yellow-200 flex items-center justify-center font-bold">
                    {emp.full_name?.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-medium">{emp.full_name}</p>
                    <p className="text-xs text-gray-500">
                      {isBirthday ? "🎂 Birthday" : "💍 Anniversary"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}