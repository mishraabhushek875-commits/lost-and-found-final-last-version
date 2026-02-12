import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchDashboard = createAsyncThunk(
  "admin/dashboard",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${backendURL}admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);

        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("Network error");
    }
  },
);

export const updateItem = createAsyncThunk(
  "admin/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${backendURL}items/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("Network error");
    }
  },
);

export const deleteItem = createAsyncThunk(
  "admin/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${backendURL}items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("Network error");
    }
  },
);

// ✅ Fetch pending claims
export const claimedItems = createAsyncThunk(
  "admin/claimed",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${backendURL}admin/claim`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Network error");
    }
  }
);

export const approveClaim = createAsyncThunk(
  "admin/approveClaim",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${backendURL}admin/claims/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Network error");
    }
  }
);

// ✅ Reject claim
export const rejectClaim = createAsyncThunk(
  "admin/rejectClaim",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${backendURL}admin/claims/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Network error");
    }
  }
);


const dashboardSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: {
      stats: {
        totalItems: 0,
        lostItems: 0,
        foundItems: 0,
        pendingClaims: 0,
        approvedClaims: 0,
        resolvedItems: 0,
        totalUsers: 0,
      },
      recentItems: [],
      recentClaims: [],
      categoryStats: [],
      items: [],
      claims: [],
      message: "",
    },
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload.data;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updated = action.payload.data;
        state.data.items = state.data.items.map((item) =>
          item._id === updated._id ? updated : item,
        );
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const deletedId = action.meta.arg;
        state.data.recentItems = state.data.recentItems.filter(
          (item) => item._id !== deletedId,
        );
      })
      .addCase(claimedItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(claimedItems.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.claims = action.payload.data || []; // ✅ safe fallback
      })
      .addCase(claimedItems.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || action.error.message;
      })
      // Approve claim
      .addCase(approveClaim.fulfilled, (state) => {
        state.success = true;
      })
      .addCase(approveClaim.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      // Reject claim
      .addCase(rejectClaim.fulfilled, (state) => {
        state.success = true;
      })
      .addCase(rejectClaim.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });

  },
});

export default dashboardSlice.reducer;
