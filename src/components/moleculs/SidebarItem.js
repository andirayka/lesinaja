import React from 'react';
import { HomeIcon } from '@heroicons/react/solid';

const SidebarItem = ({additionalClassName, text}) => {
    return (
        <button className={`hover:bg-yellow-400 py-1 rounded-md w-full text-left pl-14 ${additionalClassName}`}>
            <HomeIcon className="w-10 inline-block" />
            <label>{text}</label>
        </button>
    )
}

export default SidebarItem