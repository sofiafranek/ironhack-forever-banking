import React, { Component, Fragment } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import {
  RadioGroup,
  Button,
  TextField,
  FormControl,
  Select,
  Grid,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import {
  createTransactionAccount,
  createTransactionPhone,
  createListTransactions,
  createListTransactionsPhone
} from '../../Services/transaction';
import { userActiveAccounts } from '../../Services/account';
import { creditAccounts } from './../../Services/credit';
import { useStyles } from '../../Utilities/useStyles';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
// import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import getSymbolFromCurrency from 'currency-symbol-map';

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: '',
      totalAmount: 0,
      reference: '',
      accountIDFrom: '',
      accountInfo: '',
      accountCurrency: '',
      accounts: [],
      categories: [
        'Housing',
        'Transport',
        'Food and Dining',
        'Utility Bills',
        'Cell Phone',
        'Childcare and School Costs',
        'Pet Food',
        'Pet Insurance',
        'Clothing',
        'Health Insurance',
        'Fitness',
        'Auto Insurance',
        'Life Insurance',
        'Fun Stuff',
        'Travel',
        'Student Loans',
        'Credit Card Debt',
        'Retirement',
        'Emergency Fund',
        'Large Purchases',
        'Other'
      ],
      category: 'Housing',
      schedule: false,
      schedulePeriod: 'Week',
      schedulePeriods: ['Week', 'Month'],
      time: 'Month',
      times: ['Month', 'Trimester', 'Semester'],
      dateTransaction: new Date(),
      success: true,
      message: '',
      optionTransfer: '',
      phoneNumber: '',
      type: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAccountFromChange = this.handleAccountFromChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  weeklyTransaction(weeks, currentMonth, currentDay) {
    let i = 1;
    let newDate = null;
    let day = currentDay;
    let month = currentMonth;
    const allDates = [];

    while (i < weeks) {
      if (day > 23) {
        month++;
        day = 30 - day + 7;
        newDate = new Date(2020, month, day);
      } else {
        day = day + 7;
        newDate = new Date(2020, month, day);
      }
      day = newDate.getDate();
      i++;
      allDates.push(newDate);
    }

    return allDates;
  }

  monthlyTransaction(months, currentMonth, currentDay) {
    let i = 0;
    let newDate = null;
    const allDates = [];

    while (i < months) {
      newDate = new Date(2020, currentMonth + i, currentDay);
      allDates.push(newDate);
      i++;
    }

    return allDates;
  }

  calculateTransactions() {
    const schedulePeriod = this.state.schedulePeriod;
    const time = this.state.time;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    let allDates = [];
    const allTransactions = [];

    if (schedulePeriod === 'Week') {
      switch (time) {
        case 'Month':
          allDates = this.weeklyTransaction(4, month, day);
          break;
        case 'Trimester':
          allDates = this.weeklyTransaction(12, month, day);
          break;
        case 'Semester':
          allDates = this.weeklyTransaction(24, month, day);
          break;
        default:
          break;
      }
    } else if (schedulePeriod === 'Month') {
      switch (time) {
        case 'Trimester':
          allDates = this.monthlyTransaction(3, month, day);
          break;
        case 'Semester':
          allDates = this.monthlyTransaction(6, month, day);
          break;
        default:
          break;
      }
    }

    let transaction = null;
    for (let j = 0; j < allDates.length; j++) {
      transaction = Object.assign({}, this.state);
      if (j === 0) {
        transaction.status = 'Executed';
      } else {
        transaction.status = 'Pending';
      }
      transaction.dateTransaction = allDates[j];
      delete transaction.categories;
      delete transaction.accounts;
      delete transaction.schedulePeriods;
      delete transaction.times;
      delete transaction.accountInfo;
      allTransactions.push(transaction);
    }
    return allTransactions;
  }

  handleAccountFromChange(event) {
    const value = event.target.value;

    const accountSplitted = value.split(' ');
    const accountIDFrom = accountSplitted[0];
    const type = accountSplitted[1];
    const accountCurrency = getSymbolFromCurrency(accountSplitted[2]);

    this.setState({
      accountIDFrom,
      type,
      accountCurrency
    });
  }

  handleInputChange(event) {
    const inputName = event.target.name;
    let value = event.target.value;
    if (inputName === 'schedule') value === 'No' ? (value = false) : (value = true);
    if (inputName === 'totalAmount') value = replaceAll(value, ',', '');

    console.log(value);
    this.setState({
      [inputName]: value
    });
  }

  componentDidMount() {
    this.props.changeActiveNav();
    this.getData();
  }

  async getData() {
    const userID = this.props.user._id;

    try {
      const account = await userActiveAccounts(userID);
      const accounts = account.map(value => value.accountID);
      const credits = await creditAccounts(userID);
      const allAccounts = accounts.concat(credits);
      this.setState({
        accounts: allAccounts,
        type: accounts[0].type,
        accountIDFrom: accounts[0]._id,
        accountCurrency: getSymbolFromCurrency(accounts[0].currency)
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createTransactionAccount(transaction) {
    let insuccessMessage = '';
    try {
      const response = await createTransactionAccount(transaction);
      const { result, message } = response;

      if (result) {
        this.props.history.push({
          pathname: '/transactions'
        });
      } else {
        if (message === 0) {
          insuccessMessage = 'Not enough money';
        } else {
          insuccessMessage = 'Account doesnt exist';
        }
      }

      return insuccessMessage;
    } catch (error) {
      console.log(error);
    }
  }

  async createTransactionPhoneNumber(transaction) {
    let insuccessMessage = '';
    try {
      const response = await createTransactionPhone(transaction);
      const { result, message } = response;

      if (result) {
        this.props.history.push({
          pathname: '/transactions'
        });
      } else {
        if (message === 0) {
          insuccessMessage = 'Not enough money';
        } else {
          insuccessMessage = 'Phone Number is not register';
        }
      }

      return insuccessMessage;
    } catch (error) {
      console.log(error);
    }
  }

  async createOneTransaction() {
    const userIDFrom = this.props.user._id;
    const transaction = Object.assign({}, this.state);
    delete transaction.categories;
    delete transaction.accounts;
    delete transaction.schedulePeriods;
    delete transaction.times;
    delete transaction.accountInfo;
    transaction.status = 'Executed';

    let insuccessMessage = '';

    if (this.state.optionTransfer === 'AccountNumber') {
      insuccessMessage = await this.createTransactionAccount(transaction);
    } else {
      insuccessMessage = await this.createTransactionPhoneNumber(transaction);
    }

    if (insuccessMessage !== '') {
      this.setState({
        success: false,
        message: insuccessMessage
      });
    }
  }

  async createListTransactions() {
    const allT = this.calculateTransactions();
    const firstT = allT[0];
    allT.shift();
    let insuccessMessage = '';

    if (this.state.optionTransfer === 'AccountNumber') {
      insuccessMessage = await this.createTransactionAccount(firstT);
    } else {
      insuccessMessage = await this.createTransactionPhoneNumber(firstT);
    }

    if (insuccessMessage !== '') {
      this.setState({
        success: false,
        message: insuccessMessage
      });
    } else {
      try {
        if (this.state.optionTransfer === 'AccountNumber') {
          await createListTransactions(allT);
        } else {
          await createListTransactionsPhone(allT);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  setData(event) {
    event.preventDefault();

    if (this.state.schedule) {
      this.createListTransactions();
    } else {
      this.createOneTransaction();
    }
  }

  render() {
    const usertype = this.props.user.usertype;
    return (
      <Layout>
        <Breadcrumb>
          <Breadcrumb.Item href="/transactions">Transactions</Breadcrumb.Item>
          <Breadcrumb.Item className="disable-breadcrumb">
            Creating a New Transaction
          </Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="mb-4">Creating a New Transaction</h1>
        <form onSubmit={event => this.setData(event)} className="add-account-form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FormControl>
                <h4 className="pt-3 pb-2">Account From</h4>
                <Select
                  name="accountInfo"
                  native
                  onChange={event => this.handleAccountFromChange(event)}
                >
                  {this.state.accounts.map(acc => (
                    <option
                      value={acc._id + ' ' + acc.type + ' ' + acc.currency}
                      key={acc.accountNumber}
                    >
                      {acc.accountNumber + ' ' + acc.type}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <FormControl component="fieldset">
              <h4 className="pl-2 pt-4 pb-2">Option to Transfer</h4>
              <RadioGroup name="optionTransfer">
                <FormControlLabel
                  value="AccountNumber"
                  control={<StyledRadio />}
                  label="Account Number"
                  onChange={event => this.handleInputChange(event)}
                />
                <FormControlLabel
                  value="PhoneNumber"
                  control={<StyledRadio />}
                  label="Phone Number"
                  onChange={event => this.handleInputChange(event)}
                />
              </RadioGroup>
            </FormControl>
            {(this.state.optionTransfer === 'AccountNumber' && (
              <Grid item xs={12} sm={12}>
                <h4 className="pt-3 pb-2">IBAN Number that you want to transfer</h4>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="accountNumber"
                  label="Account Number To"
                  name="accountNumber"
                  onChange={event => this.handleInputChange(event)}
                />
              </Grid>
            )) ||
              (this.state.optionTransfer === 'PhoneNumber' && (
                <Grid item xs={12} sm={12}>
                  <h4 className="pt-3 pb-2">Phone Number that you want to transfer</h4>
                  <TextField
                    type="number"
                    variant="outlined"
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number To"
                    name="phoneNumber"
                    onChange={event => this.handleInputChange(event)}
                  />
                </Grid>
              ))}
            <h4 className="pl-2 pt-3 pb-2">Amount</h4>
            <Grid item xs={12} sm={12}>
              {/* <CurrencyTextField
                id="totalAmount"
                name="totalAmount"
                onChange={event => this.handleInputChange(event)}
                variant="standard"
                required
                decimalCharacter="."
                digitGroupSeparator=","
                currencySymbol={this.state.accountCurrency}
                outputFormat="string"
              /> */}
            </Grid>
            <Grid item xs={12} sm={12}>
              <h4 className="pt-3 pb-2">Category</h4>
              <Select name="category" native onChange={event => this.handleInputChange(event)}>
                {this.state.categories.map(category => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </Grid>
            <h4 className="pl-2 pt-4 pb-2">Reference</h4>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="reference"
                label="Reference"
                name="reference"
                onChange={event => this.handleInputChange(event)}
              />
            </Grid>
            {usertype === 'Premium' && (
              <FormControl component="fieldset">
                <h4 className="pl-2 pt-4 pb-2">Scheduled</h4>
                <RadioGroup name="schedule" className="scheduled-transaction">
                  <FormControlLabel
                    value="Yes"
                    control={<StyledRadio />}
                    label="Yes"
                    onChange={event => this.handleInputChange(event)}
                  />
                  <FormControlLabel
                    value="No"
                    control={<StyledRadio />}
                    label="No"
                    onChange={event => this.handleInputChange(event)}
                  />
                </RadioGroup>
              </FormControl>
            )}
          </Grid>
          {this.state.schedule && (
            <Fragment>
              <Grid item xs={12} sm={12}>
                <FormControl>
                  <h4 className="pt-3 pb-2">Period</h4>
                  <Select
                    name="schedulePeriod"
                    native
                    required
                    onChange={event => this.handleInputChange(event)}
                  >
                    {this.state.schedulePeriods.map(schedulePeriod => (
                      <option value={schedulePeriod} key={schedulePeriod}>
                        {schedulePeriod}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl>
                  <h4 className="pt-3 pb-2">How long</h4>
                  <Select
                    name="time"
                    native
                    required
                    onChange={event => this.handleInputChange(event)}
                  >
                    {this.state.times.map(time => (
                      <option value={time} key={time}>
                        {time}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Fragment>
          )}
          {!this.state.success && <Alert severity="error">{this.state.message}</Alert>}
          <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
            Create New Transaction
          </Button>
        </form>
      </Layout>
    );
  }
}

export default AddTransaction;
