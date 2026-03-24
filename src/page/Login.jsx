import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
3
import { toast } from "sonner";
import { loginUser, resetStatus } from "../Redux/store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, user } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loginAs, setLoginAs] = useState("user"); // "user" | "admin"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };
useEffect(() => {
  if (status === "succeeded") {
    const role = user?.role;

    // ✅ Sirf tab admin dashboard jao jab DB se role "admin" aaye
    // ✅ Aur loginAs bhi "admin" select kiya ho — dono match karne chahiye
    if (role === "admin" && loginAs === "admin") {
      toast.success("Welcome, Admin!");
      navigate("/admin/dashboard");
    } else if (role === "user" && loginAs === "user") {
      toast.success("Login successful");
      navigate("/");
    } else {
      // ❌ Mismatch — user ne admin toggle select kiya but role "user" hai
      toast.error("Invalid credentials");
      dispatch(resetStatus()); // status reset karo warna loop hoga
    }
  }

  if (status === "failed") {
    toast.error(error?.error?.message || "Login failed");
  }
}, [status, user, error, navigate, loginAs, dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* ── Page Header ── */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 mb-4">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11s1.343 3 3 3 3-1.343 3-3zm6 8v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to your account to continue</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">

          {/* ── Login As Toggle ── */}
          <div className="p-1.5 bg-slate-100 m-5 rounded-xl flex gap-1">
            <button
              type="button"
              onClick={() => setLoginAs("user")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all
                ${loginAs === "user"
                  ? "bg-white text-blue-600 shadow-sm border border-slate-200"
                  : "text-slate-500 hover:text-slate-700"
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Login as User
            </button>
            <button
              type="button"
              onClick={() => setLoginAs("admin")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all
                ${loginAs === "admin"
                  ? "bg-white text-rose-600 shadow-sm border border-slate-200"
                  : "text-slate-500 hover:text-slate-700"
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Login as Admin
            </button>
          </div>

          {/* ── Active Role Badge ── */}
          <div className={`mx-5 mb-5 px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2
            ${loginAs === "admin"
              ? "bg-rose-50 text-rose-600 border border-rose-100"
              : "bg-blue-50 text-blue-600 border border-blue-100"
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${loginAs === "admin" ? "bg-rose-500" : "bg-blue-500"}`} />
            {loginAs === "admin"
              ? "You are signing in with admin credentials"
              : "You are signing in as a regular user"
            }
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="px-5 pb-5 space-y-4">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-600">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all
                    ${loginAs === "admin"
                      ? "border-slate-200 focus:ring-rose-500/30 focus:border-rose-400"
                      : "border-slate-200 focus:ring-blue-500/30 focus:border-blue-400"
                    }`}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-600">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-11 py-2.5 text-sm rounded-xl border bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all
                    ${loginAs === "admin"
                      ? "border-slate-200 focus:ring-rose-500/30 focus:border-rose-400"
                      : "border-slate-200 focus:ring-blue-500/30 focus:border-blue-400"
                    }`}
                />
               {/* Sirf SVG pe onClick - no button needed */}
{showPassword ? (
  <svg
    onClick={() => setShowPassword(!showPassword)}
    className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
    fill="none" stroke="currentColor" viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
) : (
  <svg
    onClick={() => setShowPassword(!showPassword)}
    className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
    fill="none" stroke="currentColor" viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full text-white font-semibold py-2.5 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2
                ${loginAs === "admin"
                  ? "bg-rose-500 hover:bg-rose-600"
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  loging in...
                </>
              ) : (
                <>
                  {loginAs === "admin" ? "Sign in as Admin" : "Sign in"}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* ── Footer ── */}
          <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/60 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;