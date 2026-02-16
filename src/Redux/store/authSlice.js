// src/Redux/store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const loginUser = createAsyncThunk(
  "user/login",
  async (newUser, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${backendURL}auth/login`, newUser);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("Network error");
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUp",
  async (newUser, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${backendURL}auth/signup`, newUser);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("Network error");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("role", action.payload.data.user.role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("role", action.payload.data.user.role);
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;