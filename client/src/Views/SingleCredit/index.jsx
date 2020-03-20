import React, { Component } from 'react';
import Layout from '../../Components/Layout';

class SingleCredit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: null
    };
  }
  render() {
    console.log(this.props, 'PROPS');
    console.log(this.state.account, 'STATE ACCOUNTS');
    return (
      <Layout>
        <h1>Single Credit Account</h1>
      </Layout>
    );
  }
}

export default SingleCredit;
