import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

class Credit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props, 'CREDIT PROPS');
    return (
      <section className="account-section">
        <Card className="hvr-grow account">
          <Card.Header>
            <h4>{this.props.type} Account</h4>
            <h5 className="pb-2 pt-2">IBAN Number: {this.props.accountNumber}</h5>
            <h5>
              Credit Allowance
              {this.props.balance}€
            </h5>
          </Card.Header>
        </Card>
      </section>
    );
  }
}

export default Credit;
