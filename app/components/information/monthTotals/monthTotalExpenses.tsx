'use client';
import React, { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { monthExpensesAtomState, monthIncomeAtomState } from '@/app/atoms/monthlyTransactionsAtom';

interface DisplayProps {
    userID: string;
}

const MonthTotalExpenses: React.FC<DisplayProps> = ({ userID }) => {

    const [expenses, setMonthExpensesValue] = useRecoilState(monthExpensesAtomState)
    const [income] = useRecoilState(monthIncomeAtomState)
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const response = await fetch(`/api/calculate-month-expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userID: userID })
            });
            const data = await response.json();

            setMonthExpensesValue(prev => ({ ...prev, value: data.totalIncome }));
            setIsLoading(false);
        })();
    }, []);

    const monthTextColor = expenses.value > (income.value * 0.6) ? 'text-yellow-500'
        : expenses.value > income.value ? 'text-red-800' : 'text-green-800';

    return (
        <div className='cash-display'>
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <span className='text-black pr-3'>Expenses: </span>
                    <Spinner
                        h={'33%'}
                        w={'33%'}
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </div>
            ) : (
                <p>
                    <span className='text-black'>Expenses: </span>
                    <span className={monthTextColor}>
                        {expenses.value.toFixed(2)} &euro;
                    </span>
                </p>
            )}
        </div>
    );
};

export default MonthTotalExpenses;