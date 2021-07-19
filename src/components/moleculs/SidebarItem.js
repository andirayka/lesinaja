import React from 'react';

const SidebarItem = ({additionalClassName, text, icon}) => {
    return (
        <button className={`hover:bg-yellow-400 py-1 rounded-md w-full text-left pl-5 ${additionalClassName}`}>
            {icon}
            <label>{text}</label>
        </button>
    )
}

export default SidebarItem