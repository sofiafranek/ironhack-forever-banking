import React, { Component } from 'react';
import './style.scss';

import Container from '@material-ui/core/Container';

class Summary extends Component {
  componentDidMount() {
    this.props.changeActiveNav();
  }

  render() {
    return (
      <Container className="layout-width centered-page summary">
        <h1>Summary</h1>
        <h4>Your New Account</h4>
        <h5>IBAN Number: ______</h5>
        <h5>Account Type: ______</h5>
        <h4>Your New Card</h4>
        <h5>Card Number: ______</h5>
        <h5>Card Expiry: ______</h5>
        <h5>Pin: ______</h5>
        <a href="/activity">
          <button>Continue to your Online Banking</button>
        </a>
      </Container>
    );
  }
}

export default Summary;
