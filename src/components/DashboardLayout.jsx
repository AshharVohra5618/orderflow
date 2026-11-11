
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { FiMenu, FiX } from "react-icons/fi";

function DashboardLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] overflow-y-auto bg-white shadow-xl transition-transform duration-300 md:sticky md:top-0 md:z-20 md:h-screen md:w-64 md:max-w-none md:translate-x-0 md:shadow-none ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex min-h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 md:hidden">
            <span className="font-semibold text-slate-800">
              OrderFlow Menu
            </span>

            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            >
              <FiX size={22} />
            </button>
          </div>

          <Sidebar />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md md:hidden">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 active:scale-95"
          >
            <FiMenu size={22} />
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-slate-900">
              OrderFlow
            </h1>
            <p className="truncate text-xs text-slate-500">
              Order Management
            </p>
          </div>
        </div>

        {/* Desktop and mobile navbar */}
        <div className="min-w-0">
          <Navbar />
        </div>

        {/* Page content */}
        <main className="w-full min-w-0 flex-1 p-4 sm:p-5 md:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
