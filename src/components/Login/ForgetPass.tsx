/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import * as Yup from "yup";
import { useFormik } from "formik";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import {
  IForgetPassword,
  IResetPassword,
} from "../../shared/Interfaces/authentication.interface";
import { forgotPassword, resetPassword } from "../../Redux/ForgotPass";
import { Steps } from "antd";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ForgetPass(props: any) {
  const dispatch = useAppDispatch();
  const { continued, sendingMale, sendingNewPass } = useAppSelector(
    (state) => state.reset
  );

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is Required").email("In-valid email"),
  });

  let formik = useFormik<IForgetPassword>({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(forgotPassword(values));
    },
  });

  const validationSchema2 = Yup.object({
    code: Yup.string().required("Verify Code Required"),
    newPassword: Yup.string().required("New Password Required"),
  });

  let formik2 = useFormik<IResetPassword>({
    initialValues: {
      email: "",
      code: "",
      newPassword: "",
    },
    validationSchema: validationSchema2,
    onSubmit: (values) => {
      dispatch(resetPassword(values)).then((result) => {
        if (result.payload) {
          props.setDialog();
          formik2.resetForm();
          formik.resetForm();
        }
      });
    },
  });

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.setDialog()}
        fullWidth>
        <DialogContent>
          <h1 className="text-center md:text-3xl sm:text-xl text-sky-900 mb-3 mt-4">
            Reset Password
          </h1>
          <h1 className="md:text-lg sm:text-base mb-6 text-sky-900 text-center">
            Never mind please follow steps to get started
          </h1>

          <Steps
            direction="horizontal"
            className="px-10"
            current={!continued ? 0 : 1}
            items={[
              {
                title: "Insert Email",
              },
              {
                title: "Verify & Set Password",
              },
            ]}
          />

          {!continued ? (
            <form
              onSubmit={formik.handleSubmit}
              className="md:w-5/6  sm:w-full mx-auto mt-8">
              {/* Email */}
              <div className="w-full px-4 mb-6">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Your Email"
                  autoComplete="off"
                  className="border border-sky-600 h-10 w-full focus:placeholder:opacity-0 outline-0
                 text-sky-900 ps-5 rounded-lg mb-1"
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                    {formik.errors.email}
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
                  {sendingMale ? (
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                  ) : (
                    <>
                      <span className="md:inline-block sm:hidden">
                        Continue
                      </span>
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
          ) : (
            <form
              onSubmit={formik2.handleSubmit}
              className="md:w-5/6  sm:w-full mx-auto mt-8">
              {/* Email */}
              <div className="mb-2 w-full px-4">
                <input
                  type="email"
                  name="email"
                  id="email"
                  disabled
                  value={(formik2.values.email = formik.values.email)}
                  onChange={formik2.handleChange}
                  onBlur={formik2.handleBlur}
                  placeholder="Your Email"
                  autoComplete="off"
                  className="border border-sky-600 h-10 w-full focus:placeholder:opacity-0 outline-0
                 text-sky-900 ps-5 rounded-lg mb-1"
                />
                {formik2.errors.email && formik2.touched.email ? (
                  <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                    {formik2.errors.email}
                  </p>
                ) : (
                  ""
                )}
              </div>

              {/* Code */}
              <div className="mb-2 w-full px-4">
                <input
                  type="code"
                  name="code"
                  id="code"
                  value={formik2.values.code}
                  onChange={formik2.handleChange}
                  onBlur={formik2.handleBlur}
                  placeholder="Verifying Code"
                  autoComplete="off"
                  className="border border-sky-600 h-10 w-full focus:placeholder:opacity-0 outline-0
                 text-sky-900 ps-5 rounded-lg mb-1"
                />
                {formik2.errors.code && formik2.touched.code ? (
                  <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                    {formik2.errors.code}
                  </p>
                ) : (
                  ""
                )}
              </div>
              {/* New Password */}
              <div className="mb-6 w-full px-4">
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  value={formik2.values.newPassword}
                  onChange={formik2.handleChange}
                  onBlur={formik2.handleBlur}
                  placeholder="New Password"
                  autoComplete="off"
                  className="border border-sky-600 h-10 w-full focus:placeholder:opacity-0 outline-0
                 text-sky-900 ps-5 rounded-lg mb-1"
                />
                {formik2.errors.newPassword && formik2.touched.newPassword ? (
                  <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                    {formik2.errors.newPassword}
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
                  {sendingNewPass ? (
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                  ) : (
                    <>
                      <i className="text-lime-400 fa-regular fa-circle-check md:me-3 sm:me-0"></i>
                      <span className="md:inline-block sm:hidden">Finish</span>
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
