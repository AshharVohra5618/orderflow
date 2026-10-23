
import { useEffect, useState } from "react";
import api from "../services/api";

function OrdersTable({
  orders = [],
  showControls = false,
  title = "Recent Orders",
  description = "View and manage your orders.",
}) {
  const [displayOrders, setDisplayOrders] = useState(orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    setDisplayOrders(orders);
  }, [orders]);

  const statusStyles = {
    Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    Processing: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    Delivered: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    Cancelled: "bg-red-50 text-red-700 ring-1 ring-red-200",
  };

  const getStatus = (order) =>
    order.orderStatus || order.status || "Pending";

  const getAmount = (order) =>
    Number(order.totalAmount ?? order.amount ?? 0);

  const filteredOrders = displayOrders.filter((order) => {
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      String(order._id || "").toLowerCase().includes(search) ||
      String(order.customerName || "").toLowerCase().includes(search) ||
      String(order.productName || "").toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || getStatus(order) === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalOrders = displayOrders.length;

  const pendingOrders = displayOrders.filter(
    (order) => getStatus(order) === "Pending"
  ).length;

  const processingOrders = displayOrders.filter(
    (order) => getStatus(order) === "Processing"
  ).length;

  const deliveredOrders = displayOrders.filter(
    (order) => getStatus(order) === "Delivered"
  ).length;

  const summaryCards = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: "📦",
      iconBg: "bg-blue-50",
    },
    {
      label: "Pending",
      value: pendingOrders,
      icon: "⏳",
      iconBg: "bg-amber-50",
    },
    {
      label: "Processing",
      value: processingOrders,
      icon: "🔄",
      iconBg: "bg-indigo-50",
    },
    {
      label: "Delivered",
      value: deliveredOrders,
      icon: "✓",
      iconBg: "bg-emerald-50",
    },
  ];

  // Order details fetch
  const handleOrderClick = async (orderId) => {
    setSelectedOrder(null);
    setEditMode(false);
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await api.get(`/order/${orderId}`);

      const order =
        response.data.order ||
        response.data.data ||
        response.data;

      setSelectedOrder(order);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Order details load nahi ho sakin."
      );
    } finally {
      setLoading(false);
    }
  };

  // Edit form mein existing values fill
  const handleEdit = () => {
    setFormData({
      customerName: selectedOrder.customerName || "",
      customerPhone: selectedOrder.customerPhone || "",
      customerEmail: selectedOrder.customerEmail || "",
      productName: selectedOrder.productName || "",
      quantity: selectedOrder.quantity ?? 1,
      unitPrice: selectedOrder.unitPrice ?? 0,
      orderDate: selectedOrder.orderDate
        ? new Date(selectedOrder.orderDate).toISOString().slice(0, 10)
        : "",
      deliveryAddress: selectedOrder.deliveryAddress || "",
      paymentStatus: selectedOrder.paymentStatus || "Unpaid",
      orderStatus: getStatus(selectedOrder),
      notes: selectedOrder.notes || "",
    });

    setEditMode(true);
    setError("");
    setSuccess("");
  };

  // Form inputs handle
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Order update
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.put(`/order/${selectedOrder._id}`, {
        ...formData,
        quantity: Number(formData.quantity),
        unitPrice: Number(formData.unitPrice),
      });

      const updatedOrder =
        response.data.order ||
        response.data.data ||
        response.data;

      setSelectedOrder(updatedOrder);

      setDisplayOrders((prev) =>
        prev.map((order) =>
          order._id === updatedOrder._id
            ? { ...order, ...updatedOrder }
            : order
        )
      );

      setEditMode(false);
      setSuccess("Order successfully update ho gaya!");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Order update nahi ho saka."
      );
    } finally {
      setSaving(false);
    }
  };

  // Order delete
  const handleDelete = async (e, orderId) => {
    e.stopPropagation();

    const confirmed = window.confirm(
     ' Are you sure you want to permanently delete this order?'
    );

    if (!confirmed) return;

    setDeletingId(orderId);
    setError("");

    try {
      await api.delete(`/order/${orderId}`);

      setDisplayOrders((prev) =>
        prev.filter((order) => order._id !== orderId)
      );

      if (selectedOrder?._id === orderId) {
        setSelectedOrder(null);
        setEditMode(false);
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Order delete nahi ho saka."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const closePopup = () => {
    if (saving) return;

    setSelectedOrder(null);
    setEditMode(false);
    setError("");
    setSuccess("");
  };

  const inputClass =
    "mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const renderField = (label, name, type = "text", required = false) => (
    <div key={name}>
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={formData[name] ?? ""}
        onChange={handleChange}
        required={required}
        min={
          type === "number"
            ? name === "quantity"
              ? 1
              : 0
            : undefined
        }
        step={name === "unitPrice" ? "0.01" : undefined}
        className={inputClass}
      />
    </div>
  );

  return (
    <>
      {/* SUMMARY CARDS */}
      {showControls && (
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {card.label}
                </p>

                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${card.iconBg}`}
                >
                  {card.icon}
                </span>
              </div>

              <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ORDERS TABLE */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* HEADER */}
        <div className="border-b border-gray-100 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-gray-900">
                {title}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {description}
              </p>
            </div>

            <span className="w-fit rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
              {filteredOrders.length} orders found
            </span>
          </div>

          {/* SEARCH AND FILTER */}
          {showControls && (
            <div className="mt-5 flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  ⌕
                </span>

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search customer, product or order ID..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All statuses</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          )}
        </div>

        {/* TABLE */}
        {filteredOrders.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-2xl">
              📦
            </div>
 
             <h3 className="mt-4 font-semibold text-gray-900">
              {searchTerm || statusFilter !== "All"
                ? "No matching orders"
                : "No orders yet"}
            </h3> 

            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== "All"
                ? "Try changing your search or status filter."
                : "Orders will appear here when they are created."}
            </p>

            {(searchTerm || statusFilter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                }}
                className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-gray-50/80 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Order ID</th>
                  <th className="px-5 py-4 font-semibold">Customer</th>
                  <th className="px-5 py-4 font-semibold">Amount</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => {
                  const status = getStatus(order);

                  return (
                    <tr
                      key={order._id}
                      onClick={() => handleOrderClick(order._id)}
                      className="cursor-pointer transition-colors hover:bg-blue-50/50"
                    >
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="font-semibold text-blue-700">
                          #{String(order._id).slice(-6).toUpperCase()}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-sm font-bold text-blue-700">
                            {(order.customerName || "C")
                              .trim()
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[200px] truncate font-semibold text-gray-800">
                              {order.customerName || "Unknown customer"}
                            </p>

                            <p className="mt-1 max-w-[200px] truncate text-xs text-gray-400">
                              {order.productName || "Order"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 font-semibold text-gray-800">
                        ${getAmount(order).toFixed(2)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            statusStyles[status] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <button
                          type="button"
                          disabled={deletingId === order._id}
                          onClick={(e) => handleDelete(e, order._id)}
                          className="rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === order._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* FOOTER */}
        {filteredOrders.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-3">
            <p className="text-xs text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filteredOrders.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {totalOrders}
              </span>{" "}
              orders
            </p>
          </div>
        )}
      </div>

      {/* LOADING / ERROR */}
      {(loading || error) && !selectedOrder && (
        <div
          className={`mt-4 rounded-xl border p-4 text-sm ${
            error
              ? "border-red-100 bg-red-50 text-red-700"
              : "border-blue-100 bg-blue-50 text-blue-700"
          }`}
        >
          {loading ? "Loading order details..." : error}
        </div>
      )}

      {/* ORDER POPUP */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !saving) {
              closePopup();
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-2xl">
            {/* POPUP HEADER */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 p-5 backdrop-blur sm:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Order Management
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  {editMode ? "Edit Order" : "Order Details"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Order #{String(selectedOrder._id).slice(-6).toUpperCase()}
                </p>
              </div>

              <button
                type="button"
                onClick={closePopup}
                disabled={saving}
                aria-label="Close order details"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-2xl text-gray-500 transition hover:bg-gray-100 disabled:opacity-50"
              >
                &times;
              </button>
            </div>

            <div className="p-5 sm:p-6">
              {error && (
                <p className="mb-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              {success && (
                <p className="mb-4 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-700">
                  {success}
                </p>
              )}

              {editMode ? (
                <form onSubmit={handleSave}>
                  <h3 className="mb-4 font-semibold text-gray-900">
                    Customer Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {renderField("Customer Name", "customerName", "text", true)}
                    {renderField("Phone", "customerPhone", "tel", true)}
                    {renderField("Email", "customerEmail", "email")}
                    {renderField("Delivery Address", "deliveryAddress")}
                  </div>

                  <h3 className="mb-4 mt-7 font-semibold text-gray-900">
                    Product Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {renderField("Product Name", "productName", "text", true)}
                    {renderField("Quantity", "quantity", "number", true)}
                    {renderField("Unit Price ($)", "unitPrice", "number", true)}
                    {renderField("Order Date", "orderDate", "date")}
                  </div>

                  <h3 className="mb-4 mt-7 font-semibold text-gray-900">
                    Order Status
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Order Status
                      </label>

                      <select
                        name="orderStatus"
                        value={formData.orderStatus}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Payment Status
                      </label>

                      <select
                        name="paymentStatus"
                        value={formData.paymentStatus}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid">Paid</option>
                        <option value="Partially Paid">Partially Paid</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700">
                      Notes
                    </label>

                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className={inputClass}
                    />
                  </div>

                  <div className="mt-7 flex flex-col-reverse justify-end gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                        setError("");
                        setSuccess("");
                      }}
                      disabled={saving}
                      className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={saving}
                      className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
                    <div>
                      <p className="text-sm text-gray-500">Order Total</p>
                      <p className="mt-1 text-3xl font-bold text-gray-900">
                        ${getAmount(selectedOrder).toFixed(2)}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${
                        statusStyles[getStatus(selectedOrder)] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {getStatus(selectedOrder)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <section className="rounded-2xl border border-gray-100 p-5">
                      <h3 className="mb-4 font-semibold text-gray-900">
                        Customer Information
                      </h3>

                      <p className="mb-3 break-words text-sm text-gray-600">
                        <strong className="text-gray-800">Name:</strong>{" "}
                        {selectedOrder.customerName || "Not provided"}
                      </p>

                      <p className="mb-3 break-words text-sm text-gray-600">
                        <strong className="text-gray-800">Phone:</strong>{" "}
                        {selectedOrder.customerPhone || "Not provided"}
                      </p>

                      <p className="mb-3 break-words text-sm text-gray-600">
                        <strong className="text-gray-800">Email:</strong>{" "}
                        {selectedOrder.customerEmail || "Not provided"}
                      </p>

                      <p className="break-words text-sm text-gray-600">
                        <strong className="text-gray-800">Address:</strong>{" "}
                        {selectedOrder.deliveryAddress || "Not provided"}
                      </p>
                    </section>

                    <section className="rounded-2xl border border-gray-100 p-5">
                      <h3 className="mb-4 font-semibold text-gray-900">
                        Product Information
                      </h3>

                      <p className="mb-3 break-words text-sm text-gray-600">
                        <strong className="text-gray-800">Product:</strong>{" "}
                        {selectedOrder.productName || "Not provided"}
                      </p>

                      <p className="mb-3 text-sm text-gray-600">
                        <strong className="text-gray-800">Quantity:</strong>{" "}
                        {selectedOrder.quantity ?? "Not provided"}
                      </p>

                      <p className="mb-3 text-sm text-gray-600">
                        <strong className="text-gray-800">Unit Price:</strong>{" "}
                        ${Number(selectedOrder.unitPrice || 0).toFixed(2)}
                      </p>

                      <p className="text-sm text-gray-600">
                        <strong className="text-gray-800">Total:</strong>{" "}
                        ${getAmount(selectedOrder).toFixed(2)}
                      </p>
                    </section>

                    <section className="rounded-2xl border border-gray-100 p-5">
                      <h3 className="mb-4 font-semibold text-gray-900">
                        Order Information
                      </h3>

                      <p className="mb-3 text-sm text-gray-600">
                        <strong className="text-gray-800">Date:</strong>{" "}
                        {selectedOrder.orderDate
                          ? new Date(selectedOrder.orderDate).toLocaleDateString()
                          : "Not provided"}
                      </p>

                      <p className="mb-3 text-sm text-gray-600">
                        <strong className="text-gray-800">Order Status:</strong>{" "}
                        {getStatus(selectedOrder)}
                      </p>

                      <p className="text-sm text-gray-600">
                        <strong className="text-gray-800">Payment:</strong>{" "}
                        {selectedOrder.paymentStatus || "Unpaid"}
                      </p>
                    </section>

                    <section className="rounded-2xl border border-gray-100 p-5">
                      <h3 className="mb-4 font-semibold text-gray-900">
                        Notes
                      </h3>

                      <p className="whitespace-pre-wrap break-words text-sm text-gray-600">
                        {selectedOrder.notes || "No notes added."}
                      </p>
                    </section>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
                    >
                      Edit Order
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrdersTable;
