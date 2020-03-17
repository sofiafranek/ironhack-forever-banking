import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Button from '@material-ui/core/Button';

import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { deleteAccount } from './../../Services/account';
import { allTransactionsAccount } from './../../Services/transaction';

class SingleAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      transactions: []
    };
    this.deleteAnAccount = this.deleteAnAccount.bind(this);
  }

  refreshAccount() {
    window.location.reload();
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
  }

  componentDidMount() {
    const accountID = this.props.match.params.id;
    const account = this.props.location.state;

    allTransactionsAccount(accountID)
    .then((transactions) => {
      this.setState({
        transactions,
        account
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }x

  render() {
    return (
      <Layout>
        {this.state.account && (
          <>
            <Breadcrumb>
              <Breadcrumb.Item href="/accounts">Accounts</Breadcrumb.Item>
              <Breadcrumb.Item className="disable-breadcrumb">
                {this.state.account.accountNumber}
              </Breadcrumb.Item>
            </Breadcrumb>
            <section className="single-account">
              <h1>{this.state.account.balance}€</h1>
              <h5>
                {this.state.account.type === 'Current'
                  ? 'Available Balance'
                  : this.state.account.type === 'Savings'
                  ? 'Available Balance'
                  : 'Total Credit Limit'}
              </h5>
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
                  <h5>IBAN Number : {this.state.account.accountNumber}</h5>
                  <h5>Account Type : {this.state.account.type}</h5>
                  <h5>Card Number : 1234 1234 1234 1234</h5>
                  <h5>Card Expirty : 12 / 04</h5>
                </Tab>
                 <Tab eventKey="transactions" title="Transactions">
                   {
                    this.state.transactions.map(transaction => (
                      <Transaction {...transaction}/>
                    ))
                   }
                </Tab> 
                <Tab eventKey="settings" title="Settings">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, fuga.</p>
                </Tab>
              </Tabs>
            </section>
          </>
        )}
      </Layout>
    );
  }
}

export default SingleAccount;
