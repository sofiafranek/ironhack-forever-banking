import React, { Component } from 'react';
import './App.scss';

import { Switch, Route } from 'react-router-dom';

import Home from './Views/Home';

import Dashboard from './Views/Dashboard';
import Accounts from './Views/Accounts';
import CreateAccount from './Views/createAccount';
import SingleAccount from './Views/SingleAccount';
import AddAccount from './Views/addAccount';
import Transactions from './Views/Transactions';
import Analytics from './Views/Analytics';
import Payments from './Views/Payments';
import Cards from './Views/Cards';
import SignIn from './Views/SignIn';
import SignUp from './Views/SignUp';
import { loadUserInformation } from './Services/authentication';
import Messages from './Views/Messages';
import Notifications from './Views/Notifications';
import Profile from './Views/Profile';

import Navigation from './Components/Navigation';
import Mobilenavigation from './Components/Mobilenavigation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false,
      activeNav: true,
      user: null,
      loaded: false
    };
    this.activeNav = this.activeNav.bind(this);
    this.disableNav = this.disableNav.bind(this);
    this.updateUserInformation = this.updateUserInformation.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();

    loadUserInformation()
      .then(user => {
        this.updateUserInformation(user);
        this.setState({
          loaded: true
        });
      })
      .catch(error => {
        console.log('ERROR', error);
      });
  }

  componentWillUnmount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.renderView();
  };

  disableNav() {
    this.setState({
      activeNav: false
    });
  }

  activeNav() {
    this.setState({
      activeNav: true
    });
  }

  updateUserInformation(user) {
    this.setState({
      user
    });
  }

  renderView() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 980) {
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
        {this.state.activeNav ? (
          this.state.mobile === true ? (
            <Mobilenavigation />
          ) : (
            <Navigation updateUserInformation={this.updateUserInformation} />
          )
        ) : (
          true
        )}
        {this.state.loaded && (
          <Switch>
            <Route
              path="/"
              render={props => <Home {...props} changeActiveNav={this.disableNav} />}
              exact
            />

            <Route
              path="/dashboard"
              render={props => (
                <Dashboard {...props} changeActiveNav={this.activeNav} user={this.state.user} />
              )}
              exact
            />

            <Route
              path="/create-account"
              render={props => <CreateAccount {...props} changeActiveNav={this.disableNav} />}
              exact
            />
            <Route
              path="/accounts"
              render={props => <Accounts {...props} user={this.state.user} />}
              exact
            />
            <Route path="/accounts/add-account" component={AddAccount} exact />
            <Route path="/accounts/:id" component={SingleAccount} exact />

            <Route path="/transactions"
            render={props => <Transactions {...props} userID={this.state.user._id} />}
            exact />
            <Route path="/analytics" component={Analytics} exact />
            <Route path="/payments" component={Payments} exact />
            <Route path="/cards" component={Cards} exact />

            <Route
              path="/signin"
              render={props => (
                <SignIn
                  {...props}
                  changeActiveNav={this.disableNav}
                  updateUserInformation={this.updateUserInformation}
                />
              )}
              exact
            />
            <Route
              path="/signup"
              render={props => (
                <SignUp
                  {...props}
                  changeActiveNav={this.disableNav}
                  updateUserInformation={this.updateUserInformation}
                />
              )}
              exact
            />

            <Route path="/messages" component={Messages} exact />
            <Route path="/notifications" component={Notifications} exact />
            <Route path="/profile" component={Profile} exact />
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
