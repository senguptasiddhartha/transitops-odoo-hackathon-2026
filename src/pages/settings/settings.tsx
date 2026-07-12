import {
  User,
  Bell,
  Shield,
  Moon,
  Globe,
  Database,
  Save,
} from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your TransitOps preferences.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Profile */}

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex items-center gap-3 mb-6">

            <User className="text-blue-600" />

            <h2 className="text-xl font-semibold">
              Profile
            </h2>

          </div>

          <div className="space-y-4">

            <div>
              <label className="text-sm text-slate-500">
                Full Name
              </label>

              <input
                className="w-full mt-1 rounded-lg border p-3"
                defaultValue="Admin User"
              />
            </div>

            <div>
              <label className="text-sm text-slate-500">
                Email
              </label>

              <input
                className="w-full mt-1 rounded-lg border p-3"
                defaultValue="admin@transitops.com"
              />
            </div>

          </div>

        </div>

        {/* Notifications */}

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex items-center gap-3 mb-6">

            <Bell className="text-orange-500"/>

            <h2 className="text-xl font-semibold">
              Notifications
            </h2>

          </div>

          <div className="space-y-5">

            <label className="flex justify-between">

              <span>Email Alerts</span>

              <input type="checkbox" defaultChecked />

            </label>

            <label className="flex justify-between">

              <span>SMS Alerts</span>

              <input type="checkbox" defaultChecked />

            </label>

            <label className="flex justify-between">

              <span>Maintenance Reminder</span>

              <input type="checkbox" defaultChecked />

            </label>

          </div>

        </div>

        {/* Preferences */}

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex items-center gap-3 mb-6">

            <Moon className="text-purple-600"/>

            <h2 className="text-xl font-semibold">
              Preferences
            </h2>

          </div>

          <div className="space-y-4">

            <select className="w-full border rounded-lg p-3">

              <option>Light Theme</option>

              <option>Dark Theme</option>

            </select>

            <select className="w-full border rounded-lg p-3">

              <option>English</option>

              <option>Hindi</option>

            </select>

          </div>

        </div>

        {/* System */}

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex items-center gap-3 mb-6">

            <Shield className="text-green-600"/>

            <h2 className="text-xl font-semibold">
              System Information
            </h2>

          </div>

          <div className="space-y-4 text-slate-600">

            <div className="flex justify-between">

              <span>Version</span>

              <span>v1.0.0</span>

            </div>

            <div className="flex justify-between">

              <span>Database</span>

              <span className="flex items-center gap-2">
                <Database size={16}/>
                Connected
              </span>

            </div>

            <div className="flex justify-between">

              <span>Region</span>

              <span className="flex items-center gap-2">
                <Globe size={16}/>
                India
              </span>

            </div>

          </div>

        </div>

      </div>

      <div className="flex justify-end">

        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">

          <Save size={18}/>

          Save Settings

        </button>

      </div>

    </div>
  );
}