import {
  User,
  Bell,
  Shield,
  Moon,
  Globe,
  Database,
} from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-8 pb-10">

      <div>
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent">
          Settings
        </h1>

        <p className="text-slate-500 font-medium mt-2">
          Manage your TransitOps preferences and configuration.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Profile */}

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 p-8 hover:shadow-2xl transition-all duration-300">

          <div className="flex items-center gap-4 mb-8">

            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-md mix-blend-overlay"></div>
              <User className="relative z-10 text-white stroke-[2.5]" size={22} />
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              Profile
            </h2>

          </div>

          <div className="space-y-5">

            <div>
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                Full Name
              </label>

              <input
                className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3.5 focus:bg-white focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800"
                defaultValue="Admin User"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                Email Address
              </label>

              <input
                className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3.5 focus:bg-white focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800"
                defaultValue="admin@transitops.com"
              />
            </div>

          </div>

        </div>

        {/* Notifications */}

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 p-8 hover:shadow-2xl transition-all duration-300">

          <div className="flex items-center gap-4 mb-8">

            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-md mix-blend-overlay"></div>
              <Bell className="relative z-10 text-white stroke-[2.5]" size={22} />
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              Notifications
            </h2>

          </div>

          <div className="space-y-6 mt-2">

            <label className="flex items-center justify-between group cursor-pointer">

              <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Email Alerts</span>

              <div className="relative inline-block w-12 h-6 rounded-full bg-slate-200 transition-colors group-hover:bg-slate-300">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <span className="absolute inset-y-0 left-0 m-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-6 peer-checked:bg-white"></span>
                <div className="absolute inset-0 rounded-full ring-2 ring-blue-500/0 peer-checked:bg-blue-500 transition-all"></div>
              </div>

            </label>

            <label className="flex items-center justify-between group cursor-pointer">

              <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">SMS Alerts</span>

              <div className="relative inline-block w-12 h-6 rounded-full bg-slate-200 transition-colors group-hover:bg-slate-300">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <span className="absolute inset-y-0 left-0 m-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-6 peer-checked:bg-white"></span>
                <div className="absolute inset-0 rounded-full ring-2 ring-blue-500/0 peer-checked:bg-blue-500 transition-all"></div>
              </div>

            </label>

            <label className="flex items-center justify-between group cursor-pointer">

              <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Maintenance Reminders</span>

              <div className="relative inline-block w-12 h-6 rounded-full bg-slate-200 transition-colors group-hover:bg-slate-300">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <span className="absolute inset-y-0 left-0 m-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-6 peer-checked:bg-white"></span>
                <div className="absolute inset-0 rounded-full ring-2 ring-blue-500/0 peer-checked:bg-blue-500 transition-all"></div>
              </div>

            </label>

          </div>

        </div>

        {/* Preferences */}

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 p-8 hover:shadow-2xl transition-all duration-300">

          <div className="flex items-center gap-4 mb-8">

            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-md mix-blend-overlay"></div>
              <Moon className="relative z-10 text-white stroke-[2.5]" size={22} />
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              Preferences
            </h2>

          </div>

          <div className="space-y-5">

            <div>
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                Theme
              </label>
              <select className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3.5 focus:bg-white focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800">

                <option>Light Theme</option>

                <option disabled>Dark Theme (Coming Soon)</option>

              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                Language
              </label>
              <select className="w-full rounded-xl bg-slate-50 border border-slate-200 p-3.5 focus:bg-white focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-800">

                <option>English</option>

                <option>Hindi</option>

              </select>
            </div>

          </div>

        </div>

        {/* System */}

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 p-8 hover:shadow-2xl transition-all duration-300">

          <div className="flex items-center gap-4 mb-8">

            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-md mix-blend-overlay"></div>
              <Shield className="relative z-10 text-white stroke-[2.5]" size={22} />
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              System Information
            </h2>

          </div>

          <div className="space-y-6 mt-2">

            <div className="flex justify-between items-center py-2 border-b border-slate-50">

              <span className="font-semibold text-slate-500">Version</span>

              <span className="font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">v1.0.0</span>

            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-50">

              <span className="font-semibold text-slate-500">Database</span>

              <span className="flex items-center gap-2 font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                <Database size={16} strokeWidth={2.5} />
                Connected
              </span>

            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-50">

              <span className="font-semibold text-slate-500">Region</span>

              <span className="flex items-center gap-2 font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">
                <Globe size={16} strokeWidth={2.5} />
                India
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}