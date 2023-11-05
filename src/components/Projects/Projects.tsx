/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import AddProject from "./ControlProject/AddProject";
import { allProjects } from "../../App/Api/AllProjSlice";
import { Collapse, Tooltip } from "antd";
import { projectDetails } from "../../App/Api/ProjDetailsSlice";
import { Link } from "react-router-dom";

export default function Projects() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, getAllProjects } = useAppSelector(
    (state) => state.allProjects
  );
  const { loading } = useAppSelector((state) => state.createProject);

  useEffect(() => {
    dispatch(allProjects());
  }, []);

  return (
    <div className="mt-10 xl:ms-64 sm:ms-16">
      {getAllProjects?.projects === undefined ? (
        // No data in page
        <div className="text-center mx-auto my-44 w-5/6">
          <h1 className="xl:text-4xl md:text-2xl sm:text-xl mb-6 text-gray-400">
            <i className="fa-solid fa-users-slash"></i>
          </h1>
          <h2 className="xl:text-4xl md:text-2xl sm:text-xl mb-12 text-gray-400">
            No Projects in your orgnaization
          </h2>
          <button
            type="submit"
            className="block mx-auto px-4 border bg-sky-700 hover:bg-sky-900 
            rounded-lg text-white h-10 font-bold"
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
              color={"#082F49"}
              key={"#082F49"}>
              <button
                type="button"
                className="p-3 rounded-full hover:scale-110 duration-300 bg-opacity-100 bg-sky-700 hover:bg-sky-900 
             text-white"
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
                    className="m-3 w-[500px] border-2 rounded-3xl border-sky-950 relative shadow-xl">
                    {/* Title and Details button */}
                    <div className="relative py-2 mb-4 bg-sky-950 flex justify-center items-center text-white w-10/12 mx-auto rounded-es-3xl rounded-ee-3xl">
                      <div>
                        <Link to={`/projects/details/${project._id}`}>
                          <Tooltip
                            title="Details"
                            placement="top"
                            color={"rgb(245, 158, 11)"}
                            key={"#082F49"}>
                            <button
                              type="button"
                              className="rounded-full absolute top-1/4 right-2 text-white"
                              onClick={() => {
                                dispatch(projectDetails(project._id));
                              }}>
                              <i className="fa-solid fa-circle-info fa-xl"></i>
                            </button>
                          </Tooltip>
                        </Link>
                      </div>
                      <div>
                        <h1 className="font-medium text-xl">
                          {project.projectName}
                        </h1>
                      </div>
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

                    {/* Edit and Delete */}
                    <div key={project._id} className="flex justify-center mb-3">
                      <button
                        type="button"
                        className="bg-sky-700 hover:bg-sky-900 px-4
                      rounded-lg text-white py-1 font-semibold me-5">
                        <i className="fa-regular fa-pen-to-square me-2 fa-sm text-white"></i>
                        Edit
                      </button>

                      <button
                        type="button"
                        className="bg-red-700 hover:bg-red-900 px-4
                      rounded-lg text-white py-1 font-semibold">
                        <i className="fa-regular fa-trash-can me-2 fa-sm text-white"></i>
                        Remove
                      </button>
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
