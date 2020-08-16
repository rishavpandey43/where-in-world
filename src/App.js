import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';

import Home from './screens/Home/Home';
import Country from './screens/Country/Country';

function App() {
  return (
    <Router>
      <Header />
      <main className="main-wrapper">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/country/:code" component={Country} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
