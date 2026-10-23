
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import OrdersTable from "../components/OrdersTable";
import api from "../services/api";

const categories = {
  pending: {
    title: "Pending Orders",
    description: "Orders waiting to be processed.",
    filter: "Pending",
    color: "yellow",
  },
  total: {
    title: "Total Orders",
    description: "Manage all your orders in one place.",
    filter: "All",
    color: "blue",
  },
  processing: {
    title: "Processing Orders",
    description: "Orders currently being processed.",
    filter: "Processing",
    color: "blue",
  },
  delivered: {
    title: "Delivered Orders",
    description: "Orders successfully delivered.",
    filter: "Delivered",
    color: "green",
  },
  revenue: {
    title: "Total Revenue",
    description: "Review your recorded order amounts.",
    filter: "Revenue",
    color: "purple",
  },
};

function OrderCategory() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentCategory = categories[category];

  useEffect(() => {
    if (!currentCategory) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/order");
        const data = response.data;

        const allOrders = Array.isArray(data)
          ? data
          : data.orders || data.data || [];

        const filteredOrders =
          currentCategory.filter === "All" ||
          currentCategory.filter === "Revenue"
            ? allOrders
            : allOrders.filter(
                (order) =>
                  (order.orderStatus || order.status || "Pending") ===
                  currentCategory.filter
              );

        setOrders(filteredOrders);

        const totalRevenue = allOrders.reduce(
          (sum, order) =>
            sum +
            Number(order.totalAmount ?? order.amount ?? 0),
          0
        );

        setRevenue(totalRevenue);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Orders load nahi ho sake."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [category]);

  if (!currentCategory) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">
            Page not found
          </h2>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Back to Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-full space-y-6 bg-gray-50/70 p-4 md:p-6">

        {/* Back button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        >
          <span>←</span>
          Back to Dashboard
        </button>

        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600">
              Order Management
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              {currentCategory.title}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {currentCategory.description}
            </p>
          </div>

          <button
            onClick={() => navigate("/orders")}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            View All Orders
          </button>
        </div>

        {/* Summary cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-sm font-medium text-gray-500">
                {currentCategory.filter === "Revenue"
                  ? "Orders Included"
                  : "Orders Found"}
              </p>

              <p className="mt-3 text-3xl font-bold text-gray-900">
                {orders.length}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Based on orders returned by your API
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-sm font-medium text-gray-500">
                Recorded Revenue
              </p>

              <p className="mt-3 text-3xl font-bold text-gray-900">
                ${revenue.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Sum of amounts returned by your API
              </p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

            <p className="mt-4 text-sm text-gray-500">
              Loading your orders...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
            <h3 className="font-semibold text-red-700">
              Unable to load orders
            </h3>

            <p className="mt-1 text-sm text-red-600">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Orders table */}
        {!loading && !error && (
          <OrdersTable
            orders={orders}
            title={currentCategory.title}
            description={currentCategory.description}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default OrderCategory;
