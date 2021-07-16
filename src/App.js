import React from 'react';
import { Landing, Login } from '@pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Landing} />
      <Route path="/masuk" exact component={Login} />
    </Router>
  );
};

export default App;
