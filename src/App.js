import React from "react";
import { Landing, Login, Register, Account, Home, ListTutor } from "@pages";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Landing} />
      <Route path="/masuk" exact component={Login} />
      <Route path="/akun" exact component={Account} />
      <Route path="/daftar" exact component={Register} />
      <Route path="/beranda" exact component={Home} />
      <Route path="/daftar-tutor" exact component={ListTutor} />
    </Router>
  );
};

export default App;
