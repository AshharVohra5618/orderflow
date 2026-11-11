
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchCurrentUser } from "./redux/authSlice";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import OrderCategory from "./pages/OrderCategory";
import Settings from "./pages/Settings";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  const dispatch = useDispatch();

  // Reload par logged-in user ka data fetch karo
  useEffect(() => {
  //    console.log(
  //   "App token:",
  //   localStorage.getItem("token") ? "Found" : "Not Found"
  // );
    if (localStorage.getItem("token")) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

       <Route
  path="/dashboard"
  element={<Dashboard />}
 />

        <Route
          path="/orders"
          element={
          

              <Orders />
            
          }
        />

        <Route
          path="/dashboard/orders/:category"
          element={
            // <DashboardLayout>
              <OrderCategory />
            // </DashboardLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
