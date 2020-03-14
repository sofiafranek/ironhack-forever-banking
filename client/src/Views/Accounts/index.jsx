import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import Account from '../../Components/Account';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { account } from './../../Services/account';

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: []
    };
  }

  addingAccount() {
    console.log('add account');
  }

  refreshAccount() {
    window.location.reload();
    console.log('refresh');
  }

  getData() {
    account()
      .then(account => {
        this.setState({
          account
        });
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const account = this.state.account;
    return (
      <Layout>
        <h1>Accounts</h1>
        <div className="action-container">
          <Link to={`/accounts/add-account`} onClick={this.addingAccount}>
            <Button variant="contained" className="primary">
              <i className="fas fa-plus"></i>
            </Button>
          </Link>
          <Button variant="contained" className="secondary" onClick={this.refreshAccount}>
            <i className="fas fa-sync-alt"></i>
          </Button>
        </div>
        {this.state.account.map(single => {
          console.log('ACCOUNTS', single);
          return <Account key={single._id} {...single} />;
        })}
      </Layout>
    );
  }
}

export default Accounts;
