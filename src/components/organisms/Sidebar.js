import React from "react";
import { Link } from "react-router-dom";
import { SidebarItem } from "@components";
import { mainLogo } from "@assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBriefcase,
  faChalkboardTeacher,
  faMoneyCheckAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="hidden md:block flex-none w-80 bg-white rounded-md">
      <img src={mainLogo} alt="" className="w-64" />
      <div className="">
        <Link to="/beranda">
          <SidebarItem
            text="Beranda"
            additionalClassName="flex flex-row items-center"
          >
            <FontAwesomeIcon icon={faHome} size="2x" className="mr-3" />
          </SidebarItem>
        </Link>

        <Link to="/akun">
          <SidebarItem
            text="Akun"
            additionalClassName="flex flex-row items-center"
          >
            <FontAwesomeIcon icon={faUser} size="2x" className="mr-3" />
          </SidebarItem>
        </Link>

        <Link to="/daftar-master">
          <SidebarItem
            text="Data Master"
            additionalClassName="flex flex-row items-center"
          >
            <FontAwesomeIcon icon={faBriefcase} size="2x" className="mr-3" />
          </SidebarItem>
        </Link>

        <Link to="/daftar-tutor">
          <SidebarItem
            text="Daftar Tutor"
            additionalClassName="flex flex-row items-center"
          >
            <FontAwesomeIcon
              icon={faChalkboardTeacher}
              size="2x"
              className="mr-3"
            />
          </SidebarItem>
        </Link>

        <Link to="/daftar-pembayaran">
          <SidebarItem
            text="Riwayat Pembayaran"
            additionalClassName="flex flex-row items-center"
          >
            <FontAwesomeIcon
              icon={faMoneyCheckAlt}
              size="2x"
              className="mr-3"
            />
          </SidebarItem>
        </Link>

        <Link to="/masuk">
          <SidebarItem
            text="Keluar"
            additionalClassName="flex flex-row items-center"
          >
            <FontAwesomeIcon icon={faSignOutAlt} size="2x" className="mr-3" />
          </SidebarItem>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
