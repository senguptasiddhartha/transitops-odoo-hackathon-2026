import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

import Dashboard from "./pages/dashboard/Dashboard";
import Vehicles from "./pages/vehicles/vehicles";
import Drivers from "./pages/dashboard/drivers/drivers";
import Trips from "./pages/dashboard/trips/trips";
import Maintenance from "./pages/dashboard/maintenance/maintenance";
import FuelAndExpenses from "./pages/fuel_and_expenses/fuel_and_expenses";
import Settings from "./pages/settings/settings";
import Report from "./pages/dashboard/report/report";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          <Navbar />

          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/vehicles" element={<Vehicles />} />

              <Route path="/drivers" element={<Drivers />} />

              <Route path="/trips" element={<Trips />} />

              <Route path="/maintenance" element={<Maintenance />} />

              <Route
                path="/fuel-and-expenses"
                element={<FuelAndExpenses />}
              />

              <Route
  path="/reports"
  element={<Report />}
/>

              <Route
  path="/settings"
  element={<Settings />}
/>
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}