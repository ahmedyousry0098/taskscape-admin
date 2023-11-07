/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import React, { useEffect } from "react";
import { allScrums, deleteEmployee } from "../../../App/Api/AllEmpSlice";
import { Popconfirm } from "antd";

export default function Scrums() {
  const { ScrumLoading, getScrums, isDeleting } = useAppSelector(
    (state) => state.allEmployees
  );
  const dispatch = useAppDispatch();

  function handleDeleteEmployee(employeeId: string) {
    dispatch(deleteEmployee(employeeId)).then((result) => {
      if (result.payload) {
        dispatch(allScrums());
      }
    });
  }

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
              className=" relative md:m-3 sm:mx-1 sm:my-3 w-80 md:px-10 sm:px-2
             py-4 text-sky-900 shadow-md shadow-sky-700  rounded-xl">
              <p className="font-bold py-1">
                Name:
                <span className="font-medium ps-1">{scrum.employeeName}</span>
              </p>
              <p className="font-bold py-1">
                Email:<span className="font-medium ps-1">{scrum.email}</span>
              </p>
              <p className="font-bold py-1">
                Job title:
                <span className="font-medium ps-1">{scrum.title}</span>
              </p>
              <p className="font-bold py-1">
                Joining date:
                <span className="font-medium ps-1">
                  {scrum.createdAt.split("T").slice(0, 1).join("")}
                </span>
              </p>
              <p className="font-bold py-1">
                Last updated:
                <span className="font-medium ps-1">
                  {scrum.updatedAt.split("T").slice(0, 1).join("")}
                </span>
              </p>
              <p className="font-bold py-1">
                Employment type:
                <span className="font-medium ps-1">{scrum.employmentType}</span>
              </p>
              <p className="font-bold py-1">
                Experience:
                <span className="font-medium ps-1">{scrum.experience}</span>
              </p>

              <div className=" absolute top-0 right-0 ">
                <Popconfirm
                  title="Remove Employee"
                  description="Caution Employee will be removed permanently !!"
                  okText="Yes"
                  okType="danger"
                  onConfirm={() => handleDeleteEmployee(scrum._id)}
                  cancelText="Cancel"
                  showCancel>
                  <button
                    key={scrum._id}
                    disabled
                    className="font-semibold border-none rounded-se-md rounded-es-xl bg-gray-300 px-3 py-2
                     hover:bg-red-700 hover:text-white duration-300 text-sky-900  hover:bg-none">
                    {""}
                    {isDeleting ? (
                      <i className="mx-auto fa-solid fa-spinner fa-spin-pulse"></i>
                    ) : (
                      <>
                        <span className="me-3  md:opacity-100 sm:hidden">
                          Remove
                        </span>
                        <i className="fa-solid fa-user-xmark fa-md "></i>
                      </>
                    )}
                  </button>
                </Popconfirm>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
