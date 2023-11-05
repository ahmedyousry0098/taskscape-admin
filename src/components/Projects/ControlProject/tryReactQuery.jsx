import React from 'react'
import { useQuery } from "@tanstack/react-query"
import { getProjects } from '../../../App/Api/ProjectQuery'

export default function ProjectDetails() {
     const { isPending, isError, data: projects, error } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

    if (isPending) {
        return (
            <div className="flex flex-wrap justify-center items-start mt-6 mx-5">
                <p>loading</p>
            </div>
        )
    }
    
    if (isError) {
        return <p>{error.message}</p>
    } 
    
    return (
        <>
        <div className="flex flex-wrap justify-center items-start mt-6 mx-5">

            {projects?.projects?.map((project) => {
                 return <div key={project._id} className="m-3 w-[500px] border-2 rounded-3xl
                 border-sky-950 relative shadow-xl">

                  {/* Title and Details button */}
                  <div className="relative py-2 mb-4 bg-sky-950 flex justify-center items-center text-white w-10/12 mx-auto rounded-es-3xl rounded-ee-3xl">
                    <button type="button" className="absolute right-2 rounded-full text-white">
                      <i className="fa-solid fa-circle-info fa-xl"></i></button>
                    <h1 className="font-medium text-xl">{project.projectName}</h1>
                  </div>

                  {/* Dates */}
                  <div className="flex flex-wrap justify-between px-10 mb-2">
                    <p className="font-bold py-1">Start date:
                      <span className="font-medium ps-2">{project.startDate.split("T").slice(0, 1).join("")}</span></p>
                    <p className="font-bold py-1">Deadline:
                      <span className="font-medium ps-2">{project.deadline.split("T").slice(0, 1).join("")}</span></p>
                  </div>

                  {/* Scrum master */}
                  <div className="px-10 mb-2 flex justify-start">
                    <h4 className="font-bold me-2">Scrum Master:</h4>
                    <p className="font-semibold">{project.scrumMaster?.employeeName}</p>
                  </div>
                </div>
                })}
        </div>
        </>
    )
}
