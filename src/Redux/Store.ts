import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./LoginSlice";
import { addEmployeeReducer } from "./AddEmpSlice";
import { createProjectReducer } from "./CreateProjSlice";
import { allEmployeesReducer } from "./AllEmpSlice";
import { allProjectsReducer } from "./AllProjSlice";

let store = configureStore({
  reducer: {
    login: loginReducer,
    addEmployee: addEmployeeReducer,
    createProject: createProjectReducer,
    allEmployees: allEmployeesReducer,
    allProjects: allProjectsReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
