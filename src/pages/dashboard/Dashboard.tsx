import {
  Truck,
  Users,
  Route,
  IndianRupee,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const cards = [
  {
    title: "Total Vehicles",
    value: 28,
    icon: Truck,
    color: "bg-blue-500",
  },
  {
    title: "Active Drivers",
    value: 18,
    icon: Users,
    color: "bg-green-500",
  },
  {
    title: "Active Trips",
    value: 12,
    icon: Route,
    color: "bg-orange-500",
  },
  {
    title: "Revenue Today",
    value: "₹42K",
    icon: IndianRupee,
    color: "bg-purple-500",
  },
];

const fleetData = [
  { day: "Mon", trips: 12 },
  { day: "Tue", trips: 18 },
  { day: "Wed", trips: 15 },
  { day: "Thu", trips: 22 },
  { day: "Fri", trips: 17 },
  { day: "Sat", trips: 11 },
];

const statusData = [
  { name: "Available", value: 18 },
  { name: "On Trip", value: 8 },
  { name: "Maintenance", value: 4 },
];

const COLORS = ["#22c55e", "#3b82f6", "#f97316"];

export default function Dashboard() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-1 text-slate-500">
          Welcome to TransitOps Fleet Management
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="flex items-center justify-between rounded-xl bg-white p-6 shadow hover:shadow-lg transition"
            >
              <div>
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div
                className={`${card.color} rounded-xl p-4 text-white`}
              >
                <Icon size={30} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-4 text-xl font-semibold">
            Fleet Utilization
          </h2>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fleetData}>
                <XAxis dataKey="day" />
                <Tooltip />
                <Bar
                  dataKey="trips"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-4 text-xl font-semibold">
            Vehicle Status
          </h2>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  outerRadius={90}
                  label
                >
                  {statusData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-4 text-xl font-semibold">
            Recent Trips
          </h2>

          <table className="w-full">

            <thead className="border-b">

              <tr>
                <th className="py-2 text-left">
                  Route
                </th>

                <th className="text-left">
                  Driver
                </th>

                <th className="text-left">
                  Status
                </th>
              </tr>

            </thead>

            <tbody>

              <tr className="border-b">
                <td className="py-3">
                  Delhi → Mumbai
                </td>

                <td>Rahul</td>

                <td className="font-medium text-green-600">
                  Completed
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-3">
                  Guwahati → Shillong
                </td>

                <td>Priya</td>

                <td className="font-medium text-blue-600">
                  Running
                </td>
              </tr>

              <tr>
                <td className="py-3">
                  Kolkata → Ranchi
                </td>

                <td>Amit</td>

                <td className="font-medium text-orange-600">
                  Pending
                </td>
              </tr>

            </tbody>

          </table>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-4 text-xl font-semibold">
            Maintenance Alerts
          </h2>

          <div className="space-y-4">

            <div className="rounded-lg border border-red-100 bg-red-50 p-4">
              <h3 className="font-semibold">
                Truck-14
              </h3>

              <p className="text-sm text-slate-600">
                Brake inspection due tomorrow
              </p>
            </div>

            <div className="rounded-lg border border-orange-100 bg-orange-50 p-4">
              <h3 className="font-semibold">
                Van-03
              </h3>

              <p className="text-sm text-slate-600">
                Oil change overdue
              </p>
            </div>

            <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-4">
              <h3 className="font-semibold">
                Truck-08
              </h3>

              <p className="text-sm text-slate-600">
                Insurance expires in 5 days
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}