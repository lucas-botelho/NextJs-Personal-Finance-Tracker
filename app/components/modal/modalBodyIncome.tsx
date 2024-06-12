'use client';
import { transactionModalState } from '@/app/atoms/transactionModalAtom';
import Income from '@/app/models/Transactions/Income';
import { firestore } from '@/firebase/clientApp';
import { Button, ModalFooter } from '@chakra-ui/react';
import { Timestamp, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

interface ModalBodyIncomeProps {
}

const ModalBodyIncome: React.FC<ModalBodyIncomeProps> = () => {
    const setAuthModalState = useSetRecoilState(transactionModalState);
    const [formData, setFormData] = useState({
        isRecurring: false,
        name: '',
        amount: '',
        dueDate: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async () => {

        const reqBody = new Income(
            parseInt(formData.amount),
            formData.dueDate,
            formData.isRecurring,
            formData.name
        );


        fetch('/api/get-document',
            {
                method: 'POST',
                body: JSON.stringify(reqBody)
            }
        ).then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch /api/get-document');
            }
            console.log(response.json());
            return response.json();
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
            <Button onClick={() => setAuthModalState(prev => ({ ...prev, open: false }))} mr={3}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleSubmit}> Confirm </Button>
        </ModalFooter>
    </>
    );
};

export default ModalBodyIncome;
