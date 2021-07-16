import React from 'react';
import { Landing, Login, Account } from '@pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Landing} />
      <Route path="/masuk" exact component={Login} />
      <Route path="/account" exact component={Account} />
    </Router>
  );
};

export default App;
