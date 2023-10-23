import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "./AdminSlice";

let store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});

export default store;
