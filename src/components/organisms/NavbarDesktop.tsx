import React, { FC, useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { LogoLesinAja } from "@assets";
import {
  LoadIcon,
  adminSidebarList,
  tutorSidebarList,
  walmurSidebarList,
  NavbarDesktopItem,
} from "@components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "@context";
import { handleLogout, firebase } from "@utils";

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

  useEffect(() => {
    if (authState.isLoggedIn === false) {
      history.push("/masuk");
    }
    // getLocalStorage();
  }, [authState.isLoggedIn]);

  return (
    <nav className="md:px-8 md:py-2 bg-yellow-400 h-14">
      <div className="hidden md:flex">
        {!imgSrc ? (
          <LoadIcon additionalClassName="text-4xl ml-auto" />
        ) : (
          <img
            src={imgSrc}
            alt=""
            className="w-11 h-10 rounded-full border-2 ml-auto mr-2"
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
