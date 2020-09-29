import React from 'react';
import { Router, Route, Switch } from "react-router-dom";

import Login from './components/Login/login';
import NavigationRouter from './components/temps/NavigationRouter';
import Admin from './components/Admin/Admin';
import './App.css';
import './components/Admin/Admin.css'
import history from './history';

function App() {
  return (
  	<Router history={history}>
       <Switch>
          <Route exact path={'/'} component={Login} />
          <Route path={'/Admin'} component={Admin} />
        </Switch>
        <Route  path={'/user'} component={NavigationRouter} />
      </Router>
  );
}
export default App;
