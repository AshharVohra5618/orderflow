
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiDollarSign,
  FiLoader,
  FiArrowUpRight,
} from "react-icons/fi";

import api from "../services/api";
import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import OrdersTable from "../components/OrdersTable";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [statsRes, ordersRes] = await Promise.all([
          api.get("/api/stats"),
          api.get("/api/recent-orders"),
        ]);

        const dashboardStats =
          statsRes.data.stats ||
          statsRes.data.data?.stats ||
          statsRes.data;

        setStats(dashboardStats);

        setOrders(
          ordersRes.data.orders ??
            ordersRes.data.recentOrders ??
            ordersRes.data.data?.orders ??
            []
        );
      } catch (err) {
        console.error(
          "Dashboard API error:",
          err.response?.data || err
        );

        setError(
          err.response?.data?.message ||
            `Dashboard API failed (${
              err.response?.status || "Network error"
            }).`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders ?? 0,
      icon: <FiShoppingBag size={19} />,
      iconColor: "text-blue-700 bg-blue-50",
      path: "/dashboard/orders/total",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders ?? 0,
      icon: <FiClock size={19} />,
      iconColor: "text-amber-700 bg-amber-50",
      path: "/dashboard/orders/pending",
    },
    {
      title: "Processing Orders",
      value: stats.processingOrders ?? 0,
      icon: <FiLoader size={19} />,
      iconColor: "text-orange-700 bg-orange-50",
      path: "/dashboard/orders/processing",
    },
    {
      title: "Delivered Orders",
      value: stats.deliveredOrders ?? 0,
      icon: <FiCheckCircle size={19} />,
      iconColor: "text-emerald-700 bg-emerald-50",
      path: "/dashboard/orders/delivered",
    },
    {
      title: "Total Revenue",
      value: `$${Number(stats.totalRevenue ?? 0).toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}`,
      icon: <FiDollarSign size={19} />,
      iconColor: "text-violet-700 bg-violet-50",
      path: "/dashboard/orders/revenue",
    },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-700" />
            Loading your dashboard...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="rounded-xl border border-red-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">
            Unable to load dashboard
          </h2>

          <p className="mt-2 text-sm text-red-700">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Try again
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1600px] text-slate-800">
        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              Order management
            </p>

            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Keep track of your orders and business performance.
            </p>
          </div>

          {/* <button
            onClick={() => navigate("/dashboard/orders")}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            View all orders
            <FiArrowUpRight size={16} />
          </button> */}
        </div>

        {/* Statistics */}
        <section className="mb-9">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Business overview
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              A summary of your current order activity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
            {cards.map((card) => (
              <button
                key={card.title}
                type="button"
                onClick={() => navigate(card.path)}
                className="group rounded-xl border border-slate-200 bg-white p-5 text-left transition duration-200 hover:border-slate-300 hover:shadow-[0_4px_18px_rgba(15,23,42,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm font-medium text-slate-500">
                    {card.title}
                  </span>

                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${card.iconColor}`}
                  >
                    {card.icon}
                  </span>
                </div>

                <div className="mt-5 flex items-end justify-between gap-2">
                  <span className="text-2xl font-semibold tracking-tight text-slate-900">
                    {card.value}
                  </span>

                  <FiArrowUpRight
                    size={16}
                    className="mb-1 text-slate-300 transition group-hover:text-blue-700"
                  />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Recent orders */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Recent orders
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest customer orders in one place.
              </p>
            </div>

            <button
              onClick={() => navigate("/orders")}
              className="inline-flex w-fit items-center gap-1 text-sm font-medium text-blue-700 transition hover:text-blue-900"
            >
              All orders
              <FiArrowUpRight size={15} />
            </button>
          </div>

          <div className="p-3 sm:p-5">
            <OrdersTable orders={orders} />
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-slate-400">
          OrderFlow · Order management made simple
        </p>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
