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
    <div className="space-y-8 pb-10">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent">
            Reports & Analytics
          </h1>

          <p className="text-slate-500 font-medium mt-2">
            Fleet performance and operational insights.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
          <Download size={18} strokeWidth={2.5} />
          Export Report
        </button>

      </div>

      {/* KPI Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="group rounded-3xl bg-slate-900 text-white p-6 shadow-xl shadow-slate-900/20 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-slate-400 tracking-wider uppercase">
              Fleet Utilization
            </span>

            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-md mix-blend-overlay"></div>
              <TrendingUp className="relative z-10 text-white stroke-[2.5]" size={22} />
            </div>
          </div>

          <h2 className="mt-4 text-4xl font-black text-white tracking-tight group-hover:scale-105 transition-transform origin-left">
            82%
          </h2>

        </div>

        <div className="group rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 border border-slate-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

          <div className="flex justify-between items-start">

            <span className="text-sm font-semibold text-slate-500/80 tracking-wider uppercase">
              Avg Fuel Efficiency
            </span>

            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-md mix-blend-overlay"></div>
              <Gauge className="relative z-10 text-white stroke-[2.5]" size={22} />
            </div>

          </div>

          <h2 className="mt-4 text-4xl font-black text-slate-800 tracking-tight group-hover:scale-105 transition-transform origin-left">
            8.9 <span className="text-2xl text-slate-400 font-bold">km/L</span>
          </h2>

        </div>

        <div className="group rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 border border-slate-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

          <div className="flex justify-between items-start">

            <span className="text-sm font-semibold text-slate-500/80 tracking-wider uppercase">
              Total Revenue
            </span>

            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-md mix-blend-overlay"></div>
              <IndianRupee className="relative z-10 text-white stroke-[2.5]" size={22} />
            </div>

          </div>

          <h2 className="mt-4 text-4xl font-black text-slate-800 tracking-tight group-hover:scale-105 transition-transform origin-left">
            ₹4.8L
          </h2>

        </div>

        <div className="group rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/40 border border-slate-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

          <div className="flex justify-between items-start">

            <span className="text-sm font-semibold text-slate-500/80 tracking-wider uppercase">
              Average ROI
            </span>

            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-md mix-blend-overlay"></div>
              <BarChart3 className="relative z-10 text-white stroke-[2.5]" size={22} />
            </div>

          </div>

          <h2 className="mt-4 text-4xl font-black text-slate-800 tracking-tight group-hover:scale-105 transition-transform origin-left">
            23%
          </h2>

        </div>

      </div>

      {/* Vehicle Report */}

      <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">

        <h2 className="mb-6 text-xl font-bold text-slate-800">
          Vehicle Performance Report
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">

            <thead>

              <tr className="border-b border-slate-100">

                <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase pl-2">Vehicle</th>
                <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase text-center">Trips</th>
                <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase text-center">Revenue</th>
                <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase text-center">Cost</th>
                <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase text-right pr-2">ROI</th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-50">

              {vehicleReport.map((v) => (

                <tr
                  key={v.vehicle}
                  className="group hover:bg-slate-50 transition-colors"
                >

                  <td className="py-5 font-bold text-slate-700 pl-2 rounded-l-xl">
                    {v.vehicle}
                  </td>

                  <td className="py-5 text-center font-medium text-slate-500">
                    {v.trips}
                  </td>

                  <td className="py-5 text-center font-bold text-emerald-600">
                    {v.revenue}
                  </td>

                  <td className="py-5 text-center font-bold text-rose-500">
                    {v.cost}
                  </td>

                  <td className="py-5 text-right font-bold text-purple-600 pr-2 rounded-r-xl">
                    {v.roi}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        </div>

      </div>

      {/* Route Efficiency */}

      <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">

        <h2 className="mb-6 text-xl font-bold text-slate-800">
          Route Efficiency Analysis
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">

            <thead>

              <tr className="border-b border-slate-100">

                <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase pl-2">Route</th>
                <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase text-center">Distance</th>
                <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase text-center">Fuel</th>
                <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase text-center">Revenue</th>
                <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase text-right pr-2">Status</th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-50">

              {tripReport.map((t) => (

                <tr
                  key={t.route}
                  className="group hover:bg-slate-50 transition-colors"
                >

                  <td className="py-5 font-bold text-slate-700 pl-2 rounded-l-xl">
                    {t.route}
                  </td>

                  <td className="py-5 text-center font-medium text-slate-500">
                    {t.distance}
                  </td>

                  <td className="py-5 text-center font-medium text-slate-500">
                    {t.fuel}
                  </td>

                  <td className="py-5 text-center font-bold text-emerald-600">
                    {t.revenue}
                  </td>

                  <td className="py-5 text-right pr-2 rounded-r-xl">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                      {t.status}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}