import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { IRegister } from '../../../Interfaces/authentication.interface'

export default function Register() {

  const validationSchema = Yup.object({
    employee: Yup.string().required('Employee Name is required').min(3, 'Min 3 characters').max(20, 'Max 20 characters'),
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
      console.log(values);
    }
  })

  return (
    <section>

          <div className="pt-8 text-center mx-auto flex justify-center">
      <div className="w-fit text-center flex justify-center">  
        <div className='w-full shadow-lg shadow-sky-900 py-8 rounded-lg '>
          <h1 className='text-3xl mb-6 text-sky-900'>Add an employee</h1>
          <h1 className='text-lg mb-6 text-sky-900'>more emplyees more success</h1>
        <form onSubmit={formik.handleSubmit} className=''>


        <input type="text" name="employeeName" id="employeeName" value={formik.values.employeeName}
        onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Employee name'  autoComplete='employeeName'
        className='border border-sky-600 h-10 w-9/12 outline-0 text-sky-900 ps-5 rounded-lg mb-5'/>

        <input type="email" name="email" id="email" value={formik.values.email}
        onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Email address'  autoComplete='email'
        className='border border-sky-600 h-10 w-9/12 outline-0 text-sky-900 ps-5 rounded-lg mb-5'/>

        <input type="password" name="password" id="password" value={formik.values.password} autoComplete='password'
         onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Password'
         className='border border-sky-600 h-10 w-9/12 outline-0 text-sky-900 ps-5 rounded-lg mb-5'/>

         <select id="role" name="role" onChange={formik.handleChange} value={formik.values.role}
         className='border border-sky-600 h-10 w-9/12 outline-0 text-sky-900 ps-5 rounded-lg mb-5'>
          <option value="member" className='py-5 border-sky-600 h-10 text-sky-900 '>Member</option>
          <option value="scrumMaster" className='py-5 border-sky-600 h-10 text-sky-900 '>Scrum Master</option>
        </select>

        <div className="mt-8 mb-5">

          <button type='submit' className='block mx-auto border bg-sky-700 hover:bg-sky-900 w-40 rounded-lg text-white h-10
        font-bold'><i className="fa-solid fa-user-plus me-3"></i>Add Employee</button>
        {/* <button type='submit' className='block mx-auto border bg-sky-700 hover:bg-sky-900 w-40 rounded-lg text-white h-10
        font-bold'>
          {loading? <i className="fa-solid fa-spinner fa-spin-pulse"></i> : <><i className="fa-solid fa-arrow-right-to-bracket me-3"></i>Login</>}
          </button> */}
        </div>


        <div className="">
        { formik.errors.email && formik.touched.email ?
        <div className='bg-red-300 w-60 py-3 mb-2 mx-auto text-red-700 border-s-8 border-red-700 rounded-es-2xl rounded-se-2xl ps-4 font-semibold'><p>{formik.errors.email}</p></div> 
        : ""
      }
        { formik.errors.password && formik.touched.password ?
        <div className='bg-red-300 w-60 py-3 mb-2 mx-auto text-red-700 border-s-8 border-red-700 rounded-es-2xl rounded-se-2xl ps-4 font-semibold'><p>{formik.errors.password}</p></div> 
        : ""
      }
        </div>
        </form>
        </div>
      </div>
    </div>

    </section>
  )
}
