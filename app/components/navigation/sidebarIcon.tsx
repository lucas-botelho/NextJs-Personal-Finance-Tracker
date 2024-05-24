import React from 'react';

interface SidebarIconProps {
    icon: React.ReactNode;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ icon }) => {

    return (
        <div className='sidebar-icon group'>
            {icon}
        </div>
    );
};

export default SidebarIcon;