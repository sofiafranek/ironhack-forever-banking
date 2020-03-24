import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../Components/Layout';
import ActivityAccount from '../../Components/ActivityAccount';
import Transaction from '../../Components/Transaction';
import MenuItem from '@material-ui/core/MenuItem';
import { activity } from './../../Services/activity';
import './style.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false,
      accountsUser: [],
      transactions: []
    };
  }

  async getData() {
    const userID = this.props.user._id;

    try {
      const information = await activity(userID);
      const userAccs = information.accountsUser;
      const accs = userAccs.map(value => value.accountID);
      const accountsUser = accs.concat(information.credits);

      this.setState({
        accountsUser,
        transactions: information.transactions
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getData();
    this.props.changeActiveNav();
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

  randomKey(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
    const user = this.props.user;
    return (
      <Layout>
        <div className="relative activity-page">
          {this.state.mobile === true ? (
            <div className="d-flex dashboard-action-buttons">
              <Link to="/profile">
                <MenuItem className="primary">
                  <i className="fas fa-user"></i>
                </MenuItem>
                <div>Profile</div>
              </Link>

              <Link to="/">
                <MenuItem className="secondary">
                  <i className="fas fa-sign-out-alt"></i>
                </MenuItem>
                <div>Log Out</div>
              </Link>
            </div>
          ) : (
            ''
          )}
          <h1 className="pb-3 heading-one-mobile">Your Activity - {user.name}</h1>
          <hr className="pt-1"></hr>
          <h4 className="pb-3 pt-4">All Accounts</h4>
          {this.state.accountsUser.length > 0 ? (
            this.state.accountsUser.map(single => {
              return <ActivityAccount key={this.randomKey(50)} {...single} />;
            })
          ) : (
            <p className="pt-3">No Accounts Listed</p>
          )}

          <h4 className="pb-3 pt-4">All Transactions</h4>
          {this.state.transactions.length > 0 ? (
            this.state.transactions.map(single => {
              return <Transaction key={this.randomKey(50)} {...single} />;
            })
          ) : (
            <p className="pt-3">No Transactions Listed</p>
          )}
        </div>
      </Layout>
    );
  }
}

export default Dashboard;
