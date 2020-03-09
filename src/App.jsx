import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Switch, Route } from 'react-router-dom';

import Dashboard from './Views/Dashboard';
import Accounts from './Views/Accounts';
import Transactions from './Views/Transactions';
import Analytics from './Views/Analytics';
import Payments from './Views/Payments';
import Cards from './Views/Cards';
import SignInUp from './Views/SignInUp';

import Messages from './Views/Messages';
import Notifications from './Views/Notifications';
import Profile from './Views/Profile';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/accounts" component={Accounts} exact />
          <Route path="/transactions" component={Transactions} exact />
          <Route path="/analytics" component={Analytics} exact />
          <Route path="/payments" component={Payments} exact />
          <Route path="/cards" component={Cards} exact />
          <Route path="/signin" component={SignInUp} exact />

          <Route path="/messages" component={Messages} exact />
          <Route path="/notifications" component={Notifications} exact />
          <Route path="/profile" component={Profile} exact />
        </Switch>
      </div>
    );
  }
}

export default App;
