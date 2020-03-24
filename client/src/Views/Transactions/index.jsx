import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import Transaction from '../../Components/Transaction';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import * as transactionService from './../../Services/transaction';
import { userAccounts } from './../../Services/account';
import { creditAccounts } from './../../Services/credit';
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
      renderTransactions: [],
      isToggleOn: true
    };
    this.searchData = this.searchData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();

    this.setState(previouState => ({
      isToggleOn: !previouState.isToggleOn
    }));
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
    event.preventDefault();
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
    this.getData();
  }

  randomKey(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async getData() {
    const userID = this.props.userID;
    try {
      const accounts = await userAccounts(userID);
      const credits = await creditAccounts(userID);
      const creditsID = credits.map(value => value._id);
      const accountsID = accounts.map(value => value.accountID);

      const info = {
        accountsID,
        creditsID
      };

      const transactionsRec = await transactionService.receivedTransactions(info);
      const transactionsReceived = transactionsRec.map(transaction => {
        return {
          transaction,
          type: 'add'
        };
      });
      const transactionsS = await transactionService.sentTransactions(info);
      const transactionsSent = transactionsS.map(transaction => {
        return {
          transaction,
          type: 'minus'
        };
      });
      const all = transactionsReceived.concat(transactionsSent);
      const sortedTransactions = all.sort((val1, val2) => {
        return (
          new Date(val2.transaction.dateTransaction) - new Date(val1.transaction.dateTransaction)
        );
      });

      this.setState({
        accounts,
        transactionsReceived,
        transactionsSent,
        renderTransactions: sortedTransactions,
        allTransactions: sortedTransactions
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Layout>
        <div className="relative transactions-page">
          <h1 className="pb-4 heading-one">Transactions</h1>
          <div className="action-container">
            <Link to={`/transactions/addTransaction`} onClick={this.addingAccount}>
              <Button variant="contained" className="primary">
                <i className="fas fa-plus"></i>
              </Button>
              <div>Create</div>
            </Link>
            <div>
              <Button variant="contained" className="secondary" onClick={this.refresh}>
                <i className="fas fa-sync-alt"></i>
              </Button>
              <div>Refresh</div>
            </div>
            <div>
              <Button
                onClick={event => this.handleClick(event)}
                className="toggle-transactions third"
              >
                {this.state.isToggleOn ? (
                  <i className="fas fa-toggle-off"></i>
                ) : (
                  <i className="fas fa-toggle-on"></i>
                )}
              </Button>
              <div>Toggle</div>
            </div>
          </div>
          <div className="search-filter pb-3">
            <Search search={this.searchData} />
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
            if (
              transaction.transaction.reference
                .toLowerCase()
                .includes(this.state.search.toLowerCase()) ||
              transaction.transaction.category
                .toLowerCase()
                .includes(this.state.search.toLowerCase())
            )
              return (
                <Transaction
                  key={this.randomKey(20)}
                  type={transaction.type}
                  {...transaction.transaction}
                  toggle={this.state.isToggleOn}
                ></Transaction>
              );
          })}
        </div>
      </Layout>
    );
  }
}

export default Transactions;
