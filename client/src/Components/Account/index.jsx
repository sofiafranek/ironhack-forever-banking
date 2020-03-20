import React, { Component } from 'react';
import './style.scss';

import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import getSymbolFromCurrency from 'currency-symbol-map';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null
    };
  }

  componentDidMount() {
    const single = this.props;

    this.setState({
      account: single
    });
  }

  render() {
    return (
      <section className="account-section">
        <Card className="hvr-grow account">
          <Link
            to={{
              pathname: `/accounts/${this.props._id}`,
              state: this.state.account
            }}
          >
            <Card.Header
              className={
                this.props.type === 'Current'
                  ? 'current-color'
                  : this.props.type === 'Credit'
                  ? 'credit-color'
                  : 'savings-color'
              }
            >
              <h4>{this.props.type} Account</h4>
              <h5 className="pb-2 pt-2">IBAN Number: {this.props.accountNumber}</h5>
              <h5>
                {this.props.type === 'Credit' ? 'Credit Allowance' : 'Available Balance'} :{' '}
                {this.props.balance}{getSymbolFromCurrency(this.props.currency)}
              </h5>
            </Card.Header>
          </Link>
        </Card>
      </section>
    );
  }
}

export default Account;
