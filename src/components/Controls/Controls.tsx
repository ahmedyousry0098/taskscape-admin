import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { getOrgnaization } from "../../Redux/OrgnaizationSlice";

export default function Controls() {
  const dispatch = useAppDispatch();
  let { getOrgData, orgLoading } = useAppSelector(
    (state) => state.orgnaization
  );

  useEffect(() => {
    dispatch(getOrgnaization());
  }, []);

  return (
    <div className="mt-10 xl:ms-64 sm:ms-16">
      {orgLoading ? (
        <div className="loader-container pt-48">
          <div className="loader"></div>
          <div className="loader-text">Loading...</div>
        </div>
      ) : (
        <>
          <div
            className=" relative md:m-3 sm:mx-1 sm:my-3 w-[400px] md:px-10 sm:px-2
            py-4 text-sky-900 shadow-md shadow-sky-700  rounded-xl">
            <div className="w-2/3 rounded-full border-2 mx-auto border-sky-700">
              <img
                src={getOrgData?.organization?.secure_url}
                className="w-full rounded-full"
                alt="Campany Logo"
              />
            </div>

            <p className="font-bold py-1">
              <span className="font-medium ps-1">
                {getOrgData?.organization?.company}
              </span>
            </p>
            <p className="font-bold py-1">
              Description
              <span className="font-medium ps-1">
                {getOrgData?.organization?.description}
              </span>
            </p>
            <p className="font-bold py-1">
              Head Quarter:
              <span className="font-medium ps-1">
                {getOrgData?.organization?.headQuarters}
              </span>
            </p>
            <p className="font-bold py-1">
              industry:
              <span className="font-medium ps-1">
                {getOrgData?.organization?.industry}
              </span>
            </p>
            <p className="font-bold py-1">
              Created At:
              <span className="font-medium ps-1">
                {getOrgData?.organization?.createdAt
                  .split("T")
                  .slice(0, 1)
                  .join("")}
              </span>
            </p>
            <p className="font-bold py-1">
              Last updated:
              <span className="font-medium ps-1">
                {getOrgData?.organization?.updatedAt
                  .split("T")
                  .slice(0, 1)
                  .join("")}
              </span>
            </p>
          </div>

          <div
            className=" relative md:m-3 sm:mx-1 sm:my-3 w-[400px] md:px-10 sm:px-2
            py-4 text-sky-900 shadow-md shadow-sky-700  rounded-xl">
            <p className="font-bold py-1">
              Admin Name:
              <span className="font-medium ps-1">
                {getOrgData?.admin?.adminName}
              </span>
            </p>
            <p className="font-bold py-1">
              Email
              <span className="font-medium ps-1">
                {getOrgData?.admin?.email}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
