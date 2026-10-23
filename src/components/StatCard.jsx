
function StatCard({ title, value, icon, color, onClick }) {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className="group relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {/* Subtle hover background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/0 via-white to-indigo-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500 transition-colors duration-300 group-hover:text-gray-700">
            {title}
          </p>

          <h2 className="mt-3 break-words text-3xl font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-blue-700">
            {value}
          </h2>

          <p className="mt-3 flex items-center gap-1 text-xs font-medium text-gray-400 transition-colors duration-300 group-hover:text-blue-600">
            View details
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
        >
          {icon}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 rounded-full bg-blue-500 transition-all duration-300 group-hover:w-full" />
    </div>
  );
}

export default StatCard;
