/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import * as Yup from "yup";
import { useFormik } from "formik";
import { UpdateProject } from "../../../shared/Interfaces/authentication.interface";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import {
  projectDetails,
  updateProject,
} from "../../../App/Api/ProjDetailsSlice";
import { useParams } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProject(props: any) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.createProject);

  const validationSchema = Yup.object({
    projectName: Yup.string()
      .required("Project name is required")
      .min(3, "Min 3 characters")
      .max(20, "Max 20 characters")
      .matches(/^[A-Za-z\s]+$/, "Must contain only letters and spaces"),
    startDate: Yup.date()
      .required("Start Date is required")
      .min(new Date().toLocaleDateString(), "Can`t be before today"),
    deadline: Yup.date()
      .required("Deadline is required")
      .min(Yup.ref("startDate"), "Can`t be before start date"),
    description: Yup.string().required("Description is required"),
  });

  let { projectId } = useParams();
  console.log(projectId);

  let formik = useFormik<UpdateProject>({
    initialValues: {
      projectName: "",
      startDate: "",
      deadline: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (projectId) {
        console.log(values);
        console.log(projectId);
        dispatch(updateProject({ values, projectId })).then((result) => {
          console.log(result);
          if (result.payload) {
            props.setopenEditProject();
            formik.resetForm();
            dispatch(projectDetails(props.projectId));
          }
        });
      }
    },
  });

  return (
    <div>
      <Dialog
        open={props.openEditProject}
        keepMounted
        TransitionComponent={Transition}
        onClose={() => props.setopenEditProject()}
        fullWidth>
        <DialogContent>
          <h1 className="text-center md:text-3xl sm:text-xl text-sky-900 mb-3 mt-4">
            Create New Project
          </h1>
          <h1 className="md:text-lg sm:text-base mb-6 text-sky-900 text-center">
            Projects make orgnaization grow faster
          </h1>

          <form
            onSubmit={formik.handleSubmit}
            className="md:w-5/6  sm:w-full mx-auto">
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

            {/* Dates */}
            <div className="mb-5 w-full px-4 flex md:flex-nowrap sm:flex-wrap justify-between">
              <div className="w-full md:me-5 sm:me-0">
                <label htmlFor="startDate" className="text-sky-900 ps-3">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Start date"
                  autoComplete="off"
                  className="border border-sky-600 h-10 w-full focus:placeholder:opacity-0
                   outline-0 text-sky-900 px-5 rounded-lg mb-1"
                />
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

            <DialogActions>
              <button
                type="submit"
                className="block mx-auto border bg-sky-700
               hover:bg-sky-900 px-4 rounded-lg text-white h-10 font-bold">
                {loading ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  <>
                    <i className="fa-solid fa-plus md:me-3 sm:me-0"></i>
                    <span className="md:inline-block sm:hidden">Submit</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="block mx-auto border bg-sky-700 hover:bg-sky-900 px-4
                rounded-lg text-white h-10 font-bold"
                onClick={() => props.setopenEditProject()}>
                Close
              </button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
