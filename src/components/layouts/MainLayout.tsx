import React, { FC, useEffect, useState } from "react";
import { Sidebar, NavbarDesktop } from "@components";
import { IconProfile } from "@assets";
import { firebase, getFirebaseDataOnce, handleShowFile } from "@utils";

// Pembungkus semua content di dalam halaman yang bisa login
type Props = {
  children?: any;
  role: any;
};
export const MainLayout: FC<Props> = ({ children, role }) => {
  const [dataUser, setDataUser] = useState<any>({});

  const [profileSrc, setProfileSrc] = useState("");

  const handleNavbarPage = async (uid: string) => {
    const getDataUser = await getFirebaseDataOnce(`user/${uid}`);
    setDataUser(getDataUser);

    if (getDataUser.roles.admin) {
      let fileNew = `foto_admin/${uid}`;
      handleShowFile(fileNew).then((url) => {
        setProfileSrc(url);
      });
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      handleNavbarPage(user.uid);
    });
  }, []);

  return (
    <div className="flex">
      {/* Sidebar di sebelah kiri */}
      <div className="md:w-72">
        <Sidebar roleOn={role} />
      </div>

      <div className="flex flex-1 flex-col">
        <NavbarDesktop
          imgSrc={profileSrc ? profileSrc : IconProfile}
          name={dataUser.nama}
        />
        {/* Content halaman di sebelah kanan */}
        <div className="flex-grow m-8">{children}</div>
      </div>
    </div>
  );
};
