import React from 'react';
import BarChartComponent from './barChartComponent';
import { PiEmptyLight } from "react-icons/pi";

interface ExpenseColumnProps {
    title: string;
    data: {
        name: string;
        pv: number;
        amt: number;
    }[];
}

const BarChartContainer: React.FC<ExpenseColumnProps> = ({ title, data }) => {
    return (
        <div className='expense-column h-full w-full md:mb-5'>
            <h2 className='text-2xl font-bold'>{title}</h2>
            <span className='border-solid border-t-2 w-64 m-2'></span>

            {data.length === 0 ? (
                <div className='sidebar-icon hover:bg-red-800'>
                    <PiEmptyLight size={28} />
                </div>
            ) : (
                <BarChartComponent data={data} />
            )}
        </div>
    );
};

export default BarChartContainer;
