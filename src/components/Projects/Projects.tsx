/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import AddProject from "./AddProject/AddProject";
import { allProjects } from "../../Redux/AllProjSlice";

export default function Projects() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, getAllProjects } = useAppSelector(
    (state) => state.allProjects
  );
  const { loading } = useAppSelector((state) => state.createProject);

  useEffect(() => {
    dispatch(allProjects());
    console.log(getAllProjects);
  }, []);


  return (
    <div className="mt-10 xl:ms-64 sm:ms-16">
      {getAllProjects?.projects?.length === 0 ?
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
            <i className="fa-solid fa-user-plus me-3"></i>Create Project
          </button>
        </div>
        :
        <>
          <div className="">
            <button
              type="button"
              className="block mx-auto px-4 border bg-sky-700 hover:bg-sky-900 
            rounded-lg text-white h-10 font-bold" onClick={() => setOpen(true)}>
              {loading ?
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                :
                <><i className="fa-solid fa-arrow-right-to-bracket me-3"></i>Create Project</>}
            </button>
          </div>

          <div className="flex flex-wrap justify-center mt-6 mx-20">
            {isLoading ?
              <div className="mt-80 text-9xl text-gray-400">
                <i className="mx-auto fa-solid fa-spinner fa-spin-pulse"></i>
              </div>
              :
              getAllProjects?.projects?.map((project: any) =>
                <div
                  key={project._id}
                  className="m-3 w-full px-10 py-6 bg-sky-500 bg-opacity-5 shadow-md
                 text-sky-900 shadow-sky-900 rounded-lg">
                  <h1 className="font-black py-1 text-center text-2xl">
                    <span className="font-medium">{project.projectName}</span></h1>

                  <p className="font-bold py-1">Description:
                    <span className="font-medium">{project.description}</span></p>

                  <div className="flex justify-center">
                    <p className="font-bold py-1">Start date:
                      <span className="font-medium">{project.startDate.split("T").slice(0, 1).join("")}</span></p>
                    <p className="font-bold py-1">Deadline:
                      <span className="font-medium">{project.deadline.split("T").slice(0, 1).join("")}</span></p>
                  </div>

                  <div>
                    <h4 className="font-bold py-1 text">Scrum Master:</h4>
                    <p>Name: <span className="font-medium">{project.scrumMaster.employeeName}</span></p>
                    <p>Email: <span className="font-medium">{project.scrumMaster.email}</span></p>
                  </div>

                  <div>
                    <h4 className="font-bold py-1 text">Collaborators:</h4>
                    {project?.employees?.map((member: any) => <>
                      <div className="flex justify-between">
                        <div>
                          <p>Name: <span className="font-medium">{member.employeeName}</span></p>
                          <p>Email: <span className="font-medium">{member.email}</span></p>
                        </div>
                        <div>
                          <button>edit</button>
                          <button>delete</button>
                        </div>
                      </div>
                    </>)}
                  </div>











                  <div className="flex justify-center mt-8">
                    <button type="button" className="bg-red-700 hover:bg-red-900 px-4
                    rounded-lg text-white py-1 font-semibold me-7">
                      <i className="fa-solid fa-user-xmark me-2 fa-sm text-white"></i>Remove</button>

                    <button type="button" className="bg-sky-700 hover:bg-sky-900 px-4
                      rounded-lg text-white py-1 font-semibold">
                      <i className="fa-regular fa-pen-to-square me-2 fa-sm text-white"></i>Edit</button>
                  </div>
                </div>)}
          </div>
        </>


      }

      <AddProject open={open} setDialog={() => setOpen(false)} />
    </div>
  );
}
