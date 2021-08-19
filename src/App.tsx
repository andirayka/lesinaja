import React, { FC, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { enableFirebaseConfig, firebase } from "@utils";
import AppProvider, { AuthContext } from "@context";
import {
  ListMaster,
  ListCourse,
  ListPayment,
  Login,
  Home,
  ListTutor,
  FormTutor,
  ListWalmur,
  FormWalmur,
  Keuangan,
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
];

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

  // Cek apakah user sudah login
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        console.log("anda belum login");
      }
      // console.log(user);
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
  }

  return (
    <Switch>
      {/* <Route path="/" exact component={Landing} /> */}
      <Route path="/masuk" exact component={Login} />
      {/* <Route path="/daftar" exact component={Register} /> */}

      {/* Untuk mengecek data-data awal ketika buk aplikasi */}
      {adminPages.map((item: any, index: any) => {
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
