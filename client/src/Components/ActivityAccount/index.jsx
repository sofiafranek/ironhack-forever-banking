import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

class ActivityAccount extends Component {
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
              <h6 className="mb-1">{this.props.type} Account</h6>
              <h6 className="mb-0">IBAN Number: {this.props.accountNumber}</h6>
            </Card.Header>
          </Link>
        </Card>
      </section>
    );
  }
}

export default ActivityAccount;
