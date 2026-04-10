import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { sendOtp, resetStatus } from "../Redux/store/authSlice";
// 🎓 Seekho: ab sirf sendOtp import kiya — loginUser nahi
// Kyunki login ka OTP verify ab VerifyOtp.jsx karega
// Login.jsx ka kaam sirf email leke OTP bhejne ka hai

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [email,   setEmail]   = useState("");
  const [loginAs, setLoginAs] = useState("user");
  const isAdmin = loginAs === "admin";

  // ── Form Submit — sirf OTP bhejo ──────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) { toast.error("Email likhein"); return; }

    // 🎓 dispatch(sendOtp({ email }))
    // authSlice → /auth/login → backend OTP generate karega
    // Response aane pe status = "otpSent" ho jaayega
    dispatch(sendOtp({ email }));
  };

  // ── Status Watch ───────────────────────────────────────────
  useEffect(() => {
    if (status === "otpSent") {
      toast.success("OTP bheja gaya! Email check karein");

      // 🎓 navigate("/verify-otp", { state: {...} })
      // state mein email aur from bhejo
      // VerifyOtp page location.state se ye padhega
      // URL mein nahi dikhega — safe hai
      navigate("/verify-otp", {
        state: {
          email: email,
          from: "login",   // VerifyOtp janega ki login se aaya hai
        },
      });

      dispatch(resetStatus());
    }

    if (status === "failed") {
      toast.error(error?.message || error?.error?.message || "Kuch galat hua");
      dispatch(resetStatus());
    }
  }, [status, error]);

  // ── UI Classes (role ke hisaab se color) ──────────────────
  const ringCls = isAdmin
    ? "focus:ring-rose-500/30 focus:border-rose-400"
    : "focus:ring-blue-500/30 focus:border-blue-400";
  const btnCls = isAdmin
    ? "bg-rose-500 hover:bg-rose-600"
    : "bg-blue-600 hover:bg-blue-700";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4
            ${isAdmin ? "bg-rose-500" : "bg-blue-600"}`}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11s1.343 3 3 3 3-1.343 3-3zm6 8v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-1">
             Enter Email  — fill OTP — verify OTP — login! ✅
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">

          {/* User / Admin Toggle */}
          <div className="p-1.5 bg-slate-100 m-5 rounded-xl flex gap-1">
            {[
              { role: "user",  label: "Login as User",
                d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
              { role: "admin", label: "Login as Admin",
                d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            ].map(({ role, label, d }) => (
              <button key={role} type="button"
                onClick={() => { setLoginAs(role); dispatch(resetStatus()); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg
                  text-sm font-medium transition-all
                  ${loginAs === role
                    ? `bg-white shadow-sm border border-slate-200 ${role === "admin" ? "text-rose-600" : "text-blue-600"}`
                    : "text-slate-500 hover:text-slate-700"}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} />
                </svg>
                {label}
              </button>
            ))}
          </div>

          {/* Role Badge */}
          <div className={`mx-5 mb-5 px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2
            ${isAdmin
              ? "bg-rose-50 text-rose-600 border border-rose-100"
              : "bg-blue-50 text-blue-600 border border-blue-100"}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isAdmin ? "bg-rose-500" : "bg-blue-500"}`} />
            {isAdmin ? "Admin credentials use karein" : "loging in as an regular user"}
          </div>

          {/* Form — sirf email, koi OTP screen nahi */}
          <form onSubmit={handleSubmit} className="px-5 pb-5 space-y-4">

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-600">Email Address</label>
              <div className="relative">
                
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200
                    bg-white text-slate-800 placeholder-slate-400
                    focus:outline-none focus:ring-2 transition-all ${ringCls}`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full text-white font-semibold py-2.5 rounded-xl transition-all
                disabled:opacity-60 flex items-center justify-center gap-2 mt-2 ${btnCls}`}
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Sending  OTP ...
                </>
              ) : (
                <>
                 Send  OTP
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/60 text-center">
            <p className="text-sm text-slate-500">
              Account nahi hai?{" "}
              <span onClick={() => navigate("/signup")}
                className="text-blue-600 font-medium cursor-pointer hover:underline">
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