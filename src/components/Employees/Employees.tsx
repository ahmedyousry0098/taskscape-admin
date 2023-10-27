/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { IRegister } from '../../shared/Interfaces/authentication.interface'
import { addEmployee } from '../../Redux/AddEmpSlice';
import { useAppDispatch, useAppSelector } from '../../App/hooks';
import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { allEmployees } from '../../Redux/AllEmpSlice';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Employees() {

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {setOpen(true);};
  const handleClose = () => {setOpen(false)};


  const dispatch = useAppDispatch()
  const {getAll, isLoading} = useAppSelector(state => state.allEmployees)
  const {loading} = useAppSelector((state) => state.addEmployee)

  // const getAllEmployees = function(){
  // }  
  
  useEffect(()=> {
    dispatch(allEmployees())
  }, [])


  const validationSchema = Yup.object({
    employeeName: Yup.string().required('Employee Name is required').min(3, 'Min 3 characters').max(20, 'Max 20 characters'),
    email: Yup.string().required('Email is required').email('Email In-valid'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('You must choose a role')
  })

  let formik = useFormik<IRegister>({
    initialValues: {
      employeeName: '',
      email: '',
      password: '',
      role: '',
    },
    validationSchema,
    onSubmit: (values)=> {
      dispatch(addEmployee(values))
    }
  })
  
  
  return (
    <div className='mt-10 xl:ms-64 sm:ms-16'>
      
      
    
    {getAll?.employee?.length === 0 ? 
        <div className="text-center mx-auto my-56 w-5/6">
          <h1 className='xl:text-4xl md:text-2xl sm:text-xl mb-6 text-gray-400'><i className="fa-solid fa-users-slash"></i></h1>
          <h2 className='xl:text-4xl md:text-2xl sm:text-xl mb-12 text-gray-400'>No Employees in your orgnaization</h2>
          <button type='submit' className='block mx-auto px-4 border bg-sky-700 hover:bg-sky-900 
            rounded-lg text-white h-10 font-bold'onClick={handleClickOpen}>
            <i className="fa-solid fa-user-plus me-3" ></i>Add employees</button>
        </div>
        : 
        <>
        <div className='mb-5'>
          <button type='submit' className='block ms-5 px-4 border bg-sky-700 hover:bg-sky-900 
            rounded-lg text-white h-10 font-bold'onClick={handleClickOpen}> {loading ? <i className="fa-solid fa-spinner fa-spin-pulse"></i> 
            : <><i className="fa-solid fa-arrow-right-to-bracket me-3"></i>Add Employee</>}</button>
          </div>
          
          <div className='flex flex-wrap justify-center '>
            {isLoading ? <div className='mt-80 text-9xl text-gray-400'><i className="mx-auto fa-solid fa-spinner fa-spin-pulse"></i></div> : getAll?.employee?.map((employee:any)=> 
            <div key={employee._id} className='m-3 w-96 px-10 py-6 bg-sky-500 bg-opacity-5 shadow-md
             text-sky-900 shadow-sky-900 rounded-lg'>  
              <p className='font-bold py-1'>Name: <span className='font-medium'>{employee.employeeName}</span></p>
              <p className='font-bold py-1'>Email: <span className='font-medium'>{employee.email}</span></p>
              <p className='font-bold py-1'>Role: <span className='font-medium'>{employee.role}</span></p> 
              <p className='font-bold py-1'>Joining date: <span className='font-medium'>{employee.createdAt.split("T").slice(0,1).join("")}</span></p> 
              <p className='font-bold py-1'>Last updated: <span className='font-medium'>{employee.updatedAt.split("T").slice(0,1).join("")}</span></p>
              <div className='flex justify-center mt-8'>
              <button type='button' className='bg-red-700 hover:bg-red-900 px-4
            rounded-lg text-white py-1 font-semibold me-7'>
              <i className="fa-solid fa-user-xmark me-2 fa-sm text-white"></i>Remove</button>
              
              <button type='button' className='bg-sky-700 hover:bg-sky-900 px-4
            rounded-lg text-white py-1 font-semibold'>
              <i className="fa-regular fa-pen-to-square me-2 fa-sm text-white"></i>Edit</button>

              </div>

            </div>)}
          </div>
        </>
          }
  
        <div>
        <Dialog open={open}  TransitionComponent={Transition}
            keepMounted onClose={handleClose} fullWidth>
          <DialogContent>
            <h1 className='text-center text-3xl text-sky-900 mb-3 mt-4'>Add An Employee</h1>
            <h1 className='text-lg mb-6 text-sky-900 text-center'>More emplyees more success</h1>
        <form onSubmit={formik.handleSubmit} className='w-5/6 mx-auto'>
            <div className="mb-5 w-full px-4">
              <input type="text" name="employeeName" id="employeeName" value={formik.values.employeeName}
              onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Employee name'  autoComplete='off'
              className='border border-sky-600 h-10 w-full focus:placeholder:opacity-0 outline-0 text-sky-900 ps-5 rounded-lg mb-1'/>
              { formik.errors.employeeName && formik.touched.employeeName ?
                <p className=' text-red-700 text-sm ps-4 font-semibold text-left'>{formik.errors.employeeName}</p>
                : ""}</div>

            <div className="mb-5 w-full px-4">
              <input type="email" name="email" id="email" value={formik.values.email}
              onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Email'  autoComplete='off'
              className='border border-sky-600 h-10 w-full focus:placeholder:opacity-0 outline-0 text-sky-900 ps-5 rounded-lg mb-1'/>
              {formik.errors.email && formik.touched.email ?
                <p className=' text-red-700 text-sm ps-4 font-semibold text-left'>{formik.errors.email}</p>
                : ""}</div>

            <div className="mb-5 w-full px-4">
              <input type="password" name="password" id="password" value={formik.values.password}
              onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Paswword' autoComplete='off'
              className='border border-sky-600 h-10 w-full focus:placeholder:opacity-0 outline-0 text-sky-900 ps-5 rounded-lg mb-1'/>
              { formik.errors.password && formik.touched.password ?
                <p className=' text-red-700 text-sm ps-4 font-semibold text-left'>{formik.errors.password}</p>
                : ""}</div>

            <div className="mb-5 w-full px-4">
              <select id="role" name="role" onChange={formik.handleChange} value={formik.values.role}
              className='border border-sky-600 h-10 w-full outline-0 text-sky-900 ps-5 rounded-lg mb-1'>
                  <option value='' disabled hidden className='py-5 ps-3 h-10'>Select the role</option>
                  <option value="member"  className='py-5 ps-3 text-sky-700'>Member</option>
                  <option value="scrumMaster" className='py-5 ps-3 text-sky-700'>Scrum Master</option>
              </select>
            </div>

          <DialogActions>
            <button type='submit' className='block mx-auto border bg-sky-700 hover:bg-sky-900 px-4
            rounded-lg text-white h-10 font-bold'>{loading ? <i className="fa-solid fa-spinner fa-spin-pulse"></i> 
            : <><i className="fa-solid fa-arrow-right-to-bracket me-3"></i>Add Employee</>}</button>

            <button type='button' className='block mx-auto border bg-sky-700 hover:bg-sky-900 px-4
            rounded-lg text-white h-10 font-bold' onClick={handleClose}>Cancel</button>
          </DialogActions>
          </form>
          </DialogContent>

        </Dialog>
      </div>
  
    </div>


  )
}




