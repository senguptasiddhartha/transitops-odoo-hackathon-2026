import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

import Dashboard from "./pages/Dashboard/Dashboard";
import Vehicles from "./pages/Dashboard/vehicles/vehicles"; 
import Maintenance from "./pages/Dashboard/maintenance/maintenance";
import Trips from "./pages/Dashboard/trips/trips";


function Placeholder({ title }: { title: string }) {
  return (
    <div className="rounded-xl bg-white p-8 shadow">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-3 text-slate-500">
        This page is under development.
      </p>
    </div>
  );
}

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

              <Route
                path="/drivers"
                element={<Placeholder title="Drivers" />}
              />

              <Route path="/trips" element={<Trips />} />

              <Route path="/maintenance" element={<Maintenance />} />

              <Route
                path="/reports"
                element={<Placeholder title="Reports" />}
              />

              <Route
                path="/settings"
                element={<Placeholder title="Settings" />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}