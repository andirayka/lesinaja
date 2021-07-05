import React from "react";
import { Landing, Login } from "./components/pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
    </Router>
  );
};

export default App;
