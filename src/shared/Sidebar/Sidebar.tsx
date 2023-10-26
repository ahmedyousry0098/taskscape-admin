import React from 'react'
import '../../App.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../Redux/LoginSlice'
import Logo from '../../assets/logo.png'
import { useAppDispatch } from '../../App/hooks'

export default function Sidebar() {

  let navigate = useNavigate()
  let dispatch = useAppDispatch()
  
    function loggedOut (){
      dispatch(logout())
      localStorage.removeItem('token')
      navigate('/login')
    }
  
 


  return (
    <div className='sideBar absolute top-0 left-0 xl:w-64 sm:w-16 h-screen'>
      <div className="py-10 text-center">
          <img src={Logo} className='xl:w-24 sm:w-12 mx-auto' alt="" />
          <h1 className='text-2xl xl:opacity-100 sm:opacity-0 cursor-default text-amber-500 font-serif'>Taskscape</h1>
      </div>
      
      
        <ul className="xl:ps-6 lg:ps-5 md:ps-5 sm:ps-5   text-neutral-400  text-lg">
          <div className='hover:text-amber-500 hover:scale-110 duration-300 w-fit h-fit mb-8'>
          <NavLink to={'/dashboard'}><i className="fa-solid fa-chart-line w-10"></i>
          <li className='xl:inline-block lg:hidden md:hidden sm:hidden'>Dashboard</li></NavLink> 
          </div>

          <div className='hover:text-amber-500 hover:scale-110  duration-300 w-fit h-fit mb-8'>
          <NavLink to={'/projects'}><i className="fa-solid fa-layer-group w-10"></i>
          <li className=' xl:inline-block lg:hidden md:hidden sm:hidden'>Projects</li></NavLink> 
          </div>

          <div className='hover:text-amber-500 hover:scale-110  duration-300 w-fit h-fit mb-8'>
          <NavLink to={'/employees'}><i className="fa-solid fa-people-group w-10"></i>
          <li className=' xl:inline-block lg:hidden md:hidden sm:hidden'>Employees</li></NavLink>
          </div>

          <div className='hover:text-amber-500 hover:scale-110  duration-300 w-fit h-fit mb-8'>
          <NavLink to={'/notifications'}><i className="fa-regular fa-bell  w-10"></i>
          <li className=' xl:inline-block lg:hidden md:hidden sm:hidden'>Notifications</li></NavLink> 
          </div>

          <div className='hover:text-amber-500 hover:scale-110  duration-300 w-fit h-fit mb-8'>
          <NavLink to={'/controls'}><i className="fa-solid fa-screwdriver-wrench  w-10"></i>
          <li className=' xl:inline-block lg:hidden md:hidden sm:hidden'>Controls</li></NavLink>
          </div>

          <div >
          <p className='cursor-pointer hover:text-amber-500 hover:scale-110 duration-300 w-fit h-fit'
          onClick={loggedOut}><i className="fa-solid fa-power-off  w-10"></i>
          <li className=' xl:inline-block lg:hidden md:hidden sm:hidden'>Logout</li></p>
          </div>
        </ul>

      </div>
  )
}
