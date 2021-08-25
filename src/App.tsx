// @ts-nocheck
import React, { FC, useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { enableFirebaseConfig, firebase, getFirebaseDataOnce } from "@utils";
import AppProvider, { AuthContext } from "@context";
import {
  FormMaster,
  ListMaster,
  ListCourse,
  AddListCourse,
  ListPayment,
  Login,
  Home,
  ListTutor,
  FormTutor,
  ListWalmur,
  FormWalmur,
  Keuangan,
  HomeTutor,
  HomeWalmur,
  Account,
  AccountTutor,
  AccountWalmur,
} from "@pages";

// Global setting for dayjs
import "dayjs/locale/id";
import dayjs from "dayjs";
import { MainLayout } from "@components";
// Buat dayjs agar bahasa indonesia dan gunakan plugin
dayjs.locale("id");

// Inisialisasi agar fitur firebase bisa digunakan
enableFirebaseConfig();

// List url halaman dan component yang digunakan
const adminPages = [
  {
    path: ["/form-master"],
    component: FormMaster,
    title: ["Form Master LesinAja"],
  },
  {
    path: ["/daftar-master"],
    component: ListMaster,
    title: ["Daftar Master LesinAja"],
  },
  {
    path: ["/daftar-pembayaran"],
    component: ListPayment,
    title: "Daftar Pembayaran LesinAja",
  },
  {
    path: ["/daftar-pilihanles"],
    component: ListCourse,
    title: ["Daftar Pilihan Les LesinAja"],
  },
  {
    path: ["/tambah-pilihanles"],
    component: AddListCourse,
    title: ["Tambah Pilihan Les LesinAja"],
  },
  { path: ["/beranda"], component: Home, title: ["Beranda LesinAja"] },
  {
    path: ["/daftar-tutor"],
    component: ListTutor,
    title: ["Daftar Tutor LesinAja"],
  },
  {
    path: ["/form-tutor"],
    component: FormTutor,
    title: ["Form Tutor LesinAja"],
  },
  {
    path: ["/daftar-walimurid"],
    component: ListWalmur,
    title: ["Daftar Wali Murid LesinAja"],
  },
  {
    path: ["/form-walimurid"],
    component: FormWalmur,
    title: ["Form Wali Murid LesinAja"],
  },
  { path: ["/keuangan"], component: Keuangan, title: ["Keuangan LesinAja"] },
  {
    path: ["/akun-admin"],
    component: Account,
    title: ["Akun Admin LesinAja"],
  },
  //Halaman Tutor Sementara
  {
    path: ["/beranda-tutor"],
    component: HomeTutor,
    title: ["Beranda Tutor LesinAja"],
  },
  {
    path: ["/akun-tutor"],
    component: AccountTutor,
    title: ["Akun Tutor LesinAja"],
  },
  //Halaman Wali murid Sementara
  {
    path: ["/beranda-wali-murid"],
    component: HomeWalmur,
    title: ["Beranda Wali Murid LesinAja"],
  },
  {
    path: ["/akun-wali-murid"],
    component: AccountWalmur,
    title: ["Akun Wali Murid LesinAja"],
  },
];

// const walmurPages = [
//   {
//     path: ["/beranda-wali-murid"],
//     component: HomeWalmur,
//     title: ["Beranda Wali Murid LesinAja"],
//   },
//   {
//     path: ["/akun-wali-murid"],
//     component: AccountWalmur,
//     title: ["Akun Wali Murid LesinAja"],
//   },
// ];

// const tutorPages = [
//   {
//     path: ["/beranda-tutor"],
//     component: HomeTutor,
//     title: ["Beranda Tutor LesinAja"],
//   },
//   {
//     path: ["/akun-tutor"],
//     component: AccountTutor,
//     title: ["Akun Tutor LesinAja"],
//   },
// ];

const App: FC = () => {
  return (
    <AppProvider>
      <Router>
        <InitialChecker />
      </Router>
    </AppProvider>
  );
};

const InitialChecker = () => {
  // Undefined = belum tahu, true = sudah login, false = tidak login
  const { state: authState, setIsLoggedIn } = useContext<any>(AuthContext);
  const { isLoggedIn } = authState;
  const [roleLogin, setRoleLogin] = useState<any>();

  const getLocalStorage = () => {
    const getData = localStorage.getItem("roleUser");
    setRoleLogin(getData);
  };

  // Cek apakah user sudah login
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        console.log("anda belum login");
      }
      getLocalStorage();
    });
  }, []);

  if (isLoggedIn === false) {
    return (
      <Switch>
        {/* <Route path="/" exact component={Landing} /> */}
        <Route path="/masuk" exact component={Login} />
        {/* <Route path="/daftar" exact component={Register} /> */}
        <Redirect to="/masuk" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        {/* <Route path="/" exact component={Landing} /> */}
        <Route path="/masuk" exact component={Login} />
        {/* <Route path="/daftar" exact component={Register} /> */}

        {/* {roleUser &&
          roleUser == "admin" &&
          adminPages.map((item: any, index: any) => {
            // console.log(isRole);
            return (
              <Route
                key={index}
                exact
                path={item.path}
                render={(props) => {
                  document.title = item.title ? item.title : "Lesin Aja";
                  return (
                    <MainLayout role={isRole} getRoleUser={roleUser}>
                      <item.component {...props} />
                    </MainLayout>
                  );
                }}
              />
            );
          })}

        {roleUser &&
          roleUser == "walmur" &&
          walmurPages.map((item: any, index: any) => {
            // console.log(isRole);
            return (
              <Route
                key={index}
                exact
                path={item.path}
                render={(props) => {
                  document.title = item.title ? item.title : "Lesin Aja";
                  return (
                    <MainLayout role={isRole} getRoleUser={roleUser}>
                      <item.component {...props} />
                    </MainLayout>
                  );
                }}
              />
            );
          })}

        {roleUser &&
          roleUser == "tutor" &&
          tutorPages.map((item: any, index: any) => {
            // console.log(isRole);
            return (
              <Route
                key={index}
                exact
                path={item.path}
                render={(props) => {
                  document.title = item.title ? item.title : "Lesin Aja";
                  return (
                    <MainLayout role={isRole} getRoleUser={roleUser}>
                      <item.component {...props} />
                    </MainLayout>
                  );
                }}
              />
            );
          })} */}
        {/* Untuk mengecek data-data awal ketika buk aplikasi */}
        {adminPages.map((item: any, index: any) => {
          // console.log(isRole);
          return (
            <Route
              key={index}
              exact
              path={item.path}
              render={(props) => {
                document.title = item.title ? item.title : "Lesin Aja";
                // console.log(isRole);
                return (
                  <MainLayout getRoleUser={roleLogin}>
                    <item.component {...props} />
                  </MainLayout>
                );
              }}
            />
          );
        })}
        <Redirect to="/masuk" />
      </Switch>
    );
  }
};

export default App;
