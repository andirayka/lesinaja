import React, { useEffect, useContext, useState, FC } from "react";
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
import { useHistory, useLocation } from "react-router-dom";
import { LogoLesinAja } from "@assets";
import { handleLogout, firebase } from "@utils";
import { AuthContext } from "@context";

// List path dan property dari sidebar item
export const adminSidebarList = [
  {
    path: "/beranda",
    text: "Beranda",
    icon: faHome,
    activePaths: ["/beranda"],
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
    text: "Laporan",
    icon: faWallet,
    activePaths: ["/keuangan", "/sub-keuangan"],
  },
  {
    path: "/masuk",
    text: "Keluar",
    icon: faSignOutAlt,
    activePaths: [],
  },
];

export const walmurSidebarList = [
  {
    path: "/beranda-wali-murid",
    text: "Beranda",
    icon: faHome,
    activePaths: ["/beranda-wali-murid"],
  },
  {
    path: "/akun-wali-murid",
    text: "Akun",
    icon: faUser,
    activePaths: ["/akun-wali-murid"],
  },
  {
    path: "/masuk",
    text: "Keluar",
    icon: faSignOutAlt,
    activePaths: [],
  },
];

export const tutorSidebarList = [
  {
    path: "/beranda-tutor",
    text: "Beranda",
    icon: faHome,
    activePaths: ["/beranda-tutor"],
  },
  {
    path: "/akun-tutor",
    text: "Akun",
    icon: faUser,
    activePaths: ["/akun-tutor"],
  },
  {
    path: "/masuk",
    text: "Keluar",
    icon: faSignOutAlt,
    activePaths: [],
  },
];

type Props = {
  roleUser: string;
};

// Sidebar di sebelah kiri MainLayout
export const Sidebar: FC<Props> = ({ roleUser }) => {
  const { pathname } = useLocation(); // Path halaman yang sedang dibuka
  const history = useHistory(); // Untuk pindah halaman
  const { state: authState, setIsLoggedIn } = useContext<any>(AuthContext);

  useEffect(() => {
    if (authState.isLoggedIn === false) {
      history.push("/masuk");
    }
    // getLocalStorage();
  }, [authState.isLoggedIn]);

  return (
    <div className="hidden md:block fixed w-72 h-screen bg-white overflow-hidden">
      <img src={LogoLesinAja} alt="" className="w-64" />

      {/* pengecekan sidebar untuk admin */}
      {roleUser == "admin" &&
        adminSidebarList.map((item, index) => {
          return (
            <SidebarItem
              key={index}
              onClick={async () => {
                if (item.text == "Keluar") {
                  await handleLogout();
                  const user = firebase.auth().currentUser;
                  if (user === null) {
                    setIsLoggedIn(false);
                  } else {
                    setIsLoggedIn(true);
                  }
                } else {
                  history.push(item.path);
                }
              }}
              isActive={item.activePaths.includes(pathname)}
              icon={item.icon}
              text={item.text}
            />
          );
        })}

      {/* pengecekan sidebar untuk Wali murid */}
      {roleUser == "walmur" &&
        walmurSidebarList.map((item, index) => {
          return (
            <SidebarItem
              key={index}
              onClick={async () => {
                if (item.text == "Keluar") {
                  await handleLogout();
                  const user = firebase.auth().currentUser;
                  if (user === null) {
                    setIsLoggedIn(false);
                  } else {
                    setIsLoggedIn(true);
                  }
                } else {
                  history.push(item.path);
                }
              }}
              isActive={item.activePaths.includes(pathname)}
              icon={item.icon}
              text={item.text}
            />
          );
        })}

      {/* pengecekan sidebar untuk tutor */}
      {roleUser == "tutor" &&
        tutorSidebarList.map((item, index) => {
          return (
            <SidebarItem
              key={index}
              onClick={async () => {
                if (item.text == "Keluar") {
                  await handleLogout();
                  const user = firebase.auth().currentUser;
                  if (user === null) {
                    setIsLoggedIn(false);
                  } else {
                    setIsLoggedIn(true);
                  }
                } else {
                  history.push(item.path);
                }
              }}
              isActive={item.activePaths.includes(pathname)}
              icon={item.icon}
              text={item.text}
            />
          );
        })}
    </div>
  );
};
