import React, { Component } from 'react';

import Layout from '../Components/Layout';
// import Transaction from '../Components/Transaction';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Layout>
          <h1 className="pb-3">User Name</h1>
          <hr></hr>
          <h5>Accounts listed here</h5>
          <hr></hr>
          <h5>Rates converted listed here</h5>
          <hr></hr>
          <h5>Transactions (recent) listed here</h5>
          <hr></hr>
        </Layout>
      </div>
    );
  }
}

export default Dashboard;
