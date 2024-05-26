import React, { ReactNode } from 'react';

interface MainContainerContentProps {
    children: ReactNode;
}

const MainContainerContent: React.FC<MainContainerContentProps> = ({ children }) => {
    return (
        <div className='main-container-header'>
            {children}
        </div>
    );
};

export default MainContainerContent;