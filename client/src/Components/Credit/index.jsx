import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import getSymbolFromCurrency from 'currency-symbol-map';

class Credit extends Component {
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
        <Link
          to={{
            pathname: `/credit/${this.props._id}`,
            state: this.state.account
          }}
        >
          <Card className="hvr-grow account">
            <Card.Header>
              <h4>{this.props.type} Account</h4>
              <h5 className="pb-2 pt-2">IBAN Number: {this.props.accountNumber}</h5>
              <h5 className="pb-2 pt-2">
                Credit Allowance : {this.props.limit}
                {getSymbolFromCurrency(this.props.currency)}
              </h5>
              <h5 className="pb-2 pt-2">
                Credit Current : {this.props.current}
                {getSymbolFromCurrency(this.props.currency)}
              </h5>
            </Card.Header>
          </Card>
        </Link>
      </section>
    );
  }
}

export default Credit;
