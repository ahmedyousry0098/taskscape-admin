import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./LoginSlice";
import { addEmployeeReducer } from "./AddEmpSlice";
import { createProjectReducer } from "./CreateProject";
import { allEmployeesReducer } from "./AllEmpSlice";

let store = configureStore({
  reducer: {
    login: loginReducer,
    addEmployee: addEmployeeReducer,
    createProject: createProjectReducer,
    allEmployees: allEmployeesReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
