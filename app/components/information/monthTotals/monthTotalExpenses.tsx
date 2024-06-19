'use client';
import React, { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { monthExpensesAtomState as monthExpensesAtomState } from '@/app/atoms/monthlyTransactionsAtom';

interface DisplayProps {
    userID: string;
}

const MonthTotalExpenses: React.FC<DisplayProps> = ({ userID }) => {

    const [monthExpenesesValue, setMonthExpensesValue] = useRecoilState(monthExpensesAtomState)
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
                    <span className='text-green-800'>
                        {monthExpenesesValue.value.toFixed(2)} &euro;
                    </span>
                </p>
            )}
        </div>
    );
};

export default MonthTotalExpenses;