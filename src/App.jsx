import React, { useContext, useEffect, useState } from "react";
import {
  Landing,
  Login,
  Register,
  Account,
  Home,
  ListTutor,
  ListMaster,
  ListPayment,
  ListCourse,
  FormMaster,
  FormTutor,
  Keuangan,
  AddListCourse,
  AccountTutor,
  ListLowongan,
  ListCourseTutor,
  PresensiLesTutor,
  PresensiLesWalmur,
  AccountWalmur,
  ListWalmur,
  FormWalmur,
} from "@pages";
import ProviderApp, { ContextAuth } from "@context";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { MainLayout } from "@components";
import { enableFirebaseConfig, firebase } from "@utils";

// Global Settings
import "dayjs/locale/id";
import dayjs from "dayjs";

// Buat dayjs agar bahasa indonesia dan gunakan plugin
dayjs.locale("id");

// Inisialisasi agar fitur firebase bisa digunakan
enableFirebaseConfig();

// List url halaman dan component yang digunakan
const layoutPages = [
  { path: ["/akun"], component: Account },
  { path: ["/akun-tutor"], component: AccountTutor },
  { path: ["/akun-walmur"], component: AccountWalmur },
  { path: ["/list-lowongan"], component: ListLowongan },
  { path: ["/list-les"], component: ListCourseTutor },
  { path: ["/presensi-les-tutor"], component: PresensiLesTutor },
  { path: ["/presensi-les-walmur"], component: PresensiLesWalmur },
  { path: ["/beranda"], component: Home },
  { path: ["/daftar-master"], component: ListMaster },
  { path: ["/daftar-tutor"], component: ListTutor },
  { path: ["/daftar-pembayaran"], component: ListPayment },
  { path: ["/daftar-pilihanles"], component: ListCourse },
  { path: ["/tambah-pilihanles"], component: AddListCourse },
  { path: ["/form-master"], component: FormMaster },
  { path: ["/form-tutor"], component: FormTutor },
  { path: ["/keuangan"], component: Keuangan },
  { path: ["/daftar-walimurid"], component: ListWalmur },
  { path: ["/form-walimurid"], component: FormWalmur },
];

const App = () => {
  return (
    <ProviderApp>
      <Router>
        <InitialChecker />
      </Router>
    </ProviderApp>
  );
};

const InitialChecker = () => {
  // Undefined = belum tahu, true = sudah login, false = tidak login
  const { state: authState, setIsLoggedIn } = useContext(ContextAuth);
  const { isLoggedIn } = authState;

  // Cek apakah user sudah login
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  // Tampilan sementara loading, halaman kosong
  if (isLoggedIn === undefined) {
    return <div></div>;
  }

  if (isLoggedIn === false) {
    return (
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/masuk" exact component={Login} />
        <Route path="/daftar" exact component={Register} />

        <Redirect to="/masuk" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/masuk" exact component={Login} />
      <Route path="/daftar" exact component={Register} />

      {/* Untuk mengecek data-data awal ketika buk aplikasi */}
      {layoutPages.map((item, index) => {
        return (
          <Route
            key={index}
            exact
            path={item.path}
            render={(props) => {
              return (
                <MainLayout>
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
};

export default App;
