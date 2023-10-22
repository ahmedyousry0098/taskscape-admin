import React from 'react'
import '../../App.css'
import { NavLink, useNavigate } from 'react-router-dom'
export default function Sidebar() {

  let navigate = useNavigate()

  function logOut (){ 
    localStorage.removeItem('token')
    navigate('/login')
  }


  return (
    <div className='sideBar w-full h-screen pt-10'>
      <div className="text-center">
        <h1 className='text-3xl text-orange-400 cursor-default'>Taskscape</h1>
      </div>
      
      <div className="xl:ps-6 lg:ps-10 md:ps-10 sm:ps-2  mt-12 text-neutral-400  text-lg">
        <ul>
          <div className='hover:text-amber-500 hover:scale-110 duration-300 w-fit h-fit mb-8'>
          <NavLink to={'/dashboard'}><i className="fa-solid fa-chart-line w-10"></i><li className='xl:inline-block lg:hidden md:hidden sm:hidden'>Dashboard</li></NavLink> 
          </div>
          <div className='hover:text-amber-500 hover:scale-110  duration-300 w-fit h-fit mb-8'>
          <NavLink to={'/notifications'}><i className="fa-regular fa-bell  w-10"></i><li className=' xl:inline-block lg:hidden md:hidden sm:hidden'>Notifications</li></NavLink> 
          </div>
          <div className='hover:text-amber-500 hover:scale-110  duration-300 w-fit h-fit mb-8'>
          <NavLink to={'/projects'}><i className="fa-solid fa-computer  w-10"></i><li className=' xl:inline-block lg:hidden md:hidden sm:hidden'>Projects</li></NavLink> 
          </div>
          <div className='hover:text-amber-500 hover:scale-110  duration-300 w-fit h-fit mb-8'>
          <NavLink to={'/controls'}><i className="fa-solid fa-screwdriver-wrench  w-10"></i><li className=' xl:inline-block lg:hidden md:hidden sm:hidden'>Controls</li></NavLink>
          </div>
          <div className='hover:text-amber-500 hover:scale-110  duration-300 w-fit h-fit mb-8'>
          <NavLink to={'/profile'}><i className="fa-regular fa-address-card  w-10"></i><li className=' xl:inline-block lg:hidden md:hidden sm:hidden'>Profile</li></NavLink>
          </div>
          <div >
          <p className='cursor-pointer hover:text-amber-500 hover:scale-110  duration-300 w-fit h-fit' onClick={logOut}><i className="fa-solid fa-power-off  w-10"></i><li className=' xl:inline-block lg:hidden md:hidden sm:hidden'>Logout</li></p>
          </div>
        </ul>
      </div>
    </div>
  )
}
