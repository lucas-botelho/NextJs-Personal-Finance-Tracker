import React from 'react';

interface SidebarIconProps {
    isPositive: boolean;
    icon: React.ReactNode;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ isPositive, icon }) => {

    return (
        <div className={`sidebar-icon ${isPositive ? '' : 'hover:bg-red-800'} group`}>
            {icon}
        </div>
    );
};

export default SidebarIcon;