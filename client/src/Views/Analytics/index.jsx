import React, { Component } from 'react';

import Layout from '../../Components/Layout';
import { transactions } from './../../Services/analytics';
import { userAccounts } from './../../Services/account';
import Chart from '../../Components/Chart';

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      dates: []
    };
  }

  async getData() {
    const userID = this.props.userID;

    try {
      const accounts = await userAccounts(userID);
      const transactionsUser = await transactions(accounts);
      this.setState(
        {
          transactions: transactionsUser
        },
        () => {
          this.splitDates();
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getData();
  }

  splitDates() {
    const transactions = this.state.transactions.map(value => {
      const transaction = new Object();
      transaction.date = value.dateTransaction.split('-')[1];
      transaction.amount = value.totalAmount;
      return transaction;
    });

    let month = '';
    const dates = [];
    for (const transaction of transactions) {
      const amount = transaction.amount;
      switch (transaction.date) {
        case '01':
          month = 'Jan';
          break;
        case '02':
          month = 'Feb';
          break;
        case '03':
          month = 'Mar';
          break;
        case '04':
          month = 'April';
          break;
        case '05':
          month = 'May';
          break;
        case '06':
          month = 'June';
          break;
        case '07':
          month = 'July';
          break;
        case '08':
          month = 'Aug';
          break;
        case '09':
          month = 'Sep';
          break;
        case '10':
          month = 'Oct';
          break;
        case '11':
          month = 'Nov';
          break;
        case '12':
          month = 'Dec';
          break;
      }
      if (dates.some(value => value.date === month)) {
        const indexDate = dates.findIndex(value => value.date === month);
        dates[indexDate].total += amount;
      } else {
        dates.push({
          date: month,
          total: amount
        });
      }
    }

    this.setState({
      dates
    });
  }

  render() {
    return (
      <div>
        <Layout>
          <h1>Analytics</h1>
          <Chart dates={this.state.dates} />
        </Layout>
      </div>
    );
  }
}

export default Analytics;
