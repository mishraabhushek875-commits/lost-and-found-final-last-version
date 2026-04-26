import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

/* ================= FETCH ALL ITEMS ================= */

export const fetchItems = createAsyncThunk(
  "items/fetchAll",
  async ({ page = 1, status = "" }, { rejectWithValue }) => {
    try {
      const query = status ? `page=${page}&status=${status}` : `page=${page}`;
      const res = await axios.get(`${backendURL}items?${query}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Network error");
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
      return rejectWithValue(error.response?.data || "Network error");
    }
  }
);

/* ================= CREATE ITEM ================= */

export const createItem = createAsyncThunk(
  "items/create",
  async (formDataToSend, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(`${backendURL}items`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Network error");
    }
  }
);

/* ================= UPDATE ITEM (🔥 FIXED) ================= */

export const updateItem = createAsyncThunk(
  "items/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${backendURL}items/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ IMPORTANT FIX
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log("UPDATE ERROR:", error.response?.data); // 👈 DEBUG
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
      return rejectWithValue(error.response?.data || "Network error");
    }
  }
);

/* ================= MY CLAIMS ================= */

export const myClaim = createAsyncThunk(
  "item/my-claim",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${backendURL}user/my-claims`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Network error");
    }
  }
);

/* ================= SLICE ================= */

const itemsSlice = createSlice({
  name: "items",

  initialState: {
    items: [],
    foundItems: [],
    lostItems: [],
    singleItem: null,

    pagination: {},
    lostPagination: {},
    foundPagination: {},

    myclaims: [],

    fetchLoading: false,
    createLoading: false,
    updateLoading: false, // ✅ NEW
    claimLoading: false,
    myclaimsLoading: false,

    fetchSuccess: false,
    createSuccess: false,
    updateSuccess: false, // ✅ NEW
    claimSuccess: false,
    myclaimsSuccess: false,

    error: null,
  },

  reducers: {
    resetItemState: (state) => {
      state.createSuccess = false;
      state.updateSuccess = false; // ✅ NEW
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
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.fetchLoading = false;

        const { items, pagination } = action.payload.data;
        const status = action.meta.arg.status;

        if (status === "lost") {
          state.lostItems = items;
          state.lostPagination = pagination;
        } else if (status === "found") {
          state.foundItems = items;
          state.foundPagination = pagination;
        } else {
          state.items = items;
          state.pagination = pagination;
        }
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload;
      })

      /* ===== FETCH SINGLE ===== */
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.singleItem = action.payload.data;
          console.log("FULL PAYLOAD:", action.payload);         // 👈 add karo
  console.log("PAGINATION:", action.payload.data?.pagination);
      })

      /* ===== CREATE ITEM ===== */
      .addCase(createItem.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createItem.fulfilled, (state) => {
        state.createLoading = false;
        state.createSuccess = true;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ITEM (🔥 IMPORTANT) ===== */
      .addCase(updateItem.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateItem.fulfilled, (state) => {
        state.updateLoading = false;
        state.updateSuccess = true;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      /* ===== CLAIM ===== */
      .addCase(submitClaim.fulfilled, (state,action) => {
        state.loading=false;
        console.log(action.payload);
        
        state.successMessage="Claim submitted successfully"
        state.claimSuccess = true;
      })

      /* ===== MY CLAIMS ===== */
      .addCase(myClaim.fulfilled, (state, action) => {
        state.myclaims = action.payload.data;
      });
  },
});

export const { resetItemState } = itemsSlice.actions;
export default itemsSlice.reducer;