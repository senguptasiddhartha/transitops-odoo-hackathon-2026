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
  { name: "Fuel & Expenses", path: "/fuel-and-expenses", icon: Fuel },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white border-r border-slate-100 min-h-screen flex flex-col transition-all shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Brand Logo Area */}
      <div className="h-20 flex items-center px-8 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20 shrink-0">
            <div className="absolute inset-0 rounded-xl bg-white/20 backdrop-blur-md mix-blend-overlay"></div>
            <Truck size={20} className="relative z-10 text-white stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            TransitOps
          </h1>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 mt-2">
          Main Menu
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3.5 rounded-2xl px-4 py-3 transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-100/50"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={`transition-colors ${
                      isActive
                        ? "text-blue-600"
                        : "text-slate-400 group-hover:text-blue-500"
                    }`}
                  />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>


    </aside>
  );
}