// import { NavLink } from 'react-router-dom'
    //        <div className='pt-5 xl:ms-64 sm:ms-16'>
    //   <div className=" mx-auto flex flex-wrap justify-center  rounded-es-xl rounded-eep-0 text-white">
    //     <div className="controller justify-center m-3">
    //       <NavLink to={''}> <button className=' bg-sky-950 hover:shadow-md 
    //       hover:shadow-orange-500 hover:text-amber-500 px-4 rounded-es-xl rounded-ee-xl py-2
    //       font-semibold hover:scale-105 duration-300'><i className="fa-solid fa-user-plus me-3">
    //       </i>Add employee</button></NavLink>
    //     </div>
    //     <div className="controller justify-center m-3">
    //       <NavLink to={''}> <button className=' bg-sky-950 hover:shadow-md 
    //       hover:shadow-orange-500 hover:text-amber-500 px-4 rounded-es-xl rounded-ee-xl py-2
    //       font-semibold hover:scale-105 duration-300'><i className="fa-solid fa-user-plus me-3">
    //       </i>Add employee</button></NavLink>
    //     </div>
    //     <div className="controller justify-center m-3">
    //       <NavLink to={''}> <button className=' bg-sky-950 hover:shadow-md 
    //       hover:shadow-orange-500 hover:text-amber-500 px-4 rounded-es-xl rounded-ee-xl py-2
    //       font-semibold hover:scale-105 duration-300'><i className="fa-solid fa-user-plus me-3">
    //       </i>Add employee</button></NavLink>
    //     </div>
        
    //   </div>
      
    // </div>