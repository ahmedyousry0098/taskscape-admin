import React, { useEffect } from 'react'
import Logo from '../../assets/logo.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
// import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../../Redux/LoginSlice'
import { ILogin } from '../../shared/Interfaces/authentication.interface'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../App/hooks'


export default function Login() {

    let {loading, isLoggedIn} = useAppSelector((state) => state.login)
    let dispatch = useAppDispatch()
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
        dispatch(logIn(values))
      }
      })
      
      useEffect(()=> {
        if (isLoggedIn === true) {
          navigate('/')
        } 
    },[isLoggedIn, navigate])


    


  return (
    <section className='login h-screen'>

      <div className="pt-40 text-center mx-auto flex justify-center">
        <div className="w-fit text-center flex justify-center">  
          <div className='w-full shadow-lg bg-sky-500 bg-opacity-5 shadow-sky-900 py-8 rounded-lg '>
  
            <img src={Logo} className='w-24 mx-auto' alt="" />
            <h1 className='text-3xl mb-2 text-amber-500 font-serif'>Taskscape</h1>
            <h1 className='text-lg mb-6 text-sky-700'>Log in to continue</h1>
          <form onSubmit={formik.handleSubmit} className=''>


          <input type="email" name="email" id="email" value={formik.values.email}
          onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Email address'  autoComplete='email'
          className='border border-sky-600 h-10 w-9/12 outline-0 text-amber-500 font-bold ps-5 rounded-lg mb-5'/>

          <input type="password" name="password" id="password" value={formik.values.password} autoComplete='password'
          onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Password'
          className='border border-sky-600 h-10 w-9/12 outline-0 text-amber-500 font-bold ps-5 rounded-lg mb-5'/>

          <div className="mt-8 mb-5">
          <button type='submit' className='block mx-auto border bg-sky-700 hover:bg-sky-900 w-40 rounded-lg text-white h-10
          font-bold'>
            {loading? <i className="fa-solid fa-spinner fa-spin-pulse"></i> : <><i className="fa-solid fa-arrow-right-to-bracket me-3"></i>Login</>}
            </button>
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
