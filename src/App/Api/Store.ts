import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./LoginSlice";
import { addEmployeeReducer } from "./AddEmpSlice";
import { createProjectReducer } from "./CreateProjSlice";
import { allEmployeesReducer } from "./AllEmpSlice";
import { allProjectsReducer } from "./AllProjSlice";
import { projectDetailsReducer } from "./ProjDetailsSlice";

let store = configureStore({
  reducer: {
    login: loginReducer,
    addEmployee: addEmployeeReducer,
    createProject: createProjectReducer,
    allEmployees: allEmployeesReducer,
    allProjects: allProjectsReducer,
    projectDetails: projectDetailsReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
