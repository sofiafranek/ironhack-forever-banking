import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';

class CreditAcceptance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null
    };
  }

  componentWillMount() {
    console.log(this.props.location.state, 'PROPS HEREEEEE');
  }

  render() {
    const account = this.props.location.state.account;
    const user = this.props.user;
    return (
      <Layout>
        <section className="apply-for-credit-page">
          <h1>Credit Acceptance</h1>
          <hr></hr>
          <h4 className="pt-3 pb-4">
            {user.name} you have been accepted for a Credit Amount of €{account.limit}
          </h4>
          <a href="/credit">
            <button>Go to Credit</button>
          </a>
        </section>
      </Layout>
    );
  }
}

export default CreditAcceptance;
