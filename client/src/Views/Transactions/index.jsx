import React, { Component } from 'react';

import Layout from '../../Components/Layout';
// import Transaction from '../../Components/Transaction';

import Button from '@material-ui/core/Button';
import * as transactionService from './../../Services/transaction';
import { userAccounts } from './../../Services/account';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      transactionsReceived: [],
      transactionsSent: [],
      allTransactions: []
    };
  }

  componentDidMount() {
    const userID = this.props.userID;

    userAccounts(userID)
      .then(accounts => {
        this.setState({
          accounts
        });
      })
      .catch(error => {
        console.log(error);
      });

    transactionService
      .receivedTransactions(this.state.accounts)
      .then(transactions => {
        this.setState({
          transactionsReceived: transactions,
          allTransactions: transactions
        });
      })
      .catch(error => {
        console.log(error);
      });

    transactionService
      .sentTransactions(this.state.accounts)
      .then(transactions => {
        this.setState(previousState => {
          return {
            transactionsSent: transactions,
            allTransactions: [...previousState.allTransactions, transactions]
          };
        });
      })
      .catch(error => {
        console.log(error);
      });

    console.log(this.state);
  }

  render() {
    console.log(this.props.userID);
    return (
      <div>
        <Layout>
          <h1>Payments</h1>
          <div className="action-container">
            <Button variant="contained" className="primary">
              <i class="fas fa-plus"></i>
            </Button>
            <Button variant="contained" className="secondary">
              <i class="fas fa-sync-alt"></i>
            </Button>
          </div>
        </Layout>
      </div>
    );
  }
}

export default Transactions;
