import { Expense, ExpenseState } from '@/app/atoms/expenseListAtom';
import { firestore } from '@/firebase/clientApp';
import { Spinner } from '@chakra-ui/react';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { RecoilState, useRecoilState } from 'recoil';

interface ExpenseColumnProps {
    userID: string;
    title: string;
    atom: RecoilState<ExpenseState>;
}

const ExpenseColumn: React.FC<ExpenseColumnProps> = ({ title, userID, atom }) => {
    let total = 0;

    const formatDate = (timestamp: Timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}/${month}`;
    };

    const [expensesState, setExpensesState] = useRecoilState(atom)

    const fetchExpenses = async () => {

        const fetchExpensesByCategory = async (category: string) => {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            const expenseRef = await collection(firestore, 'Expense');
            const queryRef = await query(expenseRef,
                where('userId', '==', userID),
                where('date', '>=', oneMonthAgo),
                where('category', '==', category)
            );

            const snapshot = await getDocs(queryRef);
            const data = snapshot.docs.map((doc) => ({
                ...doc.data() as Expense
            }));

            setExpensesState(prev => ({ ...prev, expenses: data as Expense[] }));
        };

        switch (title) {
            case 'Mandatory':
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
            <h2 className='text-2xl font-bold mb-2'>{title}</h2>
            <span className='border-solid border-t-2 w-64 m-2'></span>
            <ul className='space-y-2 w-11/12 mb-2'>
                <div className='text-left flex p-2 bg-white rounded shadow'>
                    <span className=' text-gray-800  w-5/12'>Title</span>
                    <span className='text-gray-600 text-center w-5/12'>Amount</span>
                    <span className='text-gray-600 text-center w-2/12'>Date</span>
                </div>
                {expensesState.expenses.map((expense, index) => {
                    total += expense.amount;
                    return (
                        <li key={index} className='flex p-2 bg-white rounded shadow'>
                            <span className='text-left text-gray-800 expense-name w-5/12'>{expense.title}</span>
                            <span className='text-gray-600 expense-value w-5/12'>{expense.amount}</span>
                            <span className='text-gray-600 w-2/12'>{formatDate(expense.date)}</span>
                        </li>
                    );
                })}
            </ul>
            <div className='font-bold mt-auto self-center bottom-0'>Total: {total}</div>
        </div>
    </>
    );
};

export default ExpenseColumn;