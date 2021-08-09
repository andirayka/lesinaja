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
  { path: ["/akun"], component: Account, title: ["Akun Admin LesinAja"] },
  {
    path: ["/akun-tutor"],
    component: AccountTutor,
    title: ["Akun Tutor LesinAja"],
  },
  {
    path: ["/akun-walmur"],
    component: AccountWalmur,
    title: ["Akun Walmur LesinAja"],
  },
  {
    path: ["/list-lowongan"],
    component: ListLowongan,
    title: ["List Lowongan LesinAja"],
  },
  {
    path: ["/list-les"],
    component: ListCourseTutor,
    title: ["List Les LesinAja"],
  },
  {
    path: ["/presensi-les-tutor"],
    component: PresensiLesTutor,
    title: ["Presensi Les Tutor LesinAja"],
  },
  {
    path: ["/presensi-les-walmur"],
    component: PresensiLesWalmur,
    title: ["Presensi Les Walmur LesinAja"],
  },
  { path: ["/beranda"], component: Home, title: ["Beranda LesinAja"] },
  {
    path: ["/daftar-master"],
    component: ListMaster,
    title: ["Daftar Master LesinAja"],
  },
  {
    path: ["/daftar-tutor"],
    component: ListTutor,
    title: ["Daftar Tutor LesinAja"],
  },
  {
    path: ["/daftar-pembayaran"],
    component: ListPayment,
    title: ["Daftar Pembayaran LesinAja"],
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
  {
    path: ["/form-master"],
    component: FormMaster,
    title: ["Form Master LesinAja"],
  },
  {
    path: ["/form-tutor"],
    component: FormTutor,
    title: ["Form Tutor LesinAja"],
  },
  { path: ["/keuangan"], component: Keuangan, title: ["Keuangan LesinAja"] },
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
        console.log("anda belum login");
      }
    });
  }, []);

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
              document.title = item.title ? item.title : "Lesin Aja";
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
