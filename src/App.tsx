/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Layout from './shared/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Controls from './components/Controls/Controls';
import Notification from './components/Notification/Notification';
import NotFoundPage from './shared/NotFoundPage/NotFoundPage';
import Projects from './components/Projects/Projects';
import Login from './components/Login/Login';
import Register from './components/Controls/Register/Register';
import ProtectedRoutes from './shared/ProtectedRoutes/ProtectedRoutes';
import Employees from './components/Employees/Employees';
import { useAppDispatch } from './App/hooks';
import { loggedIn } from './Redux/LoginSlice';


export default function App() {
  
  let dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(loggedIn())
  }, [])
  
  
  const router = createBrowserRouter([
    {path: 'login', element: <Login/>},
    {path: "", element: <ProtectedRoutes><Layout/></ProtectedRoutes>  , children: [
      {path:'dashboard', element: <Dashboard/> },
      {path: 'projects', element: <Projects/>},
      {path: 'employees', element: <Employees/>},
      {path: 'controls', element: <Controls/>, children: [
        {index: true, element: <Register/>}
      ]},
      {path: 'notifications', element: <Notification/>},
    ]},
    {path: '*', element: <NotFoundPage/>}
  ])


  return (
      <RouterProvider router={router}></RouterProvider>
  );
}

