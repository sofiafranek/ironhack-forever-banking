import React, { Component } from 'react';
import './style.scss';

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
      renderTransactions: [],
      isToggleOn: true
    };
    this.searchData = this.searchData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
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

  async getData(){
    const userID = this.props.userID;
    try {
      const accounts = await userAccounts(userID);
      const transactionsRec = await transactionService.receivedTransactions(accounts);
      const transactionsReceived = transactionsRec.map(transaction => {
        return {  
          transaction,
          type: 'minus'
      }});
      const transactionsS = await transactionService.sentTransactions(accounts);
      const transactionsSent = transactionsS.map(transaction => {
        return {  
          transaction,
          type: 'add'
      }});
      const all = transactionsReceived.concat(transactionsSent);
      const sortedTransactions = all.sort((val1, val2) => {
        return new Date(val2.transaction.dateTransaction) - new Date(val1.transaction.dateTransaction);
      })
      const allTran = await transactionService.allTransactions(accounts);
      const allTransactions = allTran.map(transaction => {
        return {  
          transaction,
          type: 'add'
      }});
      this.setState({
        accounts,
        transactionsReceived,
        transactionsSent,
        allTransactions,
        renderTransactions: sortedTransactions
      });
    } catch(error) {
      console.log(error);
    } 
  }

  render() {
    return (
      <Layout>
        <div className="relative transactions-page">
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
            <Button onClick={this.handleClick} className="toggle-transactions third">
              {this.state.isToggleOn ? (
                <i className="fas fa-toggle-off"></i>
              ) : (
                <i className="fas fa-toggle-on"></i>
              )}
            </Button>
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
          {/* <button onClick={this.handleClick} className="mb-4 toggle-transactions">
            {this.state.isToggleOn ? (
              <i class="fas fa-toggle-off"></i>
            ) : (
              <i class="fas fa-toggle-on"></i>
            )}
          </button> */}
          {this.state.renderTransactions.map(transaction => {
            if (
              transaction.transaction.reference.toLowerCase().includes(this.state.search.toLowerCase()) ||
              transaction.transaction.category.toLowerCase().includes(this.state.search.toLowerCase())
            )
              return (
                <Transaction
                  key={transaction.transaction._id}
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
