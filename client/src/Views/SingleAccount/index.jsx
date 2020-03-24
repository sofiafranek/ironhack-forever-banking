import React, { Component } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

import Layout from '../../Components/Layout';
import Transaction from '../../Components/Transaction';
import Button from '@material-ui/core/Button';
import getSymbolFromCurrency from 'currency-symbol-map';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { deleteAccount } from './../../Services/account';
import { allTransactionsAccount } from './../../Services/transaction';

class SingleAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      transactions: [],
      primary: false
    };
    this.deleteAnAccount = this.deleteAnAccount.bind(this);
  }

  deleteAnAccount(event) {
    event.preventDefault();
    const accountID = this.props.match.params.id;
    deleteAccount(accountID)
      .then(() => {
        this.props.history.push({
          pathname: '/accounts'
        });
      })
      .catch(error => console.log(error));
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

  componentDidMount() {
    this.getData();
  }
  
  async getData(){
    const accountID = this.props.match.params.id;
    const { account, primary } = this.props.location.state;

    try {
      const information = await allTransactionsAccount(accountID);
      const transactionsRec = information.transactionsFrom;
      const transactionsS = information.transactionsTo;
    
      const transactionsReceived = transactionsRec.map(transaction => {
        return {
          transaction,
          type: 'add'
        };
      });
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
        transactions: sortedTransactions,
        account,
        primary
      });
    } catch(error) {

    }
  }

  render() {
    const accountID = this.props.match.params.id;
    const usertype = this.props.user.usertype;
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
              <h1>
                {this.state.account.balance.toFixed(2)}{' '}
                {getSymbolFromCurrency(this.state.account.currency)}
              </h1>
              <h5>
                {this.state.account.type === 'Current'
                  ? 'Available Balance'
                  : this.state.account.type === 'Savings'
                  ? 'Available Balance'
                  : 'Total Credit Limit'}
              </h5>
              <hr className="mb-4"></hr>
              <h5>IBAN Number : {this.state.account.accountNumber}</h5>
              <h5>Account Type : {this.state.account.type}</h5>
              <hr className="mt-4"></hr>
              <section className="pt-2">
                {this.state.transactions.map(transaction => (
                  <Transaction key={this.randomKey(50)} {...transaction.transaction} type={transaction.type} />
                ))}
              </section>
              <div className="action-container">
                <Link
                  to={{
                    pathname: `/accounts/${accountID}/add-money`,
                    state: {
                      account: this.state.account,
                      accountNumber: this.state.account.accountNumber
                    }
                  }}
                >
                  <Button variant="contained" className="primary">
                    <i className="fas fa-plus"></i>
                  </Button>
                  <div>Add Money</div>
                </Link>
                {usertype === 'Premium' && (
                  <Link
                    to={{
                      pathname: '/accounts/create-shared-account',
                      state: this.state.account
                    }}
                  >
                    <Button variant="contained" className="secondary">
                      <i className="fas fa-link"></i>
                    </Button>
                    <div>Share</div>
                  </Link>
                )}
                {!this.state.primary &&
                  <div>
                  <Button
                    variant="contained"
                    className="third"
                    onClick={event => this.deleteAnAccount(event)}
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                  <div>Delete</div>
                </div>
              }
            </div>
            </section>
          </>
        )}
      </Layout>
    );
  }
}

export default SingleAccount;
