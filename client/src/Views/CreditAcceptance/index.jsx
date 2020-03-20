import React, { Component } from '/react';
import Layout from '../../Components/Layout';

class CreditAcceptance extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props, 'PROPS');
    const user = this.props.user;
    return (
      <Layout>
        <h1>Credit Acceptance</h1>
        <h4>{user.name} have been accepted for a Credit Amount of _____</h4>
        <a href="/credit">Go to Credit</a>
      </Layout>
    );
  }
}

export default CreditAcceptance;
