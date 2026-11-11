

// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   FiUser,
//   FiBriefcase,
//   FiBell,
//   FiShield,
//   FiMoon,
//   FiMail,
//   FiLogOut,
//   FiCheck,
//   FiLock,
// } from "react-icons/fi";
// import { logout } from "../redux/authSlice";

// const defaultPreferences = {
//   orderNotifications: true,
//   emailNotifications: false,
//   weeklySummary: true,
//   darkMode: false,
// };

// function Settings() {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [preferences, setPreferences] = useState(defaultPreferences);
//   const [saved, setSaved] = useState(false);

//   useEffect(() => {
//     try {
//       const stored = localStorage.getItem("orderflow-preferences");

//       if (stored) {
//         setPreferences({
//           ...defaultPreferences,
//           ...JSON.parse(stored),
//         });
//       }
//     } catch {
//       setPreferences(defaultPreferences);
//     }
//   }, []);

//   const updatePreference = (key) => {
//     setPreferences((previous) => ({
//       ...previous,
//       [key]: !previous[key],
//     }));
//     setSaved(false);
//   };

//   const savePreferences = () => {
//     localStorage.setItem(
//       "orderflow-preferences",
//       JSON.stringify(preferences)
//     );
//     setSaved(true);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   const Toggle = ({ checked, onChange }) => (
//     <button
//       type="button"
//       role="switch"
//       aria-checked={checked}
//       onClick={onChange}
//       className={`relative h-6 w-11 shrink-0 rounded-full transition ${
//         checked ? "bg-blue-600" : "bg-slate-300"
//       }`}
//     >
//       <span
//         className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
//           checked ? "left-[22px]" : "left-0.5"
//         }`}
//       />
//     </button>
//   );

//   const PreferenceRow = ({
//     icon: Icon,
//     title,
//     description,
//     settingKey,
//   }) => (
//     <div className="flex items-center justify-between gap-4 py-4">
//       <div className="flex min-w-0 items-start gap-3">
//         <div className="mt-0.5 rounded-lg bg-slate-100 p-2 text-slate-600">
//           <Icon size={18} />
//         </div>

//         <div className="min-w-0">
//           <p className="text-sm font-semibold text-slate-800">{title}</p>
//           <p className="mt-1 text-xs leading-5 text-slate-500">
//             {description}
//           </p>
//         </div>
//       </div>

//       <Toggle
//         checked={preferences[settingKey]}
//         onChange={() => updatePreference(settingKey)}
//       />
//     </div>
//   );

//   return (
//     <div className="mx-auto max-w-5xl space-y-6 pb-8">
//       {/* Page heading */}
//       <div>
//         <p className="text-sm font-medium text-blue-600">Account</p>
//         <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
//           Settings
//         </h1>
//         <p className="mt-2 text-sm text-slate-500">
//           Manage your profile, preferences and account.
//         </p>
//       </div>

//       {/* Profile */}
//       <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//         <div className="flex items-center gap-3 border-b border-slate-100 p-5 sm:p-6">
//           <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
//             <FiUser size={22} />
//           </div>
//           <div>
//             <h2 className="font-semibold text-slate-900">
//               Profile Information
//             </h2>
//             <p className="mt-1 text-sm text-slate-500">
//               Your registered account details
//             </p>
//           </div>
//         </div>

//         <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
//           <div>
//             <label className="mb-2 block text-sm font-medium text-slate-700">
//               Full Name
//             </label>
//             <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
//               <FiUser className="shrink-0 text-slate-400" />
//               <span className="break-words text-sm text-slate-700">
//                 {user?.name || "User"}
//               </span>
//             </div>
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-medium text-slate-700">
//               Email Address
//             </label>
//             <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
//               <FiMail className="shrink-0 text-slate-400" />
//               <span className="break-all text-sm text-slate-700">
//                 {user?.email || "Email unavailable"}
//               </span>
//             </div>
//           </div>

//           <div className="sm:col-span-2">
//             <label className="mb-2 block text-sm font-medium text-slate-700">
//               Business Name
//             </label>
//             <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
//               <FiBriefcase className="shrink-0 text-slate-400" />
//               <span className="break-words text-sm text-slate-700">
//                 {user?.businessName || "Business name unavailable"}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-slate-100 bg-slate-50 px-5 py-3 sm:px-6">
//           <p className="text-xs leading-5 text-slate-500">
//             Profile editing will be connected to your backend in the next step.
//           </p>
//         </div>
//       </section>

//       {/* Preferences */}
//       <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
//         <div className="flex items-center gap-3 border-b border-slate-100 p-5 sm:p-6">
//           <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
//             <FiBell size={22} />
//           </div>
//           <div>
//             <h2 className="font-semibold text-slate-900">
//               Preferences
//             </h2>
//             <p className="mt-1 text-sm text-slate-500">
//               Choose your dashboard preferences
//             </p>
//           </div>
//         </div>

