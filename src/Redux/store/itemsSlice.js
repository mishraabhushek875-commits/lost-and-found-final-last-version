import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchItems = createAsyncThunk(
  "items/allItems",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${backendURL}items?page=${page}`);
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

export const fetchItem = createAsyncThunk(
  "items/singleItem",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${backendURL}items/${id}`); // fixed
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("Network error");
    }
  },
);

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
        },
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue("Network error");
    }
  },
);

export const createItem = createAsyncThunk(
  "items/create",
  async (formDataToSend, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${backendURL}items`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue("Network error");
    }
  },
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    success: false,
    data: {
      items: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        pages: 0,
        hasNext: false,
      },
    },
    singleItem: null,
    pendingClaim: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All items
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload.data;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Single item
      .addCase(fetchItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.singleItem = action.payload.data;
      })
      .addCase(fetchItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // submit claim
      .addCase(submitClaim.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitClaim.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.pendingClaim = {
          claimId: action.payload.data.claimId,
          message: action.payload.data.message,
        };
      })
      .addCase(submitClaim.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.error?.message) {
          state.error = action.payload.error.message;
        } else {
          state.error = action.payload || action.error.message;
        }
      })
      // Create Item
      .addCase(createItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload.data;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default itemsSlice.reducer;
