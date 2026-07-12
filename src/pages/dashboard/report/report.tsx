const vehicleReports = [
  {
    registration: "TX-551-CDL",
    vehicle: "Volvo FH16",
    type: "Heavy",
    runs: 0,
    revenue: 0,
    costs: 625,
    earnings: -625,
    price: 145000,
    efficiency: "N/A",
    roi: -0.43,
  },
  {
    registration: "CA-889-XTR",
    vehicle: "Freightliner Cascadia",
    type: "Semi-Trailer",
    runs: 0,
    revenue: 0,
    costs: 150,
    earnings: -150,
    price: 160000,
    efficiency: "N/A",
    roi: -0.09,
  },
  {
    registration: "NY-442-VAN",
    vehicle: "Ford F-550 Super Duty",
    type: "Light",
    runs: 0,
    revenue: 0,
    costs: 1295,
    earnings: -1295,
    price: 65000,
    efficiency: "N/A",
    roi: -1.99,
  },
  {
    registration: "FL-112-MTR",
    vehicle: "Mercedes-Benz Sprinter",
    type: "Cargo",
    runs: 1,
    revenue: 794,
    costs: 165,
    earnings: 629,
    price: 48000,
    efficiency: "3.45 km/L",
    roi: 1.31,
  },
  {
    registration: "IL-309-BOX",
    vehicle: "Isuzu NPR-HD",
    type: "Box",
    runs: 0,
    revenue: 0,
    costs: 270,
    earnings: -270,
    price: 72000,
    efficiency: "N/A",
    roi: -0.38,
  },
  {
    registration: "NV-771-RET",
    vehicle: "Kenworth T680",
    type: "Semi-Trailer",
    runs: 0,
    revenue: 0,
    costs: 4800,
    earnings: -4800,
    price: 155000,
    efficiency: "N/A",
    roi: -3.1,
  },
];

const tripReports = [
  {
    id: "#",
    route: "Miami to Orlando",
    equipment: "FL-112-MTR",
    distance: 380,
    fuel: 110,
    revenue: 794,
    efficiency: "3.45 km/L",
  },
];

function formatMoney(value: number) {
  const formatted = Math.abs(value).toLocaleString("en-US");

  if (value < 0) {
    return `$-${formatted}`;
  }

  return `$${formatted}`;
}

