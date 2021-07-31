import React from "react";
import {
  Landing,
  Login,
  Register,
  Account,
  Home,
  NotFound,
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
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainLayout } from "@components";
import { enableFirebaseConfig } from "@utils";

enableFirebaseConfig();
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
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/masuk" exact component={Login} />
          <Route path="/daftar" exact component={Register} />

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
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ProviderApp>
  );
};

export default App;
