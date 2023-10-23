import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./LoginSlice";
import { addEmployeeReducer } from "./AddEmpSlice";

let store = configureStore({
  reducer: {
    login: loginReducer,
    addEmployee: addEmployeeReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
