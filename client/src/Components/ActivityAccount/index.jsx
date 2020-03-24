import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

class ActivityAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      type: 'Current',
      primary: false
    };
  }

  componentDidMount() {
    const single = this.props;
    const primary = this.props.primary;

    this.setState({
      account: single,
      type: single.type,
      primary
    });
  }

  render() {
    return (
      <section className="account-section">
        <Card className="hvr-grow account">
          {(this.state.type === 'Credit' && (
            <Fragment>
              <Link
                to={{
                  pathname: `/credit/${this.props._id}`,
                  state: this.state.account
                }}
              >
                <Card.Header>
                  <h5 className="mb-2">{this.props.type} Account</h5>
                  <h6 className="mb-0">IBAN Number: {this.props.accountNumber}</h6>
                </Card.Header>
              </Link>
            </Fragment>
          )) || (
            <Fragment>
              <Link
                to={{
                  pathname: `/accounts/${this.props._id}`,
                  state: {
                    account: this.state.account,
                    primary: this.state.primary
                  }
                }}
              >
                <Card.Header>
                  <h5 className="mb-2">{this.props.type} Account</h5>
                  <h6 className="mb-0">IBAN Number: {this.props.accountNumber}</h6>
                </Card.Header>
              </Link>
            </Fragment>
          )}
        </Card>
      </section>
    );
  }
}

export default ActivityAccount;
