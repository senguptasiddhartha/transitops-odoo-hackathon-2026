import {
  Truck,
  Users,
  Route,
  Wrench,
} from "lucide-react";

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
    title: "Maintenance",
    value: 4,
    icon: Wrench,
    color: "bg-red-500",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl bg-white shadow p-6 flex justify-between items-center"
            >
              <div>
                <p className="text-slate-500 text-sm">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>
              </div>

              <div
                className={`${card.color} p-4 rounded-xl text-white`}
              >
                <Icon size={30} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Fleet Utilization
          </h2>

          <div className="h-64 flex items-center justify-center text-slate-400">
            Chart will be added here
          </div>
        </div>

        <div className="rounded-xl bg-white shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Trips
          </h2>

          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th>Trip</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td>Delhi → Mumbai</td>
                <td className="text-green-600">Completed</td>
              </tr>

              <tr className="border-b">
                <td>Guwahati → Shillong</td>
                <td className="text-blue-600">Running</td>
              </tr>

              <tr>
                <td>Kolkata → Ranchi</td>
                <td className="text-orange-600">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}