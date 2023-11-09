import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./LoginSlice";
import { allEmployeesReducer } from "./EmployeesSlice";
import { allProjectsReducer } from "./ProjectsSlice";
import { projectDetailsReducer } from "./ProjDetailsSlice";
import { resetPasswordReducer } from "./ForgotPass";
import { organizationReducer } from "./OrgnaizationSlice";

let store = configureStore({
  reducer: {
    login: loginReducer,
    reset: resetPasswordReducer,
    allEmployees: allEmployeesReducer,
    allProjects: allProjectsReducer,
    projectDetails: projectDetailsReducer,
    orgnaization: organizationReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
