import React, { Component } from 'react';
import './App.scss';

import { Switch, Route } from 'react-router-dom';

import Home from './Views/Home';

import Dashboard from './Views/Dashboard';
import Accounts from './Views/Accounts';
import Transactions from './Views/Transactions';
import Analytics from './Views/Analytics';
import Payments from './Views/Payments';
import Cards from './Views/Cards';
import SignIn from './Views/SignIn';
import SignUp from './Views/SignUp';

import Messages from './Views/Messages';
import Notifications from './Views/Notifications';
import Profile from './Views/Profile';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" component={Home} exact />

          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/accounts" component={Accounts} exact />
          <Route path="/transactions" component={Transactions} exact />
          <Route path="/analytics" component={Analytics} exact />
          <Route path="/payments" component={Payments} exact />
          <Route path="/cards" component={Cards} exact />

          <Route path="/signin" component={SignIn} exact />
          <Route path="/signup" component={SignUp} exact />

          <Route path="/messages" component={Messages} exact />
          <Route path="/notifications" component={Notifications} exact />
          <Route path="/profile" component={Profile} exact />
        </Switch>
      </div>
    );
  }
}

export default App;
