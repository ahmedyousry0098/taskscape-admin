/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import AddProject from "./ControlProject/AddProject";
import { allProjects } from "../../Redux/ProjectsSlice";
import { Collapse, Tooltip } from "antd";
import { projectDetails } from "../../Redux/ProjDetailsSlice";
import { Link } from "react-router-dom";

export default function Projects() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, getAllProjects, createLoading } = useAppSelector(
    (state) => state.allProjects
  );
  const { getScrums } = useAppSelector((state) => state.allEmployees);

  useEffect(() => {
    dispatch(allProjects());
  }, [dispatch]);

  if (!getScrums.scrums || getScrums.scrums.length === 0) {
    return (
      <div className="mt-10 xl:ms-64 sm:ms-16">
        <div className="text-center mx-auto my-56 w-5/6">
          <h1 className="xl:text-4xl md:text-2xl sm:text-xl mb-6 text-gray-400">
            <i className="fa-solid fa-users-slash"></i>
          </h1>
          <h2 className="xl:text-4xl md:text-2xl sm:text-xl mb-12 text-gray-400">
            Sorry you cant create project while you have No Scrums in your
            orgnaization
          </h2>
          <Link to={"/employees"}>
            <button
              type="button"
              className="block mx-auto px-4 border bg-slate-950 
            rounded-lg text-white hover:text-amber-500 duration-300 h-10 font-semibold">
              <i className="fa-solid fa-people-group me-3"></i>Go to Emplyees ?
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 xl:ms-64 sm:ms-16">
      {!getAllProjects.projects || getAllProjects.projects.length === 0 ? (
        // No data in page
        <div className="text-center mx-auto my-44 w-5/6">
          <h1 className="xl:text-4xl md:text-2xl sm:text-xl mb-6 text-gray-400">
            <i className="fa-solid fa-folder-plus"></i>
          </h1>
          <h2 className="xl:text-4xl md:text-2xl sm:text-xl mb-12 text-gray-400">
            No Projects in your orgnaization
          </h2>
          <button
            type="submit"
            className="block mx-auto px-4 border bg-slate-950 
            rounded-lg text-white hover:text-amber-500 duration-300 h-10 font-bold"
            onClick={() => setOpen(true)}>
            <i className="fa-solid fa-circle-plus me-3"></i>Create Project
          </button>
        </div>
      ) : (
        <>
          {/* Add Project button */}
          <div className="fixed right-8 bottom-8 text-center z-50">
            <Tooltip
              title="Create Project"
              placement="left"
              color={"rgb(2, 6 ,23)"}
              key={"rgb(2, 6 ,23)"}>
              <button
                type="button"
                className="p-3 rounded-full hover:scale-125 duration-300 bg-slate-950 
             text-white hover:text-amber-500"
                onClick={() => setOpen(true)}>
                {createLoading ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  <>
                    <i className="fa-solid fa-plus fa-xl"></i>
                  </>
                )}
              </button>
            </Tooltip>
          </div>

          <div className="flex flex-wrap justify-center items-start mt-6 mx-5">
            {isLoading ? (
              // Page Loader
              <div className="loader-container pt-64">
                <div className="loader"></div>
                <div className="loader-text">Loading...</div>
              </div>
            ) : (
              getAllProjects?.projects?.map((project: any) => {
                return (
                  <div
                    key={project._id}
                    className="m-3 w-[500px] border-2 rounded-3xl border-slate-950 relative shadow-xl">
                    {/* Title and Details button */}
                    <div className=" py-2 mb-4 text-center bg-slate-950 text-amber-500 w-10/12 mx-auto rounded-es-3xl rounded-ee-3xl">
                      <h1 className="font-medium text-xl">
                        {project.projectName}
                      </h1>
                    </div>

                    {/* Dates */}
                    <div className="flex flex-wrap justify-between px-10 mb-2">
                      <p className="font-bold py-1">
                        Start date:
                        <span className="font-medium ps-2">
                          {project.startDate.split("T").slice(0, 1).join("")}
                        </span>
                      </p>
                      <p className="font-bold py-1">
                        Deadline:
                        <span className="font-medium ps-2">
                          {project.deadline.split("T").slice(0, 1).join("")}
                        </span>
                      </p>
                    </div>

                    {/* Scrum master */}
                    <div className="px-10 mb-2 flex justify-start">
                      <h4 className="font-bold me-2">Scrum Master:</h4>
                      <p className="font-semibold">
                        {project.scrumMaster?.employeeName}
                      </p>
                    </div>

                    {/* Description */}
                    <div className="mb-8 px-6">
                      <Collapse
                        key={project._id}
                        expandIconPosition={"end"}
                        items={[
                          {
                            label: "Description :",
                            children: (
                              <>
                                <span className="font-medium ps-2">
                                  {project.description}
                                </span>
                              </>
                            ),
                          },
                        ]}
                      />
                    </div>

                    {/* Details */}
                    <div key={project._id} className="flex justify-center mb-3">
                      <Link to={`/projects/details/${project._id}`}>
                        <div className="bg-slate-950 duration-300 hover:scale-110 hover:text-amber-500 text-white px-4 py-1 rounded-lg">
                          <button
                            type="button"
                            onClick={() => {
                              dispatch(projectDetails(project._id));
                            }}>
                            <i className="fa-solid fa-circle-info me-2"></i>
                            Details
                          </button>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
      <AddProject open={open} setDialog={() => setOpen(false)} />
    </div>
  );
}
