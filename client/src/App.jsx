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
  constructor(props) {
    super(props);
    this.state = {
      mobile: false
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
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
      // constructor(props) {
      //   super(props);
      //   this.state = {
      //     mobile: this.props.mobile
      //   };
      // }

      // componentDidMount() {
      //   console.log('hello');
      //   console.log(this.state.mobile);
      //   if (this.state.mobile === true) {
      //     this.setState({
      //       mobile: ''
      //     });
      //     console.log(this.state.mobile);
      //   } else if (this.state.mobile === false) {
      //     this.setState({
      //       mobile: ''
      //     });
      //     console.log(this.state.mobile);
      //   }
      // }
      <div>
        {this.state.mobile === true ? <Mobilenavigation /> : <Navigation />}
        <Switch>
          <Route path="/" component={Home} exact />

          <Route path="/dashboard" component={Dashboard} exact />

          <Route path="/accounts" component={Accounts} exact />
          <Route path="/accounts/:id" component={SingleAccount} exact />

          <Route path="/transactions" component={Transactions} exact />
          <Route path="/analytics" component={Analytics} exact />
          <Route path="/payments" component={Payments} exact />
          <Route path="/cards" component={Cards} exact />

          <Route path="/signin" render={props => <SignIn {...props} />} exact />
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
