import React from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
export default function Sidebar() {
  return (
    <div className='sideBar h-screen pt-10'>
      <div className="text-center">
        <h1 className='text-3xl text-orange-400'>Taskscape</h1>
      </div>
      
      <div className="flex flex-col ps-6 mt-12 text-neutral-400 text-lg">
        <ul>
          <Link to={'/dashboard'}><li className='mb-8 active:text-orange-300 focus:text-red-200'><i className="fa-solid fa-chart-line"></i> Dashboard</li></Link> 
          <Link to={'/notifications'}><li className='mb-8 active:text-orange-300 focus:text-red-200'><i className="fa-regular fa-bell"></i> Notifications</li></Link> 
          <Link to={'/projects'}><li className='mb-8 active:text-orange-300 focus:text-red-200'><i className="fa-solid fa-computer"></i> Projects</li></Link> 
          <Link to={'/controls'}><li className='mb-8 active:text-orange-300 focus:text-red-200'><i className="fa-solid fa-screwdriver-wrench"></i> Controls</li></Link>
          <Link to={'/profile'}><li className='mb-8 active:text-orange-300 focus:text-red-200'><i className="fa-regular fa-address-card"></i> Profile</li></Link>
          <li><i className="fa-solid fa-power-off"></i>Logout</li>
        </ul>
      </div>
    </div>
  )
}
