/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import React, { useEffect } from "react";
import { allScrums } from "../../../Redux/EmployeesSlice";
// import { Popconfirm } from "antd";

export default function Scrums() {
  const { ScrumLoading, getScrums } = useAppSelector(
    (state) => state.allEmployees
  );
  const dispatch = useAppDispatch();

  // function handleDeleteEmployee(employeeId: string) {
  //   dispatch(deleteEmployee(employeeId)).then((result) => {
  //     if (result.payload) {
  //       dispatch(allScrums());
  //     }
  //   });
  // }

  useEffect(() => {
    dispatch(allScrums());
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-start mt-4 mx-5">
      {ScrumLoading ? (
        <div className="loader-container pt-48">
          <div className="loader"></div>
          <div className="loader-text">Loading...</div>
        </div>
      ) : (
        <>
          {getScrums?.scrums?.map((scrum: any) => (
            <div
              key={scrum._id}
              className=" relative md:m-3 sm:mx-1 sm:my-3 w-80 md:px-6 sm:px-2
             py-4 text-slate-950 shadow-md shadow-slate-950  rounded-xl">
              {/* Name */}
              <p className="font-bold py-1">
                Name:
                <span className="font-medium ps-1">{scrum.employeeName}</span>
              </p>
              {/* Email */}
              <p className="font-bold py-1">
                Email:<span className="font-medium ps-1">{scrum.email}</span>
              </p>
              {/* Job title */}
              <p className="font-bold py-1">
                Job title:
                <span className="font-medium ps-1">{scrum.title}</span>
              </p>
              {/* Joining date */}
              <p className="font-bold py-1">
                Joining date:
                <span className="font-medium ps-1">
                  {scrum.createdAt.split("T").slice(0, 1).join("")}
                </span>
              </p>
              {/* Last updated */}
              <p className="font-bold py-1">
                Last updated:
                <span className="font-medium ps-1">
                  {scrum.updatedAt.split("T").slice(0, 1).join("")}
                </span>
              </p>
              {/* Experience */}
              <p className="font-bold py-1">
                Experience:
                <span className="font-medium ps-1">{scrum.experience}</span>
              </p>
              {/* Job type */}
              <p className="font-bold py-1">
                Employment type:
                <span className="font-medium ps-1">{scrum.employmentType}</span>
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
