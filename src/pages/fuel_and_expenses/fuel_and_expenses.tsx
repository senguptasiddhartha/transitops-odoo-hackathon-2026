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
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Fuel & Expenses Ledger
          </h1>

          <p className="text-slate-500 mt-1">
            Audit fleet operational costs.
          </p>

        </div>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-slate-900 p-6 text-white">

          <p className="text-xs uppercase text-slate-400">
            Total Fleet Cost
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            ₹48,750
          </h2>

        </div>

        <div className="rounded-2xl bg-white shadow p-6 flex items-center gap-4">

          <div className="rounded-xl bg-blue-100 p-3">
            <Fuel className="text-blue-600"/>
          </div>

          <div>

            <p className="text-sm text-slate-500">
              Fuel Cost
            </p>

            <h2 className="text-2xl font-bold">
              ₹26,775
            </h2>

          </div>

        </div>

        <div className="rounded-2xl bg-white shadow p-6 flex items-center gap-4">

          <div className="rounded-xl bg-orange-100 p-3">
            <Wrench className="text-orange-600"/>
          </div>

          <div>

            <p className="text-sm text-slate-500">
              Maintenance
            </p>

            <h2 className="text-2xl font-bold">
              ₹8,500
            </h2>

          </div>

        </div>

        <div className="rounded-2xl bg-white shadow p-6 flex items-center gap-4">

          <div className="rounded-xl bg-purple-100 p-3">
            <Landmark className="text-purple-600"/>
          </div>

          <div>

            <p className="text-sm text-slate-500">
              Other Expenses
            </p>

            <h2 className="text-2xl font-bold">
              ₹13,475
            </h2>

          </div>

        </div>

      </div>

      <div className="rounded-2xl bg-white shadow p-5">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="font-bold">
              Vehicle Cost Summary
            </h3>

            <p className="text-sm text-slate-500">
              Filter by vehicle
            </p>

          </div>

          <select
            value={selectedVehicle}
            onChange={(e)=>
              setSelectedVehicle(e.target.value)
            }
            className="rounded-lg border px-3 py-2"
          >

            {vehicles.map((v)=>(
              <option key={v}>{v}</option>
            ))}

          </select>

        </div>

      </div>
            <div className="grid gap-6 lg:grid-cols-2">

        {/* Fuel Logs */}

        <div className="rounded-2xl bg-white shadow p-5">

          <h2 className="mb-4 text-xl font-semibold">
            Fuel Purchase Logs
          </h2>

          <div className="space-y-3">

            {filteredFuel.map((fuel) => (

              <div
                key={fuel.id}
                className="flex items-center justify-between rounded-xl border p-4 hover:bg-slate-50"
              >

                <div>

                  <p className="font-semibold">
                    {fuel.vehicle}
                  </p>

                  <p className="text-sm text-slate-500">
                    {fuel.liters} Litres
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-bold text-blue-600">
                    ₹{fuel.cost.toLocaleString()}
                  </p>

                  <p className="text-sm text-slate-500">
                    {fuel.date}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Expense Ledger */}

        <div className="rounded-2xl bg-white shadow p-5">

          <h2 className="mb-4 text-xl font-semibold">
            Expense Ledger
          </h2>

          <div className="space-y-3">

            {filteredExpenses.map((expense) => (

              <div
                key={expense.id}
                className="flex items-center justify-between rounded-xl border p-4 hover:bg-slate-50"
              >

                <div>

                  <p className="font-semibold">
                    {expense.vehicle}
                  </p>

                  <p className="text-sm text-slate-500">
                    {expense.category}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-bold text-purple-600">
                    ₹{expense.amount.toLocaleString()}
                  </p>

                  <p className="text-sm text-slate-500">
                    {expense.date}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
            <div className="rounded-2xl bg-white shadow p-6">

        <h2 className="text-xl font-semibold mb-5">
          Fleet Cost Breakdown
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <div className="rounded-xl border p-5">

            <p className="text-sm text-slate-500">
              Fuel
            </p>

            <h3 className="mt-2 text-2xl font-bold text-blue-600">
              ₹26,775
            </h3>

          </div>

          <div className="rounded-xl border p-5">

            <p className="text-sm text-slate-500">
              Maintenance
            </p>

            <h3 className="mt-2 text-2xl font-bold text-orange-600">
              ₹8,500
            </h3>

          </div>

          <div className="rounded-xl border p-5">

            <p className="text-sm text-slate-500">
              Insurance & Toll
            </p>

            <h3 className="mt-2 text-2xl font-bold text-purple-600">
              ₹13,475
            </h3>

          </div>

          <div className="rounded-xl border bg-slate-900 p-5 text-white">

            <p className="text-sm text-slate-400">
              Total Operational Cost
            </p>

            <h3 className="mt-2 text-3xl font-bold text-emerald-400">
              ₹48,750
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}
