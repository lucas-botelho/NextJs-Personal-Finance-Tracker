import React from 'react';
import BarChartComponent from './barChartComponentGreen';

interface ExpenseColumnProps {
    title: string;
}

const BarChartCard: React.FC<ExpenseColumnProps> = ({ title }) => {
    return (
        <div className='expense-column h-full w-full md:mb-5'>
            <h2 className='text-2xl font-bold mb-2'>{title}</h2>
            <span className='border-solid border-t-2 w-64 m-2'></span>
            <BarChartComponent />
        </div>
    );
};

export default BarChartCard;
