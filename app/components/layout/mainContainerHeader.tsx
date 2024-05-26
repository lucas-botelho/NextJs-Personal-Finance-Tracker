import React, { ReactNode } from 'react';

interface MainContainerHeaderProps {
    children: ReactNode;
}

const MainContainerHeader: React.FC<MainContainerHeaderProps> = ({ children }) => {
    return (
        <div className='main-container-header'>
            {children}
        </div>
    );
};

export default MainContainerHeader;