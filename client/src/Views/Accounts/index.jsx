import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import Account from '../../Components/Account';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { userIDAccounts } from './../../Services/account';

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: []
    };
    this.removeAccount = this.removeAccount.bind(this);
  }

  refresh() {
    window.location.reload();
    console.log('refresh');
  }

  getData() {
    const userID = this.props.user._id;
    userIDAccounts(userID)
      .then(account => {
        this.setState({
          account
        });
      })
      .catch(error => console.log(error));
  }

  removeAccount(id) {
    this.setState(previousState => {
      return {
        account: previousState.account.filter(acc => acc._id !== id)
      };
    });
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.getData();
  }

  render() {
    return (
      <Layout>
        <h1 className="pb-3">Accounts</h1>
        <div className="action-container">
          <Link to={`/accounts/add-account`}>
            <Button variant="contained" className="primary">
              <i className="fas fa-plus"></i>
            </Button>
          </Link>
          <Button variant="contained" className="secondary" onClick={this.refresh}>
            <i className="fas fa-sync-alt"></i>
          </Button>
        </div>
        {this.state.account.map(single => {
          console.log(single);
          return <Account key={single._id} {...single} />;
        })}
      </Layout>
    );
  }
}

export default Accounts;
