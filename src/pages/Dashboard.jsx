
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiDollarSign,
  FiLoader,
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
          api.get("/stats"),
          api.get("/recent-orders"),
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

  if (loading) {
    return (
      <DashboardLayout>
        <p className="p-6 text-gray-600">
          Loading dashboard...
        </p>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <p className="rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        {/* Dashboard Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="mt-1 text-gray-500">
            Here is an overview of your orders.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">

          {/* Total Orders */}
          <div
            onClick={() =>
              navigate("/dashboard/orders/total")
            }
            className="cursor-pointer transition duration-200 hover:-translate-y-1"
          >
            <StatCard
              title="Total Orders"
              value={stats.totalOrders ?? 0}
              icon={<FiShoppingBag size={22} />}
              color="bg-blue-100 text-blue-600"
            />
          </div>

          {/* Pending Orders */}
          <div
            onClick={() =>
              navigate("/dashboard/orders/pending")
            }
            className="cursor-pointer transition duration-200 hover:-translate-y-1"
          >
            <StatCard
              title="Pending Orders"
              value={stats.pendingOrders ?? 0}
              icon={<FiClock size={22} />}
              color="bg-yellow-100 text-yellow-600"
            />
          </div>

          {/* Processing Orders */}
          <div
            onClick={() =>
              navigate("/dashboard/orders/processing")
            }
            className="cursor-pointer transition duration-200 hover:-translate-y-1"
          >
            <StatCard
              title="Processing Orders"
              value={stats.processingOrders ?? 0}
              icon={<FiLoader size={22} />}
              color="bg-orange-100 text-orange-600"
            />
          </div>

          {/* Delivered Orders */}
          <div
            onClick={() =>
              navigate("/dashboard/orders/delivered")
            }
            className="cursor-pointer transition duration-200 hover:-translate-y-1"
          >
            <StatCard
              title="Delivered Orders"
              value={stats.deliveredOrders ?? 0}
              icon={<FiCheckCircle size={22} />}
              color="bg-green-100 text-green-600"
            />
          </div>

          {/* Total Revenue */}
          <div
            onClick={() =>
              navigate("/dashboard/orders/revenue")
            }
            className="cursor-pointer transition duration-200 hover:-translate-y-1"
          >
            <StatCard
              title="Total Revenue"
              value={`$${Number(
                stats.totalRevenue ?? 0
              ).toFixed(2)}`}
              icon={<FiDollarSign size={22} />}
              color="bg-purple-100 text-purple-600"
            />
          </div>

        </div>

        {/* Recent Orders */}
        <OrdersTable orders={orders} />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
