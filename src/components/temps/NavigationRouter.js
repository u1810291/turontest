import React, { Component } from 'react';
import { BrowserRouter, Router, Route, Link, Switch, Redirect } from "react-router-dom";
import UserArchieve from "./UserArchieve";
import UserTests from "./UserTests";
import UserInfo from "./UserInfo/UserInfo";
import UserPage from './UserPage'

const NavigationRouter = () => {
    // if (this.state.redirect) {
    //   return (<Redirect to={'/login'} />);
    // }
    return (
       <Switch>
        <UserPage>
              {/*<Route path='/user' exact component={ UserInfo }></Route>*/}
              <Route path='/user/assignedtests' component={ UserTests } />
              <Route path='/user/archive' component={ UserArchieve } />
          </UserPage>
       </Switch>
      
    );
}

export default NavigationRouter;
