import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./LoginSlice";
import { addEmployeeReducer } from "./AddEmpSlice";
import { createProjectReducer } from "./CreateProjSlice";
import { allEmployeesReducer } from "./AllEmpSlice";
import { allProjectsReducer } from "./AllProjSlice";
import { projectDetailsReducer } from "./ProjDetailsSlice";
import { resetPasswordReducer } from "./ForgotPass";
import { organizationReducer } from "./OrgnaizationSlice";

let store = configureStore({
  reducer: {
    login: loginReducer,
    reset: resetPasswordReducer,
    addEmployee: addEmployeeReducer,
    createProject: createProjectReducer,
    allEmployees: allEmployeesReducer,
    allProjects: allProjectsReducer,
    projectDetails: projectDetailsReducer,
    orgnaization: organizationReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
