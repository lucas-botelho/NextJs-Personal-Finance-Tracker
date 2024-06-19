'use client';
import { wantsExpensesAtomState, needsExpensesAtomState, necessaryExpensesAtomState, Expense as AtomExpense } from '@/app/atoms/expenseListAtom';
import { monthExpensesAtomState } from '@/app/atoms/monthlyTransactionsAtom';
import { transactionModalState } from '@/app/atoms/transactionModalAtom';
import Expense from '@/app/models/Transactions/Expense';
import { Button, ModalFooter } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

interface ModalBodyExpenseProps {
    userID: string;
}

const ModalBodyExpense: React.FC<ModalBodyExpenseProps> = ({ userID }) => {
    const options = ["Want", "Need", "Fixed"];
    const setMandatoryExpensesListState = useSetRecoilState(necessaryExpensesAtomState);
    const setNeedsExpensesListState = useSetRecoilState(needsExpensesAtomState);
    const setWantsExpensesListState = useSetRecoilState(wantsExpensesAtomState);

    const setModalState = useSetRecoilState(transactionModalState);
    const setMonthExpensesValue = useSetRecoilState(monthExpensesAtomState);
    const [categoryFormData, setCategoryValue] = useState({ category: options[0] });
    const [formData, setFormData] = useState({
        isRecurring: false,
        name: '',
        amount: '',
        dueDate: '',
    });

    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${yyyy}-${mm}-${dd}`;

        setFormData(prevFormData => ({
            ...prevFormData,
            dueDate: formattedDate
        }));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
            [name]: name === 'amount' ? (value === '' ? '' : parseFloat(value)) : value, // Handle empty string case for amount
        }));
    };

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setCategoryValue({ ...categoryFormData, category: value });
    };

    const handleClose = () => {
        setModalState(prev => ({ ...prev, open: false }))
    }

    const handleSubmit = async () => {
        const reqBody = new Expense(
            formData.amount,
            formData.dueDate,
            formData.isRecurring,
            formData.name,
            userID,
            categoryFormData.category === 'Fixed' ? 'Mandatory' : categoryFormData.category
        );

        fetch('/api/register-expense',
            {
                method: 'POST',
                body: JSON.stringify(reqBody)
            }
        ).then(response => {
            if (response.status === 200) {
                handleClose();
                setMonthExpensesValue(prev => ({ ...prev, value: prev.value + Number(formData.amount) }))

                const atomExpense = {
                    amount: Number(formData.amount),
                    category: categoryFormData.category,
                    date: Timestamp.fromDate(new Date(formData.dueDate)),
                    isRecurring: formData.isRecurring,
                    title: formData.name,
                    userId: userID
                } as AtomExpense;

                switch (categoryFormData.category) {
                    case 'Want':
                        setWantsExpensesListState(prev => ({ expenses: [...prev.expenses, atomExpense] }));
                        break;
                    case 'Need':
                        setNeedsExpensesListState(prev => ({ expenses: [...prev.expenses, atomExpense] }));
                        break;
                    case 'Fixed':
                        setMandatoryExpensesListState(prev => ({ expenses: [...prev.expenses, atomExpense] }));
                        break;
                }
            }
        })
    };

    return (<>
        <div className='modal-field'>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
            />
            <label htmlFor="income">Amount</label>
            <input
                type="number"
                id="income"
                name="amount"
                placeholder='Amount'
                value={formData.amount}
                onChange={handleChange}
            />
            <label htmlFor="dueDate">Due Date</label>
            <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
            />
            <label htmlFor="category">Category</label>
            <select
                id="category"
                name="category"
                value={categoryFormData.category}
                onChange={handleChangeSelect}
            >
                {options.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                ))}
            </select>
            <label htmlFor="recurring">Recurring</label>
            <input style={{ width: '2.5rem' }}
                type="checkbox"
                id="recurring"
                name="isRecurring"
                checked={formData.isRecurring}
                onChange={handleChange}
            />
        </div>
        <ModalFooter alignItems={"center"} justifyContent={"center"}>
            <Button onClick={handleClose} mr={3}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleSubmit}> Confirm </Button>
        </ModalFooter>
    </>
    );
};

export default ModalBodyExpense;
