import React, { FC, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { enableFirebaseConfig } from "@utils";
import AppProvider from "@context";
import { ListCourse, ListPayment, Login } from "@pages";

// Global setting for dayjs
import "dayjs/locale/id";
import dayjs from "dayjs";
import { AuthContext } from "context/AuthContext";
import { MainLayout } from "@components";
// Buat dayjs agar bahasa indonesia dan gunakan plugin
dayjs.locale("id");

// Inisialisasi agar fitur firebase bisa digunakan
enableFirebaseConfig();

// List url halaman dan component yang digunakan
const layoutPages = [
  { path: ["/daftar-pembayaran"], component: ListPayment },
  { path: ["/daftar-pilihanles"], component: ListCourse },
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
  // const { state: authState, setIsLoggedIn } = useContext(AuthContext);
  // const { isLoggedIn } = authState;

  // Cek apakah user sudah login
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       setIsLoggedIn(true);
  //     } else {
  //       setIsLoggedIn(false);
  //       console.log("anda belum login");
  //     }
  //   });
  // }, []);

  // if (isLoggedIn === false) {
  //   return (
  //     <Switch>
  //       <Route path="/" exact component={Landing} />
  //       <Route path="/masuk" exact component={Login} />
  //       <Route path="/daftar" exact component={Register} />

  //       <Redirect to="/masuk" />
  //     </Switch>
  //   );
  // }

  return (
    <Switch>
      {/* <Route path="/" exact component={Landing} /> */}
      <Route path="/masuk" exact component={Login} />
      {/* <Route path="/daftar" exact component={Register} /> */}

      {/* Untuk mengecek data-data awal ketika buk aplikasi */}
      <MainLayout>
        {layoutPages.map((item, index) => {
          return (
            <Route
              key={index}
              path={item.path}
              exact
              component={item.component}
            />
          );
        })}
      </MainLayout>
      <Redirect to="/masuk" />
    </Switch>
  );
};

export default App;
