import React, { Component } from 'react';
import './style.scss';

import { FormControl, InputLabel, Select, Grid } from '@material-ui/core';
import { createAccount } from '../../Services/credit';
import Layout from '../../Components/Layout';
import getSymbolFromCurrency from 'currency-symbol-map';

class CreditAcceptance extends Component {
  constructor(props) {
    super(props);
    this.options = ['Minimum amount per month', 'Total amount per month'];
    this.state = {
      account: null,
      option: 'Minimum amount per month',
      minimum: 0
    };
  }

  handleInputChange(event) {
    let inputName = event.target.name;
    let value = event.target.value;
    console.log(inputName + ' ' + value);
    this.setState({
      [inputName]: value
    });
  }

  componentDidMount() {
    const account = this.props.location.state.account;
    const minimum = account.limit * 0.05;
    this.options[0] += ` - ${minimum}`;

    this.setState({
      account,
      minimum
    });
  }

  async setData(event) {
    event.preventDefault();
    const account = this.state.account;
    account.option = this.state.option;

    try {
      await createAccount(account);
      this.props.history.push('/credit');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const user = this.props.user;
    return (
      <Layout>
        {this.state.account &&
        <section className="apply-for-credit-page">
          <h1>Credit Acceptance</h1>
          <hr></hr>
          <h4 className="pt-3 pb-4">
            {user.name} you have been accepted for a Credit Amount of {this.state.account.limit}{getSymbolFromCurrency(this.state.account.currency)}
          </h4>
          <Grid item xs={12} sm={12} className="pb-4">
              <FormControl>
                <InputLabel htmlFor="age-native-simple">How would you prefer to pay?</InputLabel>
                <Select name="option" native onChange={event => this.handleInputChange(event)}>
                  {this.options.map(option => (
                    <option value={option} key={option}>
                      {option}{getSymbolFromCurrency(this.state.account.currency)}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <button onClick={event => this.setData(event)}>Go to Credit</button>
          </section>
        )}
      </Layout>
    );
  }
}

export default CreditAcceptance;
