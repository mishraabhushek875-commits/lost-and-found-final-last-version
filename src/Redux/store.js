import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/authSlice";
import itemsReducer from "./store/itemsSlice";
import adminReducer from "./store/adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    admin: adminReducer,
  },
});

export default store;
