import React, { Component } from 'react';
import Layout from '../../Components/Layout';

class Dashboard extends Component {
  componentDidMount() {
    this.props.changeActiveNav();
  }

  render() {
    const user = this.props.user;
    return (
      <div>
        <Layout>
          <h1 className="pb-3">{user.name}</h1>
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
