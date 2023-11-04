/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import * as Yup from "yup";
import { useFormik } from "formik";
import { IProject } from "../../../shared/Interfaces/authentication.interface";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { createProject } from "../../../Redux/CreateProjSlice";
import { allEmployees, allScrums } from "../../../Redux/AllEmpSlice";
import { allProjects } from "../../../Redux/AllProjSlice";


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
    ;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddProject(props: any) {

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.createProject);
  const { getAllEmployees, getScrums } = useAppSelector((state) => state.allEmployees);
  const { decoded } = useAppSelector((state) => state.login);

  useEffect(() => {
    dispatch(allEmployees());
    dispatch(allScrums())
  }, []);


  const validationSchema = Yup.object({
    projectName: Yup.string()
      .required("Project name is required")
      .min(3, "Min 3 characters")
      .max(20, "Max 20 characters")
      .matches(/^[A-Za-z\s]+$/, 'Must contain only letters and spaces'),
    startDate: Yup.date()
      .required("Start Date is required").min(new Date().toLocaleDateString(), "Can`t be before today"),
    deadline: Yup.date().required("Deadline is required").min(Yup.ref('startDate'), 'Can`t be before start date'),
    description: Yup.string().required("Description is required"),
    scrumMaster: Yup.string().required("Select a scrum master"),
  });

  let formik = useFormik<IProject>({
    initialValues: {
      projectName: "",
      startDate: "",
      deadline: "",
      description: "",
      scrumMaster: "",
      employees: [],
      organization: decoded.orgId,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(createProject(values)).then((result) => {
        if (result.payload) {
          props.setDialog();
          formik.resetForm();
          dispatch(allProjects())
        }
      });
    },
  });


  return (
    <div>
      <Dialog open={props.open} TransitionComponent={Transition}
        keepMounted onClose={() => props.setDialog()} fullWidth>

        <DialogContent>
          <h1 className="text-center md:text-3xl sm:text-xl text-sky-900 mb-3 mt-4">
            Create New Project</h1>
          <h1 className="md:text-lg sm:text-base mb-6 text-sky-900 text-center">
            Projects make orgnaization grow faster</h1>

          <form onSubmit={formik.handleSubmit} className="md:w-5/6  sm:w-full mx-auto">
            {/* Project Name */}
            <div className="mb-2 w-full px-4">
              <input
                type="text"
                name="projectName"
                id="projectName"
                value={formik.values.projectName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Project name"
                autoComplete="off"
                className="border border-sky-600 h-10 w-full focus:placeholder:opacity-0 outline-0 text-sky-900 ps-5 rounded-lg mb-1"
              />
              {formik.errors.projectName && formik.touched.projectName ? (
                <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                  {formik.errors.projectName}
                </p>
              ) : (
                ""
              )}
            </div>

            {/* Organization */}
            <input type="hidden" name="organization" value={formik.values.organization} />

            {/* Dates */}
            <div className="mb-5 w-full px-4 flex md:flex-nowrap sm:flex-wrap justify-between">
              <div className="w-full md:me-5 sm:me-0">
                <label htmlFor="startDate" className="text-sky-900 ps-3">Start Date</label>
                <input type="date" name="startDate" id="startDate" value={formik.values.startDate}
                  onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Start date"
                  autoComplete="off" className="border border-sky-600 h-10 w-full focus:placeholder:opacity-0
                   outline-0 text-sky-900 px-5 rounded-lg mb-1"/>
                {formik.errors.startDate && formik.touched.startDate ? (
                  <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                    {formik.errors.startDate}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="w-full">
                <label htmlFor="deadline" className="text-sky-900 px-3">
                  Deadline
                </label>

                <input
                  type="date"
                  name="deadline"
                  id="deadline"
                  value={formik.values.deadline}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Deadline"
                  autoComplete="off"
                  className="border border-sky-600 h-10 w-full focus:placeholder:opacity-0 outline-0 text-sky-900 px-5 rounded-lg mb-1"
                />
                {formik.errors.deadline && formik.touched.deadline ? (
                  <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                    {formik.errors.deadline}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-5 w-full px-4">
              <textarea
                rows={3}
                name="description"
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="description"
                autoComplete="off"
                className="border border-sky-600 w-full focus:placeholder:opacity-0 outline-0 text-sky-900 px-5 py-2 rounded-lg mb-1"
              />
              {formik.errors.description && formik.touched.description ? (
                <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                  {formik.errors.description}
                </p>
              ) : (
                ""
              )}
            </div>

            {/* Select scrum master */}
            <div className="mb-5 w-full px-4">
              <select
                id="scrumMaster"
                name="scrumMaster"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.scrumMaster}
                className="border border-sky-600 h-10 w-full outline-0 text-sky-900 ps-5 rounded-lg mb-1"
              >
                <option value="" disabled hidden className="py-5 ps-3 h-10">
                  Select Scrum Master
                </option>
                {getScrums?.employee?.length === 0
                  ? "Orgnization have no Scrum masters"
                  : getScrums?.scrums?.map((scrum: any) => (
                    <option
                      key={scrum._id}
                      value={scrum._id}
                      className="py-5 ps-3 h-10 text-sky-900"
                    >
                      {scrum.employeeName} → {scrum.email}
                    </option>
                  ))}
              </select>
            </div>

            {/* Select Members */}
            <div className="mb-5 w-full px-4">
              <select
                multiple
                id="employees"
                name="employees"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.employees}
                className="border border-sky-600 h-40 w-full outline-0 text-sky-900 ps-3 rounded-lg mb-1"
              >
                <option disabled hidden className="py-5 ps-3 h-10">
                  Select Collaborators
                </option>
                {getAllEmployees?.employee?.length === 0
                  ? "Orgnization have no Collaborators"
                  : getAllEmployees?.employees?.map((member: any) => (
                    <option
                      key={member._id}
                      value={member._id}
                      className="px-3 py-1 h-10 text-sky-900"
                    >
                      {member.employeeName} → {member.email}
                    </option>
                  ))}
              </select>
            </div>

            <DialogActions>
              <button type="submit" className="block mx-auto border bg-sky-700
               hover:bg-sky-900 px-4 rounded-lg text-white h-10 font-bold">
                {loading ? <i className="fa-solid fa-spinner fa-spin-pulse"></i> :
                  <><i className="fa-solid fa-plus md:me-3 sm:me-0"></i>
                    <span className="md:inline-block sm:hidden">Submit</span></>}
              </button>

              <button
                type="button"
                className="block mx-auto border bg-sky-700 hover:bg-sky-900 px-4
                rounded-lg text-white h-10 font-bold" onClick={() => props.setDialog()} >Close</button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}