import React, { Component } from 'react';
import './style.scss';

import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

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
            <Card.Header>
              <h4 className="pb-2">{this.props.type} Account</h4>
              <h5 className="pb-2">IBAN Number: {this.props.accountNumber}</h5>
              <h5>Available Balance: {this.props.balance}€</h5>
            </Card.Header>
          </Link>
        </Card>
      </section>
    );
  }
}

export default Account;
