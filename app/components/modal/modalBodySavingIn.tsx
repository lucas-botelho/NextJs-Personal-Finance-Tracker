'use client';
import { monthSavingsAtomState } from '@/app/atoms/monthlyTransactionsAtom';
import { transactionModalState } from '@/app/atoms/transactionModalAtom';
import Income from '@/app/models/Transactions/Income';
import { Button, ModalFooter } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

interface ModalBodySavingInProps {
    userID: string;
    isIncome: boolean;
}

const ModalBodySaving: React.FC<ModalBodySavingInProps> = ({ userID, isIncome }) => {

    const setModalState = useSetRecoilState(transactionModalState);
    const setMonthValue = useSetRecoilState(monthSavingsAtomState);

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

    const handleClose = () => {
        setModalState(prev => ({ ...prev, open: false }))
    }

    const handleSubmit = async () => {

        const value = isIncome ? formData.amount : (Number(formData.amount) * -1).toString();

        const reqBody = new Income(
            value,
            formData.dueDate,
            formData.isRecurring,
            formData.name,
            userID
        );

        fetch('/api/register-saving',
            {
                method: 'POST',
                body: JSON.stringify(reqBody)
            }
        ).then(response => {
            handleClose();
            setMonthValue(prev => ({ ...prev, value: prev.value + Number(value) }))
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
        </div>
        <ModalFooter alignItems={"center"} justifyContent={"center"}>
            <Button onClick={handleClose} mr={3}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleSubmit}> Confirm </Button>
        </ModalFooter>
    </>
    );
};

export default ModalBodySaving;
