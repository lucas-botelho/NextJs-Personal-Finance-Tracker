import { expenseColumnRecurringWhereClauses, expenseColumnWhereClauses } from '@/app/api/helpers/whereClauses';
import { Expense, ExpenseState } from '@/app/atoms/expenseListAtom';
import { firestore } from '@/firebase/clientApp';
import { collection, query, where, getDocs, Timestamp, or, and } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { RecoilState, useRecoilState } from 'recoil';

interface ExpenseColumnProps {
    userID: string;
    title: string;
    atom: RecoilState<ExpenseState>;
}

const ExpenseColumn: React.FC<ExpenseColumnProps> = ({ title, userID, atom }) => {
    let total = 0;
    const [expensesState, setExpensesState] = useRecoilState(atom)

    const formatDate = (timestamp: Timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}`;
    };

    const fetchExpenses = async () => {

        const fetchExpensesByCategory = async (category: string) => {
            const expenseRef = collection(firestore, 'Expense');
            const queryRef = query(expenseRef,
                ...expenseColumnWhereClauses(userID, category)
            );

            const queryRefRecurring = query(expenseRef,
                ...expenseColumnRecurringWhereClauses(userID, category)
            );

            const [snapshot, snapshotRecurring] = await Promise.all([getDocs(queryRef), getDocs(queryRefRecurring)]);

            const data = snapshot.docs.map((doc) => ({
                ...doc.data()
            })) as Expense[];

            const dataRecurring = snapshotRecurring.docs.map((doc) => ({
                ...doc.data()
            })) as Expense[];

            const allDocs = [...data, ...dataRecurring];

            setExpensesState(prev => ({ ...prev, expenses: allDocs }));
        };

        switch (title) {
            case 'Fixed':
                fetchExpensesByCategory('Mandatory');
                break;
            case 'Needs':
                fetchExpensesByCategory('Need');
                break;
            case 'Wants':
                fetchExpensesByCategory('Want');
                break;
        }
    }

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (<>
        <div className='expense-column h-auto w-full flex-1 text-center'>
            <h2 className='text-2xl font-bold'>{title}</h2>
            <span className='border-solid border-t-2 w-64 m-2'></span>
            <ul className='space-y-2 w-11/12 mb-2 h-full'>
                <div className='text-left flex p-2 bg-blue-custom-500 rounded shadow text-white '>
                    <span className='w-5/12'>Title</span>
                    <span className='text-center w-5/12'>Amount</span>
                    <span className='text-center w-2/12'>Date</span>
                </div>
                {expensesState.expenses.map((expense, index) => {
                    total += expense.amount;
                    return (
                        <li key={index} className='flex p-2'>
                            <span className='text-left text-gray-800 expense-name w-5/12'>{expense.title}</span>
                            <span className='text-gray-600 expense-value w-5/12'>{expense.amount}  &euro;</span>
                            <span className='text-gray-600 w-2/12'>{formatDate(expense.date)}</span>
                        </li>
                    );
                })}
            </ul>
            <span className='border-solid border-t-2 w-64 m-2'></span>
            <div className='font-bold mt-auto self-center'>Total: {total.toFixed(2)} &euro;</div>

        </div>
    </>
    );
};

export default ExpenseColumn;