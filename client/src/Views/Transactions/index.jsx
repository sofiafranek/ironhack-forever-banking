import React, { Component } from 'react';

import Layout from '../../Components/Layout';
import Transaction from '../../Components/Transaction';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import * as transactionService from './../../Services/transaction';
import { userAccounts } from './../../Services/account';
import Search from '../../Components/Search';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      transactionsReceived: [],
      transactionsSent: [],
      allTransactions: [],
      filter: 'All',
      search: '',
      renderTransactions: []
    };
    this.searchData = this.searchData.bind(this);
  }

  refresh() {
    window.location.reload();
  }

  searchData(word) {
    this.setState({
      search: word
    });
  }

  handleInputChange(event) {
    const value = event.target.value;
    let trans = [];

    value === 'Income'
      ? (trans = [...this.state.transactionsReceived])
      : value === 'Outcome'
      ? (trans = [...this.state.transactionsSent])
      : (trans = [...this.state.allTransactions]);


    this.setState({
      renderTransactions: trans
    });
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
                      allTransactions: transactions,
                      renderTransactions: transactions
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
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Layout>
        <div className="relative">
          <h1 className="pb-4">Transactions</h1>
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
          <div className="search-filter">
            <Search search={this.searchData}/>
            <select
              name="filter"
              className="filter"
              onChange={event => this.handleInputChange(event)}
            >
              <option value="All">All</option>
              <option value="Income">Income</option>
              <option value="Outcome">Outcome</option>
            </select>
          </div>
          {this.state.renderTransactions.map(transaction => {
            if(transaction.reference.toLowerCase().includes(this.state.search.toLowerCase()) ||
                transaction.category.toLowerCase().includes(this.state.search.toLowerCase()))
             return <Transaction key={transaction._id} {...transaction}></Transaction>
          })}
        </div>
      </Layout>
    );
  }
}

export default Transactions;
