import React, { Component } from 'react';
import './style.scss';

import Container from '@material-ui/core/Container';

import { summary } from './../../Services/activity';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      information: null,
      card: null,
      account: null,
      user: null
    };
  }
  componentDidMount() {
    this.getData();
    this.props.changeActiveNav();
  }

  getData() {
    const { user } = this.props;
    this.setState({
      user
    })

    const userID = user._id;
    
    summary(userID)
      .then(information => {
        this.setState({
          information,
          card: information.card,
          account: information.account
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Container className="layout-width centered-page summary">
        {this.state.information && this.state.card && this.state.account ? (
          <>
            <h1>Summary</h1>
            <h4>{this.state.user.usertype} Account</h4>
            <h4>Your New Account</h4>
            <h5>IBAN Number: {this.state.account.accountID.accountNumber}</h5>
            <h5>Account Type: {this.state.account.accountID.type}</h5>
            <h4>Your New Card</h4>
            <h5>Card Number: {this.state.card.cardNumber}</h5>
            <h5>Card Expiry: {this.state.card.expiryDate}</h5>
            <a href="/activity">
              <button>Continue to your Online Banking</button>
            </a>
          </>
        ) : (
          true
        )}
      </Container>
    );
  }
}

export default Summary;
