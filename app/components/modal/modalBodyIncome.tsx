'use client';
import React, { useState } from 'react';

interface ModalBodyIncomeProps {
}

const ModalBodyIncome: React.FC<ModalBodyIncomeProps> = ({ /* Destructure props here */ }) => {
    const [isRecurring, setIsRecurring] = useState(false);

    const handleRecurringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsRecurring(e.target.checked)
    }

    return (
        <div className='modal-field'>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Name" />
            <label htmlFor="income">Amount</label>
            <input type="text" id="income" name="income" placeholder='Amount' />
            <label htmlFor="dueDate">Due Date</label>
            <input type="date" id="dueDate" name="dueDate" />
            <label htmlFor="recurring">Recurring</label>
            <input className='' type="checkbox" id="recurring" name="recurring" checked={isRecurring} onChange={handleRecurringChange} />
            {
                isRecurring &&
                <>
                    <label htmlFor="recurringDate">Recurring Date</label>
                    <input type="date" id="recurringDate" name="recurringDate" />
                </>
            }
        </div>
    );
};

export default ModalBodyIncome;