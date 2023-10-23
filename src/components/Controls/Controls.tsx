import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Controls() {
  

  

  return (
    <>
    <div className='container pt-5'>
      <div className="grid grid-cols-12 rounded-xl shadow-lg shadow-sky-900 bg-sky-500 bg-opacity-5 me-12 py-3 text-white">
        <div className="controller col-span-3 justify-center">
          <NavLink to={''}> <button className='block mx-auto bg-sky-950 hover:shadow-md hover:shadow-orange-500 hover:text-amber-500 w-40 rounded-lg h-10
        font-semibold hover:scale-105 duration-300'><i className="fa-solid fa-user-plus me-3"></i>Add employee</button></NavLink>
        </div>
        <div className="controller col-span-3 justify-center">
          <button className='block mx-auto bg-sky-950 hover:shadow-md hover:shadow-amber-500 hover:text-amber-500 w-40 rounded-lg h-10
        font-semibold hover:scale-105 duration-300'><i className="fa-solid fa-user-plus me-3"></i>warever</button>
        </div>
        <div className="controller col-span-3 justify-center">
          <button className='block mx-auto bg-sky-950 hover:shadow-md hover:shadow-amber-500 hover:text-amber-500 w-40 rounded-lg h-10
        font-semibold hover:scale-105 duration-300'><i className="fa-solid fa-user-plus me-3"></i>ay 7aga</button>
        </div>
        <div className="controller col-span-3 justify-center">
          <button className='block mx-auto bg-sky-950 hover:shadow-md hover:shadow-amber-500 hover:text-amber-500 w-40 rounded-lg h-10
        font-semibold hover:scale-105 duration-300'><i className="fa-solid fa-user-plus me-3"></i>m4 3aref</button>
        </div>
      </div>

      <div className='mt-12 me-12'>
      <Outlet/>
      </div>
      
    </div>
    </>
  )
}
