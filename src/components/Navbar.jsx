

import { FiBell, FiUser } from "react-icons/fi";

function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 md:px-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Welcome to OrderFlow
        </h2>
        <p className="text-sm text-gray-500">
          Manage your business orders
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
        >
          <FiBell size={20} />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <FiUser size={20} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
