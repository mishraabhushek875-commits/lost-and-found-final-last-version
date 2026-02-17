import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

/* ================= FETCH ALL ITEMS ================= */

export const fetchItems = createAsyncThunk(
  "items/fetchAll",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${backendURL}items?page=${page}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Network error"
      );
    }
  }
);

/* ================= FETCH SINGLE ITEM ================= */

export const fetchItem = createAsyncThunk(
  "items/fetchSingle",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${backendURL}items/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Network error"
      );
    }
  }
);

/* ================= CREATE ITEM ================= */

export const createItem = createAsyncThunk(
  "items/create",
  async (formDataToSend, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      // ✅ Reject early if no token
      if (!token) {
        return rejectWithValue("You must be logged in to report a found item.");
      }

      const res = await axios.post(
        `${backendURL}items`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Network error");
    }
  }
);

/* ================= SUBMIT CLAIM ================= */

export const submitClaim = createAsyncThunk(
  "items/claim",
  async ({ proof, id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${backendURL}items/${id}/claim`,
        { proof },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Network error"
      );
    }
  }
);

/* ================= SLICE ================= */

const itemsSlice = createSlice({
  name: "items",

  initialState: {
    // Data
    items: [],
    singleItem: null,
    pagination: {},

    // Loading states
    fetchLoading: false,
    createLoading: false,
    claimLoading: false,

    // Success states (Separate!)
    fetchSuccess: false,
    createSuccess: false,
    claimSuccess: false,

    error: null,
  },

  reducers: {
    resetItemState: (state) => {
      state.createSuccess = false;
      state.claimSuccess = false;
      state.fetchSuccess = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===== FETCH ALL ===== */
      .addCase(fetchItems.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.fetchSuccess = true;
        state.items = action.payload.data.items;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload;
      })

      /* ===== FETCH SINGLE ===== */
      .addCase(fetchItem.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.singleItem = action.payload.data;
      })
      .addCase(fetchItem.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload;
      })

      /* ===== CREATE ITEM ===== */
      .addCase(createItem.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state) => {
        state.createLoading = false;
        state.createSuccess = true;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      /* ===== CLAIM ITEM ===== */
      .addCase(submitClaim.pending, (state) => {
        state.claimLoading = true;
        state.error = null;
      })
      .addCase(submitClaim.fulfilled, (state) => {
        state.claimLoading = false;
        state.claimSuccess = true;
      })
      .addCase(submitClaim.rejected, (state, action) => {
        state.claimLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetItemState } = itemsSlice.actions;
export default itemsSlice.reducer;
