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
import { createTransaction, createListTransactions } from '../../Services/transaction';
import { userIDAccounts } from './../../Services/account';
import { useStyles } from './../../Utilities/useStyles';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

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

class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: '',
      totalAmount: 0,
      reference: '',
      accountIDFrom: '',
      accountInfo: '',
      accounts: [],
      categories: [
        'Housing',
        'Transport',
        'Food & Dining',
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
      schedulePeriod: 'Hour',
      schedulePeriods: ['Hour', 'Week', 'Month'],
      time: 'Month',
      times: ['Month', 'Trimester', 'Semester'],
      dateTransaction: new Date(),
      colorCategory: '',
      success: true,
      message: '',
      optionTransfer: '',
      phoneNumber: ''
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

    this.setState({
      accountIDFrom
    });
  }

  handleInputChange(event) {
    const inputName = event.target.name;
    let value = event.target.value;
    if (inputName === 'schedule') value === 'No' ? (value = false) : (value = true);

    this.setState({
      [inputName]: value
    });
  }

  componentDidMount() {
    this.props.changeActiveNav();
    this.getData();
  }

  getData() {
    const userID = this.props.userID;

    userIDAccounts(userID)
      .then(account => {
        this.setState({
          accounts: account,
          type: account[0].type,
          accountIDFrom: account[0]._id
        });
      })
      .catch(error => console.log(error));
  }

  chooseColor() {
    const category = this.state.category;
    let colorCategory = 'info';

    if (category === 'Transport') {
      colorCategory = 'success';
    } else if (category === 'Auto insurance') {
      colorCategory = 'primary';
    } else if (category === 'Food & Dining') {
      colorCategory = 'primary';
    } else if (category === 'Utility bills') {
      colorCategory = 'secondary';
    } else if (category === 'Cell phone') {
      colorCategory = 'danger';
    } else if (category === 'Fun stuff') {
      colorCategory = 'danger';
    }else if (category === 'Childcare and school costs') {
      colorCategory = 'warning';
    } else if (category === 'Pet food') {
      colorCategory = 'light';
    } else if (category === 'Pet insurance') {
      colorCategory = 'dark';
    } else if (category === 'Life insurance') {
      colorCategory = 'light';
    } else if (category === 'Fun stuff') {
      colorCategory = 'danger';
    } else if (category === 'Travel') {
      colorCategory = 'warning';
    } else if (category === 'Student loans') {
      colorCategory = 'success';
    } else if (category === 'Credit-card debt') {
      colorCategory = 'info';
    } else if (category === 'Retirement') {
      colorCategory = 'success';
    } else if (category === 'Emergency fund') {
      colorCategory = 'warning';
    } else if (category === 'Large purchases') {
      colorCategory = 'success';
    } else if (category === 'Other') {
      colorCategory = 'info';
    }

    return colorCategory;
  }

  createOneTransaction() {
    const userIDFrom = this.props.userID;
    console.log(userIDFrom);
    const transaction = Object.assign({}, this.state);
    delete transaction.categories;
    delete transaction.accounts;
    delete transaction.schedulePeriods;
    delete transaction.times;
    delete transaction.accountInfo;
    transaction.status = 'Executed';

    createTransaction(transaction)
      .then((response) => {
        const { result, message } = response;
        let inssucessMessage = '';
        if(result) {
          /*const notification = {

          }
          createNotification()
          .then((response) => {
            console.log(response);
            this.props.history.push({
              pathname: '/transactions'
            });
          })
          .catch((error) => {
            console.log(error);
          })*/
        }
        else {
          (message === 0) ? inssucessMessage = 'Not enough money' : inssucessMessage = 'Account doesnt exist';
          this.setState({
            success: false,
            message: inssucessMessage
          })
        }
      })
      .catch(error => console.log(error));
  }

  createListTransactions() {
    const allT = this.calculateTransactions();
    const firstT = allT[0];
    allT.shift();

    createTransaction(firstT)
      .then((result) => {
        this.props.history.push({
          pathname: '/transactions'
        });
      })
      .catch(error => console.log(error));

    createListTransactions(allT)
      .then(() => {
        this.props.history.push({
          pathname: '/transactions'
        });
      })
      .catch(error => {
        console.log(error);
      });
  }


  setData(event) {
    event.preventDefault();
    const colorCategory = this.chooseColor();
    
    this.setState({
        colorCategory
    }, () => {
        if (this.state.schedule) {
          this.createListTransactions();
        } else {
          this.createOneTransaction();
        }
    });
  }

  render() {
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
                    <option value={acc._id + ' ' + acc.type} key={acc.accountNumber}>
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
                  label="AccountNumber"
                  onChange={event => this.handleInputChange(event)}
                />
                <FormControlLabel
                  value="PhoneNumber"
                  control={<StyledRadio />}
                  label="PhoneNumber"
                  onChange={event => this.handleInputChange(event)}
                />
              </RadioGroup>
            </FormControl>
            {
              (this.state.optionTransfer === 'AccountNumber' &&
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
              ) || (this.state.optionTransfer === 'PhoneNumber' &&
                <Grid item xs={12} sm={12}>
                <h4 className="pt-3 pb-2">Phone Number that you want to transfer</h4>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number To"
                  name="phoneNumber"
                  onChange={event => this.handleInputChange(event)}
                />
              </Grid>
              )}
            <h4 className="pl-2 pt-3 pb-2">Amount</h4>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="totalAmount"
                label="Total Amount"
                name="totalAmount"
                type="number"
                onChange={event => this.handleInputChange(event)}
              />
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
          {
            (!this.state.success) && 
              <Alert severity="error">{this.state.message}</Alert>
          }
          <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
            Create New Transaction
          </Button>
        </form>
      </Layout>
    );
  }
}

export default AddTransaction;
