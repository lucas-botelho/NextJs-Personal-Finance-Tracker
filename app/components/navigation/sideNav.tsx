import React from 'react';
import { FaCircleDollarToSlot, FaHandHoldingDollar } from "react-icons/fa6";
import { GiPiggyBank } from "react-icons/gi";

import SidebarIcon from './sidebarIcon';
import { useSetRecoilState } from 'recoil';
import { transactionModalState } from '@/app/atoms/transactionModalAtom';


interface Props {
    // Define your component props here
}

const SideNav: React.FC<Props> = () => {
    const setIncomeModalState = useSetRecoilState(transactionModalState);

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
        </div>
    </>
};

export default SideNav;