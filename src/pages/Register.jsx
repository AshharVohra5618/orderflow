
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice";

function Register() {
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/auth/register", {
        name,
        businessName,
        email,
        password,
      });

      const data = response.data;

      const token =
        data.token ||
        data.accessToken ||
        data.data?.token;

      if (!token) {
        setError(
          "Account created, but login token nahi mila. Backend response check karo."
        );
        return;
      }

      localStorage.setItem("token", token);

      if (data.user) {
        dispatch(setCredentials({ user: data.user }));
      }

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Signup failed. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FA]">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">

          <Link to="/register" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1E3A5F] text-lg font-bold text-white">
              O
            </div>

            <span className="text-xl font-bold tracking-tight text-slate-900">
              OrderFlow
            </span>
          </Link>

          <p className="text-sm text-slate-500">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">

          <div className="mb-7 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-2xl font-bold text-[#1E3A5F] shadow-sm">
              O
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Get started with OrderFlow and organize your business orders.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <form onSubmit={handleRegister} className="space-y-5">

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="businessName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Business name
                </label>

                <input
                  id="businessName"
                  type="text"
                  placeholder="Enter your business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                  autoComplete="organization"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className={inputClass}
                />

                <p className="mt-2 text-xs text-slate-500">
                  Use at least 8 characters.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
                {!loading && <span aria-hidden="true">→</span>}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">OR</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-slate-400">
            By creating an account, you agree to keep your
            account credentials secure.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} OrderFlow. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Register;