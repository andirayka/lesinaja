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
} from "@pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/masuk" exact component={Login} />
        <Route path="/akun" exact component={Account} />
        <Route path="/daftar" exact component={Register} />
        <Route path="/beranda" exact component={Home} />
        <Route path="/daftar-tutor" exact component={ListTutor} />
        <Route path="/daftar-master" exact component={ListMaster} />
        <Route path="/daftar-pembayaran" exact component={ListPayment} />
        <Route path="/daftar-pilihanles" exact component={ListCourse} />
        <Route path="/form-master" exact component={FormMaster} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
