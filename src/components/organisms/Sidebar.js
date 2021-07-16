import React from 'react';
import { SidebarItem } from "@components";
import { mainLogo } from "@assets";

const Sidebar = () => {
    return (
        <div className="bg-white m-9 rounded-md max-w-sm">
            <div>
                <img src={mainLogo} alt="" className="w-64" />
            </div>
            <div>
                <SidebarItem 
                    text="Beranda"
                    additionalClassName="bg-yellow-400"
                />
                <SidebarItem 
                    text="Beranda"
                />
                <SidebarItem 
                    text="Beranda"
                />
                <SidebarItem 
                    text="Beranda"
                />
            </div>
        </div>
    )
}

export default Sidebar