import React, { Component } from 'react';

import Layout from '../../Components/Layout';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { createTransaction } from '../../Services/transaction';
import { userIDAccounts } from './../../Services/account';

import Breadcrumb from 'react-bootstrap/Breadcrumb';

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
        'Utility bills',
        'Cell phone',
        'Childcare and school costs',
        'Pet food',
        'Pet insurance',
        'Clothing',
        'Health insurance',
        'Fitness',
        'Auto insurance',
        'Life insurance',
        'Fun stuff',
        'Travel',
        'Student loans',
        'Credit-card debt',
        'Retirement',
        'Emergency fund',
        'Large purchases',
        'Other'
      ],
      category: 'Housing'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAccountFromChange = this.handleAccountFromChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  handleAccountFromChange(event) {
    const inputName = event.target.name;
    const value = event.target.value;

    const accountSplitted = value.split(' ');
    const accountIDFrom = accountSplitted[0];

    this.setState({
      accountIDFrom
    });
    console.log(inputName, 'inputname', value, 'value');
  }

  handleInputChange(event) {
    const inputName = event.target.name;
    const value = event.target.value;

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

  setData(event) {
    event.preventDefault();
    const transaction = Object.assign({}, this.state);

    createTransaction(transaction)
      .then(transaction => {
        if (transaction.res) {
          console.log('NOT ENOUGH MONEY');
        }
        this.props.history.push({
          pathname: '/transactions'
        });
      })
      .catch(error => console.log(error));
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
            <FormControl>
              <h4 className="pt-3 pb-2">Category</h4>
              <Select name="category" native onChange={event => this.handleInputChange(event)}>
                {this.state.categories.map(category => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </FormControl>
            <h4 className="pl-2 pt-3 pb-2">Reference</h4>
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
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
            Create New Transaction
          </Button>
        </form>
      </Layout>
    );
  }
}

export default AddTransaction;
