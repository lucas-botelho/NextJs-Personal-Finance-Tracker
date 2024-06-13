'use client';
import React, { useEffect, useState } from 'react';
import { firestore } from '@/firebase/clientApp';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Spinner } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { monthExpensesAtomState } from '@/app/atoms/monthlyTransactionsAtom';

interface DisplayProps {
    title: string;
    apiRoute: string;
    userID: string;
}

const CashDisplay: React.FC<DisplayProps> = ({ title, apiRoute, userID }) => {

    const [totalMonthTransaction, setMonthTransactionState] = useRecoilState(monthExpensesAtomState)

    // const [value, setMonthlyIncome] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            if (apiRoute !== '') {
                setIsLoading(true);
                const response = await fetch(`/api/${apiRoute}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userID: userID })
                });
                const data = await response.json();

                setMonthTransactionState(prev => ({ ...prev, value: data.totalIncome }));
                setIsLoading(false);
            }
        })();
    }, []);

    return (
        <div className='cash-display'>
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <span className='text-black pr-3'>{title}: </span>
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
                    <span className='text-black'>{title}: </span>
                    <span className='text-green-800'>
                        {totalMonthTransaction.value} &euro;
                    </span>
                </p>
            )}
        </div>
    );
};

export default CashDisplay;