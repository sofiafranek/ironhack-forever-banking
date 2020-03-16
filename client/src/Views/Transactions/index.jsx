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

  refresh() {
    window.location.reload();
    console.log('refresh');
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
              transactionsReceived: transactions
            });

            transactionService
              .sentTransactions(accounts)
              .then(transactions => {
                this.setState({
                  transactionsSent: transactions
                });

                transactionService
                  .allTransactions(accounts)
                  .then(transactions => {
                    this.setState({
                      allTransactions: transactions
                    });
                    console.log(transactions, 'ALL TRANSACTIONS');
                  })
                  .catch(error => {
                    console.log(error);
                  });
              })
              .catch(error => {
                console.log(error);
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
          <Button variant="contained" className="secondary" onClick={this.refresh}>
            <i className="fas fa-sync-alt"></i>
          </Button>
        </div>
        {this.state.allTransactions.map(transaction => (
          <Transaction {...transaction}></Transaction>
        ))}
      </Layout>
    );
  }
}

export default Transactions;
