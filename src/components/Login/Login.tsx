/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import Admin from "../../assets/admin.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { logIn, loggedIn } from "../../Redux/LoginSlice";
import { ILogin } from "../../shared/Interfaces/authentication.interface";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { FloatButton } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import ForgetPass from "./ForgetPass";

export default function Login() {
  const [open, setOpen] = useState(false);
  let { loading, isLoggedIn } = useAppSelector((state) => state.login);
  let dispatch = useAppDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate(-1);
    }
  }, [isLoggedIn]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik<ILogin>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(logIn(values)).then(() => {
        dispatch(loggedIn());
      });
    },
  });

  return (
    <section className="login flex justify-center items-start h-screen">
      <div className="pt-40 text-center lg:me-20 md:me-20 lg:block md:hidden sm:hidden">
        <div className="">
          <h1 className="text-3xl mb-3 text-sky-900 font-serif">
            Welcome To Admin Panel
          </h1>
          <h1 className="text-lg mb-6 text-sky-700">
            Start managing your organization
          </h1>
          <img src={Admin} className="mx-auto w-96" alt="" />
        </div>
      </div>

      <div className="pt-40 lg:me-36 md:me-20 lg:block md:hidden sm:hidden">
        <span className="border-e-2 pb-[30rem] border-sky-700"></span>
      </div>

      <div className="pt-40 lg:mx-0 md:mx-auto sm:mx-auto">
        <div className="text-center w-96 shadow-lg bg-sky-100 bg-opacity-20 mx-auto py-8 shadow-sky-900 rounded-lg">
          <img src={Logo} className="w-28 mx-auto" alt="" />
          <h1 className="text-3xl mb-3 text-amber-500 font-serif">Taskscape</h1>
          <h1 className="text-lg mb-6 text-sky-700">Log in to continue</h1>

          <form
            onSubmit={formik.handleSubmit}
            className="md:px-10 md:mx-auto sm:px-2 sm:mx-2">
            <div className="mb-5 w-full px-4">
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Employee name"
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

            <div className="mb-3 w-full px-4">
              <input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Password"
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

            <div className="mb-5 w-full lg:px-6 md:px-3 sm:px-3 text-start">
              <p
                className="text-sky-700 underline font-semibold cursor-pointer"
                onClick={() => setOpen(true)}>
                Forgot Password ?
              </p>
              <ForgetPass open={open} setDialog={() => setOpen(false)} />
            </div>

            <button
              type="submit"
              className="block mx-auto border bg-sky-700 hover:bg-sky-900 w-40 rounded-lg text-white h-10
          font-bold">
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
              ) : (
                <>
                  <i className="fa-solid fa-arrow-right-to-bracket me-3"></i>
                  Login
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <FloatButton.Group shape="circle" style={{ right: 34 }}>
        <FloatButton
          tooltip="Back home"
          icon={<HomeOutlined />}
          href="https://taskscape.vercel.app/"
        />
      </FloatButton.Group>
    </section>
  );
}
