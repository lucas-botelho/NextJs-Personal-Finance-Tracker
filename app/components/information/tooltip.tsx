import React from 'react';

interface ToolTipProps {
    text: string;
    children: React.ReactNode;
}

const ToolTip: React.FC<ToolTipProps> = ({ text, children }) => {



    return (<>
        <div className='tooltip'>
            <span className='tooltiptext'>{text}</span>
            {children}
        </div>
    </>);
}

export default ToolTip;