//         <div className="divide-y divide-slate-100 px-5 sm:px-6">
//           <PreferenceRow
//             icon={FiBell}
//             title="Order Notifications"
//             description="Preference for alerts about order activity"
//             settingKey="orderNotifications"
//           />

//           <PreferenceRow
//             icon={FiMail}
//             title="Email Notifications"
//             description="Preference for receiving account emails"
//             settingKey="emailNotifications"
//           />

//           <PreferenceRow
//             icon={FiCheck}
//             title="Weekly Summary"
//             description="Preference for a weekly business summary"
//             settingKey="weeklySummary"
//           />

//           <PreferenceRow
//             icon={FiMoon}
//             title="Dark Mode"
//             description="Save your preferred appearance setting"
//             settingKey="darkMode"
//           />
//         </div>

//         <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
//           <p className="text-xs text-slate-500">
//             Preferences are saved in this browser.
//           </p>

//           <button
//             type="button"
//             onClick={savePreferences}
//             className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
//           >
//             <FiCheck size={17} />
//             Save Preferences
//           </button>
//         </div>

//         {saved && (
//           <p
//             role="status"
//             className="px-5 pb-4 text-sm font-medium text-emerald-600 sm:px-6"
//           >
//             Preferences saved successfully!
//           </p>
//         )}
//       </section>

//       {/* Security */}
//       <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//         <div className="flex items-start gap-3">
//           <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
//             <FiShield size={22} />
//           </div>

//           <div className="min-w-0 flex-1">
//             <h2 className="font-semibold text-slate-900">
//               Security & Privacy
//             </h2>
//             <p className="mt-1 text-sm leading-6 text-slate-500">
//               Protect your OrderFlow account and keep your information secure.
//             </p>

//             <div className="mt-4 flex items-start gap-3 rounded-xl border border-slate-200 p-4">
//               <FiLock className="mt-0.5 shrink-0 text-slate-500" />
//               <div>
//                 <p className="text-sm font-medium text-slate-800">
//                   Password & Login
//                 </p>
//                 <p className="mt-1 text-xs leading-5 text-slate-500">
//                   Password changes will be available after connecting the
//                   secure backend endpoint.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Account actions */}
//       <section className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm sm:p-6">
//         <h2 className="font-semibold text-slate-900">Account Actions</h2>
//         <p className="mt-1 text-sm text-slate-500">
//           Sign out of your OrderFlow account on this device.
//         </p>

//         <button
//           type="button"
//           onClick={handleLogout}
//           className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 sm:w-auto"
//         >
//           <FiLogOut size={18} />
//           Log Out
//         </button>
//       </section>
//     </div>
//   );
// }

// export default Settings;




import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiBriefcase,
  FiBell,
  FiShield,
  FiMoon,
  FiMail,
  FiLogOut,
  FiCheck,
  FiLock,
  FiSave,
} from "react-icons/fi";

import { logout, updateUser } from "../redux/authSlice";
import api from "../services/api";

const defaultPreferences = {
  orderNotifications: true,
  emailNotifications: false,
  weeklySummary: true,
  darkMode: false,
};

