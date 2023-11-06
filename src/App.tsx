/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./shared/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import Controls from "./components/Controls/Controls";
import Notification from "./components/Notification/Notification";
import NotFoundPage from "./shared/NotFoundPage/NotFoundPage";
import Projects from "./components/Projects/Projects";
import Login from "./components/Login/Login";
import Register from "./components/Controls/Register/Register";
import ProtectedRoutes from "./shared/ProtectedRoutes/ProtectedRoutes";
import Employees from "./components/Employees/Employees";
import { useAppDispatch } from "./App/hooks";
import { loggedIn } from "./App/Api/LoginSlice";
import Scrums from "./components/Employees/EmpByRole/Scrums";
import Members from "./components/Employees/EmpByRole/Members";
import ProjectDetails from "./components/Projects/ControlProject/tryReactQuery";
import ProjDetails from "./components/Projects/ControlProject/ProjDetails";

export default function App() {
  let dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loggedIn());
  }, []);

  const router = createBrowserRouter([
    { path: "login", element: <Login /> },
    {
      path: "",
      element: (
        <ProtectedRoutes>
          <Layout />
        </ProtectedRoutes>
      ),
      children: [
        { index: true, element: <Navigate to={"/dashboard"} /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "projects", element: <Projects /> },
        { path: "projects/details/:projectId", element: <ProjDetails /> },
        {
          path: "employees",
          element: <Employees />,
          children: [
            { index: true, element: <Navigate to={"scrums"} /> },
            { path: "scrums", element: <Scrums /> },
            { path: "members", element: <Members /> },
          ],
        },
        {
          path: "controls",
          element: <Controls />,
          children: [{ index: true, element: <Register /> }],
        },
        { path: "notifications", element: <Notification /> },
        { path: "ay7aga", element: <ProjectDetails /> },
      ],
    },
    { path: "*", element: <NotFoundPage /> },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
