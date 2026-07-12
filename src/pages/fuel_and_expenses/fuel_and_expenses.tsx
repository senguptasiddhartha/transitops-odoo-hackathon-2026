import { Fuel, Landmark, Wrench } from "lucide-react";
import { useState } from "react";

const vehicles = [
  "All Fleet Vehicles",
  "TRK-101",
  "TRK-205",
  "VAN-07",
  "BUS-12",
];

const fuelLogs = [
  {
    id: 1,
    vehicle: "TRK-101",
    liters: 120,
    cost: 12600,
    date: "12 Jul 2026",
  },
  {
    id: 2,
    vehicle: "TRK-205",
    liters: 90,
    cost: 9450,
    date: "11 Jul 2026",
  },
  {
    id: 3,
    vehicle: "VAN-07",
    liters: 45,
    cost: 4725,
    date: "10 Jul 2026",
  },
];

const expenses = [
  {
    id: 1,
    vehicle: "TRK-101",
    category: "Insurance",
    amount: 15000,
    date: "11 Jul 2026",
  },
  {
    id: 2,
    vehicle: "TRK-205",
    category: "Maintenance",
    amount: 8500,
    date: "10 Jul 2026",
  },
  {
    id: 3,
    vehicle: "VAN-07",
    category: "Toll",
    amount: 3200,
    date: "09 Jul 2026",
  },
];

export default function Expenses() {
  const [selectedVehicle, setSelectedVehicle] =
    useState("All Fleet Vehicles");

  const filteredFuel =
    selectedVehicle === "All Fleet Vehicles"
      ? fuelLogs
      : fuelLogs.filter(
          (f) => f.vehicle === selectedVehicle
        );

  const filteredExpenses =
    selectedVehicle === "All Fleet Vehicles"
      ? expenses
      : expenses.filter(
          (e) => e.vehicle === selectedVehicle
        );

  return (
    <div className="space-y-8 pb-10">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>

          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent">
            Fuel & Expenses Ledger
          </h1>

          <p className="text-slate-500 font-medium mt-2">
            Audit fleet operational costs and manage expenses.
          </p>

        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="group rounded-3xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-900/20 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

          <p className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-1">
            Total Fleet Cost
          </p>

          <h2 className="mt-2 text-4xl font-black text-white tracking-tight group-hover:scale-105 transition-transform origin-left">
            ₹48,750
          </h2>

        </div>

        <div className="group rounded-3xl bg-white shadow-xl shadow-slate-200/40 border border-slate-100 p-6 flex items-center justify-between hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

          <div>
            <p className="text-sm font-semibold text-slate-500/80 tracking-wider uppercase">
              Fuel Cost
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-800 tracking-tight group-hover:scale-105 transition-transform origin-left">
              ₹26,775
            </h2>
          </div>
          
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-md mix-blend-overlay"></div>
            <Fuel className="relative z-10 text-white stroke-[2.5]" size={26} />
          </div>

        </div>

        <div className="group rounded-3xl bg-white shadow-xl shadow-slate-200/40 border border-slate-100 p-6 flex items-center justify-between hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

          <div>
            <p className="text-sm font-semibold text-slate-500/80 tracking-wider uppercase">
              Maintenance
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-800 tracking-tight group-hover:scale-105 transition-transform origin-left">
              ₹8,500
            </h2>
          </div>

          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-md mix-blend-overlay"></div>
            <Wrench className="relative z-10 text-white stroke-[2.5]" size={26} />
          </div>

        </div>

        <div className="group rounded-3xl bg-white shadow-xl shadow-slate-200/40 border border-slate-100 p-6 flex items-center justify-between hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

          <div>
            <p className="text-sm font-semibold text-slate-500/80 tracking-wider uppercase">
              Other Expenses
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-800 tracking-tight group-hover:scale-105 transition-transform origin-left">
              ₹13,475
            </h2>
          </div>

          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-md mix-blend-overlay"></div>
            <Landmark className="relative z-10 text-white stroke-[2.5]" size={26} />
          </div>

        </div>

      </div>

      <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/40 border border-slate-100">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

          <div>

            <h3 className="text-xl font-bold text-slate-800">
              Vehicle Cost Summary
            </h3>

            <p className="text-sm font-medium text-slate-500 mt-1">
              Filter by vehicle to view specific expenses
            </p>

          </div>

          <select
            value={selectedVehicle}
            onChange={(e)=>
              setSelectedVehicle(e.target.value)
            }
            className="w-full md:w-64 rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 focus:bg-white focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700"
          >

            {vehicles.map((v)=>(
              <option key={v}>{v}</option>
            ))}

          </select>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          <div>
            <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Fuel Logs
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">

                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase pl-2">Vehicle</th>
                    <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase">Liters</th>
                    <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase text-right">Cost</th>
                    <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase text-right pr-2">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  {filteredFuel.map((f)=>(
                    <tr key={f.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-5 font-bold text-slate-700 pl-2 rounded-l-xl">{f.vehicle}</td>
                      <td className="py-5 font-medium text-slate-500">{f.liters} L</td>
                      <td className="py-5 text-right font-bold text-slate-800">₹{f.cost.toLocaleString()}</td>
                      <td className="py-5 text-right font-medium text-slate-400 pr-2 rounded-r-xl">{f.date}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              Expense Logs
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">

                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase pl-2">Vehicle</th>
                    <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase">Category</th>
                    <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase text-right">Amount</th>
                    <th className="pb-4 pt-2 font-semibold text-slate-400 text-xs tracking-wider uppercase text-right pr-2">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  {filteredExpenses.map((e)=>(
                    <tr key={e.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-5 font-bold text-slate-700 pl-2 rounded-l-xl">{e.vehicle}</td>
                      <td className="py-5 font-medium text-slate-500">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                          {e.category}
                        </span>
                      </td>
                      <td className="py-5 text-right font-bold text-rose-500">₹{e.amount.toLocaleString()}</td>
                      <td className="py-5 text-right font-medium text-slate-400 pr-2 rounded-r-xl">{e.date}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
