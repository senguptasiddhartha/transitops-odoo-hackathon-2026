import { Bell, Search, User, Menu, X, Circle } from "lucide-react";
import { useState } from "react";

const notifications = [
  { 
    id: 1, 
    title: 'Maintenance Alert', 
    message: 'Truck-14 brake inspection due tomorrow.', 
    time: '5m ago', 
    unread: true,
    type: 'alert'
  },
  { 
    id: 2, 
    title: 'Trip Completed', 
    message: 'Delhi → Mumbai route finished successfully.', 
    time: '1h ago', 
    unread: true,
    type: 'success'
  },
  { 
    id: 3, 
    title: 'System Update', 
    message: 'TransitOps v1.0.0 has been deployed.', 
    time: '2d ago', 
    unread: false,
    type: 'info'
  },
];

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-20 bg-white/70 backdrop-blur-2xl border-b border-slate-100 flex items-center justify-between px-8 transition-all">
      <div className="flex items-center gap-4">
        {/* Mobile menu button placeholder */}
        <button className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Menu size={20} />
        </button>
        <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          TransitOps
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group hidden sm:block">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search anywhere..."
            className="w-64 pl-10 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium text-slate-700 placeholder:text-slate-400 placeholder:font-normal"
          />
        </div>

        <div className="flex items-center gap-3">
          
          {/* Notifications Wrapper */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2.5 rounded-full transition-colors focus:outline-none ${
                showNotifications 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                {/* Invisible backdrop to close on outside click */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowNotifications(false)}
                />
                
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50 bg-slate-50/50">
                    <h3 className="font-bold text-slate-800">Notifications</h3>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${
                            n.unread ? 'bg-blue-50/30' : ''
                          }`}
                        >
                          <div className="mt-1 shrink-0">
                            {n.unread ? (
                              <Circle size={10} className="fill-blue-500 text-blue-500" />
                            ) : (
                              <Circle size={10} className="text-slate-300" />
                            )}
                          </div>
                          <div>
                            <h4 className={`text-sm font-bold ${n.unread ? 'text-slate-900' : 'text-slate-600'}`}>
                              {n.title}
                            </h4>
                            <p className="text-xs font-medium text-slate-500 mt-0.5 leading-relaxed">
                              {n.message}
                            </p>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-2">
                              {n.time}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center">
                        <p className="text-sm font-medium text-slate-500">You're all caught up!</p>
                      </div>
                    )}
                  </div>

                  <div className="p-2 border-t border-slate-50 bg-slate-50/50">
                    <button className="w-full py-2 text-xs font-bold text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                      Mark all as read
                    </button>
                  </div>

                </div>
              </>
            )}
          </div>

          <div className="h-8 w-px bg-slate-200 mx-1"></div>

          <button className="flex items-center gap-3 p-1.5 hover:bg-slate-100 rounded-full pr-4 transition-colors focus:outline-none">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shrink-0">
              <User size={18} className="stroke-[2.5]" />
            </div>
            <div className="hidden md:flex flex-col items-start shrink-0">
              <span className="text-sm font-bold text-slate-700 leading-none">Fleet Manager</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}