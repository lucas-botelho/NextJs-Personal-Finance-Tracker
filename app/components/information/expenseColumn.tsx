import React from 'react';

interface Expense {
    name: string;
    value: number;
    dueDate: string;
}

interface ExpenseColumnProps {
    title: string;
}

const ExpenseColumn: React.FC<ExpenseColumnProps> = ({ title }) => {
    let total = 0;

    const expenses: Expense[] = [
        { name: 'Expense 1', value: 100, dueDate: '2022-01-01' },
        { name: 'Expense 2', value: 200, dueDate: '2022-02-01' },
        { name: 'Expense 3', value: 300, dueDate: '2022-03-01' },
        { name: 'Expense 3', value: 300, dueDate: '2022-03-01' },
        { name: 'Expense 3', value: 300, dueDate: '2022-03-01' },
        { name: 'Expense 3', value: 300, dueDate: '2022-03-01' },
        { name: 'Expense 3', value: 300, dueDate: '2022-03-01' },
    ];

    const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-indexed month
        return `${day}/${month}`;
    };

    return (
        <div className='expense-column h-full w-full md:mb-5'>
            <h2 className='text-2xl font-bold mb-2'>{title}</h2>
            <span className='border-solid border-t-2 w-64 m-2'></span>
            <ul className='space-y-2'>
                {expenses.map((expense, index) => {
                    total += expense.value;
                    return (
                        <li key={index} className='flex items-center justify-between p-2 bg-white rounded shadow'>
                            <span className='mr-2 text-gray-800'>{expense.name}:</span>
                            <span className='mr-2 text-gray-600'>{expense.value} - </span>
                            <span className='text-gray-600'>{formatDate(new Date(expense.dueDate))}</span>
                        </li>
                    );
                })}
            </ul>
            <span className='border-solid border-t-2 w-64 m-2'></span>

            <div className='font-bold mt-4'>Total: {total}</div>
        </div>
    );
};

export default ExpenseColumn;