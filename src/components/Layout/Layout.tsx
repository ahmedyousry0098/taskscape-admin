import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'

export default function Layout() {
  return (
    <>
  <div className="grid grid-cols-12 gap-10">
    <div className="col-span-2">
    <Sidebar/>
    </div>
    <div className="col-span-10">
    <Outlet/>
    </div>
  </div>
    </>
  )
}
