import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;
console.log(backendURL);

// ═══════════════════════════════════════════════════════════════
// 🎓 TEEN THUNKS HAIN AB:
//
//  1. sendOtp     → /auth/login    → { email }         → OTP bhejta hai
//  2. signUpUser  → /auth/signup   → { name, email }   → Account banata hai + OTP bhejta hai
//  3. loginUser   → /auth/verify   → { email, otp }    → OTP verify + token milta hai
//
// 🎓 Notice karo:
//  - "loginUser" naam wahi rakha — baaki code (ReportFound, etc.) mein
//    loginUser already import hai, naam change kiya to sab tutega
//  - Sirf endpoint change kiya: /auth/login → /auth/verify
// ═══════════════════════════════════════════════════════════════

// ─── 1. Login pe OTP bhejo ─────────────────────────────────────
// Login.jsx → handleSendOtp() → dispatch(sendOtp({ email }))
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      // 🎓 Sirf email bhej rahe hain — backend OTP generate karega
      const res = await axios.post(`${backendURL}auth/login`, { email });
      console.log("OTP Response:", res.data);
      return res.data;
      
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("Network error");
    }
  }
);

// ─── 2. Register → Account banao + OTP bhejo ───────────────────
// SignUp.jsx → handleSubmit() → dispatch(signUpUser({ name, email }))
export const signUpUser = createAsyncThunk(
  "user/signUp",
  async (newUser, { rejectWithValue }) => {
    // newUser = { name, email } — password NAHI
    try {
      const res = await axios.post(`${backendURL}auth/signup`, newUser);
      console.log("Signup Response:", res.data);
      return res.data;
      // 🎓 Backend kya return karega?
      // Sirf success message — token nahi
      // Kyunki account bana, par verify nahi hua abhi
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("Network error");
    }
  }
);

// ─── 3. OTP Verify → Login ─────────────────────────────────────
// Login.jsx → handleVerify() → dispatch(loginUser({ email, otp }))
// 🎓 Naam "loginUser" hi rakha — baaki code import karta hai ise
export const loginUser = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    // data = { email, otp }
    try {
      // ✅ FIXED: /auth/login → /auth/verify
      // Pehle yahan /auth/login tha — galat tha
      // Ab /auth/verify pe { email, otp } bhejte hain
      const res = await axios.post(`${backendURL}auth/verify`, data);
      return res.data;
      // Backend verify karega aur { token, user } return karega
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("Network error");
    }
  }
);

// ═══════════════════════════════════════════════════════════════
// SLICE
// ═══════════════════════════════════════════════════════════════
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:   JSON.parse(localStorage.getItem("user")) || null,
    token:  localStorage.getItem("token") || null,

    // 🎓 Status ke saare possible values:
    // "idle"      → kuch nahi ho raha (default)
    // "loading"   → koi bhi API call chal rahi hai
    // "otpSent"   → OTP successfully gaya email pe (login ya signup)
    // "succeeded" → OTP verify hua, token mila, login complete
    // "failed"    → kuch bhi galat hua
    status: "idle",
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user   = null;
      state.token  = null;
      state.status = "idle";
      state.error  = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    },

    resetStatus: (state) => {
      // 🎓 Ye kyun? useEffect mein status watch karte hain
      // Kaam ho gaya (navigate kiya) to status reset karo
      // Warna baar baar useEffect chalega
      state.status = "idle";
      state.error  = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ══ sendOtp — Login pe OTP bheja ════════════════════════
      .addCase(sendOtp.pending, (state) => {
        state.status = "loading";
        state.error  = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        // ✅ OTP gaya — "otpSent" set karo
        // 🎓 "otpSent" catch karega Login.jsx ka useEffect
        //    aur step=2 (OTP screen) dikhayega
        state.status = "otpSent";
        // Token/user set NAHI — abhi sirf OTP gaya hai
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error  = action.payload;
      })

      // ══ signUpUser — Account banaya + OTP gaya ═══════════════
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
        state.error  = null;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        // ✅ FIXED: pehle "succeeded" tha + token set hota tha
        // Ab sirf "otpSent" — kyunki verify nahi hua abhi
        // 🎓 SignUp.jsx ka useEffect "otpSent" pakad ke
        //    navigate("/verify-otp", { state: { from: "register" } }) karega
        state.status = "otpSent";
        // Token/user SET NAHI ← important!
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error  = action.payload;
      })

      // ══ loginUser — OTP verify hua, token mila ═══════════════
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error  = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // ✅ Ab token/user milega — verify ho gaya
        state.status = "succeeded";
        state.token  = action.payload.data.token;
        state.user   = action.payload.data.user;
        // 🎓 localStorage mein save — page refresh pe bhi login rahe
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("role",  action.payload.data.user.role);
        localStorage.setItem("user",  JSON.stringify(action.payload.data.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error  = action.payload;
      });
  },
});

export const { logout, resetStatus } = authSlice.actions;
export default authSlice.reducer;