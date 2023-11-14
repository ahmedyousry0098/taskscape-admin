/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { Button, Collapse, Steps, Tooltip } from "antd";
import { Popconfirm } from "antd";
import { DeleteEmpOfProj } from "../../../shared/Interfaces/authentication.interface";
import AddEmpToProj from "./AddEmpToProj";
import {
  deleteProject,
  delEmployeeFromProject,
} from "../../../Redux/ProjDetailsSlice";
import { useNavigate } from "react-router-dom";
import EditProject from "./EditProject";
import { allProjects } from "../../../Redux/ProjectsSlice";

export default function ProjDetails() {
  const dispatch = useAppDispatch();
  const [openAddEmp, setOpenAddEmp] = useState(false);
  const [openEditProject, setopenEditProject] = useState(false);
  const [projectId, setProjectId] = useState<string>("");
  const { isLoading, getprojectDetails, deleteLoading, delLoading } =
    useAppSelector((state) => state.projectDetails);
  const navigate = useNavigate();

  function handleDeleteEmployee(body: DeleteEmpOfProj) {
    dispatch(delEmployeeFromProject(body));
  }

  function handleDeleteProject(projectId: string) {
    dispatch(deleteProject(projectId)).then((result) => {
      if (result.payload) {
        navigate("/projects");
        dispatch(allProjects());
      }
    });
  }

  useEffect(() => {
    setProjectId(getprojectDetails?.details?._id);
  }, [getprojectDetails]);

  return (
    <div className="my-10 xl:ms-64 sm:ms-16">
      {/* Add Project PopOver */}
      <AddEmpToProj
        projectId={projectId}
        openAddEmp={openAddEmp}
        setAddDialog={() => setOpenAddEmp(false)}
      />
      {isLoading ? (
        // Page Loader
        <div className="loader-container pt-64">
          <div className="loader"></div>
          <div className="loader-text">Loading...</div>
        </div>
      ) : (
        <div
          key={getprojectDetails?.details?._id}
          className="m-3  border-2 rounded-3xl
                   border-slate-950 relative shadow-xl lg:w-2/3 sm:mx-4 lg:mx-auto">
          {/* Title */}
          <div className="relative py-2 mb-4 bg-slate-950 flex justify-center items-center text-white w-10/12 mx-auto rounded-es-3xl rounded-ee-3xl">
            <h1 className="font-medium text-xl">
              {getprojectDetails?.details?.projectName}
            </h1>
          </div>

          {/* Dates */}
          <div className="flex flex-wrap justify-between px-10 mb-2">
            <p className="font-bold py-1">
              Start date:
              <span className="font-medium ps-2">
                {getprojectDetails?.details?.startDate
                  ?.split("T")
                  .slice(0, 1)
                  .join("")}
              </span>
            </p>
            <p className="font-bold py-1">
              Deadline:
              <span className="font-medium ps-2">
                {getprojectDetails?.details?.deadline
                  ?.split("T")
                  .slice(0, 1)
                  .join("")}
              </span>
            </p>
          </div>

          {/* Scrum master */}
          <div className="px-10 mb-1">
            <h4 className="font-bold me-2 inline-block">Scrum Master</h4>
          </div>
          <div className="px-10 mb-6 flex flex-wrap justify-evenly">
            <p className="font-semibold border px-4 mb-3 py-1 border-slate-950 rounded-lg">
              {" "}
              Name:
              <span className="font-normal ms-2">
                {getprojectDetails?.details?.scrumMaster?.employeeName}
              </span>
            </p>

            <p className="font-semibold px-4 py-1 mb-3 border border-slate-950 rounded-lg">
              {" "}
              Email:
              <span className="font-normal ms-2 ">
                {getprojectDetails?.details?.scrumMaster?.email}
              </span>
            </p>

            <p className="font-semibold px-4 py-1 border mb-3 border-slate-950 rounded-lg">
              {" "}
              Experience:
              <span className="font-normal ms-2">
                {getprojectDetails?.details?.scrumMaster?.experience} year
              </span>
            </p>
          </div>

          {/* Description */}
          <div className="mb-6 px-10">
            <Collapse
              key={getprojectDetails?.details?._id}
              className="font-bold"
              expandIconPosition={"end"}
              items={[
                {
                  label: "Description :",
                  children: (
                    <>
                      <span className="font-medium ps-2">
                        {getprojectDetails?.details?.description}
                      </span>
                    </>
                  ),
                },
              ]}
            />
          </div>

          {/* Collaborators */}
          <div className="px-10 mb-6">
            <Collapse
              key={getprojectDetails?.details?._id}
              className="font-bold"
              expandIconPosition={"end"}
              items={[
                {
                  label: "Collaborators :",
                  children: (
                    <div>
                      {getprojectDetails?.details?.employees?.length === 0
                        ? "No collaborators in this project"
                        : getprojectDetails?.details?.employees?.map(
                            (member: any) => (
                              <>
                                <div
                                  key={
                                    member?._id +
                                    getprojectDetails?.details?._id
                                  }
                                  className="flex justify-between items-center w-full mb-1 py-2 border-b-2 border-slate-950">
                                  <div>
                                    <p className="font-semibold">
                                      Name:{" "}
                                      <span className="font-normal">
                                        {member?.employeeName}
                                      </span>
                                    </p>
                                    <p className="font-semibold">
                                      Email:{" "}
                                      <span className="font-normal">
                                        {member?.email}
                                      </span>
                                    </p>
                                  </div>
                                  <div>
                                    <Popconfirm
                                      title="Remove Collaborator"
                                      description="Are you sure to remove this collaborator ?"
                                      okText="Yes"
                                      okType="danger"
                                      onConfirm={() =>
                                        handleDeleteEmployee({
                                          organization:
                                            getprojectDetails?.details
                                              ?.organization,
                                          employee: member?._id,
                                          project:
                                            getprojectDetails?.details?._id,
                                        })
                                      }
                                      cancelText="Cancel"
                                      showCancel>
                                      <Button
                                        key={member?._id}
                                        className="text-slate-950">
                                        {" "}
                                        {delLoading ? (
                                          <i className="mx-auto fa-solid fa-spinner fa-spin-pulse"></i>
                                        ) : (
                                          <i className="fa-solid fa-user-minus fa-xs"></i>
                                        )}
                                      </Button>
                                    </Popconfirm>
                                  </div>
                                </div>
                              </>
                            )
                          )}
                      <div className="flex justify-end pt-2">
                        <Tooltip
                          title="Add Collaborator"
                          placement="left"
                          color={"#082F49"}
                          key={"#082F49"}>
                          <Button
                            key={getprojectDetails?.details?._id}
                            className="text-slate-950"
                            onClick={() => {
                              setOpenAddEmp(true);
                              setOpenAddEmp(getprojectDetails?.details?._id);
                            }}>
                            <i className="fa-solid fa-plus"></i>
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          {/* Sprints */}
          <div className="mb-6 px-10">
            <p className="text-md font-bold text-slate-950 ps-5 pb-3">
              Sprints
            </p>
            {getprojectDetails?.details?.sprints?.length === 0 ? (
              <p className="text-center text-lg text-slate-950">
                No sprints yet in this project
              </p>
            ) : (
              getprojectDetails?.details?.sprints?.map((sprint: any) => (
                <div className="mb-6">
                  <Collapse
                    key={sprint?._id}
                    className="bg-slate-300 mb-2 font-bold"
                    expandIconPosition={"end"}
                    items={[
                      {
                        label: `${sprint?.sprint_name}`,
                        children: (
                          <div
                            key={sprint?._id}
                            className=" w-full py-2 border-b border-slate-950">
                            <div className="flex justify-evenly flex-wrap mb-5">
                              <div>
                                <p className="font-semibold py-1">
                                  Start date:
                                  <span className="font-medium ps-2">
                                    {sprint?.start_date
                                      ?.split("T")
                                      .slice(0, 1)
                                      .join("")}
                                  </span>
                                </p>
                              </div>

                              <div>
                                <p className="font-semibold py-1">
                                  Deadline:
                                  <span className="font-medium ps-2">
                                    {sprint?.deadline
                                      ?.split("T")
                                      .slice(0, 1)
                                      .join("")}
                                  </span>
                                </p>
                              </div>

                              <div>
                                <p className="font-semibold py-1">
                                  Last Update:
                                  <span className="font-medium ps-2">
                                    {sprint?.updatedAt
                                      ?.split("T")
                                      .slice(0, 1)
                                      .join("")}
                                  </span>
                                </p>
                              </div>
                            </div>

                            {/* Tasks */}
                            <p className="text-md font-bold text-slate-950 ps-5 pb-3">
                              Tasks
                            </p>
                            <div className="mb-4">
                              {sprint?.tasks?.map((task: any) => (
                                <Collapse
                                  key={task?._id}
                                  expandIconPosition={"end"}
                                  className="bg-slate-100 mb-2 font-bold"
                                  items={[
                                    {
                                      label: `${task?.taskName}`,
                                      children: (
                                        <div className="py-2">
                                          <div className="mb-4 flex justify-between">
                                            <h4 className="font-bold me-2">
                                              Assigned To:
                                            </h4>
                                          </div>
                                          <div className="mb-6 flex flex-wrap justify-evenly">
                                            <div className="mb-2 md:px-4 sm:px-1 border border-slate-950 rounded-lg text-center">
                                              <p className="font-semibold py-1 md:inline-block sm:block">
                                                Employee:
                                              </p>
                                              <span className="font-normal md:ms-2 sm:ms-0">
                                                {task?.assignTo?.employeeName}
                                              </span>
                                            </div>

                                            <div className="mb-2 md:px-4 sm:px-1 border border-slate-950 rounded-lg text-center">
                                              <p className="font-semibold py-1 md:inline-block sm:block">
                                                Email:
                                              </p>
                                              <span className="font-normal md:ms-2 sm:ms-0 ">
                                                {task?.assignTo?.email}
                                              </span>
                                            </div>

                                            <div className="mb-2 md:px-4 sm:px-1 border border-slate-950 rounded-lg text-center">
                                              <p className="font-semibold py-1 md:inline-block sm:block">
                                                Experience:
                                              </p>
                                              <span className="font-normal md:ms-2 sm:ms-0">
                                                {task?.assignTo?.experience}{" "}
                                                year/s
                                              </span>
                                            </div>
                                          </div>

                                          <div className="flex md:justify-evenly md:flex-row sm:flex-col flex-wrap">
                                            <div>
                                              <p className="font-semibold py-1 md:inline-block sm:block">
                                                Start date:
                                              </p>
                                              <span className="font-medium md:ps-2 sm:ps-0">
                                                {task?.startDate
                                                  ?.split("T")
                                                  .slice(0, 1)
                                                  .join("")}
                                              </span>
                                            </div>

                                            <div>
                                              <p className="font-semibold py-1 md:inline-block sm:block">
                                                Deadline:
                                              </p>
                                              <span className="font-medium md:ps-2 sm:ps-0">
                                                {task?.deadline
                                                  ?.split("T")
                                                  .slice(0, 1)
                                                  .join("")}
                                              </span>
                                            </div>

                                            <div>
                                              <p className="font-semibold py-1 md:inline-block sm:block">
                                                Last Update:
                                              </p>
                                              <span className="font-medium md:ps-2 sm:ps-0">
                                                {task?.updatedAt
                                                  ?.split("T")
                                                  .slice(0, 1)
                                                  .join("")}
                                              </span>
                                            </div>
                                          </div>

                                          <h4 className=" md:inline-block sm:block px-3 py-1 mt-4  rounded-xl">
                                            Status:
                                          </h4>
                                          <div className="w-full font-semibold flex justify-center ">
                                            <Steps
                                              direction="horizontal"
                                              current={
                                                task?.status === "todo"
                                                  ? 0
                                                  : task?.status === "doing"
                                                  ? 1
                                                  : 3
                                              }
                                              items={[
                                                {
                                                  title: "Todo",
                                                },
                                                {
                                                  title: "Doing",
                                                },
                                                {
                                                  title: "Done",
                                                },
                                              ]}
                                            />
                                          </div>
                                        </div>
                                      ),
                                    },
                                  ]}
                                />
                              ))}
                            </div>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              ))
            )}
          </div>

          {/* Edit and Delete */}
          <div
            key={getprojectDetails?.details?._id}
            className="flex justify-center mb-3">
            <button
              type="button"
              onClick={() => setopenEditProject(true)}
              className="bg-slate-950 px-4 duration-300 hover:text-amber-500
                        rounded-lg text-white py-1 font-semibold me-5">
              <i className="fa-regular fa-pen-to-square me-2 fa-sm"></i>
              Edit
            </button>

            <Popconfirm
              title="Delete Project"
              description="Caution this project will be deleted permenently ?"
              okText="Yes"
              okType="danger"
              onConfirm={() => handleDeleteProject(projectId)}
              cancelText="Cancel"
              showCancel>
              <button
                key={projectId}
                className="bg-red-700 hover:bg-red-900  px-4 duration-300 
                        rounded-lg text-white py-1 font-semibold">
                {" "}
                {deleteLoading ? (
                  <i className="mx-auto fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  <>
                    <i className="fa-regular fa-trash-can me-2 fa-sm text-white"></i>
                    Delete
                  </>
                )}
              </button>
            </Popconfirm>
          </div>
        </div>
      )}

      <EditProject
        projectId={projectId}
        openEditProject={openEditProject}
        setopenEditProject={() => setopenEditProject(false)}
      />
    </div>
  );
}
