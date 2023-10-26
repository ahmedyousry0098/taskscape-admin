import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
// import { ToastContainer } from 'react-toastify';



export default function Layout() {
  return (
    <>
  <div className="">
    <div className="">
    <Sidebar/>
    </div>
    <div className=" ">
      
    <Outlet/>
    </div>
  </div>
    </>
  )
}
