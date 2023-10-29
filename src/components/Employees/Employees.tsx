/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import React, { useEffect, useState } from "react";
import { allEmployees } from "../../Redux/AllEmpSlice";
import AddEmp from "./AddEmp/AddEmp";

export default function Employees() {
  const [open, setOpen] = useState(false);

  const { getAll, isLoading } = useAppSelector((state) => state.allEmployees);
  const { loading } = useAppSelector((state) => state.addEmployee);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(allEmployees());
  }, []);

  return (
    <div className="mt-10 xl:ms-64 sm:ms-16">
      {getAll?.employee?.length === 0 ?
        <div className="text-center mx-auto my-56 w-5/6">
          <h1 className="xl:text-4xl md:text-2xl sm:text-xl mb-6 text-gray-400">
            <i className="fa-solid fa-users-slash"></i>
          </h1>
          <h2 className="xl:text-4xl md:text-2xl sm:text-xl mb-12 text-gray-400">
            No Employees in your orgnaization
          </h2>
          <button
            type="submit"
            className="block mx-auto px-4 border bg-sky-700 hover:bg-sky-900 
            rounded-lg text-white h-10 font-bold"
            onClick={() => setOpen(true)}
          >
            <i className="fa-solid fa-user-plus me-3"></i>Add employees
          </button>
        </div>
        :
        <>
          <div className="mb-5">
            <button
              type="submit"
              className="block ms-5 px-4 border bg-sky-700 hover:bg-sky-900 
              rounded-lg text-white h-10 font-bold" onClick={() => setOpen(true)}>
              {loading ?
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                : <><i className="fa-solid fa-arrow-right-to-bracket me-3"></i>Add Employee</>}
            </button>
          </div>

          <div className="flex flex-wrap justify-center ">
            {isLoading ?
              <div className="mt-80 text-9xl text-gray-400">
                <i className="mx-auto fa-solid fa-spinner fa-spin-pulse"></i>
              </div>
              :
              getAll?.employee?.map((employee: any) =>
                <div
                  key={employee._id}
                  className="m-3 w-96 px-10 py-6 bg-sky-500 bg-opacity-5 shadow-md
                 text-sky-900 shadow-sky-900 rounded-lg">
                  <p className="font-bold py-1">
                    Name: <span className="font-medium">{employee.employeeName}</span></p>
                  <p className="font-bold py-1">Email:
                    <span className="font-medium">{employee.email}</span></p>

                  <p className="font-bold py-1">Role:
                    <span className="font-medium">{employee.role}</span></p>

                  <p className="font-bold py-1">Joining date:
                    <span className="font-medium">{employee.createdAt.split("T").slice(0, 1).join("")}</span></p>
                  <p className="font-bold py-1">Last updated:
                    <span className="font-medium">{employee.updatedAt.split("T").slice(0, 1).join("")}</span></p>

                  <div className="flex justify-center mt-8">
                    <button type="button" className="bg-red-700 hover:bg-red-900 px-4
                    rounded-lg text-white py-1 font-semibold me-7">
                      <i className="fa-solid fa-user-xmark me-2 fa-sm text-white"></i>Remove</button>

                    <button type="button" className="bg-sky-700 hover:bg-sky-900 px-4
                      rounded-lg text-white py-1 font-semibold">
                      <i className="fa-regular fa-pen-to-square me-2 fa-sm text-white"></i>Edit</button>
                  </div>
                </div>)}
          </div>
        </>
      }

      <AddEmp open={open} setDialog={() => setOpen(false)} />
    </div>
  );
}
