import React from 'react';
import { SidebarItem } from "@components";

const Sidebar = () => {
    return (
        <div className="bg-white m-9 rounded-md">
            <SidebarItem 
                text="Beranda"
                additionalClassName="bg-yellow-400"
            />
            <SidebarItem />
            <SidebarItem />
            <SidebarItem />
            <SidebarItem />
        </div>
    )
}

export default Sidebar