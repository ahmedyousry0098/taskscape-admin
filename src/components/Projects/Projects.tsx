/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import AddProject from "./ControlProject/AddProject";
import { allProjects, delEmployeeFromProject } from "../../Redux/AllProjSlice";
import { Button, Collapse, Tooltip } from 'antd';
import { Popconfirm } from 'antd';
import { DeleteEmpOfProj } from "../../shared/Interfaces/authentication.interface";
import AddEmpToProj from "./ControlProject/AddEmpToProj";


export default function Projects() {
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState<string>('')
  const [openAddEmp, setOpenAddEmp] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, getAllProjects, delLoading } = useAppSelector((state) => state.allProjects);
  const { loading } = useAppSelector((state) => state.createProject);

  function handleDeleteEmployee(body: DeleteEmpOfProj) {
    dispatch(delEmployeeFromProject(body))
  }

  useEffect(() => {
    dispatch(allProjects());
  }, []);

  return (
    <div className="mt-10 xl:ms-64 sm:ms-16">
      <AddEmpToProj
        projectId={projectId}
        openAddEmp={openAddEmp}
        setAddDialog={() => setOpenAddEmp(false)}
      />
      {getAllProjects?.projects === undefined ?
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
            onClick={() => setOpen(true)}
          >
            <i className="fa-solid fa-circle-plus me-3"></i>Create Project
          </button>
        </div>

        : <>
          <div className="fixed right-8 bottom-8 text-center z-50">
            <Tooltip title="Create Project" placement="left" color={"#082F49"} key={"#082F49"}>
              <button
                type="button"
                className="p-3 rounded-full hover:scale-110 duration-300 bg-opacity-100 bg-sky-700 hover:bg-sky-900 
             text-white" onClick={() => setOpen(true)}>
                {loading ?
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                  :
                  <><i className="fa-solid fa-plus fa-xl"></i></>}
              </button>
            </Tooltip>
          </div>

          <div className="flex flex-wrap justify-center items-start mt-6 mx-5">
            {isLoading ?
              <div className="mt-80 text-9xl text-gray-400">
                <i className="mx-auto fa-solid fa-spinner fa-spin-pulse"></i>
              </div>
              :
              getAllProjects?.projects?.map((project: any) => {
                return <div
                  key={project._id}
                  className="m-3 w-[500px] border-2 rounded-3xl border-sky-950 relative shadow-xl"
                >
                  <div className="py-2 mb-4 bg-sky-950 text-white w-10/12 mx-auto rounded-es-3xl rounded-ee-3xl">
                    <h1 className="font-black text-center text-2xl">
                      <span className="font-medium">{project.projectName}</span></h1>
                  </div>

                  <div className="flex flex-wrap justify-between px-10 mb-2">
                    <p className="font-bold py-1">Start date:
                      <span className="font-medium ps-2">{project.startDate.split("T").slice(0, 1).join("")}</span></p>
                    <p className="font-bold py-1">Deadline:
                      <span className="font-medium ps-2">{project.deadline.split("T").slice(0, 1).join("")}</span></p>
                  </div>

                  <div className="px-10 mb-2">
                    <h4 className="font-bold">Scrum Master:</h4>
                    <p className="font-semibold">Name: <span className="font-normal">{project.scrumMaster?.employeeName}</span></p>
                    <p className="font-semibold">Email: <span className="font-normal">{project.scrumMaster?.email}</span></p>
                  </div>

                  <div className="mb-2 px-6">
                    <Collapse
                      key={project._id}
                      expandIconPosition={"end"}
                      items={[
                        {
                          label: 'Description :',
                          children: <>
                            <span className="font-medium ps-2">{project.description}</span>
                          </>
                        },
                      ]} />
                  </div>


                  <div className="px-6 mb-20">
                    <Collapse
                      key={project._id}
                      expandIconPosition={"end"}
                      items={[
                        {
                          label: 'Collaborators :',
                          children: <div>
                            {project?.employee?.length === 0 ? "No collaborators in this project" : project?.employees?.map((member: any) => <>
                              <div key={member?._id + project?._id}
                                className="flex justify-between items-center w-full mb-1 py-2 border-b-2 border-sky-700">
                                <div>
                                  <p className="font-semibold">Name: <span className="font-normal">{member?.employeeName}</span></p>
                                  <p className="font-semibold">Email: <span className="font-normal">{member?.email}</span></p>
                                </div>
                                <div>
                                  <Popconfirm
                                    title="Remove Collaborator"
                                    description="Are you sure to remove this collaborator ?"
                                    okText="Yes"
                                    okType="danger"
                                    onConfirm={() => handleDeleteEmployee({
                                      organization: project?.organization?._id,
                                      employee: member?._id,
                                      project: project?._id
                                    })}
                                    cancelText="Cancel"
                                    showCancel
                                  >
                                    <Button key={member._id} className="text-sky-700"> {delLoading ? <i className="mx-auto fa-solid fa-spinner fa-spin-pulse"></i>
                                      : <i className="fa-solid fa-user-minus fa-xs"></i>}</Button>
                                  </Popconfirm>

                                </div>
                              </div>
                            </>)}
                            <div className="flex justify-end pt-2">
                              <Tooltip title="Add Collaborator" placement="left" color={"#082F49"} key={"#082F49"}>
                                <Button key={project._id} className="text-sky-700" onClick={() => {
                                  setOpenAddEmp(true)
                                  setProjectId(project._id)
                                }}>
                                  <i className="fa-solid fa-plus"></i>
                                </Button></Tooltip>
                            </div>
                          </div>
                        },
                      ]} />
                  </div>

                  <div key={project._id} className="flex justify-center mb-3 absolute -translate-x-1/2 left-1/2 bottom-0">
                    <button type="button" className="bg-red-700 hover:bg-red-900 px-4
                  rounded-lg text-white py-1 font-semibold me-7">
                      <i className="fa-regular fa-trash-can me-2 fa-sm text-white"></i>Remove</button>

                    <button type="button" className="bg-sky-700 hover:bg-sky-900 px-4
                    rounded-lg text-white py-1 font-semibold">
                      <i className="fa-regular fa-pen-to-square me-2 fa-sm text-white"></i>Edit</button>
                  </div>
                </div>
              }
              )}
          </div>
        </>
      }
      <AddProject open={open} setDialog={() => setOpen(false)} />
    </div>
  );
}
