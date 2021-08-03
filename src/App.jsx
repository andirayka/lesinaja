import React, { useEffect, useState } from "react";
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
import ProviderApp from "@context";
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
  // Undefined = belum tahu, true = sudah login, false, tidak login
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  // Cek apakah user sudah login
  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoggedIn === undefined) {
    // Tampilan sementara loading, halaman kosong
    return <div></div>;
  }

  return (
    <ProviderApp>
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/masuk" exact component={Login} />
          <Route path="/daftar" exact component={Register} />

          {isLoggedIn &&
            layoutPages.map((item, index) => {
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
      </Router>
    </ProviderApp>
  );
};

export default App;
