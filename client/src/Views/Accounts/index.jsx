import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import Account from '../../Components/Account';

import Button from '@material-ui/core/Button';

import { account } from './../../Services/account';

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: []
    };
  }
  getData() {
    account()
      .then(account => {
        this.setState({
          account: account
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
          <Button variant="contained" className="primary">
            <i className="fas fa-plus"></i>
          </Button>
          <Button variant="contained" className="secondary">
            <i className="fas fa-sync-alt"></i>
          </Button>
          <Button variant="contained" className="third">
            <i className="fas fa-times"></i>
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
