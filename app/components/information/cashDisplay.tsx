import React from 'react';

interface DisplayProps {
    title: string;
    cash: number;
}

const CashDisplay: React.FC<DisplayProps> = ({ title, cash }) => {
    return (
        <div className='cash-display'>
            <p>
                <span className='text-black'>{title}: </span>
                <span className='text-green-800'>
                    {cash} &euro;
                </span>
            </p>
        </div>
    );
};

export default CashDisplay;