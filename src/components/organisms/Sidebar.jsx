import React from "react";
import { useLocation } from "react-router-dom";
import { SidebarItem } from "@components";
import { mainLogo } from "@assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import {
  faHome,
  faUser,
  faBriefcase,
  faChalkboardTeacher,
  faMoneyCheckAlt,
  faSignOutAlt,
  faWallet,
  faBookReader,
} from "@fortawesome/free-solid-svg-icons";

const sidebarList = [
  {
    path: "/beranda",
    text: "Beranda",
    icon: faHome,
    activePaths: ["/beranda"],
  },
  {
    path: "/akun",
    text: "Akun",
    icon: faUser,
    activePaths: ["/akun"],
  },
  {
    path: "/daftar-master",
    text: "Data Master",
    icon: faBriefcase,
    activePaths: ["/daftar-master", "/form-master"],
  },
  {
    path: "/daftar-tutor",
    text: "Daftar Tutor",
    icon: faChalkboardTeacher,
    activePaths: ["/daftar-tutor", "/form-tutor"],
  },
  {
    path: "/daftar-pilihanles",
    text: "Pilihan Les",
    icon: faBookReader,
    activePaths: ["/daftar-pilihanles", "/tambah-pilihanles"],
  },
  {
    path: "/daftar-pembayaran",
    text: "Riwayat Pembayaran",
    icon: faMoneyCheckAlt,
    activePaths: ["/daftar-pembayaran"],
  },
  {
    path: "/keuangan",
    text: "Keuangan",
    icon: faWallet,
    activePaths: ["/keuangan"],
  },
  {
    path: "/masuk",
    text: "Keluar",
    icon: faSignOutAlt,
    activePaths: [],
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  const history = useHistory();

  return (
    <div className="hidden md:block flex-none w-80 bg-white rounded-md overflow-hidden">
      <img src={mainLogo} alt="" className="w-64" />
      <div className="">
        {sidebarList.map((item, index) => {
          return (
            <SidebarItem
              key={index}
              onClick={() => {
                history.push(item.path);
              }}
              isActive={item.activePaths.includes(pathname)}
              text={item.text}
              additionalClassName="flex flex-row items-center"
            >
              <div className="w-12 mr-2">
                <FontAwesomeIcon icon={item.icon} size="2x" />
              </div>
            </SidebarItem>
          );
        })}
      </div>
    </div>
  );
};

export { sidebarList };
export default Sidebar;
