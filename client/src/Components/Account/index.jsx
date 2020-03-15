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
    //this.removeAccount = this.removeAccount.bind(this);
  }

  componentDidMount() {
    const single = this.props;

    this.setState({
      account: single
    });
  }

  // removeAccount(id) {
  //   this.props.removeAccount(id);
  // }

  render() {
    return (
      <section className="account-section">
        {/* Link to the single account page */}
        <Card className="hvr-grow account">
          <Link
            to={{
              pathname: `/accounts/${this.props._id}`,
              state: this.state.account
            }}
          >
            <Card.Header>
              <h4>{this.props.type} Account</h4>
              <h5>Available Balance: {this.props.balance}€</h5>
            </Card.Header>
          </Link>
        </Card>
      </section>
    );
  }
}

export default Account;
