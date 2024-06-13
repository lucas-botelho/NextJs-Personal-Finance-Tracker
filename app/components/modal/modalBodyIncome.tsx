'use client';
import { transactionModalState } from '@/app/atoms/transactionModalAtom';
import Income from '@/app/models/Transactions/Income';
import { Button, ModalFooter } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

interface ModalBodyIncomeProps {
    userID: string;
}

const ModalBodyIncome: React.FC<ModalBodyIncomeProps> = ({ userID }) => {

    const setModalState = useSetRecoilState(transactionModalState);
    const [formData, setFormData] = useState({
        isRecurring: false,
        name: '',
        amount: '',
        dueDate: '',
    });
    const router = useRouter();


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

        const reqBody = new Income(
            formData.amount,
            formData.dueDate,
            formData.isRecurring,
            formData.name,
            userID
        );

        fetch('/api/register-income',
            {
                method: 'POST',
                body: JSON.stringify(reqBody)
            }
        ).then(response => {
            handleClose();
            router.refresh();
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

export default ModalBodyIncome;
