import { expenseColumnRecurringWhereClauses, expenseColumnWhereClauses } from '@/app/api/helpers/whereClauses';
import { Expense, ExpenseState } from '@/app/atoms/expenseListAtom';
import { firestore } from '@/firebase/clientApp';
import { collection, query, getDocs, Timestamp } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import { MdEdit, MdDelete } from "react-icons/md";


interface ExpenseColumnProps {
    userID: string;
    title: string;
    atom: RecoilState<ExpenseState>;
}

const ExpenseColumn: React.FC<ExpenseColumnProps> = ({ title, userID, atom }) => {
    let total = 0;
    const [expensesState, setExpensesState] = useRecoilState(atom)
    const [expensesModalState, setExpensesModalState] = useRecoilState(atom)

    const formatDate = (timestamp: Timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        const day = String(date.getDate()).padStart(2, '0');
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
                id: doc.id,
                ...doc.data()
            })) as Expense[];

            const dataRecurring = snapshotRecurring.docs.map((doc) => ({
                id: doc.id,
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

    const deleteExpense = async (id: string) => {
        const response = await fetch('/api/delete-document', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            fetchExpenses();
        }
    }

    const handleDelete = (id: string) => {

        const isConfirmed = confirm("re you sure you want to delete this item ?")
        if (isConfirmed) {
            deleteExpense(id);
        }
    }


    useEffect(() => {
        fetchExpenses();
    }, []);

    return (<>
        <div className='expense-column h-auto w-full flex-1 text-center'>
            <h2 className='text-2xl font-bold'>{title}</h2>
            <span className='border-solid border-t-2 w-64 m-2'></span>
            <ul className=' w-11/12 mb-2 h-full'>
                <div className='text-left flex p-2 bg-blue-custom-500 rounded shadow text-white '>
                    <span className='w-1/12 mr-2'></span>
                    <span className='w-4/12'>Title</span>
                    <span className='text-center w-4/12'>Amount</span>
                    <span className='text-center w-2/12'>Date</span>
                </div>
                {expensesState.expenses &&
                    expensesState.expenses
                        .slice()
                        .sort((a, b) => a.date.toDate().getTime() - b.date.toDate().getTime())
                        .map((expense, index) => {
                            total += expense.amount;
                            return (
                                <li id={expense.id} className='flex p-2'>
                                    <span className='flex flex-row mr-2' >
                                        <MdEdit size={22} className='column-btn' />
                                        <MdDelete size={22} className='column-btn' onClick={() => handleDelete(expense.id)} />
                                    </span>
                                    <span className='text-left text-gray-800 expense-name w-5/12'>{expense.title}</span>
                                    <span className='text-gray-600 expense-value w-4/12'>{expense.amount}  &euro;</span>
                                    <span className='text-gray-600 w-2/12'>{formatDate(expense.date)}</span>
                                </li>
                            );
                        })
                }
            </ul>
            <span className='border-solid border-t-2 w-64 m-2'></span>
            <div className='font-bold mt-auto self-center'>Total: {total.toFixed(2)} &euro;</div>

        </div>
    </>
    );
};

export default ExpenseColumn;