import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
// import { ToastContainer } from 'react-toastify';



export default function Layout() {
  return (
    <>
  <div className="grid grid-cols-12 gap-10">
    <div className="col-span-2 lg:w-full md:w-24">
    <Sidebar/>
    </div>
    <div className="col-span-10">
      
    <Outlet/>
    </div>
  </div>
    </>
  )
}
