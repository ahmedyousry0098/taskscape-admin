import React from 'react'
import '../../App.css'
import {Link,  NavLink } from 'react-router-dom'
export default function Sidebar() {





  return (
    <div className='sideBar h-screen pt-10'>
      <div className="text-center">
        <h1 className='text-3xl text-orange-400'>Taskscape</h1>
      </div>
      
      <div className="ps-6 mt-12 text-neutral-400  text-lg">
        <ul>
          <NavLink to={'/dashboard'}><li className='mb-8'><i className="fa-solid fa-chart-line w-10"></i> Dashboard</li></NavLink> 
          <NavLink to={'/notifications'}><li className='mb-8'><i className="fa-regular fa-bell  w-10"></i> Notifications</li></NavLink> 
          <NavLink to={'/projects'}><li className='mb-8'><i className="fa-solid fa-computer w-10"></i> Projects</li></NavLink> 
          <NavLink to={'/controls'}><li className='mb-8'><i className="fa-solid fa-screwdriver-wrench w-10"></i> Controls</li></NavLink>
          <NavLink to={'/profile'}><li className='mb-8'><i className="fa-regular fa-address-card w-10"></i> Profile</li></NavLink>
          <Link to={'/login'}><li><i className="fa-solid fa-power-off w-10"></i>Logout</li></Link>
        </ul>
      </div>
    </div>
  )
}
