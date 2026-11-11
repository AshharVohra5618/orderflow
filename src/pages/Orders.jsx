
import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import OrdersTable from "../components/OrdersTable";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    productName: "",
    quantity: 1,
    unitPrice: "",
    orderDate: "",
    deliveryAddress: "",
    notes: "",
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/order");

      setOrders(
        response.data.orders || response.data.data || []
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const totalAmount =
    Number(formData.quantity) * Number(formData.unitPrice || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
//       console.log(
//   "Token before order:",
//   localStorage.getItem("token") ? "Found" : "Not Found"
// );
      await api.post("/api/order", {
  ...formData,
  quantity: Number(formData.quantity),
  unitPrice: Number(formData.unitPrice),
});

      setMessage("Order created successfully!");

      setFormData({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        productName: "",
        quantity: 1,
        unitPrice: "",
        orderDate: "",
        deliveryAddress: "",
        notes: "",
      });

      setShowForm(false);
      await fetchOrders();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create order"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Orders
            </h1>
            <p className="mt-1 text-gray-500">
              Manage and track all your orders.
            </p>
          </div>

          <button
            onClick={() => {
              setShowForm(!showForm);
              setMessage("");
              setError("");
            }}
            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            {showForm ? "Cancel" : "+ Create Order"}
          </button>
        </div>

        {message && (
          <p className="mb-4 rounded-lg bg-green-100 p-3 text-green-700">
            {message}
          </p>
        )}

        {error && (
          <p className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
            {error}
          </p>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 space-y-5 rounded-xl bg-white p-6 shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              Create New Order
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Customer Name *
                </label>
                <input
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border p-3"
                  placeholder="Customer name"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Customer Phone *
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border p-3"
                  placeholder="+923001234567"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Customer Email
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3"
                  placeholder="customer@example.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Product Name *
                </label>
                <input
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border p-3"
                  placeholder="Product name"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  step="1"
                  required
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Unit Price *
                </label>
                <input
                  type="number"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full rounded-lg border p-3"
                  placeholder="e.g. 25.50"
                />
              </div>

              <div className="rounded-lg bg-gray-100 p-4 md:col-span-2">
                <span className="font-medium">Total Amount: </span>
                <span className="font-bold">
                  $
                  {Number.isFinite(totalAmount)
                    ? totalAmount.toFixed(2)
                    : "0.00"}
                </span>
                <p className="mt-1 text-xs text-gray-500">
                  Backend will calculate and save the final total.
                </p>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Order Date
                </label>
                <input
                  type="date"
                  name="orderDate"
                  value={formData.orderDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Delivery Address
                </label>
                <input
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3"
                  placeholder="Delivery address"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full rounded-lg border p-3"
                  placeholder="Additional notes"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Creating..." : "Save Order"}
            </button>
          </form>
        )}

        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            All Orders
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading orders...</p>
          ) : (
            <OrdersTable
  orders={orders}
  showControls={true}
  title="All Orders"
  description="Track, search and manage all your customer orders."
/>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Orders;
