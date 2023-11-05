/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

export default function Experience(props: any) {

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Chart.js Bar Chart',
            }
        },
    };

    const [xAxis, setxAxis] = useState([0])
    const [yAxis, setyAxis] = useState([0])

    useEffect(() => {
        getAxis()
    }, [props.getAllEmployees, props.getScrums])


    const getAxis = function getAxe() {
        let numOfMemberHasExp = props.getAllEmployees?.employees?.map((member: any) => member.experience)
        let numOfscrumHasExp = props.getScrums?.scrums?.map((scrum: any) => scrum.experience)

        let numOfExp = numOfMemberHasExp + numOfscrumHasExp

        let numOfEmpHasExpToNums = numOfExp?.split(",").map(Number)

        let numOfEmpHasExp: number[] = Array.from(new Set(numOfEmpHasExpToNums))
        setxAxis(numOfEmpHasExp.sort((a, b) => a - b))



        let countArray: number[] = [];
        xAxis.forEach((exp: number) => {
            let employeesPerExp = numOfEmpHasExpToNums?.filter((n: number) => (n === exp)).length
            countArray.push(employeesPerExp);
            setyAxis(countArray)
        })
    }


    const labels = [...xAxis];

    const data = {
        labels,
        datasets: [
            {
                label: 'Employees',
                data: [...yAxis],
                backgroundColor: 'rgb(8,47,73)',
                hoverBackgroundColor: "rgb(245, 159, 10)",
                barThickness: 30,
            },
        ],
    };

    return (
        <div className='py-3 mx-auto relative'>
            <h1 className='text-center text-xl pb-4'>Employees by Experience:</h1>
            {props.EmployeeLoading && props.ScrumLoading ?
                <div className="loader-container">
                    <div className="loader"></div>
                    <div className="loader-text">Loading...</div>
                </div>
                :
                <>
                    <h1 className='text-center text-sm -rotate-90 absolute -left-[4rem] top-1/2'>Number of employees</h1>
                    <Bar options={options} data={data} className='p-5' />
                    <h1 className='text-sm absolute bottom-2 left-1/2'>Years of experience</h1>
                </>

            }
        </div>

    )
}
