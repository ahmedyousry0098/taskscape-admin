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
                display: true,
                text: 'Chart.js Bar Chart',
            }
        },
    };

    const [minYears, setminYears] = useState(0)
    const [maxYears, setmaxYears] = useState(0)

    // function getMin() {
    //     let minYearsOfExperience = [0]
    //     props.getAllEmployees?.employees?.map((e: any) => e.experience = minYearsOfExperience)
    //     props.getScrums?.scrums?.map((e: any) => e.experience = minYearsOfExperience)
    //     setminYears(Math.min(...minYearsOfExperience))
    // }

    // function getMax() {
    //     let maxYearsOfExperience = [0]
    //     props.getAllEmployees?.employees?.map((e: any) => e.experience = maxYearsOfExperience)
    //     props.getScrums?.scrums?.map((e: any) => e.experience = maxYearsOfExperience)
    //     setminYears(Math.max(...maxYearsOfExperience))
    // }



    useEffect(() => {
        // getMin()
        // getMax()

        let maxYearsOfExperience: any
        props.getAllEmployees?.employees?.map((e: any) => console.log("emp", e.experience))
        props.getScrums?.scrums?.map((e: any) => console.log("scrum", e.experience))



    }, [props.getAllEmployees, props.getScrums])


    let years: number[] = [0]
    for (let i = 1; i <= 10; i++) {
        years.push(i)
    }

    const labels = [...years];

    const data = {
        labels,
        datasets: [
            {
                label: 'Employees',
                data: [10, 5, 3, 24, 15, 4, 7, 33, 60, 23, 13, 0, 0, 0, 0, 0, 23],
                backgroundColor: 'rgb(255, 128, 10)',
            },
        ],
    };

    return (
        <div className='mx-auto'>
            <h1 className='px-3 text-base text-white'>Employees by Experience:</h1>
            <Bar options={options} data={data} />;
        </div>
    )
}
