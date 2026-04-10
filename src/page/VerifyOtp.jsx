import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { loginUser, resetStatus } from "../Redux/store/authSlice";

// ─── 6-Box OTP Input ─────────────────────────────────────────
const OtpInput = ({ value, onChange, disabled }) => {
  const refs = useRef([]);
  const digits = value.split("");

  const handleChange = (e, idx) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    if (!digit) return;
    const next = [...digits];
    next[idx] = digit;
    onChange(next.join(""));
    if (idx < 5) refs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (digits[idx]) {
        const next = [...digits];
        next[idx] = "";
        onChange(next.join(""));
      } else if (idx > 0) {
        refs.current[idx - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted.padEnd(6, "").slice(0, 6));
    refs.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    // 🎓 w-full — poori width lo
    // justify-between — 6 boxes evenly spread ho jayenge
    // px-2 — thoda side padding
    <div className="flex justify-between gap-1.5 w-full px-2">
      {[0, 1, 2, 3, 4, 5].map((idx) => (
        <input
          key={idx}
          ref={(el) => (refs.current[idx] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[idx] || ""}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`
            flex-1        
            min-w-0       
            aspect-square 
            max-w-[52px]  
            text-center text-lg font-bold
            rounded-xl border-2
            focus:outline-none transition-all
            ${disabled ? "opacity-50 cursor-not-allowed bg-slate-50" : "bg-white"}
            ${digits[idx]
              ? "border-blue-400 text-blue-600"
              : "border-slate-200 text-slate-800"
            }
            focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20
          `}
        />
      ))}
    </div>
    // 🎓 flex-1 + min-w-0 = box apni jagah le lega, shrink bhi ho sakta hai
    // aspect-square = width aur height equal rahenge
    // max-w-[52px] = zyada bada nahi hoga
  );
};

// ─── Main Component ───────────────────────────────────────────
const VerifyOtp = () => {
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const location  = useLocation();
  const { status, error, user } = useSelector((state) => state.auth);

  const email = location.state?.email || "";
  const from  = location.state?.from  || "login";

  const [otpValue,  setOtpValue]  = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef(null);

  // Safety check
  useEffect(() => {
    if (!email) {
      toast.error("Pehle login ya register karein");
      navigate("/login");
    }
  }, []);

  // Timer
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    setCountdown(60);
    setCanResend(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current); setCanResend(true); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  // Verify
  const handleVerify = () => {
    if (otpValue.length < 6) { toast.error("Poora 6-digit OTP likhein"); return; }
    dispatch(loginUser({ email, otp: otpValue }));
  };

  // Status watch
  useEffect(() => {
    if (status === "succeeded") {
      const role = user?.role;
      if (role === "admin") {
        toast.success("Welcome, Admin!");
        navigate("/admin/dashboard");
      } else {
        toast.success(`Welcome back, ${user?.name || ""}!`);
        navigate("/");
      }
      dispatch(resetStatus());
    }
    if (status === "failed") {
      toast.error(error?.message || error?.error?.message || "OTP galat hai");
      setOtpValue("");
      dispatch(resetStatus());
    }
  }, [status, user, error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* 🎓 max-w-sm (384px) — pehle max-w-md tha (448px)
            Chhota container = boxes fit rahenge easily */}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800"> Verify OTP</h1>
          <p className="text-slate-500 text-sm mt-1">
            6-digit OTP code is being sended on  :{" "}
            <span className="font-semibold text-slate-700 break-all">{email}</span>
            {/* 🎓 break-all — lamba email wrap ho jaayega, overflow nahi */}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">

          {/* Info */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-600 flex items-center gap-2">
            <span className="shrink-0">📧</span>
            <span>Enter otp in the boxes ,send again if not received or time is out</span>
          </div>

          {/* OTP Section */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-600 text-center"> Enter OTP </p>

            {/* ✅ Boxes ab card ke andar hain — overflow fix */}
            <OtpInput
              value={otpValue}
              onChange={setOtpValue}
              disabled={status === "loading"}
            />
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={status === "loading" || otpValue.length < 6}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold
              py-2.5 rounded-xl transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Verify ho raha hai...
              </>
            ) : (
              <>
                Verify &amp; Login
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </>
            )}
          </button>

          {/* Resend + Back */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <button
              onClick={() => navigate(from === "register" ? "/signup" : "/login")}
              className="flex items-center gap-1 hover:text-slate-700 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>

            <button
              onClick={() => { if (canResend) { startTimer(); toast.info("sending new otp..."); }}}
              disabled={!canResend}
              className={`transition-colors ${
                canResend
                  ? "text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                  : "text-slate-400 cursor-not-allowed"
              }`}
            >
              {canResend ? "Again Send OTP" : `Resend (${countdown}s)`}
            </button>
          </div>

        </div>

        
      </div>
    </div>
  );
};

export default VerifyOtp;