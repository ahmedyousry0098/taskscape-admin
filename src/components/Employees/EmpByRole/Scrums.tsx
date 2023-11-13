/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import React, { useEffect, useState } from "react";
import { allScrums } from "../../../Redux/EmployeesSlice";
import { Popconfirm } from "antd";
import RepScrum from "../ControlEmployees/RepScrum";
// import { Popconfirm } from "antd";

export default function Scrums() {
  const { ScrumLoading, getScrums, isDeleting } = useAppSelector(
    (state) => state.allEmployees
  );
  const dispatch = useAppDispatch();
  const [scrumDelegateId, setScrumDelegateId] = useState("");
  const [openSConfirmation, setOpenSConfirmation] = useState(false);

  function handleDeleteEmployee() {
    setOpenSConfirmation(true);
  }

  useEffect(() => {
    dispatch(allScrums());
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-start mt-4 mx-5">
      {!getScrums.scrums || getScrums.scrums.length === 0 ? (
        <div className="text-center mx-auto my-56 w-5/6">
          <h1 className="xl:text-4xl md:text-2xl sm:text-xl mb-6 text-gray-400">
            <i className="fa-solid fa-users-slash"></i>
          </h1>
          <h2 className="xl:text-4xl md:text-2xl sm:text-xl mb-12 text-gray-400">
            No Scrums in your orgnaization
          </h2>
        </div>
      ) : ScrumLoading ? (
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
                Job type:
                <span className="font-medium ps-1">{scrum.employmentType}</span>
              </p>

              {/* Delete button */}
              {getScrums?.scrums?.length === 1 ? (
                ""
              ) : (
                <div className=" absolute top-0 right-0 ">
                  <Popconfirm
                    title="Remove Employee"
                    description="Caution Employee will be removed permanently !!"
                    okText="Yes"
                    okType="danger"
                    onConfirm={() => handleDeleteEmployee()}
                    cancelText="Cancel"
                    showCancel>
                    <button
                      onClick={() => setScrumDelegateId(scrum._id)}
                      key={scrum._id}
                      className="font-semibold border-none rounded-se-xl rounded-es-xl bg-slate-300 px-3 py-2
                     hover:bg-red-700 hover:text-white duration-300 text-slate-950  hover:bg-none">
                      {""}
                      {isDeleting ? (
                        <i className="mx-auto fa-solid fa-spinner fa-spin-pulse"></i>
                      ) : (
                        <>
                          <span className="me-3  md:opacity-100 sm:hidden">
                            Remove
                          </span>
                          <i className="fa-solid fa-user-xmark fa-sm "></i>
                        </>
                      )}
                    </button>
                  </Popconfirm>
                </div>
              )}
            </div>
          ))}
        </>
      )}
      <RepScrum
        openSConfirmation={openSConfirmation}
        setDialogSConfirmation={() => setOpenSConfirmation(false)}
        scrumDelegateId={scrumDelegateId}
      />
    </div>
  );
}
