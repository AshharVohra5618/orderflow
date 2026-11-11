
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   FiBell,
//   FiChevronDown,
//   FiUser,
//   FiMail,
//   FiBriefcase,
//   FiLogOut,
// } from "react-icons/fi";
// import { logout } from "../redux/authSlice";
// import { useNavigate } from "react-router-dom";

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const userName = user?.name || "User";

//   const initials = userName
//     .trim()
//     .split(/\s+/)
//     .slice(0, 2)
//     .map((word) => word[0]?.toUpperCase())
//     .join("");

//   const handleLogout = () => {
//     dispatch(logout());
//     setIsOpen(false);
//     navigate("/login");
//   };

//   return (
//     <header className="relative z-30 flex min-h-[76px] items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
//       {/* Welcome section */}
//       <div className="min-w-0">
//         <h2 className="truncate text-lg font-semibold tracking-tight text-slate-800 sm:text-xl">
//           Welcome, {userName}
//         </h2>

//         <p className="mt-1 text-sm text-slate-500">
//           Manage your business orders
//         </p>
//       </div>

//       {/* Navbar actions */}
//       <div className="ml-3 flex shrink-0 items-center gap-3 sm:gap-5">
//         <button
//           type="button"
//           aria-label="Notifications"
//           className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
//         >
//           <FiBell size={19} />
//         </button>

//         {/* Profile menu */}
//         <div className="relative">
//           <button
//             type="button"
//             onClick={() => setIsOpen((previous) => !previous)}
//             aria-expanded={isOpen}
//             aria-label="Open user profile"
//             className={`flex items-center gap-2 rounded-lg p-1.5 transition-colors ${
//               isOpen ? "bg-slate-100" : "hover:bg-slate-50"
//             }`}
//           >
//             <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white">
//               {initials || "U"}
//             </span>

//             <FiChevronDown
//               size={16}
//               className={`text-slate-500 transition-transform ${
//                 isOpen ? "rotate-180" : ""
//               }`}
//             />
//           </button>

//           {isOpen && (
//             <>
//               {/* Click outside to close */}
//               <button
//                 type="button"
//                 aria-label="Close profile menu"
//                 onClick={() => setIsOpen(false)}
//                 className="fixed inset-0 z-40 cursor-default"
//               />

//               <div className="absolute right-0 top-12 z-50 w-[min(300px,calc(100vw-2rem))] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
//                 {/* User details */}
//                 <div className="border-b border-slate-100 px-5 py-4">
//                   <p className="text-xs font-medium text-slate-400">
//                     SIGNED IN AS
//                   </p>

//                   <h3 className="mt-2 truncate text-sm font-semibold text-slate-800">
//                     {user?.name || "User"}
//                   </h3>

//                   <p className="mt-1 break-all text-sm text-slate-500">
//                     {user?.email || "Email unavailable"}
//                   </p>
//                 </div>

//                 {/* Account information */}
//                 <div className="space-y-4 px-5 py-4">
//                   <div className="flex items-start gap-3">
//                     <FiUser
//                       size={17}
//                       className="mt-0.5 shrink-0 text-slate-400"
//                     />

//                     <div className="min-w-0">
//                       <p className="text-xs text-slate-400">
//                         Full name
//                       </p>

//                       <p className="mt-1 break-words text-sm font-medium text-slate-700">
//                         {user?.name || "Not available"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <FiBriefcase
//                       size={17}
//                       className="mt-0.5 shrink-0 text-slate-400"
//                     />

//                     <div className="min-w-0">
//                       <p className="text-xs text-slate-400">
//                         Business name
//                       </p>

//                       <p className="mt-1 break-words text-sm font-medium text-slate-700">
//                         {user?.businessName || "Not available"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <FiMail
//                       size={17}
//                       className="mt-0.5 shrink-0 text-slate-400"
//                     />

//                     <div className="min-w-0">
//                       <p className="text-xs text-slate-400">
//                         Email address
//                       </p>

//                       <p className="mt-1 break-all text-sm font-medium text-slate-700">
//                         {user?.email || "Not available"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Logout */}
//                 <div className="border-t border-slate-100 p-3">
//                   <button
//                     type="button"
//                     onClick={handleLogout}
//                     className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
//                   >
//                     <FiLogOut size={17} />
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Navbar;





import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FiBell,
  FiChevronDown,
  FiUser,
  FiMail,
  FiBriefcase,
  FiLogOut,
} from "react-icons/fi";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  // console.log("Navbar Redux user:", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName = user?.name || "User";

  const initials = userName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <header className="relative z-30 flex min-h-[76px] items-center justify-between border-b border-slate-200 bg-white px-4 transition-colors dark:border-slate-700 dark:bg-slate-900 sm:px-6 lg:px-8">
      <div className="min-w-0">
        <h2 className="truncate text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100 sm:text-xl">
          Welcome, {userName}
        </h2>

        <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
          {user?.businessName || "Manage your business orders"}
        </p>
      </div>

      <div className="ml-3 flex shrink-0 items-center gap-3 sm:gap-5">
        {/* <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <FiBell size={19} />
        </button> */}

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((previous) => !previous)}
            aria-expanded={isOpen}
            aria-label="Open user profile"
            className={`flex items-center gap-2 rounded-lg p-1.5 transition-colors ${
              isOpen
                ? "bg-slate-100 dark:bg-slate-800"
                : "hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white">
              {initials || "U"}
            </span>

            <FiChevronDown
              size={16}
              className={`text-slate-500 transition-transform dark:text-slate-400 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <>
              <button
                type="button"
                aria-label="Close profile menu"
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-40 cursor-default"
              />

              <div className="absolute right-0 top-12 z-50 w-[min(300px,calc(100vw-2rem))] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-800">
                <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-400">
                    SIGNED IN AS
                  </p>

                  <h3 className="mt-2 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {userName}
                  </h3>

                  <p className="mt-1 break-all text-sm text-slate-500 dark:text-slate-400">
                    {user?.email || "Email unavailable"}
                  </p>
                </div>

                <div className="space-y-4 px-5 py-4">
                  <div className="flex items-start gap-3">
                    <FiUser
                      size={17}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">Full name</p>
                      <p className="mt-1 break-words text-sm font-medium text-slate-700 dark:text-slate-200">
                        {userName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FiBriefcase
                      size={17}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">Business name</p>
                      <p className="mt-1 break-words text-sm font-medium text-slate-700 dark:text-slate-200">
                        {user?.businessName || "Not available"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FiMail
                      size={17}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">Email address</p>
                      <p className="mt-1 break-all text-sm font-medium text-slate-700 dark:text-slate-200">
                        {user?.email || "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 p-3 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <FiLogOut size={17} />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
