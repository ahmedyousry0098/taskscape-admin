/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../App/hooks'
import { allEmployees, allScrums } from '../../Redux/AllEmpSlice'
import { allProjects } from '../../Redux/AllProjSlice'

export default function Dashboard() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()];
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', day: 'numeric', month: 'long' };

  const formattedDate = new Date().toLocaleDateString(undefined, options);
  const { getAllEmployees, getScrums } = useAppSelector((state => state.allEmployees))
  const { getAllProjects } = useAppSelector((state => state.allProjects))
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(allEmployees())
    dispatch(allProjects())
    dispatch(allScrums())
  }, [])





  return (
    <div className="xl:ms-64 sm:ms-16">

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-5 mx-5 px-10 py-4 shadow-lg bg-sky-700 bg-opacity-10 rounded-es-xl rounded-ee-xl">
        <div className="w-2/4 h-10">
          <input type="search" name="" id="" className="h-full w-full ps-5 rounded-lg placeholder:text-sky-700 text-sky-700 outline-none" placeholder="Search" />
        </div>
        <div>
          <p className="text-sky-800 font-bold">{dayOfWeek}<span className="text-sky-800 font-normal ms-3">{formattedDate}</span></p>
        </div>
      </div>


      {/* Numbers */}
      <div className="flex flex-wrap justify-center items-center mx-auto w-full mt-4 text-white">
        <div className="flex flex-col justify-between bg-sky-950 w-56 mx-5 h-24 rounded-2xl p-3 mb-4 ">
          <h1 className='px-3 text-base'>Total Employees:</h1>
          <p className='text-center text-2xl text-amber-500'>{getAllEmployees?.employees?.length + getScrums?.scrums?.length}</p>
        </div>

        <div className="flex flex-col justify-between bg-sky-950 w-56 mx-5 h-24 rounded-2xl p-3 mb-4 ">
          <h1 className='px-3 text-base'>Total Projects:</h1>
          <p className='text-center text-2xl text-amber-500'>{getAllProjects?.projects?.length}</p>
        </div>

        <div className="flex flex-col justify-between bg-sky-950 w-56 mx-5 h-24 rounded-2xl p-3 mb-4 ">
          <h1 className='px-3 text-base'>Performance:</h1>
          <p className='text-center text-2xl text-amber-500'>{getAllProjects?.projects?.length} * 100 / Done </p>
        </div>

      </div>

      {/* Charts */}
      <div>
        <div className="flex flex-wrap justify-around mx-auto w-full items-center mt-4 text-white">


          <div className="bg-sky-950 w-[450px] mx-3 rounded-2xl px-3 py-1 mb-4">
            <h1 className='px-3 text-base'>PIE CHART</h1>
            <p className='text-center text-2xl text-amber-500'> Employees work time </p>
          </div>




          <div className="bg-sky-950 w-[650px] mx-3 rounded-2xl px-3 py-1 mb-4">
            <h1 className='px-3 text-base'>Employees by Experience:</h1>
            <p className='text-center text-2xl text-amber-500'> graph </p>
          </div>


        </div>





        <div className="flex flex-wrap justify-around mx-auto w-full items-center mt-4 text-white">


          <div className="bg-sky-950 w-[650px] mx-3 rounded-2xl px-3 py-1 mb-4">
            <h1 className='px-3 text-base'>Projects by Status:</h1>
            <p className='text-center text-2xl text-amber-500'> graph </p>
          </div>


          <div className="bg-sky-950 w-[450px] mx-3 rounded-2xl px-3 py-1 mb-4">
            <h1 className='px-3 text-base'>PIE CHART</h1>
            <p className='text-center text-2xl text-amber-500'> Tasks </p>
          </div>


        </div>






      </div>

      {/* Table */}
      <div className="flex flex-wrap justify-around mx-auto w-full items-center my-4 text-white">
        <div className="bg-sky-950 w-full mx-4 h-24 rounded-2xl px-3 py-1 text-white">Table tasks in progress</div>
      </div>







    </div>
  )
}
