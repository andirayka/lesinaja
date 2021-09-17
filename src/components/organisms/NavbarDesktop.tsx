import React, { FC, useState, useEffect, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { LogoLesinAja } from "@assets";
import {
  LoadIcon,
  adminSidebarList,
  tutorSidebarList,
  walmurSidebarList,
  NavbarDesktopItem,
} from "@components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faCircle,
  faDotCircle,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "@context";
import { handleLogout, firebase, databaseRef } from "@utils";

type Props = {
  imgSrc?: string;
  name?: string;
  roleUser: string;
};

export const NavbarDesktop: FC<Props> = ({ imgSrc, name, roleUser }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation(); // Path halaman yang sedang dibuka
  const history = useHistory(); // Untuk pindah halaman
  const { state: authState, setIsLoggedIn } = useContext<any>(AuthContext);
  const [onNotif, setOnNotif] = useState<Boolean>(false);
  const [dataNotif, setDataNotif] = useState<any>();
  let jumlahGajiTutor = 0;
  let jumlahBayarLes = 0;
  let jumlahBayarDaftar = 0;

  const getDataNotifikasi = async () => {
    const dataQuery = await databaseRef("pembayaran")
      .orderByChild("sudah_dikonfirmasi")
      .equalTo(false)
      .once("value", (snapshot) => snapshot);

    setDataNotif(dataQuery.val());
    // infinityLop();
  };

  //Ambil data berkali kali
  const infinityLop = () => {
    console.log("Looping terus Om");
    getDataNotifikasi();
  };

  useEffect(() => {
    if (authState.isLoggedIn === false) {
      history.push("/masuk");
    }
    getDataNotifikasi();
    // getLocalStorage();
  }, [authState.isLoggedIn]);

  return (
    <nav className="md:px-8 md:py-2 bg-yellow-400 h-14">
      <div className="hidden md:flex">
        <div className="ml-auto mr-4">
          {onNotif == false && (
            <button
              className="py-1 ml-24 relative"
              onClick={() => {
                setOnNotif(true);
              }}
            >
              <FontAwesomeIcon icon={faBell} size="2x" />
              {dataNotif && (
                <FontAwesomeIcon
                  icon={faCircle}
                  className="absolute text-red-600 right-0"
                />
              )}
            </button>
          )}
          {onNotif && (
            <button
              className="py-1 ml-24"
              onClick={() => {
                setOnNotif(false);
              }}
            >
              <FontAwesomeIcon icon={faBell} size="2x" />
            </button>
          )}
          {onNotif && (
            <div className="absolute bg-gray-300 z-50 shadow-2xl">
              {Object.values<any>(dataNotif || 0).map((value, index) => {
                if (value.gaji_tutor) {
                  jumlahGajiTutor += 1;
                }
                if (value.biaya_daftar && value.biaya_les) {
                  jumlahBayarDaftar += 1;
                }
                if (!value.biaya_daftar && value.biaya_les) {
                  jumlahBayarLes += 1;
                }
              })}
              <Link to={{ pathname: "/daftar-pembayaran" }}>
                {jumlahGajiTutor != 0 && (
                  <div className="bg-white px-4 py-4 border-b-2 flex hover:bg-gray-200">
                    <div className="flex-grow py-2 mr-4">
                      <FontAwesomeIcon icon={faMoneyBillWave} size="2x" />
                    </div>
                    <div className="flex-grow">
                      {jumlahGajiTutor} orang tutor menunggu konfirmasi
                      pembayaran
                    </div>
                  </div>
                )}

                {jumlahBayarDaftar != 0 && (
                  <div className="bg-white px-4 py-4 border-b-2 flex hover:bg-gray-200">
                    <div className="flex-grow py-2 mr-4">
                      <FontAwesomeIcon icon={faMoneyBillWave} size="2x" />
                    </div>
                    <div className="flex-grow">
                      {jumlahBayarDaftar} orang siswa yang telah melakukan
                      pendaftaran dan les menunggu konfirmasi
                    </div>
                  </div>
                )}
                {jumlahBayarLes != 0 && (
                  <div className="bg-white px-4 py-4 border-b-2 flex hover:bg-gray-200">
                    <div className="flex-grow py-2 mr-4">
                      <FontAwesomeIcon icon={faMoneyBillWave} size="2x" />
                    </div>
                    <div className="flex-grow">
                      {jumlahBayarLes} orang siswa yang telah mengambil les
                      menunggu konfirmasi
                    </div>
                  </div>
                )}
              </Link>
            </div>
          )}
        </div>
        {!imgSrc ? (
          <LoadIcon additionalClassName="text-4xl" />
        ) : (
          <img
            src={imgSrc}
            alt=""
            className="w-11 h-10 rounded-full border-2 mr-2"
          />
        )}
        <div className="mt-auto mb-auto">{name}</div>
      </div>
      <div className="flex flex-row justify-between px-4 md:hidden">
        <img src={LogoLesinAja} className="w-36" />
        <button onClick={() => setOpen((s) => !s)}>
          <FontAwesomeIcon icon={faBars} className="mr-3 text-3xl" />
        </button>
      </div>
      <div>
        {/* pengecekan sidebar untuk admin */}
        {open &&
          roleUser == "admin" &&
          adminSidebarList.map((item, index) => {
            return (
              <NavbarDesktopItem
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
                icon={item.icon}
                text={item.text}
              />
            );
          })}

        {/* pengecekan sidebar untuk tutor */}
        {open &&
          roleUser == "tutor" &&
          tutorSidebarList.map((item, index) => {
            return (
              <NavbarDesktopItem
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
                icon={item.icon}
                text={item.text}
              />
            );
          })}

        {/* pengecekan sidebar untuk walmur */}
        {open &&
          roleUser == "walmur" &&
          walmurSidebarList.map((item, index) => {
            return (
              <NavbarDesktopItem
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
                icon={item.icon}
                text={item.text}
              />
            );
          })}
      </div>
    </nav>
  );
};
