import React, { Component } from 'react';

import Layout from '../../Components/Layout';
<<<<<<< HEAD
// import Transaction from '../../Components/Transaction';

=======
import Transaction from '../../Components/Transaction';
import { Link } from 'react-router-dom';
>>>>>>> d4a502edfa6fe32e9c131b0636e0e51cbc4cafe8
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
<<<<<<< HEAD
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
=======
     .then((accounts) => {
       this.setState({
         accounts
       })
            
      transactionService.receivedTransactions(accounts)
      .then((transactions) => {
        this.setState({
          transactionsReceived: transactions,
          allTransactions: transactions
        })
      })
      .catch((error) => {
        console.log(error)
      })

      transactionService.sentTransactions(accounts)
      .then((transactions) => {
        this.setState(previousState => {
          return {
          transactionsSent: transactions,
          allTransactions: [...previousState.allTransactions, transactions]
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })

     })  
     .catch(error => {
       console.log(error);
     })
    
     console.log(this.state); 
  }

  render(){
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
          {this.state.allTransactions.map((transaction) => (
            <Transaction {...transaction}></Transaction>
          ))}
        </div>
      </Layout>
>>>>>>> d4a502edfa6fe32e9c131b0636e0e51cbc4cafe8
    );
  }
}

export default Transactions;
