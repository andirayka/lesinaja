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
  Keuangan,
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
    path: ["/daftar-tutor"],
    component: ListTutor,
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
    path: ["/form-master"],
    component: FormMaster,
  },
  {
    path: ["/keuangan"],
    component: Keuangan,
  },
];

const App = () => {
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
