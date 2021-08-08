import React, { useEffect, useContext } from "react";
import {
  faHome,
  faUser,
  faUsers,
  faBriefcase,
  faChalkboardTeacher,
  faMoneyCheckAlt,
  faSignOutAlt,
  faWallet,
  faBookReader,
} from "@fortawesome/free-solid-svg-icons";
import { SidebarItem } from "@components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useLocation } from "react-router-dom";

// List path dan property dari sidebar item
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
    path: "/daftar-walimurid",
    text: "Daftar Wali Murid",
    icon: faUsers,
    activePaths: ["/daftar-walimurid", "/form-walimurid"],
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

// Sidebar di sebelah kiri MainLayout
export const Sidebar = () => {
  const { pathname } = useLocation(); // Path halaman yang sedang dibuka
  const history = useHistory(); // Untuk pindah halaman

  return (
    <div className="fixed w-72 bg-white rounded-md overflow-hidden">
      {sidebarList.map((item, index) => {
        return (
          <SidebarItem
            key={index}
            onClick={() => {
              history.push(item.path);
            }}
            // onClick={async () => {
            //   if (item.text == "Keluar") {
            //     await handleLogout();
            //     const user = firebase.auth().currentUser;
            //     if (user === null) {
            //       setIsLoggedIn(false);
            //     } else {
            //       setIsLoggedIn(true);
            //     }
            //   } else {
            //     history.push(item.path);
            //   }
            // }}
            isActive={item.activePaths.includes(pathname)}
            icon={item.icon}
            text={item.text}
          />
        );
      })}
    </div>
  );
};
