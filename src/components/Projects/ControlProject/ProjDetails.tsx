/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { delEmployeeFromProject } from "../../../App/Api/AllProjSlice";
import { Button, Collapse, Steps, Tooltip } from "antd";
import { Popconfirm } from "antd";
import { DeleteEmpOfProj } from "../../../shared/Interfaces/authentication.interface";
import AddEmpToProj from "./AddEmpToProj";
import {
  deleteProject,
  projectDetails,
} from "../../../App/Api/ProjDetailsSlice";
import { useNavigate } from "react-router-dom";
import EditProject from "./EditProject";

export default function ProjDetails() {
  const dispatch = useAppDispatch();
  const [openAddEmp, setOpenAddEmp] = useState(false);
  const [openEditProject, setopenEditProject] = useState(false);
  const [projectId, setProjectId] = useState<string>("");
  const { isLoading, getprojectDetails, deleteLoading } = useAppSelector(
    (state) => state.projectDetails
  );
  const navigate = useNavigate();

  function handleDeleteEmployee(body: DeleteEmpOfProj) {
    dispatch(delEmployeeFromProject(body)).then((result) => {
      if (result.payload) {
        dispatch(projectDetails(projectId));
      }
    });
  }

  function handleDeleteProject(projectId: string) {
    dispatch(deleteProject(projectId)).then((result) => {
      if (result.payload) {
        navigate("/projects");
      }
    });
  }

  useEffect(() => {
    setProjectId(getprojectDetails?.details?._id);
  }, [getprojectDetails]);
  console.log(getprojectDetails);

  return (
    <div className="mt-10 xl:ms-64 sm:ms-16">
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
                   border-sky-950 relative shadow-xl">
          {/* Title */}
          <div className="relative py-2 mb-4 bg-sky-950 flex justify-center items-center text-white w-10/12 mx-auto rounded-es-3xl rounded-ee-3xl">
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
                  .split("T")
                  .slice(0, 1)
                  .join("")}
              </span>
            </p>
            <p className="font-bold py-1">
              Deadline:
              <span className="font-medium ps-2">
                {getprojectDetails?.details?.deadline
                  .split("T")
                  .slice(0, 1)
                  .join("")}
              </span>
            </p>
          </div>

          {/* Scrum master */}
          <div className="px-10 mb-1">
            <h4 className="font-bold me-2 inline-block">Scrum Master</h4>
          </div>
          <div className="px-10 mb-6 flex justify-evenly">
            <p className="font-semibold border px-4 py-1 border-sky-900 rounded-lg">
              {" "}
              Name:
              <span className="font-normal ms-2">
                {getprojectDetails?.details?.scrumMaster?.employeeName}
              </span>
            </p>

            <p className="font-semibold px-4 py-1 border border-sky-900 rounded-lg">
              {" "}
              Email:
              <span className="font-normal ms-2 ">
                {getprojectDetails?.details?.scrumMaster.email}
              </span>
            </p>

            <p className="font-semibold px-4 py-1 border border-sky-900 rounded-lg">
              {" "}
              Years of experience:
              <span className="font-normal ms-2">
                {getprojectDetails?.details?.scrumMaster.experience} year
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
                      {getprojectDetails?.details?.employee?.length === 0
                        ? "No collaborators in this project"
                        : getprojectDetails?.details?.employees?.map(
                            (member: any) => (
                              <>
                                <div
                                  key={
                                    member?._id +
                                    getprojectDetails?.details?._id
                                  }
                                  className="flex justify-between items-center w-full mb-1 py-2 border-b-2 border-sky-700">
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
                                        key={member._id}
                                        className="text-sky-700">
                                        {" "}
                                        {deleteLoading ? (
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
                            className="text-sky-700"
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
            <p className="text-md font-bold text-sky-900 ps-5 pb-3">Sprints</p>
            {getprojectDetails?.details?.sprints.length === 0 ? (
              <p className="text-center text-lg text-sky-900">
                No sprints yet in this project
              </p>
            ) : (
              getprojectDetails?.details?.sprints.map((sprint: any) => (
                <div className="mb-6">
                  <Collapse
                    key={sprint._id}
                    className="bg-sky-100 mb-2 font-bold"
                    expandIconPosition={"end"}
                    items={[
                      {
                        label: `${sprint.sprint_name}`,
                        children: (
                          <div
                            key={sprint?._id}
                            className=" w-full py-2 border-b border-sky-900">
                            <div className="flex justify-evenly mb-5">
                              <div>
                                <p className="font-semibold py-1">
                                  Start date:
                                  <span className="font-medium ps-2">
                                    {sprint.start_date
                                      .split("T")
                                      .slice(0, 1)
                                      .join("")}
                                  </span>
                                </p>
                              </div>

                              <div>
                                <p className="font-semibold py-1">
                                  Deadline:
                                  <span className="font-medium ps-2">
                                    {sprint.deadline
                                      .split("T")
                                      .slice(0, 1)
                                      .join("")}
                                  </span>
                                </p>
                              </div>

                              <div>
                                <p className="font-semibold py-1">
                                  Last Update:
                                  <span className="font-medium ps-2">
                                    {sprint.updatedAt
                                      .split("T")
                                      .slice(0, 1)
                                      .join("")}
                                  </span>
                                </p>
                              </div>
                            </div>

                            <p className="text-md font-bold text-sky-900 ps-5 pb-3">
                              Tasks
                            </p>

                            <div className="mb-4">
                              {sprint.tasks.map((task: any) => (
                                <Collapse
                                  key={task._id}
                                  expandIconPosition={"end"}
                                  className="bg-gray-100 mb-2 font-bold"
                                  items={[
                                    {
                                      label: `${task.taskName}`,
                                      children: (
                                        <div className="py-2">
                                          <div className="mb-4 flex justify-between">
                                            <h4 className="font-bold me-2">
                                              Assigned To:
                                            </h4>
                                          </div>
                                          <div className="mb-6 flex justify-evenly">
                                            <p className="font-semibold px-4 py-1 border border-sky-900 rounded-lg">
                                              Employee:
                                              <span className="font-normal ms-2">
                                                {task.assignTo.employeeName}
                                              </span>
                                            </p>

                                            <p className="font-semibold px-4 py-1 border border-sky-900 rounded-lg">
                                              Email:
                                              <span className="font-normal ms-2 ">
                                                {task.assignTo.email}
                                              </span>
                                            </p>

                                            <p className="font-semibold px-4 py-1 border border-sky-900 rounded-lg">
                                              Experience:
                                              <span className="font-normal ms-2">
                                                {task.assignTo.experience}{" "}
                                                year/s
                                              </span>
                                            </p>
                                          </div>

                                          <div className="flex justify-evenly">
                                            <div>
                                              <p className="font-semibold py-1">
                                                Start date:
                                                <span className="font-medium ps-2">
                                                  {task.startDate
                                                    .split("T")
                                                    .slice(0, 1)
                                                    .join("")}
                                                </span>
                                              </p>
                                            </div>

                                            <div>
                                              <p className="font-semibold py-1">
                                                Deadline:
                                                <span className="font-medium ps-2">
                                                  {task.deadline
                                                    .split("T")
                                                    .slice(0, 1)
                                                    .join("")}
                                                </span>
                                              </p>
                                            </div>

                                            <div>
                                              <p className="font-semibold py-1">
                                                Last Update:
                                                <span className="font-medium ps-2">
                                                  {task.updatedAt
                                                    .split("T")
                                                    .slice(0, 1)
                                                    .join("")}
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                          <div className="w-full font-semibold flex justify-center mt-4">
                                            <h4 className=" inline-block px-3 py-1  rounded-xl">
                                              Status:
                                            </h4>

                                            <Steps
                                              direction="horizontal"
                                              current={
                                                task.status === "todo"
                                                  ? 0
                                                  : task.status === "doing"
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
              className="bg-sky-700 hover:bg-sky-900 px-4
                        rounded-lg text-white py-1 font-semibold me-5">
              <i className="fa-regular fa-pen-to-square me-2 fa-sm text-white"></i>
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
              <Button
                key={projectId}
                className="bg-red-700 hover:bg-red-900 hover:text-white hover:outline-none px-4 rounded-lg text-white py-1 font-semibold">
                {" "}
                {deleteLoading ? (
                  <i className="mx-auto fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  <>
                    <i className="fa-regular fa-trash-can me-2 text-white"></i>
                    Delete
                  </>
                )}
              </Button>
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
