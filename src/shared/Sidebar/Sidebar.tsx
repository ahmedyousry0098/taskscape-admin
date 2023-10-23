import React from 'react'
import '../../App.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/LoginSlice'
import Logo from '../../assets/logo.png'

export default function Sidebar() {

  let navigate = useNavigate()
  let dispatch = useDispatch()
  
    function loggedOut (){
      dispatch(logout())
      localStorage.removeItem('token')
      navigate('/login')
    }
  
 


  return (
    <div className='sideBar w-full h-screen'>
      <div className="py-10 text-center">
          <img src={Logo} className='w-4/12 mx-auto' alt="" />
          <h1 className='lg:text-2xl cursor-default text-amber-500 font-serif'>Taskscape</h1>
      </div>
      
      <div className="xl:ps-6 lg:ps-10 md:ps-10 sm:ps-2   text-neutral-400  text-lg">
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
          <p className='cursor-pointer hover:text-amber-500 hover:scale-110  duration-300 w-fit h-fit' onClick={loggedOut}><i className="fa-solid fa-power-off  w-10"></i><li className=' xl:inline-block lg:hidden md:hidden sm:hidden'>Logout</li></p>
          </div>
        </ul>
      </div>
    </div>
  )
}
