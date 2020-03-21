import React, { Component } from 'react';
import './App.scss';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

import ProtectedRoute from './Components/ProtectedRoute';

import Home from './Views/Home';

import Activity from './Views/Activity';
import Accounts from './Views/Accounts';
import LinkedAccounts from './Views/LinkedAccounts';
import Credit from './Views/Credit';
import CreditEstimate from './Views/CreditEstimate';
import ApplyForCredit from './Views/ApplyForCredit';
import CreditAcceptance from './Views/CreditAcceptance';
import CreateAccount from './Views/CreateAccount';
import SingleAccount from './Views/SingleAccount';
import AddAccount from './Views/AddAccount';
import CreateSharedAccount from './Views/CreateSharedAccount';
import SingleCredit from './Views/SingleCredit';
import AddMoney from './Views/AddMoney';
import AddTransaction from './Views/AddTransaction';
import Transactions from './Views/Transactions';
import Analytics from './Views/Analytics';
import Cards from './Views/Cards';
import SignIn from './Views/SignIn';
import SignUp from './Views/SignUp';
import Summary from './Views/Summary';
import { loadUserInformation } from './Services/authentication';
import Notifications from './Views/Notifications';
import Profile from './Views/Profile';
import ExchangeRates from './Views/ExchangeRatesView/index';

import Navigation from './Components/Navigation';
import Mobilenavigation from './Components/Mobilenavigation';
import CreateCard from './Views/CreateCard';
import CurrencyConverter from './Components/CurrencyConverter';

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
        console.log(error);
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
        {this.state.loaded && (
          <BrowserRouter>
            {this.state.activeNav ? (
              this.state.mobile === true ? (
                <Mobilenavigation />
              ) : (
                <Navigation updateUserInformation={this.updateUserInformation} />
              )
            ) : (
              true
            )}
            <Switch>
              <Route
                path="/"
                render={props => <Home {...props} changeActiveNav={this.disableNav} />}
                exact
              />

              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/activity"
                render={props => (
                  <Activity {...props} changeActiveNav={this.activeNav} user={this.state.user} />
                )}
                exact
              />

              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/create-account"
                render={props => <CreateAccount {...props} changeActiveNav={this.disableNav} />}
                exact
              />

              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/accounts/create-shared-account"
                render={props => (
                  <CreateSharedAccount {...props} changeActiveNav={this.activeNav} />
                )}
                exact
              />

              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/summary"
                render={props => (
                  <Summary {...props} changeActiveNav={this.disableNav} user={this.state.user} />
                )}
                exact
              />

              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/accounts"
                render={props => <Accounts {...props} user={this.state.user} />}
                exact
              />

              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/linked-accounts"
                render={props => <LinkedAccounts {...props} user={this.state.user} />}
                exact
              />

              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/credit"
                render={props => (
                  <Credit {...props} changeActiveNav={this.activeNav} user={this.state.user} />
                )}
                exact
              />

              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/credit/credit-estimate"
                render={props => (
                  <CreditEstimate
                    {...props}
                    changeActiveNav={this.activeNav}
                    user={this.state.user}
                  />
                )}
                exact
              />

              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/credit/apply-for-credit"
                render={props => (
                  <ApplyForCredit
                    {...props}
                    changeActiveNav={this.activeNav}
                    userID={this.state.user._id}
                  />
                )}
                exact
              />

              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/credit/:id"
                render={props => (
                  <SingleCredit
                    {...props}
                    changeActiveNav={this.activeNav}
                    userID={this.state.user._id}
                  />
                )}
                exact
              />

              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/credit-acceptance"
                render={props => (
                  <CreditAcceptance
                    {...props}
                    changeActiveNav={this.activeNav}
                    user={this.state.user}
                  />
                )}
                exact
              />

              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/accounts/add-account"
                render={props => (
                  <AddAccount {...props} changeActiveNav={this.activeNav} user={this.state.user} />
                )}
                exact
              />
              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/accounts/:id/add-money"
                render={props => (
                  <AddMoney
                    {...props}
                    changeActiveNav={this.activeNav}
                    userID={this.state.user._id}
                  />
                )}
                exact
              />
              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/accounts/:id"
                render={props => <SingleAccount {...props} changeActiveNav={this.activeNav} />}
                exact
              />

              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/transactions"
                render={props => <Transactions {...props} userID={this.state.user._id} />}
                exact
              />
              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/transactions/addTransaction"
                render={props => (
                  <AddTransaction
                    {...props}
                    changeActiveNav={this.activeNav}
                    user={this.state.user}
                  />
                )}
                exact
              />
              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/analytics"
                render={props => (
                  <Analytics
                    {...props}
                    changeActiveNav={this.activeNav}
                    userID={this.state.user._id}
                  />
                )}
                exact
              />
              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/cards"
                render={props => (
                  <Cards
                    {...props}
                    changeActiveNav={this.activeNav}
                    userID={this.state.user._id}
                    user={this.state.user}
                  />
                )}
                exact
              />
              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/cards/add-card"
                render={props => <CreateCard {...props} userID={this.state.user._id} />}
                exact
              />

              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/exchange-rates"
                render={props => <ExchangeRates {...props} user={this.state.user} />}
                exact
              />

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
              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/notifications"
                render={() => <Notifications userID={this.state.user._id} />}
                exact
              />
              <ProtectedRoute
                authorized={this.state.user}
                redirect={'/signin'}
                path="/profile"
                render={() => <Profile user={this.state.user} />}
                exact
              />
            </Switch>
          </BrowserRouter>
        )}
      </div>
    );
  }
}

export default App;
