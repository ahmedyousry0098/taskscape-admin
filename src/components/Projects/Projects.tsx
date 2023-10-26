import { useFormik } from 'formik'
import * as Yup from 'yup'
import { IProject } from '../../shared/Interfaces/authentication.interface'
import { useAppDispatch, useAppSelector } from '../../App/hooks';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { createProject } from '../../Redux/CreateProject';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>){
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Projects() {

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const projects:string[] = []
  const dispatch = useAppDispatch()
  const {loading, done} = useAppSelector((state) => state.createProject)


  const validationSchema = Yup.object({
    projectName: Yup.string().required('Project name is required').min(3, 'Min 3 characters').max(20, 'Max 20 characters'),
    startDate: Yup.string().required('Start Date is required').min(10, "Min 10 characters"),
    deadline: Yup.string().required('Deadline is required'),
    description: Yup.string().required('Description is required'),
    scrumMaster: Yup.string().required('Select a scrum master'),
    employees: Yup.string().required('Select the employees')
  })


  let formik = useFormik<IProject>({
    initialValues: {
      projectName: '',
      startDate: '',
      deadline: '',
      description: '',
      scrumMaster: '',
      employees: [],
    },
    validationSchema,
    onSubmit: (values)=> {
      console.log(values);
      dispatch(createProject(values))
    }
  })
  
  
  return (
    <div className='mt-10 xl:ms-64 sm:ms-16'>
      
    
    {projects.length === 0 ? 
        <div className="text-center mx-auto my-56 w-5/6">
          <h1 className='xl:text-4xl md:text-2xl sm:text-xl mb-6 text-gray-400'><i className="fa-solid fa-users-slash"></i></h1>
          <h2 className='xl:text-4xl md:text-2xl sm:text-xl mb-12 text-gray-400'>No Projects in your orgnaization</h2>
          <button type='submit' className='block mx-auto px-4 border bg-sky-700 hover:bg-sky-900 
            rounded-lg text-white h-10 font-bold'onClick={handleClickOpen}>
            <i className="fa-solid fa-user-plus me-3" ></i>Create Project</button>
        </div>
        : <div className=''>
          <button type='submit' className='block mx-auto px-4 border bg-sky-700 hover:bg-sky-900 
            rounded-lg text-white h-10 font-bold'onClick={handleClickOpen}> {loading ? <i className="fa-solid fa-spinner fa-spin-pulse"></i> 
            : <><i className="fa-solid fa-arrow-right-to-bracket me-3"></i>Create Project</>}</button>
          </div>}
  
        <div>
        <Dialog open={open}  TransitionComponent={Transition}
            keepMounted onClose={handleClose} fullWidth>
          <DialogContent >
            <h1 className='text-center text-3xl text-sky-900 mb-3 mt-4'>Create New Project</h1>
            <h1 className='text-lg mb-6 text-sky-900 text-center'>Projects make orgnaization grow faster</h1>
        <form onSubmit={formik.handleSubmit} className='w-5/6 mx-auto'>


            <div className="mb-5 w-full px-4">
              <input type="text" name="projectName" id="projectName" value={formik.values.projectName}
              onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Project name'  autoComplete='off'
              className='border border-sky-600 h-10 w-full focus:placeholder:opacity-0 outline-0 text-sky-900 ps-5 rounded-lg mb-1'/>
              { formik.errors.projectName && formik.touched.projectName ?
                <p className=' text-red-700 text-sm ps-4 font-semibold text-left'>{formik.errors.projectName}</p>
                : ""}
            </div>
            
            <div className="mb-5 w-full px-4">
              <input type="date" name="startDate" id="startDate" value={formik.values.startDate}
              onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Start date'  autoComplete='off'
              className='border border-sky-600 h-10 w-full focus:placeholder:opacity-0 outline-0 text-sky-900 ps-5 rounded-lg mb-1'/>
              { formik.errors.startDate && formik.touched.startDate ?
                <p className=' text-red-700 text-sm ps-4 font-semibold text-left'>{formik.errors.startDate}</p>
                : ""}
            </div>

            <div className="mb-5 w-full px-4">
              <input type="date" name="deadline" id="deadline" value={formik.values.deadline}
              onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Deadline'  autoComplete='off'
              className='border border-sky-600 h-10 w-full focus:placeholder:opacity-0 outline-0 text-sky-900 ps-5 rounded-lg mb-1'/>
              { formik.errors.deadline && formik.touched.deadline ?
                <p className=' text-red-700 text-sm ps-4 font-semibold text-left'>{formik.errors.deadline}</p>
                : ""}
            </div>
            
            <div className="mb-5 w-full px-4">
              <textarea rows={6} name="description" id="description" value={formik.values.description}
              onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='description'  autoComplete='off'
              className='border border-sky-600 w-full focus:placeholder:opacity-0 outline-0 text-sky-900 ps-5 rounded-lg mb-1'/>
              { formik.errors.description && formik.touched.description ?
                <p className=' text-red-700 text-sm ps-4 font-semibold text-left'>{formik.errors.description}</p>
                : ""}
            </div>
            
            <div className="mb-5 w-full px-4">
              <select id="scrumMaster" name="scrumMaster" onChange={formik.handleChange} value={formik.values.scrumMaster}
              className='border border-sky-600 h-10 w-full outline-0 text-sky-900 ps-5 rounded-lg mb-1'>
                  <option value='' disabled hidden className='py-5 ps-3 h-10'>Select a scrumMaster</option>
                  {/* MOHEMMMMMMMMMMMMMMMMMMM */}
                  {/* MOHEMMMMMMMMMMMMMMMMMMM */}
                  {/* MOHEMMMMMMMMMMMMMMMMMMM */}
                  {/* MOHEMMMMMMMMMMMMMMMMMMM */}
                  {"hn3ml mape 3la el scrum masters hena"}
              </select>
            </div>
            
                  {/* MOHEMMMMMMMMMMMMMMMMMMM */}
                  {/* MOHEMMMMMMMMMMMMMMMMMMM */}
                  {/* MOHEMMMMMMMMMMMMMMMMMMM */}
                  {/* MOHEMMMMMMMMMMMMMMMMMMM */}
            <div className="mb-5 w-full px-4">
              {"lessa m4 3aref hn5tar aktr mn wa7ed ezay"}
            </div>


















          <DialogActions>
            <button type='submit' className='block mx-auto border bg-sky-700 hover:bg-sky-900 px-4
            rounded-lg text-white h-10 font-bold'>{loading ? <i className="fa-solid fa-spinner fa-spin-pulse"></i> 
            : done ? <i className="fa-solid fa-check-double text-lime-300"></i> : <><i className="fa-solid fa-arrow-right-to-bracket me-3"></i>Create Project</>}</button>

            <button className='block mx-auto border bg-sky-700 hover:bg-sky-900 px-4
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