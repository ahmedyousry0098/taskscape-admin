/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import React, { useEffect, useState } from "react";
import { allEmployees, allScrums } from "../../Redux/EmployeesSlice";
import AddEmp from "./ControlEmployees/AddEmp";
import { Tooltip } from "antd";
import { NavLink, Outlet } from "react-router-dom";

export default function Employees() {
  const [open, setOpen] = useState(false);
  const { getAllEmployees, loading, getScrums } = useAppSelector(
    (state) => state.allEmployees
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(allEmployees());
    dispatch(allScrums());
  }, []);

  return (
    <div className="mt-10 xl:ms-64 sm:ms-16">
      {!getAllEmployees.employees && !getScrums.scrums ? (
        <div className="text-center mx-auto my-56 w-5/6">
          <h1 className="xl:text-4xl md:text-2xl sm:text-xl mb-6 text-gray-400">
            <i className="fa-solid fa-users-slash"></i>
          </h1>
          <h2 className="xl:text-4xl md:text-2xl sm:text-xl mb-12 text-gray-400">
            No Employees in your orgnaization
          </h2>
          <button
            type="submit"
            className="block mx-auto px-4 border bg-slate-950 
            rounded-lg duration-300 hover:text-amber-500 text-white h-10 font-semibold"
            onClick={() => setOpen(true)}>
            <i className="fa-solid fa-user-plus me-3"></i>Add employees
          </button>
        </div>
      ) : (
        <>
          <div className="fixed right-8 bottom-8 text-center z-50">
            <Tooltip
              title="Add Employee"
              placement="left"
              color={"rgb(2,6,23)"}
              key={"rgb(2,6,23)"}>
              <button
                type="button"
                className="p-3 rounded-full hover:scale-125 duration-300 bg-opacity-100 bg-slate-950 
              text-white hover:text-amber-500"
                onClick={() => setOpen(true)}>
                {loading ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  <>
                    <i className="fa-solid fa-plus fa-xl"></i>
                  </>
                )}
              </button>
            </Tooltip>
          </div>

          <div className="flex flex-wrap justify-center  rounded-es-xl rounded-eep-0 text-white">
            <div className="controller justify-center me-3 mb-3">
              <NavLink to={"scrums"}>
                {" "}
                <button
                  className=" bg-slate-950 hover:shadow-md 
          hover:shadow-amber-500 hover:text-amber-500 px-4 w-44 rounded-s-full py-2
          font-semibold hover:scale-105 duration-300">
                  <i className=" fa-solid fa-user-tie me-3"></i>Scrum Masters
                </button>
              </NavLink>
            </div>
            <div className="controller justify-center mb-3">
              <NavLink to={"members"}>
                {" "}
                <button
                  className=" bg-slate-950 hover:shadow-md 
          hover:shadow-amber-500 hover:text-amber-500 px-4 w-44 rounded-e-full py-2
          font-semibold hover:scale-105 duration-300">
                  <i className="fa-regular fa-user me-3"></i>Members
                </button>
              </NavLink>
            </div>
          </div>
          <Outlet />
        </>
      )}
      <AddEmp open={open} setDialog={() => setOpen(false)} />
    </div>
  );
}
