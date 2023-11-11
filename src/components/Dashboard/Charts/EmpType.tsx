/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useAppSelector } from "../../../App/hooks";

export default function EmpType() {
  ChartJS.register(ArcElement, Tooltip, Legend);

  let { getAllEmployees, getScrums, EmployeeLoading, ScrumLoading } =
    useAppSelector((state) => state.allEmployees);
  const [numOfIntern, setintern] = useState(0);
  const [numOfFullTime, setfullTime] = useState(0);
  const [numOfPartTime, setpartTime] = useState(0);

  useEffect(() => {
    interns();
    partTime();
    fullTime();
  }, [getAllEmployees, getScrums]);

  function interns() {
    let intern = 0;
    getAllEmployees?.employees?.map((e: any) =>
      e.employmentType === "intern" ? intern++ : intern
    );
    getScrums?.scrums?.map((e: any) =>
      e.employmentType === "intern" ? intern++ : intern
    );
    setintern(intern);
  }
  function partTime() {
    let part = 0;
    getAllEmployees?.employees?.map((e: any) =>
      e.employmentType === "part time" ? part++ : part
    );
    getScrums?.scrums?.map((e: any) =>
      e.employmentType === "part time" ? part++ : part
    );
    setpartTime(part);
  }
  function fullTime() {
    let full = 0;
    getAllEmployees?.employees?.map((e: any) =>
      e.employmentType === "full time" ? full++ : full
    );
    getScrums?.scrums?.map((e: any) =>
      e.employmentType === "full time" ? full++ : full
    );
    setfullTime(full);
  }

  const data = {
    labels: ["Full Time", "Part Time", "Intern"],
    datasets: [
      {
        data: [numOfFullTime, numOfPartTime, numOfIntern],
        backgroundColor: [
          "rgb(8, 47, 73)",
          "rgb(185 28 28)",
          "rgb(15, 118, 110)",
        ],
        hoverOffset: 15,
        borderWidth: 0,
        offset: 0,
        hoverBackgroundColor: [
          "#0D74ED",
          "rgb(249,43,83)",
          "rgb(45, 212, 191)",
        ],
      },
    ],
  };

  return (
    <div className="py-3 w-3/4 mx-auto ">
      <h1 className="text-center text-xl pb-4">Job Type</h1>
      {EmployeeLoading && ScrumLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <div className="loader-text">Loading...</div>
        </div>
      ) : (
        <Doughnut data={data} />
      )}
    </div>
  );
}
