import React, { Component } from 'react';
import './App.scss';

import { Switch, Route } from 'react-router-dom';

import Home from './Views/Home';

import Dashboard from './Views/Dashboard';
import Accounts from './Views/Accounts';
import SingleAccount from './Views/SingleAccount';
import Transactions from './Views/Transactions';
import Analytics from './Views/Analytics';
import Payments from './Views/Payments';
import Cards from './Views/Cards';
import SignIn from './Views/SignIn';
import SignUp from './Views/SignUp';

import Messages from './Views/Messages';
import Notifications from './Views/Notifications';
import Profile from './Views/Profile';

import Navigation from './Components/Navigation';
import Mobilenavigation from './Components/Mobilenavigation';

class App extends Component {
  constructor() {
    super();
    this.state = {
      mobile: false
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.renderView();
  };

  renderView() {
    console.log('hello');
    const windowWidth = window.innerWidth;
    if (windowWidth >= 980) {
      console.log('above 980px');
      this.setState({
        mobile: false
      });
    } else {
      this.setState({
        mobile: true
      });
    }
  }
  render() {
    return (
      <div>
        {/* need to add in the ternary operator if the route is home, sign in or sign up then don't know any navigation */}
        {this.state.mobile === true ? <Mobilenavigation /> : <Navigation />}
        <Switch>
          <Route path="/" component={Home} exact />

          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/accounts" component={Accounts} exact />

          {/* just for testing */}
          <Route path="/account-single" component={SingleAccount} exact />

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
