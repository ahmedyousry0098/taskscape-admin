import React from 'react';
import './App.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Controls from './components/Controls/Controls';
import Notification from './components/Notification/Notification';
import Profile from './components/Profile/Profile';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Projects from './components/Projects/Projects';
import Login from './components/Login/Login';
import Register from './components/Controls/Register/Register';

export default function App() {


  
  const router = createBrowserRouter([
    {path: "", element: <Layout/>, children: [
      {path: 'dashboard', element: <Dashboard/>},
      {path: 'login', element: <Login/>},
      {path: 'controls', element: <Controls/>, children: [
        {path: 'Register', element: <Register/>}
      ]},
      {path: 'notifications', element: <Notification/>},
      {path: 'profile', element: <Profile/>},
      {path: 'projects', element: <Projects/>},
      {path: '*', element: <NotFoundPage/>}
    ]}
  ])


  return (
      <RouterProvider router={router}></RouterProvider>
  );
}

