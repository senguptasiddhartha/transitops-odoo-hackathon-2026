import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Truck,
  Users,
  Route,
  Wrench,
  BarChart3,
  Settings,
  Fuel,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Vehicles", path: "/vehicles", icon: Truck },
  { name: "Drivers", path: "/drivers", icon: Users },
  { name: "Trips", path: "/trips", icon: Route },
  { name: "Maintenance", path: "/maintenance", icon: Wrench },
  { name: "Reports", path: "/reports", icon: BarChart3 },
  { name: "Settings", path: "/settings", icon: Settings },
  { name: "Fuel & Expenses",path: "/fuel-and-expenses",icon: Fuel,},
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold text-blue-400 mb-8">
        🚚 TransitOps
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800 text-slate-300"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}