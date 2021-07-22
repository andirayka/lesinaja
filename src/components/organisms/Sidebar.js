import React, { useState } from "react";
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

const sidebarList = [
  {
    path: "/beranda",
    text: "Beranda",
    icon: faHome,
  },
  {
    path: "/akun",
    text: "Akun",
    icon: faUser,
  },
  {
    path: "/daftar-master",
    text: "Data Master",
    icon: faBriefcase,
  },
  {
    path: "/daftar-tutor",
    text: "Daftar Tutor",
    icon: faChalkboardTeacher,
  },
  {
    path: "/daftar-pilihanles",
    text: "Pilihan Les",
    icon: faChalkboardTeacher,
  },
  {
    path: "/daftar-pembayaran",
    text: "Riwayat Pembayaran",
    icon: faMoneyCheckAlt,
  },
  {
    path: "/keuangan",
    text: "Keuangan",
    icon: faMoneyCheckAlt,
  },
  {
    path: "/masuk",
    text: "Keluar",
    icon: faSignOutAlt,
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="hidden md:block flex-none w-80 bg-white rounded-md overflow-hidden">
      <img src={mainLogo} alt="" className="w-64" />
      <div className="">
        {sidebarList.map((item, index) => {
          return (
            <Link
              key={index}
              to={item.path}
              onClick={() => {
                setActiveIndex(index);
              }}
            >
              <SidebarItem
                isActive={activeIndex == index}
                text={item.text}
                additionalClassName="flex flex-row items-center"
              >
                <div className="w-12 mr-2">
                  <FontAwesomeIcon icon={item.icon} size="2x" />
                </div>
              </SidebarItem>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export { sidebarList };
export default Sidebar;
