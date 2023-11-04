/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';




export default function EmpType(props: any) {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const [numOfIntern, setintern] = useState(0)
    const [numOfFullTime, setfullTime] = useState(0)
    const [numOfPartTime, setpartTime] = useState(0)

    useEffect(() => {
        interns()
        partTime()
        fullTime()
    }, [props.getAllEmployees, props.getScrums])

    function interns() {
        let intern = 0
        props.getAllEmployees?.employees?.map((e: any) => e.employmentType === "intern" ? intern++ : intern)
        props.getScrums?.scrums?.map((e: any) => e.employmentType === "intern" ? intern++ : intern)
        setintern(intern)
    }
    function partTime() {
        let part = 0
        props.getAllEmployees?.employees?.map((e: any) => e.employmentType === "part time" ? part++ : part)
        props.getScrums?.scrums?.map((e: any) => e.employmentType === "part time" ? part++ : part)
        setpartTime(part)
    }
    function fullTime() {
        let full = 0
        props.getAllEmployees?.employees?.map((e: any) => e.employmentType === "full time" ? full++ : full)
        props.getScrums?.scrums?.map((e: any) => e.employmentType === "full time" ? full++ : full)
        setfullTime(full)
    }

    const data = {
        labels: ['Full Time', 'Part Time', 'Intern'],
        datasets: [
            {
                data: [numOfFullTime, numOfPartTime, numOfIntern],
                backgroundColor: [
                    'rgb(8, 47, 73)',
                    'rgb(185 28 28)',
                    'rgb(245, 159, 10)',
                ],
                hoverOffset: 15,
                borderWidth: 0,
                offset: 0,
                hoverBackgroundColor: [
                    'rgb(5, 6, 9)',
                    'rgb(185 28 28)',
                    'rgb(255, 128, 10)',
                ],

            },
        ],
    };





    return (
        <div className='py-3 w-3/4 mx-auto'>
            <h1 className='text-center text-xl pb-4'>Employment Type</h1>
            {props.EmployeeLoading && props.ScrumLoading ?
                <p className='text-center text-2xl text-amber-500'>Loading...</p>
                :
                <Doughnut data={data} />
            }
        </div>
    )
}
