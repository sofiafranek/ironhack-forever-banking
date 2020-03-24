import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import getSymbolFromCurrency from 'currency-symbol-map';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      primary: false,
      user: null
    };
  }

  componentDidMount() {
    const { account, user } = this.props;

    this.setState({
      account: account.accountID,
      user: user.userID,
      primary: account.primary
    });
  }

  render() {
    return (
      <section className="account-section">
        {this.state.account && (
          <Card className="hvr-grow account">
            <Link
              to={{
                pathname: `/accounts/${this.state.account._id}`,
                state: {
                  account: this.state.account,
                  primary: this.state.primary
                }
              }}
            >
              <Card.Header>
                <h4>
                  Shared {this.state.account.type} Account{' '}
                  {this.state.primary === true ? <span>- Primary</span> : ''}
                </h4>
                <h5 className="pb-2 pt-2">IBAN Number: {this.state.account.accountNumber}</h5>
                <h5>
                  {this.state.account.type === 'Credit' ? 'Credit Allowance' : 'Available Balance'}{' '}
                  : {this.state.account.balance.toFixed(2)}
                  {getSymbolFromCurrency(this.state.account.currency)}
                </h5>
                <hr></hr>
                <h6>Account Shared with {this.state.user.name}</h6>
              </Card.Header>
            </Link>
          </Card>
        )}
      </section>
    );
  }
}

export default Account;
