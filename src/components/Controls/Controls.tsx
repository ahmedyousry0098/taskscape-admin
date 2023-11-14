/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { getOrgnaization } from "../../Redux/OrgnaizationSlice";
import EditOrg from "./EditOrg";

export default function Controls() {
  const dispatch = useAppDispatch();
  let { getOrgData, orgLoading } = useAppSelector(
    (state) => state.orgnaization
  );
  const [openEditProject, setopenEditProject] = useState(false);

  useEffect(() => {
    dispatch(getOrgnaization());
  }, []);

  return (
    <div className="my-10 xl:ms-64 sm:ms-16">
      {orgLoading ? (
        <div className="loader-container pt-48">
          <div className="loader"></div>
          <div className="loader-text">Loading...</div>
        </div>
      ) : (
        <>
          <div className="md:m-3 sm:mx-1 sm:my-3 sm:px-2 my-6">
            <div className="mx-auto py-4 px-10 min-w-[400px] max-w-[800px] text-slate-950 shadow-md shadow-slate-950  rounded-xl">
              {/* Orgnization image */}
              <div className="w-full mb-7">
                <img
                  src={getOrgData?.organization?.logo?.secure_url}
                  className=" w-44 h-44  mx-auto rounded-full border-2 shadow-md shadow-slate-900 border-slate-950"
                  alt="Campany Logo"
                />
              </div>

              {/* Company Name */}
              <div>
                <p className="font-bold py-1 text-3xl text-center">
                  {getOrgData?.organization?.organization_name}
                </p>
                <p className="font-bold py-1 mb-8 text-xl text-slate-500 text-center">
                  {getOrgData?.organization?.company}
                </p>
              </div>

              <div className="flex flex-wrap justify-between md:px-6 sm:px-2">
                {/* Head Quarter */}
                <p className="font-bold py-1 mb-4 w-5/12">
                  Head Quarter:
                  <span className="font-medium ps-1">
                    {getOrgData?.organization?.headQuarters}
                  </span>
                </p>
                {/* Indusrty */}
                <p className="font-bold py-1 mb-4 w-5/12">
                  industry:
                  <span className="font-medium ps-1">
                    {getOrgData?.organization?.industry}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap justify-between md:px-6 sm:px-2">
                {/* Create At */}
                <p className="font-bold py-1 mb-4 w-5/12">
                  Created At:
                  <span className="font-medium ps-1">
                    {getOrgData?.organization?.createdAt
                      .split("T")
                      .slice(0, 1)
                      .join("")}
                  </span>
                </p>
                {/* Last Update */}
                <p className="font-bold py-1 mb-4 w-5/12">
                  Last updated:
                  <span className="font-medium ps-1">
                    {getOrgData?.organization?.updatedAt
                      .split("T")
                      .slice(0, 1)
                      .join("")}
                  </span>
                </p>
              </div>

              {/* Description */}
              <p className="font-bold py-1 mb-10 md:px-6 sm:px-2">
                Description:
                <span className="font-medium ps-1">
                  {getOrgData?.organization?.description}
                </span>
              </p>

              {/* Edit Orgnization */}
              <div key={getOrgData?._id} className="flex justify-center mb-3">
                <button
                  type="button"
                  onClick={() => setopenEditProject(true)}
                  className="bg-slate-950 px-4 duration-300 hover:text-amber-500
                        rounded-lg text-white py-1 font-semibold me-5">
                  <i className="fa-regular fa-pen-to-square me-2 fa-sm"></i>
                  Edit
                </button>
              </div>
            </div>
            <EditOrg
              openEditProject={openEditProject}
              setopenEditProject={() => setopenEditProject(false)}
            />
          </div>
        </>
      )}
    </div>
  );
}
