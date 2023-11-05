/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import React, { useEffect } from "react";
import { allScrums } from "../../../App/Api/AllEmpSlice";

export default function Scrums() {

    const { ScrumLoading, getScrums } = useAppSelector((state) => state.allEmployees);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(allScrums());
    }, []);

    return (
        <div className="flex flex-wrap justify-center items-start mt-4 mx-5">
            {ScrumLoading ?
                <div className="loader-container pt-48">
                    <div className="loader"></div>
                    <div className="loader-text">Loading...</div>
                </div>
                : <>
                    {getScrums?.scrums?.map((scrum: any) =>
                        <div
                            key={scrum._id}
                            className="md:m-3 sm:mx-1 sm:my-3 w-80 md:px-10 sm:px-2 py-6 text-sky-900 border-2 shadow-xl border-sky-900 rounded-xl">
                            <p className="font-bold py-1">Name:<span className="font-medium ps-1">{scrum.employeeName}</span></p>
                            <p className="font-bold py-1">Email:<span className="font-medium ps-1">{scrum.email}</span></p>
                            <p className="font-bold py-1">Job title:<span className="font-medium ps-1">{scrum.title}</span></p>
                            <p className="font-bold py-1">Joining date:
                                <span className="font-medium ps-1">{scrum.createdAt.split("T").slice(0, 1).join("")}</span></p>
                            <p className="font-bold py-1">Last updated:
                                <span className="font-medium ps-1">{scrum.updatedAt.split("T").slice(0, 1).join("")}</span></p>
                            <p className="font-bold py-1">Employment type:<span className="font-medium ps-1">{scrum.employmentType}</span></p>
                            <p className="font-bold py-1">Experience:<span className="font-medium ps-1">{scrum.experience}</span></p>

                            <div className="flex justify-center mt-4">
                                <button type="button" className="bg-red-700 hover:bg-red-900 px-4
                        rounded-lg text-white py-1 font-semibold me-7">
                                    <i className="fa-solid fa-user-xmark md:me-2 sm:me-0 fa-sm text-white"></i><span className="">Remove</span></button>

                                <button type="button" className="bg-sky-700 hover:bg-sky-900 px-4
                        rounded-lg text-white py-1 font-semibold">
                                    <i className="fa-regular fa-pen-to-square md:me-2 sm:me-0 fa-sm text-white"></i><span className="">Edit</span></button>
                            </div>
                        </div>
                    )}
                </>}
        </div >
    )
}
