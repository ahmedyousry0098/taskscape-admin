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
        console.log("Total employees", numOfEmpHasExpToNums);

        let numOfEmpHasExp: number[] = Array.from(new Set(numOfEmpHasExpToNums))
        setxAxis(numOfEmpHasExp)
        console.log("exper", xAxis);

        // let x: number[] = [1, 6, 4, 10, 4, 6]
        // let unique: number[] = Array.from(new Set(x))
        // console.log(unique);

        // x.forEach((n:number, index:number) => {
        //     if (x.indexOf(n) !== index) {
        //         unique.push(n)
        //     }
        // })

        // x.filter()

        // let countArray: any[] = [];
        // numOfEmpHasExp.forEach((exp: any) => {
        //     let employeesPerExp = numOfEmpHasExpToNums
        //         ?.reduce((total: any, n: any) => (n === exp ? total++ : total)
        //             , 0)
        //     console.log(employeesPerExp);

        //     countArray.push(employeesPerExp);
        //     setyAxis(countArray)
        // })
        // console.log(yAxis);
    }


    const labels = [...xAxis];

    const data = {
        labels,
        datasets: [
            {
                label: 'Employees',
                data: [...yAxis],
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
