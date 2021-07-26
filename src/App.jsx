import React, { useEffect } from "react";
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
} from "@pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainLayout } from "@components";

const layoutPages = [
  {
    path: ["/akun"],
    component: Account,
  },
  {
    path: ["/beranda"],
    component: Home,
  },
  {
    path: ["/daftar-master"],
    component: ListMaster,
  },
  {
    path: ["/daftar-tutor"],
    component: ListTutor,
  },
  {
    path: ["/daftar-pembayaran"],
    component: ListPayment,
  },
  {
    path: ["/daftar-pilihanles"],
    component: ListCourse,
  },
  {
    path: ["/tambah-pilihanles"],
    component: AddListCourse,
  },
  {
    path: ["/form-master"],
    component: FormMaster,
  },
  {
    path: ["/form-tutor"],
    component: FormTutor,
  },
  {
    path: ["/keuangan"],
    component: Keuangan,
  },
];

const App = () => {
  // useEffect(() => {
  //   enableFirebaseConfig();
  // }, []);

  return (
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
  );
};

export default App;
