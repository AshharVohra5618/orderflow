
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiBarChart2,
  FiCreditCard,
  FiSettings,
  FiHelpCircle,
  FiChevronRight,
  FiZap,
} from "react-icons/fi";

function Sidebar({ onNavigate }) {
  const mainItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FiGrid,
      end: true,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: FiShoppingBag,
    },
  ];

  const businessItems = [
    { name: "Customers", icon: FiUsers },
    { name: "Products", icon: FiPackage },
    { name: "Analytics", icon: FiBarChart2 },
  ];

  const accountItems = [
    { name: "Subscription & Billing", icon: FiCreditCard },
    { name: "Help & Support", icon: FiHelpCircle },
  ];

  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-lg border-l-[3px] px-3 py-3 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "border-blue-600 bg-blue-100 text-blue-700"
        : "border-transparent text-slate-600 hover:bg-slate-300/60 hover:text-slate-900"
    }`;

  const comingSoonClass =
    "flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-500";

  return (
    <div className="flex min-h-full w-full flex-col bg-[#E2E8F0] p-4 text-slate-800 md:w-64 md:p-5">
      {/* Brand */}
      <div className="mb-8 flex items-center gap-3 px-2 pt-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
          <FiZap size={21} />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Order<span className="text-blue-700">Flow</span>
          </h1>

          <p className="mt-0.5 text-xs text-slate-500">
            Order Management
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-7">
        {/* Workspace */}
        <section>
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
            Workspace
          </p>

          <div className="space-y-1">
            {mainItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={onNavigate}
                  className={linkClass}
                >
                  <Icon size={18} className="shrink-0" />

                  <span className="flex-1">{item.name}</span>

                  <FiChevronRight
                    size={15}
                    className="opacity-0 transition-opacity group-hover:opacity-60"
                  />
                </NavLink>
              );
            })}
          </div>
        </section>

        {/* Business Management */}
        {/* <section>
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
            Business Management
          </p>

          <div className="space-y-1">
            {businessItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.name}
                  title={`${item.name} feature is coming soon`}
                  className={comingSoonClass}
                >
                  <Icon size={18} className="shrink-0" />

                  <span className="flex-1">{item.name}</span>

                  <span className="rounded-md bg-slate-300/70 px-1.5 py-1 text-[9px] font-medium text-slate-600">
                    Soon
                  </span>
                </div>
              );
            })}
          </div>
        </section> */}

        {/* Account */}
        <section>
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
            Account
          </p>

          <div className="space-y-1">
            <NavLink
              to="/settings"
              onClick={onNavigate}
              className={linkClass}
            >
              <FiSettings size={18} className="shrink-0" />

              <span className="flex-1">Settings</span>

              <FiChevronRight
                size={15}
                className="opacity-0 transition-opacity group-hover:opacity-60"
              />
            </NavLink>

            {accountItems.map((item) => {
              const Icon = item.icon;

              // return (
              //   <div
              //     key={item.name}
              //     title={`${item.name} feature is coming soon`}
              //     className={comingSoonClass}
              //   >
              //     <Icon size={18} className="shrink-0" />

              //     <span className="flex-1">{item.name}</span>

              //     <span className="whitespace-nowrap rounded-md bg-slate-300/70 px-1.5 py-1 text-[9px] font-medium text-slate-600">
              //       Soon
              //     </span>
              //   </div>
              // );
            })}
          </div>
        </section>
      </nav>

      {/* Business card */}
      <div className="mt-8 rounded-xl border border-slate-300 bg-slate-100 p-4">
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
          <FiZap size={19} />
        </div>

        <h3 className="text-sm font-semibold text-slate-800">
          Grow your business
        </h3>

        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          Manage your orders and keep your business organized with OrderFlow.
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-blue-700">
          <FiShoppingBag size={14} />
          <span>Built for your business</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 border-t border-slate-300 px-2 pt-4">
        <p className="text-center text-[11px] text-slate-500">
          OrderFlow © 2026
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
