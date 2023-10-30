/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect }  from 'react'
import Logo from '../../assets/logo.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { logIn, loggedIn } from '../../Redux/LoginSlice'
import { ILogin } from '../../shared/Interfaces/authentication.interface'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../App/hooks'


export default function Login() {

    let {loading, isLoggedIn} = useAppSelector((state) => state.login)
    let dispatch = useAppDispatch()
    let navigate = useNavigate()

    useEffect(() => {
      if (isLoggedIn === true) {
        navigate("/")
      }
    }, [isLoggedIn])
    

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
        dispatch(logIn(values)).then(()=> {
          dispatch(loggedIn())
          })
        }
      })
  
  return (
    <section className='login'>

      <div className="pt-40 mx-auto">
        <div className="text-center w-full">  
          <div className='w-96 shadow-lg bg-sky-500 bg-opacity-5 mx-auto mt-8 py-8 shadow-sky-900 rounded-lg'>
  
            <img src={Logo} className='w-20 mx-auto' alt="" />
            <h1 className='text-3xl mb-3 text-amber-500 font-serif'>Taskscape</h1>
            <h1 className='text-lg mb-6 text-sky-700'>Log in to continue</h1>
          <form onSubmit={formik.handleSubmit} className='px-10'>


          <div className="mb-5 w-full px-4">
            <input type="email" name="email" id="email" value={formik.values.email}
            onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Employee name'  autoComplete='off'
            className='border border-sky-600 h-10 w-full focus:placeholder:opacity-0 outline-0 text-sky-900 ps-5 rounded-lg mb-1'/>
            { formik.errors.email && formik.touched.email ?
              <p className=' text-red-700 text-sm ps-4 font-semibold text-left'>{formik.errors.email}</p>
              : ""}</div>
          
          <div className="mb-5 w-full px-4">
            <input type="password" name="password" id="password" value={formik.values.password}
            onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Employee name'  autoComplete='off'
            className='border border-sky-600 h-10 w-full focus:placeholder:opacity-0 outline-0 text-sky-900 ps-5 rounded-lg mb-1'/>
            { formik.errors.password && formik.touched.password ?
              <p className=' text-red-700 text-sm ps-4 font-semibold text-left'>{formik.errors.password}</p>
              : ""}</div>

          <button type='submit' className='block mx-auto border bg-sky-700 hover:bg-sky-900 w-40 rounded-lg text-white h-10
          font-bold'>
            {loading? <i className="fa-solid fa-spinner fa-spin-pulse"></i> : <><i className="fa-solid fa-arrow-right-to-bracket me-3"></i>Login</>}
            </button>


            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
