import React, { Component } from 'react';
import Layout from '../../Components/Layout';

import Breadcrumb from 'react-bootstrap/Breadcrumb';

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
        <Breadcrumb>
          <Breadcrumb.Item href="/accounts">Credits</Breadcrumb.Item>
          <Breadcrumb.Item className="disable-breadcrumb">here</Breadcrumb.Item>
        </Breadcrumb>
        <h1>Single Credit Account</h1>
      </Layout>
    );
  }
}

export default SingleCredit;
