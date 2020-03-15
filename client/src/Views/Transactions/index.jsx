import React, { Component } from 'react';

import Layout from '../../Components/Layout';
import Transaction from '../../Components/Transaction';
import { Link } from 'react-router-dom';
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

        transactionService
          .receivedTransactions(accounts)
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
          .sentTransactions(accounts)
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
      })
      .catch(error => {
        console.log(error);
      });

    console.log(this.state);
  }

  render() {
    return (
      <Layout>
        <h1>Transactions</h1>
        <div className="action-container">
          <Link to={`/transactions/addTransaction`} onClick={this.addingAccount}>
            <Button variant="contained" className="primary">
              <i className="fas fa-plus"></i>
            </Button>
          </Link>
          <Button variant="contained" className="secondary" onClick={this.refreshAccount}>
            <i className="fas fa-sync-alt"></i>
          </Button>
          {this.state.allTransactions.map(transaction => (
            <Transaction {...transaction}></Transaction>
          ))}
        </div>
      </Layout>
    );
  }
}

export default Transactions;
