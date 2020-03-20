import React, { Component } from 'react';

import Layout from '../../Components/Layout';
import { transactions } from './../../Services/analytics';
import { userAccounts } from './../../Services/account';

class Analytics extends Component {
  constructor(props){
    super(props);
    this.state = {
      transactions: []
    }
  }

  async getData(){
    const userID = this.props.userID;

    try {
      const accounts = await userAccounts(userID);
      const transactionsUser = await transactions(accounts);
      this.setState({
        transactions: transactionsUser
      })
    } catch(error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getData();
  }

  render (){
    return (
      <div>
        <Layout>
          <h1>Analytics</h1>
        </Layout>
      </div>
    );
  }
};

export default Analytics;
