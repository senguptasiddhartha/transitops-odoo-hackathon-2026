import { Bell, Search, User, Menu } from "lucide-react";

export default function Navbar() {
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
          <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-full transition-colors focus:outline-none">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>

          <div className="h-8 w-px bg-slate-200 mx-1"></div>

          <button className="flex items-center gap-3 p-1.5 hover:bg-slate-100 rounded-full pr-4 transition-colors focus:outline-none">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
              <User size={18} className="stroke-[2.5]" />
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-bold text-slate-700 leading-none">Fleet Manager</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}