

import { NavLink } from "react-router-dom";
import { FiGrid, FiShoppingBag, FiX } from "react-icons/fi";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FiGrid />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <FiShoppingBag />,
    },
  ];

  return (
    <aside className="min-h-screen w-full bg-slate-900 p-5 text-white md:w-64 md:shrink-0">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">
          Order<span className="text-blue-400">Flow</span>
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Order Management
        </p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-10 rounded-xl bg-slate-800 p-4">
        <p className="font-medium">Manage your orders</p>
        <p className="mt-1 text-sm text-slate-400">
          Keep your business organized with OrderFlow.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
