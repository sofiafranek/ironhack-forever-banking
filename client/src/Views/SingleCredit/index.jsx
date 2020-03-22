import React, { Component } from 'react';
import Layout from '../../Components/Layout';

import Button from '@material-ui/core/Button';

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import getSymbolFromCurrency from 'currency-symbol-map';
import { deleteAccount } from './../../Services/credit';

let children = '';
let finanacialSupport = '';
let otherCredit = '';
let outstanding = '';

class SingleCredit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null
    };
    this.deleteAnAccount = this.deleteAnAccount.bind(this);
  }

  componentWillMount() {
    const account = this.props.location.state;

    account.children === true ? (children = 'Yes') : (children = 'No');
    account.finanacialSupport === true ? (finanacialSupport = 'Yes') : (finanacialSupport = 'No');
    account.otherCredit === true ? (otherCredit = 'Yes') : (otherCredit = 'No');
    account.outstanding === true ? (outstanding = 'Yes') : (outstanding = 'No');

    console.log(this.props.location.state, 'PROPS');
  }

  deleteAnAccount(event) {
    event.preventDefault();
    const idAccount = this.props.match.params.id;
    deleteAccount(idAccount)
      .then(() => {
        this.props.history.push({
          pathname: '/credit'
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const account = this.props.location.state;
    console.log(account, 'ACCOUNT');
    return (
      <Layout>
        <Breadcrumb>
          <Breadcrumb.Item href="/credit">Credits</Breadcrumb.Item>
          <Breadcrumb.Item className="disable-breadcrumb">{account.accountNumber}</Breadcrumb.Item>
        </Breadcrumb>
        <section className="single-account relative">
          <div className="action-container">
            <Button
              variant="contained"
              className="third"
              onClick={event => this.deleteAnAccount(event)}
            >
              <i className="fas fa-times"></i>
            </Button>
          </div>
          <h1>
            {account.current}
            {getSymbolFromCurrency(account.currency)}
          </h1>
          <h5>Total Credit Limit</h5>
          <hr className="mb-4"></hr>
          <h5>IBAN Number : {account.accountNumber}</h5>
          <h5>Account Type : {account.type}</h5>
          <h5>Card Number : 1234 1234 1234 1234 </h5>
          <h5>Card Expirty : 12 / 04</h5>
          <hr className="mt-4"></hr>
          <h4 className="mb-4 mt-4">Credit Application Review</h4>
          <h5>Martial Status : {account.maritalStatus}</h5>
          <h5>Income : {account.income}</h5>
          <h5>Occupation : {account.occupation}</h5>
          <h5>Any Outstanding Loans : {outstanding}</h5>
          <h5>Any Credit with other Banks : {otherCredit}</h5>
          <h5>Do you financially support anyone : {finanacialSupport}</h5>
          <h5>Do you have children : {children}</h5>
          {/* <section className="pt-2">
            {this.state.transactions.map(transaction => (
              <Transaction {...transaction} />
            ))}
          </section> */}
        </section>
      </Layout>
    );
  }
}

export default SingleCredit;
