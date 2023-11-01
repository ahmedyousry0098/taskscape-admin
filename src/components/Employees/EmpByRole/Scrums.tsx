/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import React, { useEffect } from "react";
import { allScrums } from "../../../Redux/AllEmpSlice";

export default function Scrums() {

    const { ScrumLoading, getScrums } = useAppSelector((state) => state.allEmployees);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(allScrums());
    }, []);

    return (
        <div className="flex flex-wrap justify-center items-start mt-4 mx-5">
            {ScrumLoading ?
                <div className="mt-52 text-9xl text-gray-400">
                    < i className="mx-auto fa-solid fa-spinner fa-spin-pulse" ></i >
                </div >
                : <>
                    {getScrums?.scrums?.map((scrum: any) =>
                        <div
                            key={scrum._id}
                            className="md:m-3 sm:mx-1 sm:my-3 w-80 md:px-10 sm:px-2 py-6 text-sky-900 border-2 shadow-xl border-sky-900 rounded-xl">
                            <p className="font-bold py-1">Name:<span className="font-medium ps-1">{scrum.employeeName}</span></p>
                            <p className="font-bold py-1">Email:<span className="font-medium ps-1">{scrum.email}</span></p>
                            <p className="font-bold py-1">Joining date:
                                <span className="font-medium ps-1">{scrum.createdAt.split("T").slice(0, 1).join("")}</span></p>
                            <p className="font-bold py-1">Last updated:
                                <span className="font-medium ps-1">{scrum.updatedAt.split("T").slice(0, 1).join("")}</span></p>

                            <div className="flex justify-center mt-4">
                                <button type="button" className="bg-red-700 hover:bg-red-900 px-4
                        rounded-lg text-white py-1 font-semibold me-7">
                                    <i className="fa-solid fa-user-xmark md:me-2 sm:me-0 fa-sm text-white"></i><span className="md:visible sm:hidden">Remove</span></button>

                                <button type="button" className="bg-sky-700 hover:bg-sky-900 px-4
                        rounded-lg text-white py-1 font-semibold">
                                    <i className="fa-regular fa-pen-to-square md:me-2 sm:me-0 fa-sm text-white"></i><span className="md:visible sm:hidden">Edit</span></button>
                            </div>
                        </div>
                    )}
                </>}
        </div >
    )
}
