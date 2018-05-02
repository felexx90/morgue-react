import React from 'react';
import './App.css';
import { Switch } from 'react-router-dom';

import ListPostmortem from './containers/ListPostmortem';
import RouteLayout from './components/Route/RouteLayot';
import Home from './containers/Home';
import Postmortem from './containers/Postmortem';

const App = () => (
  <Switch >
    <RouteLayout path="/" exact component={Home} />
    <RouteLayout path="/postmortem" exact component={ListPostmortem} fluid />
    <RouteLayout path="/postmortem/create" exact component={Postmortem} />
    <RouteLayout path="/postmortem/:id" component={Postmortem} />

  </Switch >
);

export default App;
