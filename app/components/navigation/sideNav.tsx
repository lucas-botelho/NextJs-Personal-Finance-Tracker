import React from 'react';
import { FaEuroSign } from "react-icons/fa";
import SidebarIcon from './sidebarIcon';

interface Props {
    // Define your component props here
}

const SideNav: React.FC<Props> = () => {
    return <>
        <div className='sideNav'>
            <SidebarIcon icon={<FaEuroSign size={28} />} />
        </div>
    </>
};

export default SideNav;