import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IRegister } from "../../../shared/Interfaces/authentication.interface";
import { addEmployee } from "../../../Redux/EmployeesSlice";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEmp(props: any) {
  const { loading } = useAppSelector((state) => state.allEmployees);
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object({
    employeeName: Yup.string()
      .required("Employee Name is required")
      .min(3, "Min 3 characters")
      .max(20, "Max 20 characters")
      .matches(/^[A-Za-z\s]+$/, "Must contain only letters and spaces"),
    email: Yup.string().required("Email is required").email("Email In-valid"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("You must select a role"),
    experience: Yup.number()
      .min(0)
      .max(50)
      .required("Experience years required"),
    employmentType: Yup.string().required("Employment type is required"),
    title: Yup.string().required("Job title type is required"),
  });

  let formik = useFormik<IRegister>({
    initialValues: {
      employeeName: "",
      email: "",
      password: "",
      role: "",
      experience: "",
      employmentType: "",
      title: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(addEmployee(values)).then((result) => {
        if (result.payload) {
          props.setDialog();
          formik.resetForm();
        }
      });
    },
  });

  const options = [];
  for (let i = 0; i <= 50; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.setDialog()}
        fullScreen>
        <DialogContent>
          <h1 className="text-center md:text-3xl sm:text-xl text-sky-900 mb-3 mt-4">
            Add An Employee
          </h1>
          <h1 className="md:text-lg sm:text-base mb-6 text-sky-900 text-center">
            More emplyees more success
          </h1>

          <form
            onSubmit={formik.handleSubmit}
            className="md:w-5/6  sm:w-full mx-auto">
            {/* Employee name */}
            <div className="mb-5 max-w-[600px] mx-auto px-4">
              <input
                type="text"
                name="employeeName"
                id="employeeName"
                value={formik.values.employeeName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Employee name"
                autoComplete="off"
                className="border border-sky-600 h-10 w-full focus:placeholder:opacity-0 outline-0 text-sky-900 ps-5 rounded-lg mb-1"
              />
              {formik.errors.employeeName && formik.touched.employeeName ? (
                <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                  {formik.errors.employeeName}
                </p>
              ) : (
                ""
              )}
            </div>

            {/* Email */}
            <div className="mb-5 max-w-[600px] mx-auto px-4">
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Email"
                autoComplete="off"
                className="border border-sky-600 h-10 w-full focus:placeholder:opacity-0 outline-0 text-sky-900 ps-5 rounded-lg mb-1"
              />
              {formik.errors.email && formik.touched.email ? (
                <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                  {formik.errors.email}
                </p>
              ) : (
                ""
              )}
            </div>

            {/* Password */}
            <div className="mb-5 max-w-[600px] mx-auto px-4">
              <input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Paswword"
                autoComplete="off"
                className="border border-sky-600 h-10 w-full focus:placeholder:opacity-0 outline-0 text-sky-900 ps-5 rounded-lg mb-1"
              />
              {formik.errors.password && formik.touched.password ? (
                <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                  {formik.errors.password}
                </p>
              ) : (
                ""
              )}
            </div>

            {/* Select  role */}
            <div className="mb-5 max-w-[600px] mx-auto px-4">
              <select
                id="role"
                name="role"
                onChange={formik.handleChange}
                value={formik.values.role}
                className="border border-sky-600 h-10 w-full outline-0 text-sky-900 ps-5 rounded-lg mb-1">
                <option value="" disabled hidden className="py-5 ps-3 h-10">
                  Select the role
                </option>
                <option value="member" className="py-5 ps-3 text-sky-700">
                  Member
                </option>
                <option value="scrumMaster" className="py-5 ps-3 text-sky-700">
                  Scrum Master
                </option>
              </select>
            </div>

            {/* Select  Experience */}
            <div className="mb-5 max-w-[600px] mx-auto px-4">
              <input
                type="number"
                min={0}
                max={50}
                name="experience"
                id="experience"
                value={formik.values.experience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Select experience"
                autoComplete="off"
                className="border border-sky-600 h-10 w-full focus:placeholder:opacity-0
                outline-0 text-sky-900 ps-5 rounded-lg mb-1"
              />
              {formik.errors.experience && formik.touched.experience ? (
                <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                  {formik.errors.experience}
                </p>
              ) : (
                ""
              )}
            </div>

            {/* Select Employment type */}
            <div className="mb-5 max-w-[600px] mx-auto px-4">
              <select
                id="employmentType"
                name="employmentType"
                onChange={formik.handleChange}
                value={formik.values.employmentType}
                className="border border-sky-600 h-10 
                w-full outline-0 text-sky-900 ps-5 rounded-lg mb-1">
                <option value="" disabled hidden className="py-5 ps-3 h-10">
                  Select the employment type
                </option>
                <option value="full time" className="py-5 ps-3 text-sky-700">
                  Full Time
                </option>
                <option value="part time" className="py-5 ps-3 text-sky-700">
                  Part Time
                </option>
                <option value="intern" className="py-5 ps-3 text-sky-700">
                  Intern
                </option>
              </select>
            </div>

            {/* Job title */}
            <div className="mb-5 max-w-[600px] mx-auto px-4">
              <input
                type="text"
                name="title"
                id="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Job title"
                autoComplete="off"
                className="border border-sky-600 h-10 w-full focus:placeholder:opacity-0
                outline-0 text-sky-900 ps-5 rounded-lg mb-1"
              />
              {formik.errors.title && formik.touched.title ? (
                <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                  {formik.errors.title}
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
                onClick={() => props.setDialog()}>
                Close
              </button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
