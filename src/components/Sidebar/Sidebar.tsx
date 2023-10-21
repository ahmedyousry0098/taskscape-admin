import React from 'react'
import '../../App.css'
import { NavLink } from 'react-router-dom'
export default function Sidebar() {





  return (
    <div className='sideBar h-screen pt-10'>
      <div className="text-center">
        <h1 className='text-3xl text-orange-400'>Taskscape</h1>
      </div>
      
      <div className="ps-6 mt-12 text-neutral-400  text-lg">
        <ul>
          <div>
          <NavLink to={'/dashboard'}><i className="fa-solid fa-chart-line w-10"></i><li className='mb-8 lg:inline-block md:hidden'>Dashboard</li></NavLink> 
          </div>
          <div>
          <NavLink to={'/notifications'}><i className="fa-regular fa-bell  w-10"></i><li className='mb-8 lg:inline-block md:hidden'>Notifications</li></NavLink> 
          </div>
          <div>
          <NavLink to={'/projects'}><i className="fa-solid fa-computer w-10"></i><li className='mb-8 lg:inline-block md:hidden'>Projects</li></NavLink> 
          </div>
          <div>
          <NavLink to={'/controls'}><i className="fa-solid fa-screwdriver-wrench w-10"></i><li className='mb-8 lg:inline-block md:hidden'>Controls</li></NavLink>
          </div>
          <div>
          <NavLink to={'/profile'}><i className="fa-regular fa-address-card w-10"></i><li className='mb-8 lg:inline-block md:hidden'>Profile</li></NavLink>
          </div>
          <div>
          <NavLink to={'/login'}><i className="fa-solid fa-power-off w-10"></i><li className='mb-8 lg:inline-block md:hidden'>Logout</li></NavLink>
          </div>
        </ul>
      </div>
    </div>
  )
}
