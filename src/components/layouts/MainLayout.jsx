import { Sidebar, Navbar, NavbarPage } from "@components";
import React, { useEffect, useState } from "react";
import { firebase, getFirebaseDataOnce, handleShowFile } from "@utils";

const MainLayout = ({ children }) => {
  const [dataUser, setDataUser] = useState({});

  const [profileSrc, setProfileSrc] = useState("");

  const handleNavbarPage = async (uid) => {
    const getDataUser = await getFirebaseDataOnce({
      ref: `user/${uid}`,
    });
    setDataUser(getDataUser);

    if (getDataUser.roles.admin) {
      let fileNew = `foto_admin/${uid}`;
      handleShowFile(fileNew).then((url) => {
        setProfileSrc(url);
      });
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      handleNavbarPage(user.uid);
    });
  }, []);

  return (
    <div className="flex flex-col items-start md:flex-row pt-24 md:pt-0">
      <Navbar />
      <Sidebar />
      <div className="w-full">
        <NavbarPage imgSrc={profileSrc} name={dataUser.nama} />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
