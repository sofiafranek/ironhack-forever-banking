import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import { transactions } from './../../Services/analytics';
import { userActiveAccounts } from './../../Services/account';
import { creditAccounts } from './../../Services/credit';
import ProgressBar from 'react-bootstrap/ProgressBar';
import getSymbolFromCurrency from 'currency-symbol-map';
import { FormControl, Select, Grid } from '@material-ui/core';

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionsPerAccount: [],
      categories: [],
      allAccounts: [],
      eachCategories: [],
      totalAmount: 0,
      accountNumber: '',
      accountCurrency: '',
      index: 0
    };
  }

  async getData() {
    const userID = this.props.userID;

    try {
      const accounts = await userActiveAccounts(userID);
      const credits = await creditAccounts(userID);
      const creditsID = credits.map(value => value._id);
      const accountsID = accounts.map(value => value.accountID);
      const allAccounts = accountsID.concat(credits);

      const info = {
        accountsID,
        creditsID
      };

      const transactionsPerAccount = await transactions(info);

      this.setState(
        {
          transactionsPerAccount,
          accountNumber: allAccounts[0].accountNumber,
          accountCurrency: allAccounts[0].currency,
          allAccounts
        },
        () => {
          this.calculatePercentageCategory();
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getData();
  }

  calculatePercentageCategory() {
    const transactionsPerAccount = this.state.transactionsPerAccount;
    const index = this.state.index;

    if (transactionsPerAccount[index]) {
      const transactions = transactionsPerAccount[index].map(value => {
        const transaction = new Object();
        transaction.amount = value.totalAmount;
        transaction.category = value.category;
        transaction.color = value.colorCategory;

        return transaction;
      });

      const categories = [];
      let totalAmount = 0;
      for (const transaction of transactions) {
        const name = transaction.category;
        const value = transaction.amount;
        totalAmount += value;
        if (categories.some(value => value.name === transaction.category)) {
          const indexCategory = categories.findIndex(value => value.name === transaction.category);
          categories[indexCategory].value += value;
        } else {
          categories.push({
            name,
            value
          });
        }
      }

      this.setState(
        {
          categories,
          totalAmount
        },
        () => {
          const eachCategories = this.state.categories;
          const total = this.state.totalAmount;
          for (const category of eachCategories) {
            const amount = category.value;
            const percentage = (amount / total) * 100;
            category.value = percentage.toFixed(0);
          }
          this.setState({
            eachCategories
          });
        }
      );
    } else {
      this.setState({
        eachCategories: []
      });
    }
  }

  /*splitDates() {
    const transactions = this.state.transactionsPerAccount[this.state.index].map(value => {
        const transaction = new Object();
        transaction.amount = value.totalAmount;
        transaction.category = value.category;
        transaction.color = value.colorCategory;

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

    this.calculatePercentageCategory();
  }*/

  handleAccountChange(event) {
    const inputName = event.target.name;
    const value = event.target.value;
    const index = value;
    const allAccounts = this.state.allAccounts;

    this.setState(
      {
        index,
        accountNumber: allAccounts[index].accountNumber,
        accountCurrency: allAccounts[index].currency
      },
      () => {
        this.calculatePercentageCategory();
      }
    );
  }

  render() {
    return (
      <div>
        <Layout>
          <h1 className="pb-3">Analytics</h1>
          <hr></hr>
          <Grid item xs={12} sm={12}>
            <h6 className="pt-3 pb-2">
              <strong>Choose an account:</strong>
            </h6>
            <FormControl>
              <Select
                name="index"
                native
                onChange={event => this.handleAccountChange(event)}
                className="mb-5"
              >
                {this.state.allAccounts.map((acc, index) => (
                  <option value={index} key={acc.accountNumber}>
                    {acc.accountNumber + ' ' + acc.type}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* title below only shows if there are categories */}
          {this.state.eachCategories.length === 0 && (
            <h5 className="pt-3">
              Start spending! We can only show analytics when you start spending your money!
            </h5>
          )}
          {this.state.eachCategories.length >= 1 && (
            <h5 className="mb-4">
              Total Spending = {this.state.totalAmount}{' '}
              {getSymbolFromCurrency(this.state.accountCurrency)}
            </h5>
          )}
          <div>
            {this.state.eachCategories.map(category => (
              <ProgressBar
                variant={category.name}
                now={category.value}
                label={category.name + ' ' + category.value + '%'}
              />
            ))}
          </div>
        </Layout>
      </div>
    );
  }
}

export default Analytics;
