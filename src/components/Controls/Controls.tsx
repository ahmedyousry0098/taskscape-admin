import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Controls() {
  

  

  return (
    
    <div className='pt-5 xl:ms-64 sm:ms-16'>
      <div className=" mx-auto flex flex-wrap justify-center  rounded-es-xl rounded-eep-0 text-white">
        <div className="controller justify-center m-3">
          <NavLink to={''}> <button className=' bg-sky-950 hover:shadow-md 
          hover:shadow-orange-500 hover:text-amber-500 px-4 rounded-es-xl rounded-ee-xl py-2
          font-semibold hover:scale-105 duration-300'><i className="fa-solid fa-user-plus me-3">
          </i>Add employee</button></NavLink>
        </div>
        <div className="controller justify-center m-3">
          <NavLink to={''}> <button className=' bg-sky-950 hover:shadow-md 
          hover:shadow-orange-500 hover:text-amber-500 px-4 rounded-es-xl rounded-ee-xl py-2
          font-semibold hover:scale-105 duration-300'><i className="fa-solid fa-user-plus me-3">
          </i>Add employee</button></NavLink>
        </div>
        <div className="controller justify-center m-3">
          <NavLink to={''}> <button className=' bg-sky-950 hover:shadow-md 
          hover:shadow-orange-500 hover:text-amber-500 px-4 rounded-es-xl rounded-ee-xl py-2
          font-semibold hover:scale-105 duration-300'><i className="fa-solid fa-user-plus me-3">
          </i>Add employee</button></NavLink>
        </div>
        
      </div>

      <div className=''>
      <Outlet/>
      </div>
      
    </div>

  )
}
