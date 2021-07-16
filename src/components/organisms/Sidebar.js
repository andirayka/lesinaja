import React from 'react';
import { SidebarItem } from "@components";
import { mainLogo } from "@assets";
import { HomeIcon } from '@heroicons/react/solid';

const Sidebar = () => {
    return (
        <div className="bg-white rounded-md max-w-sm">
            <div>
                <img src={mainLogo} alt="" className="w-64" />
            </div>
            <div>
                <SidebarItem 
                    text="Beranda"
                    additionalClassName="bg-yellow-400"
                    icon={<HomeIcon className="w-10 inline-block" />}
                />
                <SidebarItem 
                    text="Beranda"
                    icon={<HomeIcon className="w-10 inline-block" />}
                />
            </div>
        </div>
    )
}

export default Sidebar