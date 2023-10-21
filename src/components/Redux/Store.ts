import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { adminReducer } from "./AdminSlice";

let store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});

export default store;
