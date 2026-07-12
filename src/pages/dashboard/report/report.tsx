import {
  TrendingUp,
  Gauge,
  IndianRupee,
  BarChart3,
  Download,
} from "lucide-react";

const vehicleReport = [
  {
    vehicle: "TRK-101",
    trips: 42,
    revenue: "₹2,40,000",
    cost: "₹1,55,000",
    roi: "35%",
  },
  {
    vehicle: "TRK-205",
    trips: 31,
    revenue: "₹1,75,000",
    cost: "₹1,20,000",
    roi: "28%",
  },
  {
    vehicle: "VAN-07",
    trips: 18,
    revenue: "₹80,000",
    cost: "₹55,000",
    roi: "22%",
  },
];

const tripReport = [
  {
    route: "Delhi → Mumbai",
    distance: "1450 km",
    fuel: "180 L",
    revenue: "₹45,000",
    status: "Completed",
  },
  {
    route: "Guwahati → Shillong",
    distance: "110 km",
    fuel: "16 L",
    revenue: "₹8,000",
    status: "Completed",
  },
  {
    route: "Kolkata → Ranchi",
    distance: "420 km",
    fuel: "58 L",
    revenue: "₹18,500",
    status: "Completed",
  },
];

export default function Report() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Reports & Analytics
          </h1>

          <p className="text-slate-500 mt-2">
            Fleet performance and operational insights.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          <Download size={18} />
          Export Report
        </button>

      </div>

      {/* KPI Cards */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-slate-900 text-white p-6 shadow">

          <div className="flex justify-between">
            <span className="text-sm text-slate-400">
              Fleet Utilization
            </span>

            <TrendingUp />
          </div>

          <h2 className="mt-3 text-3xl font-bold text-green-400">
            82%
          </h2>

        </div>

        <div className="rounded-2xl bg-white shadow p-6">

          <div className="flex justify-between">

            <span className="text-sm text-slate-500">
              Avg Fuel Efficiency
            </span>

            <Gauge className="text-blue-600" />

          </div>

          <h2 className="mt-3 text-3xl font-bold text-blue-600">
            8.9 km/L
          </h2>

        </div>

        <div className="rounded-2xl bg-white shadow p-6">

          <div className="flex justify-between">

            <span className="text-sm text-slate-500">
              Revenue
            </span>

            <IndianRupee className="text-green-600" />

          </div>

          <h2 className="mt-3 text-3xl font-bold text-green-600">
            ₹4.8L
          </h2>

        </div>

        <div className="rounded-2xl bg-white shadow p-6">

          <div className="flex justify-between">

            <span className="text-sm text-slate-500">
              ROI
            </span>

            <BarChart3 className="text-purple-600" />

          </div>

          <h2 className="mt-3 text-3xl font-bold text-purple-600">
            23%
          </h2>

        </div>

      </div>

      {/* Vehicle Report */}

      <div className="rounded-2xl bg-white shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Vehicle Performance Report
        </h2>

        <table className="w-full">

          <thead className="border-b">

            <tr>

              <th className="text-left py-3">Vehicle</th>
              <th>Trips</th>
              <th>Revenue</th>
              <th>Cost</th>
              <th>ROI</th>

            </tr>

          </thead>

          <tbody>

            {vehicleReport.map((v) => (

              <tr
                key={v.vehicle}
                className="border-b hover:bg-slate-50"
              >

                <td className="py-3 font-semibold">
                  {v.vehicle}
                </td>

                <td className="text-center">
                  {v.trips}
                </td>

                <td className="text-center text-green-600">
                  {v.revenue}
                </td>

                <td className="text-center">
                  {v.cost}
                </td>

                <td className="text-center font-bold text-blue-600">
                  {v.roi}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Trip Report */}

      <div className="rounded-2xl bg-white shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          Trip Performance Report
        </h2>

        <table className="w-full">

          <thead className="border-b">

            <tr>

              <th className="text-left py-3">Route</th>
              <th>Distance</th>
              <th>Fuel</th>
              <th>Revenue</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {tripReport.map((trip) => (

              <tr
                key={trip.route}
                className="border-b hover:bg-slate-50"
              >

                <td className="py-3 font-semibold">
                  {trip.route}
                </td>

                <td className="text-center">
                  {trip.distance}
                </td>

                <td className="text-center">
                  {trip.fuel}
                </td>

                <td className="text-center text-green-600">
                  {trip.revenue}
                </td>

                <td className="text-center">

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {trip.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}