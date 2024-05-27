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
    const setAuthModalState = useSetRecoilState(transactionModalState);

    return <>
        <div className='sideNav'>
            <div onClick={() => setAuthModalState({ open: true, view: 'income' })}>
                <SidebarIcon isPositive={true} icon={<FaCircleDollarToSlot size={28} />} />
            </div>
            <SidebarIcon isPositive={false} icon={<FaHandHoldingDollar size={28} />} />
            <SidebarIcon isPositive={true} icon={<GiPiggyBank size={28} />} />
            <SidebarIcon isPositive={false} icon={<GiPiggyBank size={28} />} />
        </div>
    </>
};

export default SideNav;