import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../Redux/AdminSlice'
import { useNavigate } from 'react-router-dom'
import { ILogin } from '../../Interfaces/authentication.interface'

export default function Login() {

    let {loading} = useSelector((state:any) => state.admin)
    let dispatch = useDispatch<any>()
    let navigate = useNavigate()

    const validationSchema = Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required")
    })
  
    const formik = useFormik<ILogin>({
      initialValues : {
        email: "",
        password: ""
      },
      validationSchema,
      onSubmit: (values) => {
        //Error typescript m4 fahem leeh 
        dispatch(logIn(values))
        navigate('/dashboard')
      }
    })


  return (
    <>
    <div className=" mt-60 mx-auto">
    <div className='grid grid-cols-12 gap-12 '>
      <div className="col-span-6 text-center">
        

        <form onSubmit={formik.handleSubmit} className=''>
        <input type="email" name="email" id="email" value={formik.values.email}
        onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Email address'  
        className='border-0 h-10 w-80 outline-0 text-orange-500 ps-5 rounded-lg mb-5'/>


        <input type="password" name="password" id="password" value={formik.values.password}
         onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Password'
         className='border-0 h-10 w-80 outline-0 text-orange-500 ps-5 rounded-lg'/>

        <div className="mt-8 mb-5">
        <button type='submit' className='block mx-auto border bg-orange-500 w-40 rounded-lg text-white h-10
        font-bold'>
          {loading? <i className="fa-solid fa-spinner fa-spin-pulse"></i> : <><i className="fa-solid fa-arrow-right-to-bracket me-3"></i>Login</>}
          </button>
        </div>


        <div className="">
        { formik.errors.email && formik.touched.email ?
        <div className='bg-red-300 w-60 py-4 mb-2 mx-auto text-red-700 border-s-8 border-red-950 ps-4'><p>{formik.errors.email}</p></div> 
        : ""
      }
        { formik.errors.password && formik.touched.password ?
        <div className='bg-red-300 w-60 py-4 mx-auto text-red-700 border-s-8 border-red-950 ps-4'><p>{formik.errors.password}</p></div> 
        : ""
      }
        </div>
        </form>












      </div>
      <div className="col-span-6">
        <h2>Here will be Picture.PNG</h2>
      </div>
      
    </div>

    </div>
    </>
  )
}
