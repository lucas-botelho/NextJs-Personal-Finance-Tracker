'use client';
import React, { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { monthIncomeAtomState, monthSavingsAtomState, } from '@/app/atoms/monthlyTransactionsAtom';

interface DisplayProps {
    userID: string;
}

const MonthTotalSavings: React.FC<DisplayProps> = ({ userID }) => {
    const [savings, setMonthValue] = useRecoilState(monthSavingsAtomState)
    const [income] = useRecoilState(monthIncomeAtomState)
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const response = await fetch(`/api/calculate-month-savings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userID: userID })
            });
            const data = await response.json();

            setMonthValue(prev => ({ ...prev, value: data.totalIncome }));
            setIsLoading(false);
        })();
    }, []);

    const savingsTextColor = savings.value < 0 ? 'text-red-800'
        : savings.value < (income.value * 0.10) ? 'text-yellow-800' : 'text-green-800';

    return (
        <div className='cash-display'>
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <span className='text-black pr-3'>Savings: </span>
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
                    <span className='text-black'>Savings: </span>
                    <span className={savingsTextColor}>
                        {savings.value.toFixed(2)} &euro;
                    </span>
                </p>
            )}
        </div>
    );
};

export default MonthTotalSavings;