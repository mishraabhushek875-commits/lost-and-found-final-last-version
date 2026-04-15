import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser, resetStatus } from "../Redux/store/authSlice";
import { toast } from "sonner";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim())  { toast.error("Naam likhein");  return; }
    if (!formData.email.trim()) { toast.error("Email likhein"); return; }
    dispatch(signUpUser(formData));
  };

  useEffect(() => {
    if (status === "otpSent") {
      toast.success("Check your Email OTP has been sent on oyur regsitered email ");

      navigate("/verify-otp", {
        state: {
          email: formData.email,
          // ✅ "register" — VerifyOtp page isse janega
          // Verify hone ke baad user seedha home pe jayega
          from: "register",
        },
      });
      dispatch(resetStatus());
    }

    if (status === "failed") {
      toast.error(error?.error?.message || error?.message || "Registration failed");
      dispatch(resetStatus());
    }
  }, [status, error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 flex items-center justify-center px-6 py-20">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10 animate-fade-in">

        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
          Create an Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          Register → OTP verify →  login! 🎉
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" name="name"
              placeholder="Enter your full name"
              value={formData.name} onChange={handleChange} required
              className="w-full px-4 py-3 rounded-xl text-black border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" name="email"
              placeholder="Enter Email address"
              value={formData.email} onChange={handleChange} required
              className="w-full px-4 py-3 rounded-xl text-black border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
          </div>

          {/* Info box */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-start gap-2">
            <span className="text-blue-500 mt-0.5 shrink-0">📧</span>
            <p className="text-xs text-blue-600">
              After submiting email you will receive  <strong>6-digit OTP</strong> 
              Verify it  —  login  ✅
            </p>
          </div>

          <button type="submit" disabled={status === "loading"}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl
              hover:bg-indigo-700 transition duration-300 shadow-md
              disabled:opacity-70 flex items-center justify-center gap-2">
            {status === "loading" ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                </svg>
                Sending  OTP...
              </>
            ) : "Make  Account"}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an  account?{" "}
          <span onClick={() => navigate("/login")}
            className="text-indigo-600 font-semibold cursor-pointer hover:underline">
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;