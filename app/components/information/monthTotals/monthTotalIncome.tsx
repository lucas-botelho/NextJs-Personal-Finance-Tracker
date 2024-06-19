'use client';
import React, { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { monthIncomeAtomState } from '@/app/atoms/monthlyTransactionsAtom';

interface DisplayProps {
    userID: string;
}

const MonthTotalIncome: React.FC<DisplayProps> = ({ userID }) => {
    const [monthIncomeValue, setMonthIncomeValue] = useRecoilState(monthIncomeAtomState)
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const response = await fetch(`/api/calculate-month-income`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userID: userID })
            });
            const data = await response.json();

            setMonthIncomeValue(prev => ({ ...prev, value: data.totalIncome }));
            setIsLoading(false);
        })();
    }, []);

    return (
        <div className='cash-display'>
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <span className='text-black pr-3'>Income: </span>
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
                    <span className='text-black'>Income: </span>
                    <span className='text-green-800'>
                        {monthIncomeValue.value.toFixed(2)} &euro;
                    </span>
                </p>
            )}
        </div>
    );
};

export default MonthTotalIncome;