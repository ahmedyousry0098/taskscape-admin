/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { allEmployees, allScrums } from "../../Redux/EmployeesSlice";
import { allProjects } from "../../Redux/ProjectsSlice";
import EmpType from "./Charts/EmpType";
import Experience from "./Charts/Experience";
// import Projstatus from "./Charts/Projstatus";
// import Tasks from "./Charts/Tasks";
import ScrumTable from "./Charts/ScrumTable";
import { getOrgnaization } from "../../Redux/OrgnaizationSlice";
import { Empty } from "antd";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()];
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    day: "numeric",
    month: "long",
  };
  const formattedDate = new Date().toLocaleDateString(undefined, options);

  const { getAllEmployees, getScrums, EmployeeLoading, ScrumLoading } =
    useAppSelector((state) => state.allEmployees);
  const { getAllProjects, isLoading } = useAppSelector(
    (state) => state.allProjects
  );
  const { getOrgData } = useAppSelector((state) => state.orgnaization);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrgnaization());
    dispatch(allEmployees());
    dispatch(allProjects());
    dispatch(allScrums());
  }, []);

  if (
    !getAllEmployees.employees &&
    !getScrums.scrums &&
    getAllProjects?.projects?.length === 0
  ) {
    return (
      <div className="xl:ms-64 sm:ms-16 mb-10">
        <div className="w-fit mx-auto flex flex-col">
          <Empty description="No data to show" className="pt-60 scale-150">
            <Link to={"/employees"}>
              <button
                type="button"
                className="block mx-auto px-4 border bg-slate-950 scale-75
            rounded-lg text-white hover:text-amber-500 duration-300 h-10 font-semibold">
                <i className="fa-solid fa-people-group me-3"></i>Go to Emplyees
                ?
              </button>
            </Link>
          </Empty>
        </div>
      </div>
    );
  }

  return (
    <div className="xl:ms-64 sm:ms-16 mb-10">
      {/* Top Bar */}
      <div className="flex justify-between flex-wrap items-center mb-5 mx-5 px-16 py-3 bg-slate-950 rounded-es-xl rounded-ee-xl">
        <div className="mb-1">
          <p className="text-amber-500 font-bold">
            {new Date().getHours() < 12
              ? "Good Morning,"
              : new Date().getHours() > 12 && new Date().getHours() < 17
              ? "Good Afternoon,"
              : "Good Evening,"}
            <span className="font-normal ms-3">
              {getOrgData?.admin?.adminName}
            </span>
          </p>
        </div>
        <div className="mb-1">
          <p className="text-amber-500 font-bold">
            {dayOfWeek}
            <span className="font-normal ms-3">{formattedDate}</span>
          </p>
        </div>
      </div>

      {/* Numbers */}
      <div className="flex flex-wrap justify-center items-center mx-auto w-full mt-4 text-white">
        <div className="flex flex-col justify-between bg-slate-950 w-56 mx-5 h-24 rounded-2xl p-3 mb-4 ">
          <h1 className="px-3 text-base">Total Employees:</h1>
          {EmployeeLoading && ScrumLoading ? (
            <p className="text-center text-2xl text-amber-500">Loading...</p>
          ) : !getAllEmployees?.employees && !getScrums?.scrums ? (
            <p key={1} className="text-center text-2xl text-amber-500">
              No Data
            </p>
          ) : !getAllEmployees?.employees ? (
            <p key={1} className="text-center text-2xl text-amber-500">
              {getScrums?.scrums?.length}
            </p>
          ) : !getScrums?.scrums ? (
            <p key={1} className="text-center text-2xl text-amber-500">
              {getAllEmployees?.employees?.length}
            </p>
          ) : (
            <p key={1} className="text-center text-2xl text-amber-500">
              {getAllEmployees?.employees?.length + getScrums?.scrums?.length}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-between bg-slate-950 w-56 mx-5 h-24 rounded-2xl p-3 mb-4 ">
          <h1 className="px-3 text-base">Total Projects:</h1>
          {isLoading ? (
            <p className="text-center text-2xl text-amber-500">Loading...</p>
          ) : getAllProjects?.projects?.length === 0 ? (
            <p key={1} className="text-center text-2xl text-amber-500">
              No Data
            </p>
          ) : (
            <p key={2} className="text-center text-2xl text-amber-500">
              {getAllProjects?.projects?.length}
            </p>
          )}
        </div>
      </div>

      {/* Charts */}
      <div>
        <div className="flex flex-wrap justify-around mx-auto w-full items-base mt-4 text-slate-950">
          <div className="w-[450px] mx-3 shadow-md shadow-slate-950 rounded-2xl px-3 py-1 mb-4">
            <EmpType />
          </div>

          <div className="w-[650px] mx-3 shadow-md shadow-slate-950 rounded-2xl px-3 py-1 mb-4">
            <Experience />
          </div>
        </div>

        {/* <div className="flex flex-wrap justify-around mx-auto w-full items-center mt-4 text-white">
          <div className="bg-sky-950 w-[650px] mx-3 rounded-2xl px-3 py-1 mb-4">
            <Projstatus/>
          </div>

          <div className="bg-sky-950 w-[450px] mx-3 rounded-2xl px-3 py-1 mb-4">
            <Tasks />
          </div>
        </div> */}
      </div>

      {/* Table */}
      <div className="flex flex-wrap justify-center w-full items-center my-4">
        <div className=" mx-1 shadow-md shadow-slate-950">
          <ScrumTable />
        </div>
      </div>
    </div>
  );
}
