import React from 'react';
import { FaCircleDollarToSlot, FaHandHoldingDollar } from "react-icons/fa6";
import { GiPiggyBank } from "react-icons/gi";
import { GrUpdate } from "react-icons/gr";
import SidebarIcon from './sidebarIcon';
import { useSetRecoilState } from 'recoil';
import { transactionModalState } from '@/app/atoms/transactionModalAtom';


interface Props {
    userID: string;
}

const SideNav: React.FC<Props> = ({ userID }) => {
    const setIncomeModalState = useSetRecoilState(transactionModalState);

    const updateUserMonthTakeAway = async () => {
        try {
            const response = await fetch('/api/month-takeaway-calculation', {
                method: 'POST',
                body: JSON.stringify({ userId: userID }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error during submission:', error);
        }
    }


    return <>
        <div className='sideNav'>
            <div onClick={() => setIncomeModalState({ open: true, view: 'income' })}>
                <SidebarIcon isPositive={true} icon={<FaCircleDollarToSlot size={28} />} />
            </div>
            <div onClick={() => setIncomeModalState({ open: true, view: 'expense' })}>
                <SidebarIcon isPositive={false} icon={<FaHandHoldingDollar size={28} />} />
            </div>
            <div onClick={() => setIncomeModalState({ open: true, view: 'savingIn' })}>
                <SidebarIcon isPositive={true} icon={<GiPiggyBank size={28} />} />
            </div>
            <div onClick={() => setIncomeModalState({ open: true, view: 'savingOut' })}>
                <SidebarIcon isPositive={false} icon={<GiPiggyBank size={28} />} />
            </div>
            <div onClick={updateUserMonthTakeAway}>
                <SidebarIcon isPositive={true} icon={<GrUpdate className='hover:animate-spin-slow' size={28} />} />
            </div>
        </div>
    </>
};

export default SideNav;