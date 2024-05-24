'use client'
import React, { ReactNode } from 'react';

type MainContainerProps = {
    children: ReactNode;
};

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
    return (
        <div className="content-container">
            {children}
        </div>
    );
};

export default MainContainer;