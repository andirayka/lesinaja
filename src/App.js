import React from 'react';
import { Landing, Login, Register } from '@pages';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Landing} />
      <Route path="/masuk" exact component={Login} />
      <Route path="/daftar" exact component={Register} />
    </Router>
  );
};

export default App;
