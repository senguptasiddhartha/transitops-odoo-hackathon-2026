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
    color: "from-blue-500 to-indigo-600 shadow-blue-500/20",
  },
  {
    title: "Active Drivers",
    value: 18,
    icon: Users,
    color: "from-emerald-400 to-emerald-600 shadow-emerald-500/20",
  },
  {
    title: "Active Trips",
    value: 12,
    icon: Route,
    color: "from-orange-400 to-orange-600 shadow-orange-500/20",
  },
  {
    title: "Revenue Today",
    value: "₹42K",
    icon: IndianRupee,
    color: "from-purple-500 to-purple-700 shadow-purple-500/20",
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

const COLORS = ["#10b981", "#3b82f6", "#f97316"];

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-10">

      <div>
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500 font-medium">
          Welcome back to TransitOps Fleet Management
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group flex items-center justify-between rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border border-slate-100"
            >
              <div>
                <p className="text-sm font-semibold text-slate-500/80 uppercase tracking-wider">
                  {card.title}
                </p>

                <h2 className="mt-2 text-4xl font-black text-slate-800 tracking-tight group-hover:scale-105 transition-transform origin-left">
                  {card.value}
                </h2>
              </div>

              <div
                className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-lg shrink-0`}
              >
                <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-md mix-blend-overlay"></div>
                <Icon size={26} className="relative z-10 stroke-[2.5]" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/40 border border-slate-100">

          <h2 className="mb-8 text-xl font-bold text-slate-800">
            Fleet Utilization
          </h2>

          <div className="h-72 w-full">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fleetData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 500 }} dy={10} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }} 
                />
                <Bar
                  dataKey="trips"
                  radius={[8, 8, 8, 8]}
                  fill="url(#colorTrips)"
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/40 border border-slate-100">

          <h2 className="mb-8 text-xl font-bold text-slate-800">
            Vehicle Status
          </h2>

          <div className="h-72 w-full">

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  innerRadius={80}
                  outerRadius={105}
                  paddingAngle={5}
                  stroke="none"
                >
                  {statusData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="hover:opacity-80 transition-opacity outline-none"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                  itemStyle={{ color: '#334155', fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">

          <h2 className="mb-6 text-xl font-bold text-slate-800">
            Recent Trips
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase">
                    Route
                  </th>
                  <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase">
                    Driver
                  </th>
                  <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="group hover:bg-slate-50 transition-colors">
                  <td className="py-5 font-medium text-slate-700 pl-2">
                    Delhi → Mumbai
                  </td>
                  <td className="py-5 text-slate-500 font-medium">Rahul</td>
                  <td className="py-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="group hover:bg-slate-50 transition-colors">
                  <td className="py-5 font-medium text-slate-700 pl-2">
                    Guwahati → Shillong
                  </td>
                  <td className="py-5 text-slate-500 font-medium">Priya</td>
                  <td className="py-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100/50">
                      Running
                    </span>
                  </td>
                </tr>
                <tr className="group hover:bg-slate-50 transition-colors">
                  <td className="py-5 font-medium text-slate-700 pl-2">
                    Kolkata → Ranchi
                  </td>
                  <td className="py-5 text-slate-500 font-medium">Amit</td>
                  <td className="py-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-600 border border-orange-100/50">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/40 border border-slate-100">

          <h2 className="mb-6 text-xl font-bold text-slate-800">
            Maintenance Alerts
          </h2>

          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-red-100 bg-red-50/50 p-5 hover:shadow-md hover:bg-red-50 transition-all">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-400 rounded-l-2xl"></div>
              <h3 className="font-bold text-red-900 text-lg flex items-center gap-2 pl-2">
                Truck-14
              </h3>
              <p className="mt-1 text-sm font-medium text-red-700/80 pl-2">
                Brake inspection due tomorrow
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-orange-100 bg-orange-50/50 p-5 hover:shadow-md hover:bg-orange-50 transition-all">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-400 rounded-l-2xl"></div>
              <h3 className="font-bold text-orange-900 text-lg flex items-center gap-2 pl-2">
                Van-03
              </h3>
              <p className="mt-1 text-sm font-medium text-orange-700/80 pl-2">
                Oil change overdue
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-amber-100 bg-amber-50/50 p-5 hover:shadow-md hover:bg-amber-50 transition-all">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400 rounded-l-2xl"></div>
              <h3 className="font-bold text-amber-900 text-lg flex items-center gap-2 pl-2">
                Truck-08
              </h3>
              <p className="mt-1 text-sm font-medium text-amber-700/80 pl-2">
                Insurance expires in 5 days
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}