function Settings() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");

  const [preferences, setPreferences] = useState(defaultPreferences);
  const [profileLoading, setProfileLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");

  const [preferencesSaved, setPreferencesSaved] = useState(false);

  // Redux user data ko form mein load karo
  useEffect(() => {
    setName(user?.name || "");
    setBusinessName(user?.businessName || "");
  }, [user]);

  // Saved preferences load karo
  useEffect(() => {
    try {
      const stored = localStorage.getItem("orderflow-preferences");

      if (stored) {
        setPreferences({
          ...defaultPreferences,
          ...JSON.parse(stored),
        });
      }
    } catch {
      setPreferences(defaultPreferences);
    }
  }, []);

  // Dark mode poori app ke root par apply karo
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      preferences.darkMode
    );
  }, [preferences.darkMode]);

  const updatePreference = (key) => {
    setPreferences((previous) => {
      const updated = {
        ...previous,
        [key]: !previous[key],
      };

      // Dark mode aur preferences foran persist karo
      localStorage.setItem(
        "orderflow-preferences",
        JSON.stringify(updated)
      );

      return updated;
    });

    setPreferencesSaved(false);
  };

  const savePreferences = () => {
    localStorage.setItem(
      "orderflow-preferences",
      JSON.stringify(preferences)
    );

    setPreferencesSaved(true);
  };

  const handleProfileSave = async (event) => {
    event.preventDefault();

    setProfileMessage("");
    setProfileError("");
    setSaved(false);

    if (!name.trim() || !businessName.trim()) {
      setProfileError("Name aur business name required hain.");
      return;
    }

    try {
      setProfileLoading(true);

      const response = await api.patch("/api/auth/profile", {
        name: name.trim(),
        businessName: businessName.trim(),
      });

      // Sirf successful backend response ke baad Redux update
      console.log("Updated user from API:", response.data.user);
     dispatch(updateUser(response.data.user));
      console.log("Redux update dispatched");

      setName(response.data.user.name);
      setBusinessName(response.data.user.businessName);

      setSaved(true);
      setProfileMessage("Profile successfully update ho gaya!");
    } catch (error) {
      setProfileError(
        error.response?.data?.message ||
          "Profile update nahi ho saka. Dobara try karo."
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const Toggle = ({ checked, onChange }) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
          checked ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );

  const PreferenceRow = ({
    icon: Icon,
    title,
    description,
    settingKey,
  }) => (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 rounded-lg bg-slate-100 p-2 text-slate-600 dark:bg-slate-700 dark:text-slate-200">
          <Icon size={18} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {title}
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <Toggle
        checked={preferences[settingKey]}
        onChange={() => updatePreference(settingKey)}
      />
    </div>
  );

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-blue-900";

  const cardClass =
    "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800";

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-8 text-slate-900 dark:text-slate-100">
      {/* Page heading */}
      <div>
        <p className="text-sm font-medium text-blue-600">Account</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          Settings
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Manage your profile, preferences and account.
        </p>
      </div>

      {/* Profile */}
      <section className={cardClass}>
        <div className="flex items-center gap-3 border-b border-slate-100 p-5 dark:border-slate-700 sm:p-6">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-950">
            <FiUser size={22} />
          </div>
          <div>
            <h2 className="font-semibold">Profile Information</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Update your personal and business details
            </p>
          </div>
        </div>

        <form onSubmit={handleProfileSave}>
          <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-slate-400" />
                <input
                  className={inputClass + " pl-10"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  maxLength={100}
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3.5 text-slate-400" />
                <input
                  className={
                    inputClass +
                    " cursor-not-allowed bg-slate-50 pl-10 dark:bg-slate-900"
                  }
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  aria-describedby="email-note"
                />
              </div>
              <p
                id="email-note"
                className="mt-2 text-xs text-slate-500 dark:text-slate-400"
              >
                Email address cannot be changed.
              </p>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Business Name
              </label>
              <div className="relative">
                <FiBriefcase className="absolute left-3 top-3.5 text-slate-400" />
                <input
                  className={inputClass + " pl-10"}
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Enter your business name"
                  maxLength={100}
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 dark:border-slate-700 dark:bg-slate-900 sm:px-6">
            <button
              type="submit"
              disabled={profileLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <FiSave size={17} />
              {profileLoading ? "Saving..." : "Save Changes"}
            </button>

            {profileMessage && (
              <p role="status" className="mt-3 text-sm text-emerald-600">
                {profileMessage}
              </p>
            )}

            {profileError && (
              <p role="alert" className="mt-3 text-sm text-red-600">
                {profileError}
              </p>
            )}
          </div>
        </form>
      </section>

      {/* Preferences */}
      <section className={cardClass}>
        <div className="flex items-center gap-3 border-b border-slate-100 p-5 dark:border-slate-700 sm:p-6">
          <div className="rounded-xl bg-violet-50 p-3 text-violet-600 dark:bg-violet-950">
            <FiBell size={22} />
          </div>
          <div>
            <h2 className="font-semibold">Preferences</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Customize your dashboard experience
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 px-5 dark:divide-slate-700 sm:px-6">
          {/* <PreferenceRow
            icon={FiBell}
            title="Order Notifications"
            description="Preferences for order activity alerts"
            settingKey="orderNotifications"
          />

          <PreferenceRow
            icon={FiMail}
            title="Email Notifications"
            description="Preferences for account emails"
            settingKey="emailNotifications"
          />

          <PreferenceRow
            icon={FiCheck}
            title="Weekly Summary"
            description="Receive a weekly business summary preference"
            settingKey="weeklySummary"
          /> */}

          <PreferenceRow
            icon={FiMoon}
            title="Dark Mode"
            description="Apply dark appearance across the application"
            settingKey="darkMode"
          />
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Appearance changes apply immediately and are saved in this browser.
          </p>

          <button
            type="button"
            onClick={savePreferences}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <FiCheck size={17} />
            Save Preferences
          </button>
        </div>

        {preferencesSaved && (
          <p
            role="status"
            className="px-5 pb-4 text-sm font-medium text-emerald-600 sm:px-6"
          >
            Preferences saved successfully!
          </p>
        )}
      </section>

      {/* Security */}
      <section className={cardClass + " p-5 sm:p-6"}>
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-amber-50 p-3 text-amber-600 dark:bg-amber-950">
            <FiShield size={22} />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-semibold">Security & Privacy</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Protect your OrderFlow account and personal information.
            </p>

            <div className="mt-4 flex items-start gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <FiLock className="mt-0.5 shrink-0 text-slate-500" />
              <div>
                <p className="text-sm font-medium">Password & Login</p>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Password changes are not enabled in this settings page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Account actions */}
      <section className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm dark:border-red-950 dark:bg-slate-800 sm:p-6">
        <h2 className="font-semibold">Account Actions</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Sign out of your OrderFlow account on this device.
        </p>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950 sm:w-auto"
        >
          <FiLogOut size={18} />
          Log Out
        </button>
      </section>
    </div>
  );
}

export default Settings;

