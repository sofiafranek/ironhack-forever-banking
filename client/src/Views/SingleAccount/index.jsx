import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import Transaction from '../../Components/Transaction';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Button from '@material-ui/core/Button';

import { deleteAccount } from './../../Services/account';

class SingleAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null
    };
    this.deleteAnAccount = this.deleteAnAccount.bind(this);
    console.log(this.props.match.params.id);
  }

  refreshAccount() {
    window.location.reload();
    console.log('refresh');
  }

  deleteAnAccount() {
    const accountID = this.props.match.params.id;
    deleteAccount(accountID)
      .then(() => {
        this.props.history.push({
          pathname: '/accounts'
        });
      })
      .catch(error => console.log(error));
    console.log('delete account');
    console.log(this.props.location);
    //this.props.location.removeAccount(accountID);
  }

  componentDidMount() {
    const account = this.props.location.state;
    this.setState({
      account: account
    });
  }

  render() {
    return (
      <Layout>
        {this.state.account && (
          <section className="single-account">
            <h1>Single Account Page</h1>
            <div className="action-container">
              <Button variant="contained" className="secondary" onClick={this.refreshAccount}>
                <i className="fas fa-sync-alt"></i>
              </Button>
              <Button variant="contained" className="third" onClick={this.deleteAnAccount}>
                <i className="fas fa-times"></i>
              </Button>
            </div>
            <Tabs defaultActiveKey="summary" className="pt-3">
              <Tab eventKey="summary" title="Summary">
                <h1>{this.state.account.balance}€</h1>
                <h6 className="pb-3">
                  {this.state.account.type === 'current' || 'savings'
                    ? 'Total Credit Limit'
                    : 'Available Balance'}
                </h6>
                <h5>IBAN Number : {this.state.account.accountNumber}</h5>
                <h5>Account Type : {this.state.account.type}</h5>
                <h5>Card Number : 1234 1234 1234 1234</h5>
                <h5>Card Expirty : 12 / 04</h5>
              </Tab>
              <Tab eventKey="transactions" title="Transactions">
                {/* <Chart /> */}
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
              </Tab>
              <Tab eventKey="settings" title="Settings">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, fuga.</p>
              </Tab>
            </Tabs>
          </section>
        )}
      </Layout>
    );
  }
}

export default SingleAccount;