function downloadCSV(filename: string, rows: (string | number)[][]) {
  const csv = rows
    .map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export default function Report() {
  const exportVehicleReports = () => {
    const rows: (string | number)[][] = [
      [
        "Registration",
        "Vehicle",
        "Type",
        "Runs",
        "Total Revenue",
        "Total Costs",
        "Net Earnings",
        "Acquisition Price",
        "Average Fuel Efficiency",
        "Computed ROI",
      ],
      ...vehicleReports.map((vehicle) => [
        vehicle.registration,
        vehicle.vehicle,
        vehicle.type,
        vehicle.runs,
        vehicle.revenue,
        vehicle.costs,
        vehicle.earnings,
        vehicle.price,
        vehicle.efficiency,
        `${vehicle.roi}%`,
      ]),
    ];

    downloadCSV("vehicle-roi-report.csv", rows);
  };

  const exportTripReports = () => {
    const rows: (string | number)[][] = [
      [
        "Trip ID",
        "Route",
        "Equipment",
        "Distance",
        "Fuel Logged",
        "Revenue",
        "Efficiency",
      ],
      ...tripReports.map((trip) => [
        trip.id,
        trip.route,
        trip.equipment,
        trip.distance,
        trip.fuel,
        trip.revenue,
        trip.efficiency,
      ]),
    ];

    downloadCSV("trip-fuel-performance-report.csv", rows);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-400 pb-5">
        <h1 className="text-3xl font-bold text-slate-900">
          Reports & ROI Analytics
        </h1>

        <p className="mt-1 text-slate-500">
          Audit fleet-wide return on investment, operational efficiency indexes,
          and cargo profits.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-slate-900 p-5 shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-blue-300">
                Active Fleet Utilization
              </p>

              <p className="mt-3 text-3xl font-bold text-cyan-400">20%</p>
            </div>

            <span className="text-cyan-400">↗</span>
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Non-retired trucks currently dispatched
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-5 shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-blue-300">
                Fleet Fuel Efficiency
              </p>

              <p className="mt-3 text-3xl font-bold text-blue-500">
                3.45
                <span className="ml-1 text-sm font-normal">km/L</span>
              </p>
            </div>

            <span className="text-blue-500">◔</span>
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Average ratio across completed routes
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-5 shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-blue-300">
                Net Profit Margin
              </p>

              <p className="mt-3 text-3xl font-bold text-emerald-400">
                $-6,511
              </p>
            </div>

            <span className="text-emerald-400">$</span>
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Completed Revenue minus all Expenses
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-5 shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-blue-300">
                Global Asset ROI
              </p>

              <p className="mt-3 text-3xl font-bold text-purple-400">-1.01%</p>
            </div>

            <span className="text-purple-400">▥</span>
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Percentage of fleet capital recovered
          </p>
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl bg-slate-900 shadow">
        <div className="flex flex-col gap-4 border-b border-slate-700 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              Vehicle ROI & Capital Recovery Ledger
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              ROI is computed using completed trip revenues, maintenance
              overheads, fuel logs, and miscellaneous expenses.
            </p>
          </div>

          <button
            type="button"
            onClick={exportVehicleReports}
            className="rounded-xl border border-slate-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1050px] w-full text-left">
            <thead className="bg-slate-950">
              <tr className="text-xs uppercase text-blue-300">
                <th className="px-5 py-4">Registration</th>
                <th className="px-5 py-4">Vehicle Details</th>
                <th className="px-5 py-4 text-center">Runs</th>
                <th className="px-5 py-4">Total Revenue</th>
                <th className="px-5 py-4">Total Costs</th>
                <th className="px-5 py-4">Net Earnings</th>
                <th className="px-5 py-4">Acq. Price</th>
                <th className="px-5 py-4">Avg Fuel Eff.</th>
                <th className="px-5 py-4 text-right">Computed ROI</th>
              </tr>
            </thead>

            <tbody>
              {vehicleReports.map((vehicle) => (
                <tr
                  key={vehicle.registration}
                  className="border-t border-slate-800 text-sm text-slate-200"
                >
                  <td className="px-5 py-4 font-mono font-semibold text-white">
                    {vehicle.registration}
                  </td>

                  <td className="px-5 py-4">
                    <p>{vehicle.vehicle}</p>
                    <p className="text-xs text-slate-400">
                      ({vehicle.type})
                    </p>
                  </td>

                  <td className="px-5 py-4 text-center font-mono">
                    {vehicle.runs}
                  </td>

                  <td className="px-5 py-4 font-mono text-emerald-400">
                    {formatMoney(vehicle.revenue)}
                  </td>

                  <td className="px-5 py-4 font-mono text-slate-400">
                    {formatMoney(vehicle.costs)}
                  </td>

                  <td
                    className={`px-5 py-4 font-mono font-semibold ${
                      vehicle.earnings < 0
                        ? "text-red-500"
                        : "text-white"
                    }`}
                  >
                    {formatMoney(vehicle.earnings)}
                  </td>

                  <td className="px-5 py-4 font-mono text-slate-400">
                    {formatMoney(vehicle.price)}
                  </td>

                  <td className="px-5 py-4 font-mono text-white">
                    {vehicle.efficiency}
                  </td>

                  <td
                    className={`px-5 py-4 text-right font-mono font-semibold ${
                      vehicle.roi < 0
                        ? "text-red-500"
                        : "text-emerald-400"
                    }`}
                  >
                    {vehicle.roi > 0 ? "+" : ""}
                    {vehicle.roi.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl bg-slate-900 shadow">
        <div className="flex flex-col gap-4 border-b border-slate-700 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              Trip-by-Trip Fuel Performance & Mileage Report
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Individual details of completed transport runs, showing actual
              diesel consumption metrics.
            </p>
          </div>

          <button
            type="button"
            onClick={exportTripReports}
            className="rounded-xl border border-slate-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[850px] w-full text-left">
            <thead className="bg-slate-950">
              <tr className="text-xs uppercase text-blue-300">
                <th className="px-5 py-4">Trip ID</th>
                <th className="px-5 py-4">Route</th>
                <th className="px-5 py-4">Equipment #</th>
                <th className="px-5 py-4">Distance (km)</th>
                <th className="px-5 py-4">Fuel Logged (L)</th>
                <th className="px-5 py-4">Revenue</th>
                <th className="px-5 py-4 text-right">Efficiency</th>
              </tr>
            </thead>

            <tbody>
              {tripReports.map((trip) => (
                <tr
                  key={`${trip.equipment}-${trip.route}`}
                  className="border-t border-slate-800 text-sm text-slate-200"
                >
                  <td className="px-5 py-4 font-mono font-semibold">
                    {trip.id}
                  </td>

                  <td className="px-5 py-4 font-semibold text-white">
                    {trip.route}
                  </td>

                  <td className="px-5 py-4 font-mono text-slate-400">
                    {trip.equipment}
                  </td>

                  <td className="px-5 py-4 font-mono">
                    {trip.distance} km
                  </td>

                  <td className="px-5 py-4 font-mono">
                    {trip.fuel} L
                  </td>

                  <td className="px-5 py-4 font-mono text-emerald-400">
                    {formatMoney(trip.revenue)}
                  </td>

                  <td className="px-5 py-4 text-right font-mono font-semibold text-blue-400">
                    {trip.efficiency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}