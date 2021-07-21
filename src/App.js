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
} from "@pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainLayout } from "@components";

const layoutPages = [
  {
    path: "/akun",
    component: Account,
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
        <Route path="/beranda" exact component={Home} />
        <Route path="/daftar-tutor" exact component={ListTutor} />
        <Route path="/daftar-master" exact component={ListMaster} />
        <Route path="/daftar-pembayaran" exact component={ListPayment} />
        <Route path="/daftar-pilihanles" exact component={ListCourse} />
        <Route path="/form-master" exact component={FormMaster} />
        <Route path="/form-tutor" exact component={FormTutor} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
